# Guía de Contribución — vientonorte.github.io

Gracias por tu interés en contribuir al dashboard de vientonorte. Este documento describe los estándares y procesos para colaborar en el proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Estándares de Código](#estándares-de-código)
- [Testing](#testing)
- [Flujo de Trabajo Git](#flujo-de-trabajo-git)
- [Documentación](#documentación)

---

## Código de Conducta

Este proyecto se adhiere a principios de respeto, inclusión y profesionalismo. Se espera que todos los colaboradores:

- Mantengan un ambiente colaborativo y constructivo
- Respeten diferentes puntos de vista y experiencias
- Acepten críticas constructivas con profesionalismo
- Se enfoquen en lo que es mejor para la comunidad

---

## Cómo Contribuir

### Reportar Bugs

1. Verifica que el bug no haya sido reportado previamente en [Issues](https://github.com/vientonorte/vientonorte.github.io/issues)
2. Crea un nuevo issue usando la plantilla de bug report
3. Incluye:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs. actual
   - Screenshots si aplica
   - Navegador/OS/versión

### Proponer Features

1. Verifica que la feature no exista ya o esté en roadmap
2. Crea un issue describiendo:
   - Problema que resuelve
   - Propuesta de solución
   - Alternativas consideradas
   - Impacto en usuarios existentes

### Pull Requests

1. Fork el repositorio
2. Crea una rama desde `main`: `git checkout -b feature/mi-mejora`
3. Realiza tus cambios siguiendo los estándares de código
4. Escribe o actualiza tests según corresponda
5. Ejecuta linters y tests localmente
6. Commit con mensajes descriptivos (ver [Convenciones de Commit](#convenciones-de-commit))
7. Push a tu fork
8. Abre un Pull Request contra `main`

---

## Estándares de Código

### Python

- **Versión mínima**: Python 3.9+
- **Linter**: `ruff` (configuración en `pyproject.toml`)
- **Formatter**: `ruff format`
- **Type hints**: Recomendado pero no obligatorio
- **Docstrings**: PEP 257 para funciones públicas

Ejecutar linter:
```bash
ruff check pipeline/ tests/
ruff format pipeline/ tests/
```

### JavaScript

- **Estilo**: ES6+ vanilla, sin frameworks
- **Linter**: ESLint (configuración en `.eslintrc.json`)
- **Convenciones**:
  - `const` por defecto, `let` solo si reasignación necesaria
  - Sin `var`
  - Nombres descriptivos (evitar abreviaciones)
  - Funciones flecha para callbacks

Ejecutar linter:
```bash
npm run lint:js
```

### HTML/CSS

- **HTML5** semántico
- **Accesibilidad**: WCAG 2.1 AA mínimo
- **CSS**: Custom properties para theming
- **Responsive**: Mobile-first approach

Ejecutar validación:
```bash
npm run lint:html
```

### JSON

- **Formato**: Indentación 2 espacios
- **Validación**: Contra JSON Schema Draft-07 donde aplique
- **Encodng**: UTF-8

---

## Testing

### Python

Usamos `pytest` para tests unitarios:

```bash
# Instalar dependencias de desarrollo
pip install -r requirements-dev.txt

# Ejecutar todos los tests
pytest tests/

# Con cobertura
pytest --cov=pipeline tests/
```

**Estándares**:
- Cobertura mínima: 80% para código nuevo
- Un archivo de test por módulo: `test_<module>.py`
- Fixtures para datos de test reutilizables
- Nombres descriptivos: `test_<función>_<escenario>`

### JavaScript

Actualmente sin tests unitarios (zero dependencias en producción). Tests E2E y de accesibilidad en roadmap.

---

## Flujo de Trabajo Git

### Convenciones de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<scope>): <descripción corta>

[cuerpo opcional]

[footer opcional]
```

**Tipos**:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `ops`: Operaciones, CI/CD, scripts
- `refactor`: Refactorización sin cambio funcional
- `test`: Agregar o modificar tests
- `chore`: Mantenimiento general

**Ejemplos**:
```
feat(i18n): agregar soporte para francés
fix(passkey): corregir doble-click en autenticación
docs(readme): actualizar instrucciones de instalación
ops(ci): agregar job de linting HTML
```

### Branching

- `main`: rama principal, siempre deployable
- `feature/<nombre>`: nuevas funcionalidades
- `fix/<nombre>`: correcciones de bugs
- `docs/<nombre>`: cambios de documentación
- `ops/<nombre>`: cambios operacionales

### Code Review

Todos los PRs requieren:
- CI verde (linters, tests, validaciones)
- Code review aprobado
- Commits squashed antes de merge (recomendado)

---

## Documentación

### ADRs (Architecture Decision Records)

Para decisiones arquitectónicas significativas, documenta en `docs/adr/`:

```
docs/adr/
├── 001-zero-dependencias.md
├── 002-webauthn-localstorage.md
└── template.md
```

### README y Changelog

- **README.md**: Actualiza features, instalación, o guías según cambios
- **CHANGELOG.md**: Agrega entrada con fecha y tipo de cambio
- **HANDOFF.md**: Actualiza si cambias arquitectura o workflow

### Comentarios en Código

- JavaScript: JSDoc para funciones públicas
- Python: Docstrings PEP 257 con ejemplos
- Evita comentarios obvios
- Explica el "por qué", no el "qué"

---

## Setup Local

### Requisitos

- Python 3.9+
- Node.js 18+
- Git

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/vientonorte/vientonorte.github.io.git
cd vientonorte.github.io

# Python dev dependencies
pip install -r requirements-dev.txt

# Node dev dependencies
npm install

# Pre-commit hooks (opcional pero recomendado)
pip install pre-commit
pre-commit install

# Inicializar baseline de detect-secrets (requerido para pre-commit)
# Actualiza .secrets.baseline con el estado actual del repo
pip install detect-secrets
detect-secrets scan --exclude-files package-lock\.json > .secrets.baseline
```

> **Nota**: `.secrets.baseline` debe mantenerse actualizado. Si `pre-commit` detecta una nueva
> entrada que no es un secreto real, ejecuta `detect-secrets scan --update .secrets.baseline`
> para agregarla como falso positivo conocido.

### Desarrollo

```bash
# Servidor local
npx serve .
# Visita http://localhost:3000

# Linters
npm run lint
ruff check .

# Tests
pytest tests/
```

---

## Preguntas

¿Tienes dudas? Abre un [issue de tipo question](https://github.com/vientonorte/vientonorte.github.io/issues/new) o contacta a [@vientonorte](https://github.com/vientonorte).

---

**Última actualización**: 2026-06-09
