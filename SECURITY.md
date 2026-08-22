# Política de Seguridad — vientonorte.github.io

## Versiones Soportadas

Este proyecto usa deployment continuo desde la rama `main`. La versión "actual" es siempre la última en:

- **Live**: https://vientonorte.github.io
- **Código fuente**: Rama `main` en GitHub

No mantenemos versiones antiguas ni branches de soporte LTS.

## Reporte de Vulnerabilidades

Si descubres una vulnerabilidad de seguridad, por favor **NO** abras un issue público.

### Proceso de Reporte Privado

1. **Email**: Envía un reporte a [rodrigo.gaete.ux@gmail.com](mailto:rodrigo.gaete.ux@gmail.com)
2. **Subject**: `[SECURITY] vientonorte.github.io - [descripción breve]`
3. **Incluye**:
   - Descripción del problema
   - Pasos para reproducir
   - Impacto potencial
   - Proof-of-concept (si aplica)
   - Tu información de contacto (para seguimiento)

### GitHub Security Advisories

Alternativamente, puedes usar [GitHub Security Advisories](https://github.com/vientonorte/vientonorte.github.io/security/advisories/new) para reportes privados.

### Qué Esperar

- **Confirmación inicial**: Dentro de 48 horas
- **Evaluación**: Dentro de 7 días
- **Fix y disclosure**: Coordinaremos timeline contigo

## Scope

### En Scope ✅

Reportes de seguridad relevantes incluyen:

- **Cross-Site Scripting (XSS)** en rendering de datos dinámicos
- **Inyección de código** via `projects.json` u otros datos
- **Bypass de autenticación** WebAuthn para proyectos privados
- **Exposición de información sensible** en código cliente
- **Vulnerabilidades en pipeline SCA** (`validate_flow.py`)
- **Bugs de validación de schemas** que permitan datos maliciosos

### Out of Scope ❌

Los siguientes NO son vulnerabilidades de seguridad:

- **credentialId en localStorage**: Documentado en [ADR-002](docs/adr/002-webauthn-localstorage.md), es diseño intencional (credentialId es público según spec WebAuthn)
- **Falta de CSP headers**: GitHub Pages no permite custom headers (limitación conocida)
- **HTTP en lugar de HTTPS**: GitHub Pages fuerza HTTPS automáticamente
- **Dependencias de dev** (`package.json`, `requirements-dev.txt`): No se usan en producción
- **Rate limiting de WebAuthn**: Manejado por navegador, fuera de nuestro control
- **Social engineering** o phishing externo al sitio

## Postura de Seguridad

### Modelo de Amenazas

**Activos críticos:**
- Integridad del código desplegado (rama `main`)
- Disponibilidad del sitio (uptime)

**NO son activos críticos:**
- credentialId de WebAuthn (es público por diseño)
- Metadatos de proyectos en `projects.json` (información pública)

**Vectores de ataque principales:**
1. XSS via inyección en datos JSON malformados
2. Supply chain attack via dependencias de CI (mitigado con pinning)
3. Compromiso de cuenta GitHub con acceso a `main`

### Mitigaciones Implementadas

#### 1. Sanitización Estricta

Todas las inserciones en DOM usan función `esc()`:

```javascript
function esc(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
```

#### 2. Validación de Input

- `sanitizeHref()`: Solo permite URLs http/https
- JSON Schema validation en CI para todos los datos
- Pipeline SCA valida lógica de flujos de fricción

#### 3. Dependencias Pinadas

- GitHub Actions pinados a versiones exactas con SHA
- Ajv-cli pinado a major version `@5`
- Pre-commit hooks con versiones específicas

#### 4. Zero Dependencias en Producción

- No hay librerías JavaScript externas (zero supply chain risk)
- Vanilla HTML/CSS/JS elimina vulnerabilidades de dependencias

#### 5. Branch Protection

- `main` es la rama de deploy (GitHub Pages)
- Cambios via Pull Request con CI obligatorio

## Reconocimientos

Agradecemos a los investigadores de seguridad que reportan vulnerabilidades responsablemente. Reconocimientos públicos (con permiso) se listarán aquí tras disclosure.

---

**Última actualización**: 2026-06-01  
**Contacto**: [@vientonorte](https://github.com/vientonorte)
