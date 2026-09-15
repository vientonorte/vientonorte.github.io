# Canon VN · una casa por hecho

Leer esto antes de editar skills `*-vn` o el agente `vn-agent`. No duplicar tablas de URLs en cada skill.

## Paths

| Rol | Path |
|-----|------|
| Repo FO | `/Users/ro/Library/Mobile Documents/com~apple~CloudDocs/Documents/GitHub/mi-portafolio` |
| Obsidian | `/Users/ro/Library/Mobile Documents/iCloud~md~obsidian/Documents/Ro/Viento Norte/` |
| Live FO | `https://vientonorte.io/` |
| SEM / consultoría | `https://vientonorte.io/#/consultoria` |
| Share crawlers | `https://vientonorte.io/s/` · `/s/consultoria` |
| CMS | `https://vientonorte.io/#/admin` · `#/admin/fotos` |
| APIs + MCP | `https://contact.vientonorte.io` |
| Ops | `https://vientonorte.io/ops/` |
| Local Vite | `http://127.0.0.1:5173/#/` (base `/`, no `/mi-portafolio/`) |
| Contacto | `contacto@vientonorte.io` |

Nunca documentar clones fuera de iCloud salvo que Rö lo pida.

## Producto

- Marca B2B: **Viento Norte** (no rostro). Headline sitio: *Diseño que reduce el ruido.*
- Oferta: Diagnóstico · Prototipo · Proceso · App. PackLabel: Radar · Marco · Ops.
- Gratis = a11y de **un** flujo (WCAG 2.2 AA). Nunca `/#/auditoria` como freemium.
- Paid final URL: **`/s/consultoria`**. Gate $0 hasta GTM + Test path (`docs/CHECKLIST-CANALES-PAID.md`).

## APIs (GET live)

Contrato: `docs/API-KICKOFF.md`

- `GET /api/health` → `{ok, service: vientonorte-api, kv: true, time}`
- `GET /mcp` → discovery · 6 tools · protocol `2024-11-05`
- `POST /mcp` → JSON-RPC. Write tools: `VN_API_KEY` (aún no en secrets).
- BD: KV `ADMIN_KV` + R2. Visor: `#/admin`. No es Postgres.

## Skills hijas (10)

| # | Skill | Para qué |
|---|-------|----------|
| 1 | `docs-vn` | Changelog, arquitectura, canon nav |
| 2 | `seo-vn` | SEO / onboarding local-first |
| 3 | `google-ads-vn` | SEM / message match · final `/s/consultoria` |
| 4 | `ux-writing-vn` | Copy marca |
| 5 | `lead-a11y-vn` | Pipeline Radar gratis (Gmail/Drive/Calendar) |
| 6 | `kpi-vn` | Stamp proceso/valor |
| 7 | `design-sprint-vn` | Marco DS |
| 8 | `cierre-sesion-vn` | Cierre de sesión |
| 9 | `cierre-vn-hoy` | Cierre del día → Session |
| 10 | `m5-vn` | Atajos locales /ops |

## Horas (Método Ro)

SSOT: vault `00-sistema/CALENDAR-SESSION-UNIFICADO.md` · `00-sistema/METODO-RO-AGENT.md`.  
**No 80/10/10 ni 80/20.** Decider 2026-08-18.

L–V: **Post 0.75** · **M1 5.5** · **VN 1.5** · **Algonova 3.5** (4º stream). Un stamp `✓ SESSION` en Personal.

Ledger $: `MICRO 1/07-pagos/dashboard/ledger.json` · live `https://finanzas.vientonorte.io/` (puede ir atrasado vs plantilla).

## Decider

Rö. Ship prod y spend: solo con ok explícito.
