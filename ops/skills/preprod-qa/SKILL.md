---
name: preprod-qa
description: >
  Orquesta gate técnico FO + revisión multi-agente antes de prod (GO/NO-GO).
  Use when: before merge to main / ship FO, /preprod-qa. Prefer local M5.
---

# /preprod-qa

**Fuente:** workflow `~/.grok/workflows/preprod-qa.rhai`  
Script técnico: `mi-portafolio/scripts/preprod-gate.sh`

```text
/preprod-qa
```

Human Test path (H2, favicon, HU-01 title, HU-02 canonical, SEM $0) **no** lo cierra el agente.

## Horas

Método Ro (canon). Este gate es el tramo **VN 1.5h**. No gastar Ads.

Verdict: **GO / NO-GO** con evidencia de comando. Sin script → `NO DATO`.
