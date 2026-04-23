# vientonorte.github.io

Dashboard unificado de proyectos de [@vientonorte](https://github.com/vientonorte) con sistema de diseño centralizado y CDN infrastructure.

**Live:** https://vientonorte.github.io  
**Design System Docs:** https://vientonorte.github.io/design-system/docs/

---

## Características

- 🎨 **Design System**: Sistema de diseño unificado con tokens y componentes reutilizables
- 📦 **CDN Infrastructure**: Assets versionados servidos via GitHub Pages
- 📊 **Data-Driven**: Dashboard dinámico renderizado desde JSON
- 🚀 **Zero Dependencies**: Sin frameworks, sin build process para consumo
- ♿ **Accessible**: ARIA labels, semantic HTML, keyboard navigation
- 📱 **Responsive**: Mobile-first, dark theme optimizado

---

## Proyectos listados

Los proyectos se gestionan en [`/data/projects.json`](data/projects.json):

| Proyecto | Estado | URL |
|----------|--------|-----|
| Contra-Archivo | 🟢 Live | [antropologia-corrupcion](https://vientonorte.github.io/antropologia-corrupcion/) |
| table-ro | 🟢 Live | [table-ro](https://vientonorte.github.io/table-ro/) |
| dashfin | 🟢 Live | [dashfin](https://vientonorte.github.io/dashfin/) |
| mi-portafolio | 🟢 Live | [mi-portafolio](https://vientonorte.github.io/mi-portafolio/) |
| uxtools | 🟢 Live | [uxtools](https://vientonorte.github.io/uxtools/) |
| Poemario Beta | 🔴 Deprecated | [29092020](https://vientonorte.github.io/29092020/) |
| SURA Investments | 🟡 Privado | Acceso restringido |
| dihe | 🟣 Repo | [GitHub](https://github.com/vientonorte/dihe) |
| khuro | 🟣 Repo | [GitHub](https://github.com/vientonorte/khuro) |

---

## Stack

- **Frontend**: HTML5 + CSS3 vanilla (custom properties, grid, dark theme)
- **Data**: JSON-based project metadata con schema validation
- **Design System**: Design tokens, componentes modulares, CDN distribution
- **Build**: Bash script para concatenación y minificación
- **Deploy**: GitHub Pages (rama `main`, raíz `/`)
- **Zero Dependencies**: Sin npm, sin webpack, sin frameworks

---

## Estructura

```
vientonorte.github.io/
├── index.html              # Dashboard dinámico (263 líneas)
├── data/
│   ├── projects.json       # Metadata de 9 proyectos
│   ├── projects-schema.json # JSON Schema para validación
│   └── validate.sh         # Script de validación
├── design-system/          # Sistema de diseño (source)
│   ├── tokens.css          # Design tokens
│   ├── reset.css           # CSS reset
│   ├── utilities.css       # Utility classes
│   ├── components/         # Componentes modulares
│   │   ├── card.css
│   │   ├── badge.css
│   │   ├── tag.css
│   │   ├── stat.css
│   │   ├── layout.css
│   │   ├── icon.css
│   │   └── icons.svg
│   ├── build.sh            # Build script
│   ├── docs/               # Documentación interactiva
│   └── README.md
├── cdn/v1/                 # CDN assets (generated)
│   ├── vientonorte.css     # Sistema completo (15KB)
│   ├── vientonorte.min.css # Minificado (7KB)
│   ├── components.css      # Solo componentes (8KB)
│   ├── tokens.css          # Solo tokens (5KB)
│   └── icons.svg           # SVG sprite (2KB)
├── MIGRATION.md            # Guía de integración
├── CHANGELOG.md            # Log de cambios
└── DEPLOY.md               # Runbook de deploy y QA
```

---

## Desarrollo local

```bash
# Clonar repositorio
git clone https://github.com/vientonorte/vientonorte.github.io.git
cd vientonorte.github.io

# Servidor local
npx serve .
# o
python3 -m http.server 8000

# Abrir navegador
open http://localhost:8000
```

---

## Usando el Design System

### En tus proyectos

Agrega a tu HTML:

```html
<!-- Producción (minificado) -->
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/vientonorte.min.css">

<!-- Desarrollo (legible) -->
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/vientonorte.css">
```

### Modular

```html
<!-- Solo tokens -->
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/tokens.css">

<!-- Tokens + Componentes -->
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/tokens.css">
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/components.css">
```

**Ver guía completa**: [MIGRATION.md](MIGRATION.md)

---

## Agregar/Modificar Proyectos

1. **Editar metadata**:
   ```bash
   vim data/projects.json
   ```

2. **Validar JSON**:
   ```bash
   ./data/validate.sh
   ```

3. **Commit y push**:
   ```bash
   git add data/projects.json
   git commit -m "feat(projects): agregar proyecto X"
   git push origin main
   ```

El dashboard se actualiza automáticamente al cargar desde el JSON.

---

## Modificar Design System

1. **Editar source**:
   ```bash
   vim design-system/tokens.css
   vim design-system/components/card.css
   ```

2. **Rebuild CDN**:
   ```bash
   cd design-system
   ./build.sh
   cd ..
   ```

3. **Test local** y commit:
   ```bash
   git add design-system/ cdn/
   git commit -m "feat(design-system): update tokens"
   git push origin main
   ```

---

## QA y Debug

### Validación antes de deploy

```bash
# 1. Estado git limpio
git status --short --branch

# 2. Validar JSON
./data/validate.sh

# 3. Rebuild CDN si modificaste design system
cd design-system && ./build.sh && cd ..

# 4. Test local
npx serve .
```

### Política de calidad

- ✅ Validar `projects.json` contra schema
- ✅ Verificar enlaces HTTP 200 para proyectos públicos
- ✅ No exponer URLs de repos privados
- ✅ Actualizar `CHANGELOG.md` con cada cambio
- ✅ Mantener zero-dependency constraint
- ✅ Test en navegador antes de push

**Ver runbook completo**: [DEPLOY.md](DEPLOY.md)

---

## Documentación

- 📖 **Design System Docs**: [/design-system/docs/](https://vientonorte.github.io/design-system/docs/)
- 🔄 **Migration Guide**: [MIGRATION.md](MIGRATION.md)
- 📦 **CDN Documentation**: [cdn/README.md](cdn/README.md)
- 📝 **Changelog**: [CHANGELOG.md](CHANGELOG.md)
- 🚀 **Deploy Guide**: [DEPLOY.md](DEPLOY.md)
- 🔧 **Handoff**: [HANDOFF.md](HANDOFF.md)

---

## Arquitectura

### Data-Driven Dashboard

El dashboard se renderiza dinámicamente desde JSON:

1. Fetch `/data/projects.json`
2. Calcular KPIs automáticamente (live, private, deprecated, repo)
3. Renderizar cards con metadata
4. Zero drift entre data y UI

### Design System

Sistema de diseño modular y versionado:

- **Tokens**: Variables CSS para consistencia
- **Components**: UI patterns reutilizables
- **CDN**: Assets versionados e inmutables
- **Docs**: Documentación interactiva con ejemplos

### Zero Dependencies

- Sin npm, sin webpack, sin frameworks
- Pure CSS y vanilla JavaScript
- Funciona sin build process
- Progressive enhancement

---

## Versioning

- **Design System**: v1.0.0 (Semantic Versioning)
- **CDN URLs**: Versionadas (`/cdn/v1/`)
- **Breaking changes**: Nueva versión major (`/cdn/v2/`)
- **Immutable**: Versiones publicadas nunca cambian

---

## Contributing

1. Fork el repositorio
2. Crear feature branch
3. Hacer cambios siguiendo convenciones
4. Validar con QA checklist
5. Actualizar `CHANGELOG.md`
6. Crear Pull Request con descripción detallada

---

## License

MIT License - Ver [LICENSE](LICENSE) para detalles

---

Rö · Abril 2026
