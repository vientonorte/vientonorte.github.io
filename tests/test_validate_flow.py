#!/usr/bin/env python3
"""
Tests unitarios para pipeline/validate_flow.py

Cobertura:
- validate_flow() con diferentes combinaciones de factores SCA
- compute_node_energy() con valores límite
- load_json() con archivos válidos e inválidos
- print_report() formato de salida
- CLI completo con diferentes flags
"""

import json
from pathlib import Path
from typing import Any

import pytest

from pipeline.validate_flow import (
    ACTION_APPROVE,
    ACTION_AUDIT,
    ACTION_REPORT,
    ACTION_REVIEW,
    FACTOR_BE,
    FACTOR_HAVE,
    FACTOR_KNOW,
    RISK_CRITICAL,
    RISK_HIGH,
    RISK_LOW,
    RISK_MEDIUM,
    SCAResult,
    compute_node_energy,
    load_json,
    main,
    validate_flow,
)

# ─────────────────────────────────────────────────────────────────────────
# Fixtures
# ─────────────────────────────────────────────────────────────────────────


@pytest.fixture
def flow_limpio() -> dict[str, Any]:
    """Flujo que supera los 3 factores SCA."""
    return {
        "id": "edge-limpio",
        "actas_oficios": ["acta-001.pdf", "oficio-002.pdf"],
        "instrumento_legal": "Decreto 123/2024",
        "competencia_validada": True,
    }


@pytest.fixture
def flow_procesal() -> dict[str, Any]:
    """Flujo que falla 1 factor (sin instrumento legal)."""
    return {
        "id": "edge-procesal",
        "actas_oficios": ["acta-001.pdf"],
        "competencia_validada": True,
        # instrumento_legal ausente
    }


@pytest.fixture
def flow_captura_alta() -> dict[str, Any]:
    """Flujo que falla 2 factores (sin instrumento legal ni competencia)."""
    return {
        "id": "edge-captura-alta",
        "evidence_refs": ["ref-001"],  # proxy para actas_oficios
        # instrumento_legal ausente
        # competencia_validada ausente (false por defecto)
    }


@pytest.fixture
def flow_captura_critica() -> dict[str, Any]:
    """Flujo que falla los 3 factores SCA."""
    return {
        "id": "edge-captura-critica",
        # sin actas_oficios ni evidence_refs
        # sin instrumento_legal
        # sin competencia_validada
    }


@pytest.fixture
def temp_json_file(tmp_path: Path) -> Path:
    """Crea un archivo JSON temporal válido."""
    file = tmp_path / "test.json"
    file.write_text(json.dumps([{"id": "e1", "foo": "bar"}]), encoding="utf-8")
    return file


@pytest.fixture
def temp_invalid_json(tmp_path: Path) -> Path:
    """Crea un archivo JSON temporal inválido."""
    file = tmp_path / "invalid.json"
    file.write_text("{this is not valid json", encoding="utf-8")
    return file


# ─────────────────────────────────────────────────────────────────────────
# Tests: compute_node_energy()
# ─────────────────────────────────────────────────────────────────────────


def test_compute_node_energy_normal():
    """Caso normal: monto 1M, frecuencia 5, transparencia 10."""
    energy = compute_node_energy(1_000_000, 5, 10)
    assert energy == 500_000


def test_compute_node_energy_high_transparency():
    """Alta transparencia reduce energía."""
    energy = compute_node_energy(1_000_000, 5, 100)
    assert energy == 50_000


def test_compute_node_energy_low_transparency():
    """Baja transparencia aumenta energía."""
    energy = compute_node_energy(1_000_000, 5, 1)
    assert energy == 5_000_000


def test_compute_node_energy_zero_transparency():
    """Transparencia cero se clampea a 0.01 para evitar división por cero."""
    energy = compute_node_energy(100, 2, 0)
    assert energy == 100 * 2 / 0.01
    assert energy == 20_000


def test_compute_node_energy_negative_transparency():
    """Transparencia negativa se clampea a 0.01."""
    energy = compute_node_energy(100, 2, -5)
    assert energy == 100 * 2 / 0.01


# ─────────────────────────────────────────────────────────────────────────
# Tests: validate_flow()
# ─────────────────────────────────────────────────────────────────────────


def test_validate_flow_limpio(flow_limpio):
    """Flujo limpio: todos los factores presentes → SCA 100, riesgo BAJO."""
    result = validate_flow("edge-limpio", flow_limpio)
    assert result.flow_id == "edge-limpio"
    assert result.sca_score == 100
    assert result.friction_type == "limpio"
    assert result.risk_level == RISK_LOW
    assert result.recommended_action == ACTION_APPROVE
    assert len(result.missing_factors) == 0


def test_validate_flow_procesal(flow_procesal):
    """Flujo procesal: falla 1 factor → SCA 67, riesgo MEDIO."""
    result = validate_flow("edge-procesal", flow_procesal)
    assert result.flow_id == "edge-procesal"
    assert result.sca_score == 67  # 33 + 34
    assert result.friction_type == "procesal"
    assert result.risk_level == RISK_MEDIUM
    assert result.recommended_action == ACTION_REVIEW
    assert len(result.missing_factors) == 1
    assert result.missing_factors[0]["factor"] == FACTOR_HAVE


def test_validate_flow_captura_alta(flow_captura_alta):
    """Flujo captura alta: falla 2 factores → SCA 33, riesgo ALTO."""
    result = validate_flow("edge-captura", flow_captura_alta)
    assert result.flow_id == "edge-captura"
    assert result.sca_score == 33
    assert result.friction_type == "captura"
    assert result.risk_level == RISK_HIGH
    assert result.recommended_action == ACTION_AUDIT
    assert len(result.missing_factors) == 2
    factors = {mf["factor"] for mf in result.missing_factors}
    assert FACTOR_HAVE in factors
    assert FACTOR_BE in factors


def test_validate_flow_captura_critica(flow_captura_critica):
    """Flujo captura crítica: falla 3 factores → SCA 0, riesgo CRITICO."""
    result = validate_flow("edge-crit", flow_captura_critica)
    assert result.flow_id == "edge-crit"
    assert result.sca_score == 0
    assert result.friction_type == "captura"
    assert result.risk_level == RISK_CRITICAL
    assert result.recommended_action == ACTION_REPORT
    assert len(result.missing_factors) == 3


def test_validate_flow_evidence_refs_proxy():
    """evidence_refs puede actuar como proxy de actas_oficios."""
    flow = {
        "id": "e1",
        "evidence_refs": ["ref1"],
        "instrumento_legal": "D1",
        "competencia_validada": True,
    }
    result = validate_flow("e1", flow)
    assert result.sca_score == 100
    assert FACTOR_KNOW not in [m["factor"] for m in result.missing_factors]


def test_validate_flow_competencia_false():
    """competencia_validada=false falla factor BE."""
    flow = {
        "id": "e2",
        "actas_oficios": ["a1"],
        "instrumento_legal": "D1",
        "competencia_validada": False,
    }
    result = validate_flow("e2", flow)
    assert result.sca_score == 66  # 33 + 33
    assert len(result.missing_factors) == 1
    assert result.missing_factors[0]["factor"] == FACTOR_BE


def test_sca_result_to_dict(flow_limpio):
    """SCAResult.to_dict() serializa correctamente."""
    result = validate_flow("e", flow_limpio)
    d = result.to_dict()
    assert d["flow_id"] == "e"
    assert d["sca_score"] == 100
    assert "validated_at" in d
    assert isinstance(d["validated_at"], str)


# ─────────────────────────────────────────────────────────────────────────
# Tests: load_json()
# ─────────────────────────────────────────────────────────────────────────


def test_load_json_valid(temp_json_file):
    """Archivo JSON válido se carga correctamente."""
    data = load_json(temp_json_file)
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]["id"] == "e1"


def test_load_json_invalid_raises_systemexit(temp_invalid_json):
    """JSON inválido lanza SystemExit con código 2."""
    with pytest.raises(SystemExit) as exc_info:
        load_json(temp_invalid_json)
    assert exc_info.value.code == 2


def test_load_json_nonexistent():
    """Archivo no existente lanza FileNotFoundError."""
    with pytest.raises(FileNotFoundError):
        load_json(Path("/nonexistent/file.json"))


# ─────────────────────────────────────────────────────────────────────────
# Tests: CLI main()
# ─────────────────────────────────────────────────────────────────────────


def test_main_edges_file_not_found():
    """CLI retorna código 2 si el archivo edges no existe."""
    code = main(["--edges", "/nonexistent.json"])
    assert code == 2


def test_main_valid_edges_success(tmp_path):
    """CLI retorna 0 con archivo edges válido sin riesgos altos."""
    edges_file = tmp_path / "edges.json"
    edges_file.write_text(
        json.dumps(
            [
                {
                    "id": "e1",
                    "actas_oficios": ["a1"],
                    "instrumento_legal": "D1",
                    "competencia_validada": True,
                }
            ]
        ),
        encoding="utf-8",
    )
    code = main(["--edges", str(edges_file)])
    assert code == 0


def test_main_fail_on_high_with_high_risk(tmp_path):
    """CLI retorna 1 con --fail-on-high si hay riesgos altos."""
    edges_file = tmp_path / "edges.json"
    edges_file.write_text(
        json.dumps(
            [
                {
                    "id": "e1",
                    # sin factores SCA → riesgo CRITICO
                }
            ]
        ),
        encoding="utf-8",
    )
    code = main(["--edges", str(edges_file), "--fail-on-high"])
    assert code == 1


def test_main_output_json(tmp_path):
    """CLI escribe reporte JSON con --output."""
    edges_file = tmp_path / "edges.json"
    edges_file.write_text(
        json.dumps(
            [
                {
                    "id": "e1",
                    "actas_oficios": ["a1"],
                    "instrumento_legal": "D1",
                    "competencia_validada": True,
                }
            ]
        ),
        encoding="utf-8",
    )
    output_file = tmp_path / "report.json"
    code = main(["--edges", str(edges_file), "--output", str(output_file)])
    assert code == 0
    assert output_file.exists()
    report = json.loads(output_file.read_text(encoding="utf-8"))
    assert isinstance(report, list)
    assert len(report) == 1
    assert report[0]["flow_id"] == "e1"


def test_main_edge_id_filter(tmp_path):
    """CLI filtra por --edge-id."""
    edges_file = tmp_path / "edges.json"
    edges_file.write_text(
        json.dumps(
            [
                {"id": "e1", "actas_oficios": ["a1"]},
                {"id": "e2", "actas_oficios": ["a2"]},
            ]
        ),
        encoding="utf-8",
    )
    output_file = tmp_path / "report.json"
    code = main(["--edges", str(edges_file), "--edge-id", "e2", "--output", str(output_file)])
    assert code == 0
    report = json.loads(output_file.read_text(encoding="utf-8"))
    assert len(report) == 1
    assert report[0]["flow_id"] == "e2"


def test_main_empty_edges(tmp_path):
    """CLI retorna 0 si el archivo edges está vacío."""
    edges_file = tmp_path / "edges.json"
    edges_file.write_text("[]", encoding="utf-8")
    code = main(["--edges", str(edges_file)])
    assert code == 0


def test_main_edge_id_not_found(tmp_path, capsys):
    """CLI retorna 0 con advertencia si --edge-id no se encuentra."""
    edges_file = tmp_path / "edges.json"
    edges_file.write_text(json.dumps([{"id": "e1"}]), encoding="utf-8")
    code = main(["--edges", str(edges_file), "--edge-id", "e999"])
    assert code == 0
    captured = capsys.readouterr()
    assert "No se encontró edge con id='e999'" in captured.err
