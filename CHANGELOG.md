# Changelog — vientonorte.github.io

Registro operativo del dashboard unificado y su mantenimiento cross-repo.

Formato:
- Fecha: YYYY-MM-DD
- Tipo: `feat`, `fix`, `docs`, `ops`
- Alcance: qué cambió y por qué

---

## 2026-04-24

### fix
- `fix(a11y)`: `a:focus-visible` — regla global con `outline: 2px solid var(--accent)` y `outline-offset: 2px`. Cubre `.card__title a`, `.card__links a` y `footer a`. Cumple WCAG 2.4.7 (Focus Visible) con indicador coherente al sistema de diseño.

---

## 2026-04-23

### feat
- Actualización de tarjeta `mi-portafolio` en `index.html` para reflejar foco en Design Sprint y Design Thinking.
- Se incorpora referencia explícita a líneas `Evolve` y `Syncronzy` en descripción y tags de la tarjeta.
- Se mantiene estructura de enlaces y estado `LIVE` sin alterar KPIs globales del header.

---

## 2026-04-22

### fix
- `fix(a11y)`: jerarquía de headings — `div.card__title` convertido a `h2.card__title` en las 9 cards. Lectores de pantalla y SEO navegan correctamente `h1 > h2`.
- `fix(a11y)`: skip-link migrado de `top: -100%` a `clip-path: inset(100%)` — método preferido WCAG; se revela con `clip-path: inset(0)` al recibir foco.
- `fix(a11y)`: SURA Investments span — eliminado `role="link"` y `tabindex="0"` de elemento no interactivo; reemplazado por `aria-label` descriptivo. Usuarios de teclado ya no tabulan a un elemento que no responde a Enter/Space.
- `fix(css)`: sprite SVG migrado de `style="display:none"` a clase CSS `.svg-sprite` — elimina inline style inconsistente.
- `fix(css)`: `--accent-hover` (#79c0ff) aplicado en hovers de `.card__title a`, `.card__links a` y `footer a`; variable que estaba definida pero sin uso.
- `fix(css)`: `transition: color 0.15s` en `.card__links a` y `footer a` — hover suave en lugar de cambio abrupto.
- `feat(css)`: breakpoint tablet `@media (max-width: 768px)` — grid ajusta a `minmax(280px, 1fr)` antes del colapso a columna única en 600px.
- `feat(css)`: `line-height: 1.3` en `.card__title` — mejora lectura en títulos multi-línea.
- `feat(seo)`: `<link rel="canonical">` y `<meta name="theme-color">` agregados al `<head>`.

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
