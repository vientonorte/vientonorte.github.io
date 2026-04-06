# vientonorte.github.io

Dashboard unificado de proyectos de [@vientonorte](https://github.com/vientonorte). Tema oscuro, responsive, zero dependencias.

**Live:** https://vientonorte.github.io

Log operativo: ver `CHANGELOG.md`.
Handoff operativo: ver `HANDOFF.md`.
Runbook de deploy y QA: ver `DEPLOY.md`.

---

## Proyectos listados

| Proyecto | Estado | URL |
|----------|--------|-----|
| Contra-Archivo | 🟢 Live | [antropologia-corrupcion](https://vientonorte.github.io/antropologia-corrupcion/) |
| table-ro | 🟢 Live | [table-ro](https://vientonorte.github.io/table-ro/) |
| dashfin | 🟢 Live | [dashfin](https://vientonorte.github.io/dashfin/) |
| mi-portafolio | 🟢 Live | [mi-portafolio](https://vientonorte.github.io/mi-portafolio/) |
| Poemario Beta | 🟢 Live | [29092020](https://vientonorte.github.io/29092020/) |
| SURA Investments | 🟡 Privado | Acceso restringido |
| contra-archivo | 🟣 Repo | [GitHub](https://github.com/vientonorte/contra-archivo) |
| Portafolio Lead UX | 🟣 Repo | [GitHub](https://github.com/vientonorte/Portafolio-Lead-UX) |
| dihe | 🟣 Repo | [GitHub](https://github.com/vientonorte/dihe) |
| khuro | 🟣 Repo | [GitHub](https://github.com/vientonorte/khuro) |

## Stack

- HTML5 + CSS3 vanilla (custom properties, grid, dark theme)
- Sin framework, sin build, sin dependencias
- Deploy: GitHub Pages (rama `main`, raíz `/`)

## Estructura

```
vientonorte.github.io/
└── index.html    ← Dashboard único (492 líneas)
```

## Desarrollo local

```bash
git clone https://github.com/vientonorte/vientonorte.github.io.git
cd vientonorte.github.io
open index.html
# o con live server:
npx serve .
```

## QA y Debug rápido

- Validar enlaces externos desde `index.html` antes de publicar.
- No exponer enlaces clickeables a repos privados (evita 404 públicos).
- Confirmar `git status --short --branch` limpio al cierre.

---

Rö · Abril 2026
