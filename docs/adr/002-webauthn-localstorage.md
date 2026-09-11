# ADR-002: WebAuthn Passkey en localStorage

## Status

Aceptado

## Contexto

El dashboard incluye proyectos privados que requieren autenticación. Necesitamos decidir cómo almacenar el `credentialId` de WebAuthn para persistencia cross-session sin depender de backend.

**Restricciones:**
- GitHub Pages es estático (sin backend/database)
- WebAuthn requiere credentialId para autenticaciones subsecuentes
- La sesión debe persistir entre reloads del navegador
- Principio de zero dependencias (no usar bibliotecas de auth)

**Riesgos de seguridad:**
- localStorage es vulnerable a XSS (Cross-Site Scripting)
- credentialId NO es un secreto (es público en la especificación WebAuthn)
- La verificación de autenticación ocurre en servidor (fuera de scope de este proyecto)

## Decisión

**Almacenar credentialId en localStorage** con sanitización estricta de todas las salidas para prevenir XSS.

## Consecuencias

### Positivas

- **Persistencia simple**: Funciona sin backend
- **UX fluida**: Usuario no re-autentica en cada visita
- **Estándar Web**: localStorage es API nativa, estable, cross-browser
- **Performance**: Lectura síncrona, sin network round-trip

### Negativas

- **Vulnerable a XSS**: Si un atacante inyecta script, puede leer credentialId
- **Sin expiración automática**: credentialId persiste hasta que usuario lo borre
- **Accesible desde DevTools**: Cualquiera con acceso físico puede leer el valor

### Neutrales

- credentialId NO es un secreto — es equivalente a username público
- La seguridad real está en la clave privada del passkey (residente en dispositivo)

## Mitigaciones de Seguridad

### 1. Sanitización Estricta

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

Aplicado en:
- Renderizado de proyectos desde JSON
- Etiquetas dinámicas
- Mensajes de error

### 2. Content Security Policy Deseada (GitHub Pages limitation)

**Ideal CSP (no soportado por GitHub Pages):**
```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self'; 
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
```

**Workaround actual:**
- Todo JS inline en HTML (evita `eval`, inline event handlers)
- Zero dependencias externas = cero vectores de ataque externos

### 3. Input Validation

- `sanitizeHref()`: Valida que URLs sean http/https antes de usar
- Todos los datos de `projects.json` son sanitizados antes de rendering

### 4. Documentación de Riesgo

Este ADR documenta explícitamente el riesgo de XSS para transparencia con colaboradores y revisores.

## Alternativas Consideradas

### Alternativa 1: sessionStorage

**Pros:**
- Se limpia al cerrar tab (menor exposición temporal)

**Contras:**
- Usuario debe re-autenticar en cada visita
- UX degradada sin beneficio real (credentialId no es secreto)

**Por qué no se eligió:**
Trade-off UX vs. seguridad no vale la pena cuando credentialId es público por diseño de WebAuthn.

### Alternativa 2: Cookie httpOnly

**Pros:**
- No accesible desde JavaScript (inmune a XSS)

**Contras:**
- Requiere backend para set cookie
- GitHub Pages es estático
- Overkill para valor no-secreto

**Por qué no se eligió:**
No factible en entorno GitHub Pages.

### Alternativa 3: IndexedDB

**Pros:**
- API más moderna que localStorage
- Mayor capacidad de storage

**Contras:**
- API asíncrona (complejidad innecesaria)
- Igual de vulnerable a XSS que localStorage
- Sin beneficio real para ~30 bytes de credentialId

**Por qué no se eligió:**
Complejidad sin beneficio de seguridad.

### Alternativa 4: No persistir, re-autenticar siempre

**Pros:**
- Zero riesgo de exposición del credentialId

**Contras:**
- UX terrible (passkey prompt en cada visita)
- No cumple expectativa de usuarios con passkeys

**Por qué no se eligió:**
Degrada UX dramáticamente sin mejorar seguridad real (credentialId es público).

## Referencias

- [WebAuthn Spec - credentialId is public](https://www.w3.org/TR/webauthn-2/#credential-id)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [GitHub Pages Custom Headers limitation](https://github.community/t/support-for-custom-http-headers/10368)

## Notas

**Postura de seguridad:**
El credentialId es **moralmente equivalente a un username público**. El secreto real es la clave privada del passkey, que:
- Nunca sale del dispositivo del usuario
- Requiere biometría/PIN para usar
- No puede ser exfiltrada via XSS

**XSS es el verdadero riesgo**, no el storage mechanism. Las mitigaciones se enfocan en prevenir XSS en primer lugar.

**Criterios de re-evaluación:**
- Si GitHub Pages habilita custom headers (CSP)
- Si el proyecto requiere backend (backend podría manejar sesión server-side)
- Si emergen nuevas APIs de storage con protección anti-XSS nativa

---

**Fecha**: 2026-06-01  
**Autor**: @vientonorte  
**Revisores**: Auditado en sesión de mejora de prácticas
