# Deploy y QA — vientonorte.github.io

## Modelo de despliegue

- Plataforma: GitHub Pages
- Rama: main
- Carpeta publicada: raíz del repositorio
- Artefactos principales:
  - `index.html` - Dashboard dinámico
  - `/cdn/v1/` - Design system assets
  - `/data/projects.json` - Project metadata
  - `/design-system/` - Source files

## Arquitectura

```
vientonorte.github.io/
├── index.html              # Dashboard (usa CDN)
├── data/
│   ├── projects.json       # Metadata de proyectos
│   └── projects-schema.json
├── cdn/v1/                 # Assets públicos versionados
│   ├── vientonorte.css
│   ├── vientonorte.min.css
│   ├── tokens.css
│   ├── components.css
│   └── icons.svg
├── design-system/          # Source files
│   ├── tokens.css
│   ├── components/
│   ├── build.sh
│   └── docs/
└── .nojekyll              # GitHub Pages config
```

## Flujo recomendado de release

### 1. Cambios en Design System

Si modificas design tokens o componentes:

```bash
# Editar archivos en /design-system/
vim design-system/tokens.css
vim design-system/components/card.css

# Rebuild CDN assets
cd design-system
./build.sh
cd ..

# Commit
git add design-system/ cdn/
git commit -m "feat(design-system): descripción del cambio"
```

### 2. Cambios en Proyectos

Si agregas/modificas proyectos:

```bash
# Editar projects.json
vim data/projects.json

# Validar JSON (opcional pero recomendado)
# Ver sección "QA - Validación de JSON" abajo

# Commit
git add data/projects.json
git commit -m "feat(projects): agregar/modificar proyecto X"
```

### 3. Push y Deploy

```bash
git push origin main
```

GitHub Pages despliega automáticamente en ~1-2 minutos.

### 4. Verificación post-deploy

```bash
# Verificar sitio
open https://vientonorte.github.io

# Verificar CDN
curl -I https://vientonorte.github.io/cdn/v1/vientonorte.css
curl -I https://vientonorte.github.io/data/projects.json
```


## QA mínimo antes de push

### 1) Estado git

```sh
git status --short --branch
```

### 2) Validación de JSON

Validar estructura de `projects.json`:

```bash
# Opción 1: Validar sintaxis JSON
python3 -m json.tool data/projects.json > /dev/null && echo "✓ JSON válido" || echo "✗ JSON inválido"

# Opción 2: Validar contra schema (requiere herramienta de validación)
# npm install -g ajv-cli
# ajv validate -s data/projects-schema.json -d data/projects.json
```

Verificar campos requeridos:
- Cada proyecto debe tener: `id`, `title`, `status`, `description`, `tags`, `deprecated`, `private`, `ariaLabel`
- Status debe ser: `live`, `deprecated`, `private`, o `repo`
- URLs deben ser válidas o `null`

### 3) HTTP status de enlaces externos

Validar enlaces desde `projects.json`:

```bash
# Extraer URLs del JSON y verificar
grep -oE '"(url|repo)": "https://[^"]+"' data/projects.json | \
  cut -d'"' -f4 | \
  sort -u | \
  while read -r url; do 
    code=$(curl -L -s -o /dev/null -w "%{http_code}" "$url")
    echo "$code $url"
  done
```

Todos los enlaces públicos deben responder 200.

### 4) Verificar CDN build

Si modificaste design system:

```bash
# Verificar que los archivos CDN existen
ls -lh cdn/v1/

# Verificar que el build está actualizado
cd design-system && ./build.sh
```

### 5) Test local

```bash
# Servidor local simple
npx serve .
# o
python3 -m http.server 8000

# Abrir http://localhost:8000
# Verificar:
# - Dashboard se renderiza correctamente
# - Proyectos se cargan desde JSON
# - Stats se calculan automáticamente
# - Estilos CDN se aplican
# - No hay errores en consola del navegador
```


## Política para repos privados

- No usar enlaces públicos clickeables que devuelvan 404.
- Representar privados como estado textual: "Acceso restringido".
- Mantener badge `PRIVADO` para consistencia visual.

## Registro de cambios

- Cada release debe agregar entrada en `CHANGELOG.md` con fecha, tipo y alcance.
