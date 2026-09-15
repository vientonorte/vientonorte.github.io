---
name: org-hygiene
description: >
  Audit vientonorte org: open PRs, branch noise, protect main, Dependabot red.
  Use when: weekly org hygiene, after mass Dependabot noise, /org-hygiene.
---

# /org-hygiene

**Fuente:** workflow `~/.grok/workflows/org-hygiene.rhai` (no reimplementar).

```text
/org-hygiene
```

o `workflow` tool con `name: "org-hygiene"`.

## Reglas

- Solo lectura salvo que Rö pida merge/close/delete.
- Gate Dependabot: CI verde + minor/patch = merge; **major = HOLD**.
- No inventar CI. Si no hay checks → HOLD.
- `main` protegido → no force-push.

Output: summary · actions (repo + action) · blockers.
