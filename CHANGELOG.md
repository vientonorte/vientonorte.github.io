# Changelog — vientonorte.github.io

Registro operativo del dashboard unificado y su mantenimiento cross-repo.

Formato:
- Fecha: YYYY-MM-DD
- Tipo: `feat`, `fix`, `docs`, `ops`
- Alcance: qué cambió y por qué

---

## 2026-04-15

### fix(meta)
- Se agrega `og:image` y `twitter:card summary_large_image` para preview social completo en LinkedIn y Twitter/X.

### fix(a11y)
- Se agrega skip-link "Saltar al contenido" visible al foco (`#proyectos`).
- Se añaden `aria-label` descriptivos en dots de estado del header para lectores de pantalla.

---

## 2026-04-09

### refactor
- Se depreca tarjeta Poemario Beta (`29092020`): badge cambia a `DEPRECATED`, card con `opacity: 0.6`.
- Se eliminan cards redundantes que ya no correspondían a proyectos activos.
- Se actualiza descripción de `mi-portafolio` a stack real: React 19, Radix/shadcn, Tailwind v4, Vite 6.

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
