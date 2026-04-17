# Handoff Operativo — vientonorte.github.io

Fecha: 2026-04-15
Rama: main
Estado al cierre: limpio y sincronizado con origin/main

## Objetivo del repositorio

Dashboard unificado de proyectos de Vientonorte para visibilidad pública de estado y enlaces.

## Qué se cerró en esta iteración (sprint 2026-04-06 → 2026-04-15)

- QA de enlaces públicos del dashboard.
- Debug de enlace roto asociado a proyecto privado SURA (404 en GitHub público).
- Ajuste UI/UX para representar acceso privado sin generar error de navegación.
- Depreciación de Poemario Beta (`29092020`): badge `DEPRECATED`, card con opacidad reducida.
- Actualización de `mi-portafolio` a stack real (React 19 / Tailwind v4 / Vite 6).
- Mejoras a11y: skip-link, `aria-label` en dots de estado, `aria-hidden` en SVGs decorativos.
- Meta social completo: `og:image` y `twitter:card` para preview en redes.
- Documentación operativa y de deploy actualizada.

## Hallazgos de QA

- Resultado general de enlaces: OK para proyectos live y repos públicos.
- Hallazgo resuelto: URL pública de SURA devolvía 404 por tratarse de repositorio privado → representado como estado textual.

## Fix aplicado

Archivo: index.html

- Se reemplaza el enlace clickeable de SURA por estado visual "Acceso restringido".
- Se mantiene badge "PRIVADO" para consistencia semántica.
- Se agrega estilo `.link-disabled` en bloque de links de tarjeta.

## Checklist de continuidad

1. Editar dashboard en `index.html`.
2. Validar enlaces HTTP 200 para destinos públicos.
3. No exponer rutas de repos privados como enlaces públicos clickeables.
4. Registrar cambios en `CHANGELOG.md`.
5. Confirmar estado git limpio al cierre.

## Riesgos abiertos

- Conteo de KPIs es manual; puede desalinearse si se agregan/remueven tarjetas sin actualizar stats.

## Próximo paso recomendado

- Extraer metadatos de tarjetas a un JSON simple para evitar drift entre contenido de tarjetas y KPIs.
