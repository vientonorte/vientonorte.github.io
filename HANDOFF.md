# Handoff Operativo — vientonorte.github.io

Fecha: 2026-05-28
Rama: main
Estado al cierre: limpio y sincronizado con origin/main

## Objetivo del repositorio

Dashboard unificado de proyectos de Vientonorte para visibilidad pública de estado y enlaces.

## Historial de iteraciones

| Fecha       | Rama / PR            | Descripción                                                                 |
|-------------|----------------------|-----------------------------------------------------------------------------|
| 2026-04-06  | main                 | Fix inicial SURA 404, HANDOFF.md, DEPLOY.md, CHANGELOG.md                  |
| 2026-04-16  | varios PRs           | A11y, KPIs, SVG sprite, articles semánticos                                 |
| 2026-04-22  | PR #7, #8            | h2, skip-link clip-path, focus-visible, dark theme                          |
| 2026-04-25  | PR consolidado       | Dots aria-hidden, canonical, theme-color, favicon SVG                       |
| 2026-05-03  | PR consolidado       | A11y reduced-motion, ul/li semánticos, OG completo                          |
| 2026-05-04  | PR #25, #26, #27     | data/projects.json, passkey WebAuthn, skeleton, grafo fricción, schemas     |
| 2026-05-10  | PR #35               | i18n ES/EN, esc() helper, XSS footer DOM API, console.error                 |
| 2026-05-27  | PR #36               | esc() helper, innerHTML XSS defense, subtitle meta.name                     |
| 2026-05-27  | PR #37 (draft)       | QA: fetch timeout, passkey rate-limit, SCA data, CI pins, schema renames    |
| 2026-05-27  | PR #38 (draft)       | QA exhaustivo (superset de #37) — 17 issues, 3H/6M/8L                      |
| 2026-05-28  | claude/hopeful-cerf-t8GTs | QA buenas prácticas — 18 issues, 2H/5M/11L (ver CHANGELOG)            |

## Qué se cerró en esta iteración (2026-05-28)

- Fetch timeout + AbortController (5s) en index.html
- `catch (err)` + `console.error` en handler de fetch
- Passkey button: `disabled=true` + bloque `finally` anti double-click
- `document.documentElement.lang` redundante eliminado de `updateUILanguage()`
- `load_json()` protegido con `try/except json.JSONDecodeError`
- Bug de truncación corregido (`desc[:77]+'...'` condicional)
- Docstrings PEP 257 en `load_json`, `print_report`, `build_parser`, `main`
- `sca_score`/`friction_type` removidos de los 6 edges con `sca_validated: false`
- GitHub Actions pinados a versiones exactas (checkout@v4.2.2, setup-node@v4.2.0, setup-python@v5.4.0, upload-artifact@v4.6.2)
- Trigger de CI extendido de `data/graph/**` a `data/**`
- Validación de `projects.json` contra `projects.schema.json` agregada al CI
- `data/schema/projects.schema.json` creado (Draft-07)
- 4 schemas de nodos renombrados de guión a guión_bajo (consistencia con `type` en nodes.json)
- `$id` actualizado en los 4 schemas renombrados
- `$comment` agregado a campos SCA en `edge.schema.json`
- Fila fantasma `contra-archivo` eliminada de README.md
- Árbol de Estructura en README.md actualizado con estructura completa
- `.gitignore`: `__pycache__/`, `*.pyc`, `*.pyo` agregados
- HANDOFF.md actualizado a 2026-05-28

## Riesgos abiertos

- **PRs #37 y #38 abiertos**: son draft PRs con un subset de estos mismos fixes. Recomiendo cerrarlos y mergear este PR en su lugar.
- **Contraste `--text-muted`** (~4.8:1): cumple WCAG AA; ajuste a AAA queda para sprint de diseño.
- **`continue-on-error: true` en SCA check**: intencional — el pipeline no bloquea el merge pero deja evidencia en artefactos.
- **Credential ID en localStorage**: intencional — persistencia cross-session requerida para WebAuthn.
- **`aria-label` sin `esc()` en loop data-i18n**: `setAttribute` es seguro vía DOM API.

## Checklist de continuidad

1. Revisar y cerrar PRs #37 y #38 (supersedidos por este PR).
2. Mergear este PR a main.
3. Verificar CI verde en GitHub Actions.
4. Probar switch de idiomas y passkey en browser.
5. Registrar cambios en `CHANGELOG.md` al cierre.

## Próximo paso recomendado

- Agregar tests unitarios para `validate_flow.py` (pytest).
- Evaluar migrar stats de `projects.json` a cálculo automático para evitar drift manual.
