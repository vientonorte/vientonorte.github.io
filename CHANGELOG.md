# Changelog — vientonorte.github.io

Registro operativo del dashboard unificado y su mantenimiento cross-repo.

Formato:
- Fecha: YYYY-MM-DD
- Tipo: `feat`, `fix`, `docs`, `ops`
- Alcance: qué cambió y por qué

---

## 2026-04-23

### feat: Design System & CDN Infrastructure
- **Sistema de diseño unificado**: Extracción completa de design tokens, componentes y estilos a `/design-system/`
  - Tokens CSS documentados: colores, tipografía, espaciado, bordes
  - Componentes modulares: card, badge, tag, stat, layout, icon
  - Reset CSS y utilities para base consistente
  - Build script para concatenar y minificar CSS
  
- **Infraestructura CDN**: Assets versionados disponibles en `/cdn/v1/`
  - `vientonorte.css` (15KB): Sistema completo
  - `vientonorte.min.css` (7KB): Versión minificada
  - `tokens.css`, `components.css`: Importación modular
  - `icons.svg`: Sprite SVG reutilizable
  - `.nojekyll`: Configuración para GitHub Pages
  
- **Dashboard data-driven**: Migración a arquitectura dinámica
  - `/data/projects.json`: Metadata centralizada de 9 proyectos
  - `/data/projects-schema.json`: Validación JSON Schema
  - JavaScript vanilla para renderizado dinámico
  - Auto-cálculo de KPIs desde data (elimina drift manual)
  - Reducción de `index.html` de 565 a 263 líneas (53% menos código)
  
- **Documentación completa**:
  - `/design-system/docs/index.html`: Documentación interactiva del design system
  - `MIGRATION.md`: Guía de integración para proyectos
  - `/cdn/README.md`: Documentación de CDN y assets
  
- **Zero-dependency**: Toda la arquitectura mantiene cero dependencias externas
- **Backward compatible**: Tokens legacy mapeados para compatibilidad gradual

### feat (previous)
- Actualización de tarjeta `mi-portafolio` en `index.html` para reflejar foco en Design Sprint y Design Thinking.
- Se incorpora referencia explícita a líneas `Evolve` y `Syncronzy` en descripción y tags de la tarjeta.
- Se mantiene estructura de enlaces y estado `LIVE` sin alterar KPIs globales del header.

---

## 2026-04-16

### fix
- QA y buenas prácticas: corrección de accesibilidad en `.link-disabled` (SURA) — se agrega `role="link"` y `aria-disabled="true"`.
- Se agrega stat "deprecado" en el header para reflejar la tarjeta Poemario Beta en KPIs; se elimina drift documentado en HANDOFF.md.
- Se diferencia visualmente `dot--sprint` (azul/accent) de `dot--live` (verde) — eliminada ambigüedad semántica en stat "sprint activo".
- Se consolidan iconos SVG en sprite `<defs>` (symbol `icon-site` e `icon-github`) — eliminada repetición de 16 paths inline.
- Cards convertidas de `<div>` a `<article>` — elemento semántico correcto para contenido autocontenido.
- Variable CSS `--accent-alpha` extraída del valor hardcodeado en `.tag`.

---

## 2026-04-15

### fix
- `fix(a11y)`: skip link operativo; `aria-label` en dots de estado del header. (34c20c3)
- `fix(meta)`: og:image y twitter card para preview social. (0e5c53c)

---

## 2026-04-09

### refactor
- Deprecar Poemario Beta (badge DEPRECATED, opacidad 0.6); remover cards redundantes; actualizar tarjeta mi-portafolio con stack correcto (React 19, Tailwind v4, Vite 6). (4ae9465)

---

## 2026-04-06

### fix
- Se corrige representación de proyecto privado `SURA Investments` en `index.html`: se elimina enlace público que devolvía 404 y se reemplaza por estado visual `Acceso restringido`.

### ops
- QA de enlaces externos del dashboard ejecutada con `curl`; todos los destinos públicos responden 200.
- Se agregan `HANDOFF.md` y `DEPLOY.md` para estandarizar continuidad, debugging y publicación.

### docs
- Se crea este `CHANGELOG.md` para mantener trazabilidad continua del repositorio general de Vientonorte.
- Se documenta en `README.md` la política de mantenimiento del log para futuras sesiones.

### ops
- Snapshot de estado del ecosistema al cierre:
  - `antropologia-corrupcion`: mejoras recientes en UX móvil del grafo, auditabilidad del score y export CSV; documentación + handoff publicados en su repo.
  - `vientonorte.github.io`: pendiente de siguientes iteraciones visuales del dashboard unificado.

---

## Convención de actualización

Al cerrar cualquier cambio en el dashboard general:
1. Agregar una entrada breve aquí (fecha + tipo + alcance).
2. Referenciar commit hash si aplica.
3. Mantener foco en cambios observables para operación (no solo detalle técnico).
