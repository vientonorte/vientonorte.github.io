# ADR-001: Arquitectura Zero Dependencias

## Status

Aceptado

## Contexto

El dashboard vientonorte.github.io es un sitio estático desplegado en GitHub Pages que muestra proyectos personales. Necesitamos decidir si usar frameworks/librerías modernas (React, Vue, etc.) o mantener vanilla HTML/CSS/JS.

**Restricciones:**
- Deploy en GitHub Pages (sin build step en servidor)
- Mantenibilidad a largo plazo por un solo desarrollador
- Tiempo de carga crítico para experiencia de usuario
- Accesibilidad WCAG 2.1 AA requerida

**Contexto técnico:**
- Funcionalidad simple: mostrar proyectos, switch de idioma, WebAuthn
- No requiere estado complejo ni routing
- Audiencia: reclutadores y colaboradores técnicos

## Decisión

**Adoptar arquitectura zero dependencias**: vanilla HTML/CSS/JavaScript ES6+ sin frameworks, bundlers, o librerías externas.

## Consecuencias

### Positivas

- **Performance extremo**: Sin overhead de frameworks, bundle size ~36KB total (HTML)
- **Mantenibilidad simple**: No hay breaking changes de dependencias
- **Deploy instantáneo**: Push a `main` = live en segundos, sin build
- **Debugging directo**: View Source muestra exactamente el código ejecutado
- **Longevidad**: El código funcionará en navegadores por décadas sin actualización
- **Zero vulnerabilidades de dependencias**: Sin supply chain attacks

### Negativas

- **Repetición de código**: Sin componentes reutilizables nativos
- **Testing limitado**: Sin frameworks de testing tipo Jest/Vitest
- **Developer Experience**: Sin HMR, TypeScript compile-time checks
- **Escalabilidad**: No escala bien para aplicaciones complejas

### Neutrales

- Requiere conocimiento de Web APIs nativas (no abstracción de framework)
- Menor cantidad de código total, pero más verboso en algunos casos

## Alternativas Consideradas

### Alternativa 1: React + Vite

**Pros:**
- Componentes reutilizables
- Ecosistema maduro
- TypeScript out-of-the-box

**Contras:**
- Bundle size ~45KB+ solo para React
- Requiere build step en deploy
- Dependencias a mantener (actualizaciones, breaking changes)
- Complejidad innecesaria para caso de uso simple

**Por qué no se eligió:**
Overhead de complejidad y tamaño no justificado para un dashboard estático de 9 proyectos.

### Alternativa 2: Astro + partial hydration

**Pros:**
- Zero JS por defecto
- Islands architecture para interactividad selectiva
- Buena DX

**Contras:**
- Build step requerido
- Menos maduro que alternativas
- Overkill para nuestro caso

**Por qué no se eligió:**
Similar a React pero menos establecido, y aún requiere tooling.

### Alternativa 3: Web Components nativos

**Pros:**
- Estándar web, sin dependencias
- Componentes reutilizables

**Contras:**
- Sintaxis verbosa sin librerías helper
- Soporte aún incompleto en algunos navegadores legacy
- Complejidad mayor que vanilla para caso simple

**Por qué no se eligió:**
Introduce complejidad sin beneficio claro sobre vanilla JS bien estructurado.

## Referencias

- [The Cost of JavaScript in 2024](https://v8.dev/blog/cost-of-javascript-2024)
- [GitHub Pages docs](https://docs.github.com/pages)
- [You Might Not Need a Framework](https://youmightnotneedaframework.com/)

## Notas

**Criterios de re-evaluación:**
- Si el dashboard crece a 30+ proyectos con filtros complejos
- Si se agregan features interactivas complejas (editor in-line, colaboración real-time)
- Si el equipo crece y múltiples desarrolladores requieren DX moderno

**Implementación:**
- Código organizado en secciones claramente delimitadas con comentarios `/* ── */`
- Funciones puras donde posible para facilitar testing manual
- Event delegation para performance

---

**Fecha**: 2026-06-01  
**Autor**: @vientonorte  
**Revisores**: Auditado en sesión de mejora de prácticas
