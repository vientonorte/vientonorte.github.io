# Pipeline QA pre-prod · FO + agentes

**Canon:** ningún ship a `vientonorte.io` sin **gate técnico verde** + **humano Test path** (cuando toca embudo/SEM).  
**Actualizado:** 2026-08-08

---

## Diagrama

```
  dev local
     │
     ▼
  npm run preprod          ← L1 typecheck/test/nav + build + artifact smoke
     │ optional
     ├─ preprod:dev        ← + cierre-smoke SEO/Ads (dev :5173)
     └─ preprod:routes     ← + Playwright qa-routes
     │
     ▼
  PR → CI (tests · TS · build · routes · a11y)
     │
     │  workflow_run conclusion==success
     ▼
  Deploy workflow          ← re-typecheck/test + build + artifact · then Pages/hub
     │
     ▼
  npm run qa:production    ← curl/prod smoke domain root
     │
     ▼
  HUMANO                   ← AHORA-CLOSE-CHECKLIST (H2/H4/H5/S2 · SEM $0)
     │
     ▼
  GO prod / Monitor
```

**Regla de oro:** el agente **nunca** marca done ítems `HUMANO` / `qa_manual`.

---

## Comandos (mi-portafolio)

| Comando | Qué hace |
|---------|----------|
| `npm run preprod` | Gate técnico completo local |
| `npm run preprod:quick` | typecheck + unit + nav (sin build) |
| `npm run preprod:dev` | + SEO/Ads smoke (necesita `npm run dev`) |
| `npm run preprod:routes` | + Playwright rutas |
| `npm run qa:production` | Smoke HTTP prod (`vientonorte.io`) |
| `npm run smoke:cierre` | Solo SEO+Ads matrix local |
| `vn-qa` | Corre preprod-gate + abre checklist humano |

Script: `scripts/preprod-gate.sh`

---

## Orquestación de agentes

| Capa | Herramienta | Rol |
|------|-------------|-----|
| **Workflow** | `/preprod-qa` · `~/.grok/workflows/preprod-qa.rhai` | Gate execute + 3 reviews paralelo + veredicto |
| **Smoke SEO** | `/cierre-smoke` · `cierre-smoke.rhai` | Matrix onboarding + ads local |
| **Skills** | `seo-vn`, `google-ads-vn`, `check-work` | Especialistas on-demand |
| **Org** | `org-hygiene.rhai` | PRs rojos / ramas stale (no ship FO) |

### Cómo invocar preprod-qa

```text
/preprod-qa
# o con args:
# mode: quick | full | with-dev | with-routes
# repo: /Users/ro/code/mi-portafolio
# base: http://127.0.0.1:5173
```

Fases del workflow:

1. **Gate** — `bash scripts/preprod-gate.sh` (execute)  
2. **Review** — paralelo read-only: routes · SEO · a11y residual  
3. **Verdict** — `VERDICT: GO|NO-GO|CONDITIONAL` + recordatorio checklist humano  

---

## CI / Deploy (GitHub)

| Workflow | Trigger | Notas |
|----------|---------|--------|
| **CI** | PR + push `main` | build-smoke, test, TS, routes, a11y |
| **Deploy** | `workflow_run` de CI **success** en `main`, o `workflow_dispatch` | **No** corre en push directo si CI falló |
| Deploy steps | typecheck · test · nav · build · artifact smoke · publish hub + Pages | Doble red de seguridad |

Si CI está rojo → Deploy **no** publica.

---

## Capas de QA (quién firma)

| Capa | Quién | Bloquea ship |
|------|-------|--------------|
| L1 unit/TS/build | CI + `preprod` | Sí |
| L2 artifact / routes / a11y | CI | Sí |
| L3 SEO/Ads local | `preprod:dev` / agente | Sí si embudo/SEM |
| L4 prod curl | `qa:production` post-deploy | Sí (regresión) |
| L5 people Test path | **Rö** | Sí (H2/H4/H5/S2) |
| L6 multi-device firmas | Rö | No bloquea FO code (ops) |

---

## Checklist rápido ship FO

- [ ] `npm run preprod` PASS  
- [ ] PR CI all green  
- [ ] (si embudo) humano AHORA-CLOSE Test path  
- [ ] merge main → esperar Deploy post-CI  
- [ ] `npm run qa:production` PASS  
- [ ] canvas AHORA: humano cierra ítems QA  

---

## Anti-patrones

| Mal | Bien |
|-----|------|
| Push main y rezar | PR + CI → Deploy gated |
| Agente marca smoke humano done | Solo Rö |
| `qa:production` con base `/mi-portafolio` | Domain root `vientonorte.io` |
| Deploy en paralelo a CI | `workflow_run` after success |
| Solo Lighthouse | preprod + routes + humano |

---

## Links

- [AHORA-CLOSE-CHECKLIST.md](./AHORA-CLOSE-CHECKLIST.md)  
- [HUMAN-ACTIONS.md](./HUMAN-ACTIONS.md)  
- Manual QA vault: `Developer/viento-norte/docs/manual-qa/00-PROTOCOL.md`  
- Repo FO: https://github.com/vientonorte/mi-portafolio  
