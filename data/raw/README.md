# data/raw

Carpeta para datos crudos de fuentes primarias.

## Convención de nomenclatura

```
YYYY-MM-DD_fuente_tipo.jsonl
```

**Ejemplos:**
- `2023-01-01_chilecompra_contratos.jsonl`
- `2023-01-01_cgr_observaciones.jsonl`
- `2023-01-01_dipres_presupuesto.jsonl`

## Formatos soportados

- `.jsonl` — JSONLines: un registro JSON por línea (preferido para streaming)
- `.parquet` — Apache Parquet: para datasets grandes (>100k registros)

## Política de privacidad

- No incluir RUTs o datos personales sin anonimización previa.
- Datos de fuentes públicas únicamente (ChileCompra, CGR, DIPRES, SECOP).
- Mantener URL de origen en cada registro como campo `_source_url`.

## Pipeline de procesamiento

Los archivos crudos de esta carpeta son procesados por `pipeline/validate_flow.py`
y transformados en `data/graph/nodes.json` y `data/graph/edges.json`.
