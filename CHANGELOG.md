# Changelog — vientonorte.github.io

Registro operativo del dashboard unificado y su mantenimiento cross-repo.

Formato:
- Fecha: YYYY-MM-DD
- Tipo: `feat`, `fix`, `docs`, `ops`
- Alcance: qué cambió y por qué

---

## 2026-04-20

### fix
- `fix(a11y)`: estado `:focus` agregado en `.link-disabled` y en `.card__links a` — cumplimiento WCAG 2.4.7 (foco visible).
- `fix(a11y)`: hover de enlaces en `.card__links` ahora usa `--accent-hover` para diferenciación visual respecto al estado estático.
- `fix(css)`: `font-size: 14px` en `.skip-link` reemplazado por `0.875rem` — consistencia de unidades relativas.
- `feat(meta)`: `<meta name="theme-color">` y `<link rel="icon">` SVG inline añadidos al `<head>`.
- `feat(seo)`: `<link rel="canonical">` añadido al `<head>`.
- `docs`: README.md sincronizado con el estado actual del dashboard — eliminadas filas `contra-archivo` y `Portafolio Lead UX` que no existen en index.html.

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
