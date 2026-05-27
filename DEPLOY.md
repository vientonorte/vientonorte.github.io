# Deploy y QA — vientonorte.github.io

## Modelo de despliegue

- Plataforma: GitHub Pages
- Rama: main
- Carpeta publicada: raíz del repositorio
- Artefacto principal: `index.html`

## Flujo recomendado de release

1. Ejecutar QA local de enlaces y contenido.
2. Commit con mensaje claro (`feat|fix|docs|ops`).
3. Push a `origin/main`.
4. Verificar sitio en `https://vientonorte.github.io`.

## QA mínimo antes de push

### 1) Estado git

```sh
git status --short --branch
```

### 2) Validar sintaxis JSON

```sh
python3 -c "import json; json.load(open('data/projects.json'))" && echo "projects.json OK"
python3 -c "import json; json.load(open('data/graph/nodes.json'))" && echo "nodes.json OK"
python3 -c "import json; json.load(open('data/graph/edges.json'))" && echo "edges.json OK"
```

### 3) Ejecutar pipeline SCA

```sh
python pipeline/validate_flow.py --edges data/graph/edges.json
```

### 4) Links actuales (extraídos de projects.json)

```sh
python3 -c "
import json
data = json.load(open('data/projects.json'))
for p in data['projects']:
    for l in p.get('links', []):
        if href := l.get('href'):
            print(href)
" | sort -u
```

### 5) HTTP status de enlaces externos

```sh
python3 -c "
import json
data = json.load(open('data/projects.json'))
for p in data['projects']:
    for l in p.get('links', []):
        if href := l.get('href'):
            print(href)
" | sort -u | while read -r url; do code=$(curl -L -s -o /dev/null -w "%{http_code}" "$url"); echo "$code $url"; done
```

## Política para repos privados

- No usar enlaces públicos clickeables que devuelvan 404.
- Representar privados como estado textual: "Acceso restringido".
- Mantener badge `PRIVADO` para consistencia visual.

## Registro de cambios

- Cada release debe agregar entrada en `CHANGELOG.md` con fecha, tipo y alcance.
