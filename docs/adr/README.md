# Architecture Decision Records (ADRs)

Este directorio contiene Architecture Decision Records (ADRs) que documentan decisiones arquitectónicas significativas en el proyecto vientonorte.github.io.

## ¿Qué es un ADR?

Un ADR es un documento que captura una decisión arquitectónica importante junto con su contexto, alternativas consideradas, y consecuencias.

## ADRs en este Proyecto

| ID | Título | Estado | Fecha |
|----|--------|--------|-------|
| [001](001-zero-dependencias.md) | Arquitectura Zero Dependencias | Aceptado | 2026-06-01 |
| [002](002-webauthn-localstorage.md) | WebAuthn Passkey en localStorage | Aceptado | 2026-06-01 |

## Cuándo Crear un ADR

Crea un ADR para decisiones que:
- Afectan la estructura o arquitectura del proyecto
- Tienen impacto a largo plazo
- Involucran trade-offs significativos
- Requieren contexto para futuros mantenedores

## Cómo Crear un ADR

1. Copia `template.md` a un nuevo archivo: `XXX-titulo-descriptivo.md`
2. Usa numeración secuencial (001, 002, etc.)
3. Completa todas las secciones del template
4. Envía PR para revisión
5. Actualiza esta tabla de contenidos

## Formato

Seguimos el formato popularizado por Michael Nygard con adaptaciones:

- **Status**: Propuesto, Aceptado, Deprecado, Supersedido
- **Contexto**: Problema y restricciones
- **Decisión**: Qué se decidió
- **Consecuencias**: Positivas, negativas, neutrales
- **Alternativas**: Qué más se consideró y por qué no

## Referencias

- [ADR GitHub organization](https://adr.github.io/)
- [Documenting Architecture Decisions - Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
