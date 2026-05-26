# vientonorte.github.io

Dashboard unificado de proyectos de [@vientonorte](https://github.com/vientonorte). Tema oscuro, responsive, zero dependencias, **soporte bilingüe ES/EN**.

**Live:** https://vientonorte.github.io

Log operativo: ver `CHANGELOG.md`.
Handoff operativo: ver `HANDOFF.md`.
Runbook de deploy y QA: ver `DEPLOY.md`.

---

## Características

- ✨ **Soporte bilingüe** — Español e Inglés con switch persistente
- 🔐 **Autenticación con Passkey** — Acceso a repositorios privados con WebAuthn
- 🎨 **Tema oscuro** — Diseño GitHub-style con custom properties CSS
- 📱 **Responsive** — Mobile-first, adaptable a todos los dispositivos
- ♿ **Accesible** — WCAG 2.1 AA, navegación por teclado, ARIA labels
- 🚀 **Zero dependencias** — Vanilla JS, sin frameworks, sin build step

---

## Proyectos listados

| Proyecto | Estado | URL |
|----------|--------|-----|
| Contra-Archivo | 🟢 Live | [antropologia-corrupcion](https://vientonorte.github.io/antropologia-corrupcion/) |
| table-ro | 🟢 Live | [table-ro](https://vientonorte.github.io/table-ro/) |
| dashfin | 🟢 Live | [dashfin](https://vientonorte.github.io/dashfin/) |
| mi-portafolio | 🟢 Live | [mi-portafolio](https://vientonorte.github.io/mi-portafolio/) |
| uxtools | 🟢 Live | [uxtools](https://vientonorte.github.io/uxtools/) |
| aruma | 🟣 Repo | [GitHub](https://github.com/vientonorte/aruma) |
| SURA Investments | 🟡 Privado | Acceso restringido |
| Poemario Beta | 🔴 Deprecated | [29092020](https://vientonorte.github.io/29092020/) |
| dihe | 🟣 Repo | [GitHub](https://github.com/vientonorte/dihe) |
| khuro | 🟣 Repo | [GitHub](https://github.com/vientonorte/khuro) |

## Stack

- HTML5 + CSS3 vanilla (custom properties, grid, dark theme)
- JavaScript vanilla (ES6+, WebAuthn API)
- Sin framework, sin build, sin dependencias
- Deploy: GitHub Pages (rama `main`, raíz `/`)

## Estructura

```
vientonorte.github.io/
├── index.html           ← Dashboard único con soporte bilingüe
└── data/
    └── projects.json    ← Metadatos de proyectos (ES/EN)
```

## Desarrollo local

```bash
git clone https://github.com/vientonorte/vientonorte.github.io.git
cd vientonorte.github.io
open index.html
# o con live server:
npx serve .
```

## Soporte bilingüe

El dashboard soporta **Español** e **Inglés** con cambio de idioma persistente:

- **Switch de idioma** — Botón 🌐 en el header para alternar ES ↔ EN
- **Persistencia** — El idioma elegido se guarda en `localStorage`
- **Metadatos bilingües** — Todos los proyectos tienen descripciones en ambos idiomas
- **SEO multilingüe** — Meta tags `og:locale:alternate` para indexación

### Estructura de datos bilingüe

```json
{
  "meta": {
    "role": {
      "es": "UX Lead · Investigador doctoral en Antropología",
      "en": "UX Lead · PhD Researcher in Anthropology"
    }
  },
  "projects": [
    {
      "title": {
        "es": "mi-portafolio · Design Sprint",
        "en": "my-portfolio · Design Sprint"
      },
      "desc": {
        "es": "Portafolio UX Lead...",
        "en": "UX Lead Portfolio..."
      }
    }
  ]
}
```

## Para reclutadores

- 🔗 **LinkedIn**: [linkedin.com/in/rodrigo-gaete-gaona](https://www.linkedin.com/in/rodrigo-gaete-gaona)
- 💼 **GitHub**: [github.com/vientonorte](https://github.com/vientonorte)
- 📊 **Proyectos en producción**: 5 aplicaciones live
- 🎓 **Formación**: PhD en Antropología + UX Lead
- 🛠 **Stack**: React, TypeScript, Next.js, Tailwind, Node.js, Python

## QA y Debug rápido

- Validar enlaces externos desde `index.html` antes de publicar.
- No exponer enlaces clickeables a repos privados (evita 404 públicos).
- Confirmar `git status --short --branch` limpio al cierre.
- Probar switch de idiomas en ambas direcciones (ES → EN → ES).

---

Rö · Mayo 2026
