# Deploy $ · roadmap (Scrum · anti-confusion)

**SoT unico:** https://finanzas.vientonorte.io/
**Staging:** https://vientonorte.github.io/ops/finanzas/
**DEV local:** no cuenta como deploy
**Board:** [FINANZAS-SCRUM.md](./FINANZAS-SCRUM.md)

## P0

| # | Item | Status |
|---|------|--------|
| 1 | Worker v21-git-proxy (live = git main) | code ready · wrangler 1x humano |
| 2 | UI faltan meta dia/sem/mes | done |
| 3 | Env banner + footer single-SoT | done |
| 4 | Smoke script | done |
| 5 | Docs anti-triplicado | done |

## DoD live

curl -s https://finanzas.vientonorte.io/__ssot
# worker-v21-git-proxy + mtd == git raw

## Humano

cd workers/vientonorte-finanzas
npx wrangler login
deploy-finanzas.cmd
