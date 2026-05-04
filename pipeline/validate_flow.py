#!/usr/bin/env python3
"""
validate_flow.py — Pipeline de validación SCA analógica para flujos del grafo de fricción.

Implementa la lógica de autenticación de tres factores (SCA) adaptada al
análisis de corrupción institucional:

  Factor 1 — Something you KNOW: conocimiento documentado de la norma (actas, oficios)
  Factor 2 — Something you HAVE: instrumento legal habilitante (decreto, resolución, ley)
  Factor 3 — Something you ARE:  competencia territorial y jerárquica validada

Un flujo que no supera los 3 factores recibe friction_type = "captura" y risk_level = ALTO.

Uso:
  python validate_flow.py --edges data/graph/edges.json --output /tmp/report.json
  python validate_flow.py --edge-id edge-001 --edges data/graph/edges.json

Compatibilidad: Python 3.9+, sin dependencias externas.
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

# ---------------------------------------------------------------------------
# Constantes
# ---------------------------------------------------------------------------

FACTOR_KNOW = "know"
FACTOR_HAVE = "have"
FACTOR_BE = "be"

RISK_LOW = "BAJO"
RISK_MEDIUM = "MEDIO"
RISK_HIGH = "ALTO"
RISK_CRITICAL = "CRITICO"

ACTION_APPROVE = "APROBAR"
ACTION_REVIEW = "REVISION"
ACTION_AUDIT = "AUDITORIA_INMEDIATA"
ACTION_REPORT = "DENUNCIA"


# ---------------------------------------------------------------------------
# Cálculo de energía de nodo
# ---------------------------------------------------------------------------

def compute_node_energy(
    monto_involucrado: float,
    frecuencia_ocurrencia: int,
    transparencia_index: float,
) -> float:
    """
    E_nodo = (monto_involucrado × frecuencia_ocurrencia) / transparencia_index

    transparencia_index: valor entre 0.01 y 100. Cuanto menor, mayor opacidad
    y mayor energía del nodo. Se clampea a 0.01 para evitar división por cero.
    """
    if transparencia_index <= 0:
        transparencia_index = 0.01
    return (monto_involucrado * frecuencia_ocurrencia) / transparencia_index


# ---------------------------------------------------------------------------
# Validación SCA analógica
# ---------------------------------------------------------------------------

@dataclass
class SCAResult:
    flow_id: str
    sca_score: int                          # 0 | 33 | 66 | 100
    missing_factors: list[dict[str, str]]   # [{factor, description}]
    friction_type: str                      # "limpio" | "regulatorio" | "procesal" | "captura"
    risk_level: str                         # BAJO | MEDIO | ALTO | CRITICO
    recommended_action: str
    validated_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    def to_dict(self) -> dict[str, Any]:
        return {
            "flow_id": self.flow_id,
            "sca_score": self.sca_score,
            "missing_factors": self.missing_factors,
            "friction_type": self.friction_type,
            "risk_level": self.risk_level,
            "recommended_action": self.recommended_action,
            "validated_at": self.validated_at,
        }


def validate_flow(flow_id: str, flow_data: dict[str, Any]) -> SCAResult:
    """
    Valida un flujo contra los 3 factores SCA.

    flow_data campos esperados (opcionales, ausencia = factor no superado):
      - actas_oficios       (list[str]) — evidencia del Factor 1 (KNOW)
      - instrumento_legal   (str)       — Factor 2 (HAVE): decreto/resolución/ley
      - competencia_validada (bool)     — Factor 3 (BE): competencia territorial/jerárquica

    Alternativamente acepta el esquema edge.schema.json con:
      - evidence_refs       → Factor 1 proxy
      - sca_score           → si ya computado, lo respeta y solo recalcula risk
    """
    missing_factors: list[dict[str, str]] = []
    sca_score = 0

    # --- Factor 1: Something you KNOW ---
    knows = (
        bool(flow_data.get("actas_oficios"))
        or bool(flow_data.get("evidence_refs"))
    )
    if not knows:
        missing_factors.append({
            "factor": FACTOR_KNOW,
            "description": (
                "Sin evidencia de conocimiento documentado de la norma "
                "(actas, oficios, minutas). Campo 'actas_oficios' o 'evidence_refs' vacío."
            ),
        })
    else:
        sca_score += 33

    # --- Factor 2: Something you HAVE ---
    has_instrument = bool(flow_data.get("instrumento_legal"))
    if not has_instrument:
        missing_factors.append({
            "factor": FACTOR_HAVE,
            "description": (
                "Sin instrumento legal habilitante (decreto, resolución, ley). "
                "Campo 'instrumento_legal' ausente o vacío."
            ),
        })
    else:
        sca_score += 33

    # --- Factor 3: Something you ARE ---
    competencia = flow_data.get("competencia_validada")
    is_competent = competencia is True
    if not is_competent:
        missing_factors.append({
            "factor": FACTOR_BE,
            "description": (
                "Sin competencia territorial y jerárquica validada. "
                "Campo 'competencia_validada' ausente o false."
            ),
        })
    else:
        sca_score += 34  # 33+33+34 = 100 para el caso limpio

    # --- Clasificación de riesgo ---
    n_missing = len(missing_factors)
    if n_missing == 0:
        friction_type = "limpio"
        risk_level = RISK_LOW
        recommended_action = ACTION_APPROVE
    elif n_missing == 1:
        friction_type = "procesal"
        risk_level = RISK_MEDIUM
        recommended_action = ACTION_REVIEW
    elif n_missing == 2:
        friction_type = "captura"
        risk_level = RISK_HIGH
        recommended_action = ACTION_AUDIT
    else:
        friction_type = "captura"
        risk_level = RISK_CRITICAL
        recommended_action = ACTION_REPORT

    return SCAResult(
        flow_id=flow_id,
        sca_score=sca_score,
        missing_factors=missing_factors,
        friction_type=friction_type,
        risk_level=risk_level,
        recommended_action=recommended_action,
    )


# ---------------------------------------------------------------------------
# Utilidades de I/O
# ---------------------------------------------------------------------------

def load_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


def validate_edges_file(edges_path: Path, target_id: str | None = None) -> list[SCAResult]:
    """Valida todos los edges (o sólo uno si target_id está especificado)."""
    edges = load_json(edges_path)
    results: list[SCAResult] = []

    for edge in edges:
        eid = edge.get("id", "unknown")
        if target_id and eid != target_id:
            continue
        results.append(validate_flow(eid, edge))

    return results


def print_report(results: list[SCAResult]) -> None:
    print(f"\n{'='*60}")
    print(f"  REPORTE SCA — Validación de Flujos de Fricción Institucional")
    print(f"  Generado: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print(f"{'='*60}\n")

    summary = {RISK_LOW: 0, RISK_MEDIUM: 0, RISK_HIGH: 0, RISK_CRITICAL: 0}

    for r in results:
        summary[r.risk_level] = summary.get(r.risk_level, 0) + 1
        status_icon = "✅" if r.risk_level == RISK_LOW else (
            "⚠️" if r.risk_level == RISK_MEDIUM else "🚨"
        )
        print(f"  {status_icon} [{r.risk_level:8s}] {r.flow_id}")
        print(f"     SCA Score:   {r.sca_score}/100")
        print(f"     Fricción:    {r.friction_type}")
        print(f"     Acción:      {r.recommended_action}")
        if r.missing_factors:
            print(f"     Factores faltantes:")
            for mf in r.missing_factors:
                print(f"       · [{mf['factor'].upper()}] {mf['description'][:80]}...")
        print()

    print(f"{'─'*60}")
    print(f"  RESUMEN: {len(results)} flujo(s) analizados")
    for level, count in summary.items():
        if count:
            print(f"  · {level}: {count}")
    print(f"{'='*60}\n")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Validación SCA analógica de flujos del grafo de fricción institucional.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--edges",
        type=Path,
        default=Path("data/graph/edges.json"),
        help="Ruta al archivo edges.json (default: data/graph/edges.json)",
    )
    parser.add_argument(
        "--edge-id",
        type=str,
        default=None,
        metavar="ID",
        help="Validar solo el edge con este ID",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Ruta opcional para guardar el reporte en JSON",
    )
    parser.add_argument(
        "--fail-on-high",
        action="store_true",
        help="Retorna exit code 1 si hay al menos un flujo con riesgo ALTO o CRITICO",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if not args.edges.exists():
        print(f"Error: archivo no encontrado — {args.edges}", file=sys.stderr)
        return 2

    results = validate_edges_file(args.edges, target_id=args.edge_id)

    if not results:
        msg = f"No se encontró edge con id='{args.edge_id}'" if args.edge_id else "El archivo no contiene edges."
        print(f"Advertencia: {msg}", file=sys.stderr)
        return 0

    print_report(results)

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        with args.output.open("w", encoding="utf-8") as fh:
            json.dump([r.to_dict() for r in results], fh, ensure_ascii=False, indent=2)
        print(f"Reporte guardado en: {args.output}")

    if args.fail_on_high:
        high_risk = [r for r in results if r.risk_level in (RISK_HIGH, RISK_CRITICAL)]
        if high_risk:
            return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
