# Acciones humanas · links de un clic · 2026-08-26

**Dueño:** Rö · **Actualizado:** 2026-08-26 16:58 (OG circular + RSA en Smart, no publicado)  
**Board HUs hoy:** [HU-2026-08-06-MVP.md](./HU-2026-08-06-MVP.md)  
**Tareas humanas detalle:** [HUMAN-TASKS.md](./HUMAN-TASKS.md)  
**Ops canvas:** https://vientonorte.io/ops/

> **27 ago AHORA (max 3):** (1) **salir de Smart** → Búsqueda RSA **150.000 CLP** (copy ya pegado) (2) LinkedIn Post Inspector **recrawl OG** (sin recuadro blanco) + CM **PAUSED** (3) GSC residual: Rich Results + Pages. `/` ya IN_GOOGLE. LI **no** gasta el techo. AdGuard Mini off en Ads.

**Reloj VN:** GSC 20' → LinkedIn 35' → Ads 45–60'. Runbook: vault `Resources/SEM/2026-08-26 RUNBOOK 27 ago LinkedIn + GSC.md`.

---

## E · Google Ads 27 ago (P0 · el spend)

| # | Acción humana | Link / path | DoD |
|---|---------------|-------------|-----|
| E1 | Importar conversiones GA4 | Ads → Objetivos · `G-G7JXJKGCDV` | `generate_lead` primaria · `book_call` secundaria · **no** `page_view` |
| E2 | Pegar RSA (15 H + 4 D) | vault `Ro/Viento Norte/Resources/SEM/2026-08-26 RSA piloto a11y.md` | titulares Diagnóstico/a11y · no Radar · no Auditoría |
| E3 | Sitelinks + keywords phrase | misma nota RSA | 4 sitelinks · negativos mentoría/portfolio/curso/empleo |
| E4 | Techo + geo | Ads campaña `VN · piloto a11y_gratis_pymes` | **150.000 CLP** · ~5.000/día · Chile · Search only |
| E5 | Final URL + UTM | https://vientonorte.io/s/consultoria/?utm_source=google&utm_medium=cpc&utm_campaign=a11y_gratis_pymes | no hash-only |
| E6 | Logo Ads | [DS Make v3](https://www.figma.com/make/OR8iCIpokgaPKjerCyZAKy/Rodrigo-Gaete---Desing-System) · negativo `#0A0A0A` | isologo **circular** · sin recuadro blanco · sin rostro |
| E7 | Publicar piloto | Ads UI | campaña ENABLED |
| E8 | Día 1 watch | Ads + GA4 RT | impresiones/clics · evento ≠ clic de página · si el bloque se acaba: 28 ago |

---

## L · LinkedIn SEM 27 ago (P0 · **config**, $0)

| # | Acción humana | Link / path | DoD |
|---|---------------|-------------|-----|
| L1 | Página empresa Viento Norte | https://www.linkedin.com/company/setup/new | URL `linkedin.com/company/…` · vault hoy solo perfil personal |
| L2 | Post Inspector recrawl `/s/consultoria` | https://www.linkedin.com/post-inspector/ | card 1200×630 **sin recuadro blanco** · hub `232720d` |
| L3 | Campaign group + campaign Website visits · Classic · Chile | https://www.linkedin.com/campaignmanager/ | **PAUSED** · Audience Network OFF |
| L4 | Ad single image + copy + UTM | `campaigns/2026-08-26-piloto-a11y/assets/ad-1200x628.png` · vault `SEM/2026-08-26 LinkedIn config PAUSED.md` | destination `/s/consultoria/?utm_source=linkedin&utm_medium=cpc&utm_campaign=a11y_gratis_pymes` · **PAUSED** |
| L5 | Insight Tag Partner ID → GTM workspace | GTM `GTM-PM5LBQRP` · tag LinkedIn Insight 2.0 | **unpublished** · no v5 live mañana |
| L6 | Verificar spend | Campaign Manager | **0** |

No ACTIVE “para probar un clic”. Mín. UI ~USD 10/día **no se sirve**.

---

## S · Google SEO 27 ago (P0 · GSC, $0)

| # | Acción humana | Link / path | DoD |
|---|---------------|-------------|-----|
| S1 | Abrir propiedad `https://vientonorte.io/` | https://search.google.com/search-console | ya verificada 03 ago · no re-verify |
| S2 | Reenviar sitemap | https://vientonorte.io/sitemap.xml | Success · 5 URLs (incluye `/s/proceso/`, no hash) |
| S3 | Inspección + live `/` | GSC URL inspection | indexada o solicitar |
| S4 | Inspección `/s/` | same | title Tecnología para empresas |
| S5 | Inspección + **solicitar indexación** | https://vientonorte.io/s/consultoria/ | HTML funnel · GTM en view-source |
| S5b | Inspección + **solicitar indexación** | https://vientonorte.io/s/proceso/ | 200 live post-#214 · H1 reduce el ruido · OG 1200 |
| S6 | Pages / cobertura | GSC → Pages | anotar n · NO DATO hasta UI |
| S7 | Rich Results | https://search.google.com/test/rich-results | ProfessionalService `/s/consultoria/` · WebPage `/s/proceso/` |
| S8 | PosicionApp si el mes Austral vive | https://panel.posicion.app/activacion-curso | vence ~28 ago · captura o NO DATO |

**No** inspeccionar `/#/consultoria` ni `/#/proceso` (hash). `/s/proceso/` sí.

---

---

## A · Gap VN (10%) — Design Sprint Test + ops

| # | Acción humana | Link / path | DoD |
|---|---------------|-------------|-----|
| A1 | Smoke FO **H2** sin Inicio›Inicio | https://vientonorte.io/ | pass/fail en HU-VN-01 |
| A2 | Smoke **H4** Empezar → onboarding in-page | https://vientonorte.io/ | no salta a SEM |
| A3 | Smoke **H5** free a11y Calendar &lt;30s | https://vientonorte.io/ (CTA free) | agenda abre |
| A4 | Smoke **S2** SEM Empezar | https://vientonorte.io/#/consultoria | CTA coherente |
| A5 | SEO **HU-01** title + JSON-LD | view-source:https://vientonorte.io/ | sin “Rodrigo Gaete · UX Lead” en title orgánico |
| A6 | SEO **HU-02** canonical SEM | https://vientonorte.io/#/consultoria | canonical = `#/consultoria` |
| A7 | Favicon / tab branding | https://vientonorte.io/ | icono VN visible Safari/Chrome |
| A8 | **Gate SEM $0** (Decider) | — | no Ads spend hasta Test pass |
| A9 | Unstick **Pages ops** (data finanzas) | https://github.com/vientonorte/vientonorte.github.io/settings/pages · https://github.com/vientonorte/vientonorte.github.io/actions | UI = finanzas.vientonorte.io · 9·$13.86 |
| A10 | Verificar ledger SoT | https://raw.githubusercontent.com/vientonorte/vientonorte.github.io/main/ops/finanzas/ledger.json | MTD **9 · $13.86** |
| A11 | UI finanzas (tras Pages o jsDelivr) | https://finanzas.vientonorte.io/ · ↻ | no $4.62 |
| A12 | Ledger fresco bypass CDN | https://finanzas.vientonorte.io/ledger.json | 80/10/10 |
| A13 | ĀRŪḾA reserva UI | https://vientonorte.io/aruma/#reserva | padding OK · mailto o Calendar |
| A14 | ĀRŪḾA brand pegar links | https://vientonorte.io/aruma/brand/ | bookingUrl válido |
| A15 | Google Appointment Schedules | https://calendar.google.com/calendar/u/0/r/appointments | 3 agendas 30/90/120 |
| A16 | Checklist ĀRŪḾA completo | https://raw.githubusercontent.com/vientonorte/vientonorte.github.io/main/ops/ARUMA-CHECKLIST.md | DoD cuenta marca |

---

## B · Gap M1 (80%) — cash / Realm

| # | Acción | Link | DoD |
|---|--------|------|-----|
| B1 | Realm Review Ready (9) | https://realm.micro1.ai/ | ver cola 9568…8714 |
| B2 | Captura ola (max 3 claims) | https://realm.micro1.ai/ | F7 10' → 6 files → Submit |
| B3 | LOG + ledger sync | local `m1-ledger-sync` | MTD sube con IDs |
| B4 | Finanzas tras submit | https://finanzas.vientonorte.io/ | ↻ ledger |
| B5 | Canon timebox HOST | Calendar **MICRO 1** | 6.4 h L–J plan |

**IDs Review Ready:** `9568 · 9567 · 9566 · 8719 · 8718 · 8717 · 8716 · 8715 · 8714`

---

## C · Gap Post (10%)

| # | Acción | Link | DoD |
|---|--------|------|-----|
| C1 | Bloque Post 08:45–09:30 | Calendar Personal | 1 envío o follow-up |
| C2 | LinkedIn / portales | https://www.linkedin.com/in/rodrigo-gaete-ux/ | tracker 1 línea Session |
| C3 | Portfolio para postulación | https://vientonorte.io/ | link en mensaje |

---

## D · Multi-device / sistema

| # | Acción | Link / path | DoD |
|---|--------|-------------|-----|
| D1 | Firmar **I15** | Ro `00-sistema/PIPELINE-QA.md` §6 · https://vientonorte.io/ops/ | one-liner pass |
| D2 | Firmar **W11** | mismo artifact | one-liner pass |
| D3 | Firmar **GWin** | mismo artifact | one-liner pass |
| D4 | Firmar **I11** | mismo artifact · calendars ON | one-liner pass |
| D5 | Sync board | https://vientonorte.io/ops/SYNC-BOARD.md | draft limpio |
| D6 | table-ro Admin Trello | https://vientonorte.io/table-ro/ | Key+Token (P1) |
| D7 | GSC field (P1) | https://search.google.com/search-console | cobertura/CWV |
| D8 | Sitemap live | https://vientonorte.io/sitemap.xml | lastmod reciente |

**Plantilla firma (no inventar):**
```text
- I15 · 2026-08-06 · pass · Ro visible · PIPELINE-QA leído
- W11 · 2026-08-06 · pass · espejo = Ro · MICRO1 OK
- GWin · 2026-08-06 · pass · online · nick OK
- I11 · 2026-08-06 · pass · Ro + Personal/MICRO1/FINANZAS ON
```

---

## E · Design Sprint (ciclo activo)

| # | Acción | Link |
|---|--------|------|
| E1 | DS activo note | Obsidian `Sprints/DS-2026-08-03 path-oferta-analytics.md` |
| E2 | Marco DS VN | Obsidian `Resources/Design Sprint VN - marco de trabajo.md` |
| E3 | Skill agente | `/design-sprint-vn` |
| E4 | Día = **Test** | smoke A1–A7 + Decider SEM gate A8 |
| E5 | Proceso macros | https://vientonorte.io/#/proceso |

---

## F · Repos / Actions (si algo no deploya)

| Repo | Actions | Prod |
|------|---------|------|
| ops / Pages | https://github.com/vientonorte/vientonorte.github.io/actions | https://vientonorte.io/ops/ |
| FO | https://github.com/vientonorte/mi-portafolio/actions | https://vientonorte.io/ |
| aruma | https://github.com/vientonorte/aruma/actions | https://vientonorte.io/aruma/ |
| Pages settings | https://github.com/vientonorte/vientonorte.github.io/settings/pages | re-save source `main` |

---

## Orden sugerido hoy (80/10/10)

```
1) C1 Post 45'          (10%)
2) A1–A7 Test path smoke (10% VN · cierra DS Test)
3) A9 Pages unstick      (desbloquea data $ en prod)
4) B2 M1 olas resto día  (80%)
5) D1–D4 firmas si hay device
6) A13–A16 ĀRŪḾA solo si sobra VN
```

— ops HUMAN-ACTIONS · 2026-08-06


## SSOT $ 2026-08-06 (align)

- **Canonical:** https://finanzas.vientonorte.io/
- **MTD:** 9 Review Ready · $13.86 (Updated 04→2 · 05→6 · 06→1)
- **Calendar:** 80/10/10 · M1 6.4 L–J / 4.0 Vie · ops t/h **4** · techo 5.6
- **No usar:** jsDelivr @commit · apex GH $4.62

## E · Deploy $ pipeline (P0 esta semana) · retro 2026-08-06

**Board:** [DEPLOY-ROADMAP.md](./DEPLOY-ROADMAP.md) · **Live:** https://finanzas.vientonorte.io/

| # | Acción | DoD |
|---|--------|-----|
| E1 | Repo permanente Worker + `deploy-finanzas` 1 cmd | path en git, no /tmp |
| E2 | Decidir: orange-cloud apex **o** deprec forever | Calendar/ops sin apex stale |
| E3 | Pipeline Realm→ledger→wrangler | 1 script |
| E4 | Guardrail UI MTD ≠ realm_n | banner rojo |
| E5 | Smoke post-deploy | curl assert MTD/split/header |
| E6 | Mail cierre | siempre `## Retro deploy` |

P1: monitor 6h · Calendar plan@5.6 vs ops@4 · CI push ledger · same-origin only.  
P2: Sessions superseded · no orphan gh-pages · ops/README canónico.

