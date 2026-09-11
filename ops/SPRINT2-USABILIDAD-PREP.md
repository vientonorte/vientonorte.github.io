# Prep Sprint 2 · Landing + POC + usabilidad

- **Generado:** 2026-07-28T01:08Z (Ollama + limpieza Grok)
- **Modelos:** minimax-m3:cloud (raw ruidoso) → **versión limpia canónica abajo**
- **Uso:** usabilidad mañana · handoff Grok 08:30
- **Criterio de calidad:** **ganancia clara hasta el cierre**. Fallo grave si el usuario va a GitHub/admin.

---

## A) Protocolo usabilidad landing (mañana)

**Participantes:** 3–5 (B2B / peer).  
**Duración:** ~**7 min total** / usuario.  
**NO es** capacitación de consultores.

### Tabla de tareas

| # | Guion (decir tal cual) | Criterio de éxito | min |
|---|------------------------|-------------------|-----|
| **1** | “Entra a Viento Norte y encuentra **consultoría** y la opción **gratis de accesibilidad**.” | Llega a consultoría + free a11y **sin ayuda** | ~2 |
| **2** | “Mira la **demo del producto** (X\|CMS) y dime **qué ganas** con esto.” | Nombra **ganancia** (módulo / dueño del dato / no solo “bonito”). Ideal: `/#/demo/x-cms` (timer visible, no blank) | ~3 |
| **3** | “Si te interesara, da el **siguiente paso** (agenda o contacto / este módulo).” | Intenta **cierre** (CTA claro) sin buscar GitHub | ~2 |

### URLs fijas

| Paso | URL |
|------|-----|
| Hub | https://vientonorte.io/ |
| Portafolio | https://vientonorte.io/mi-portafolio/ |
| Consultoría | https://vientonorte.io/mi-portafolio/#/consultoria |
| Demo campaña | https://vientonorte.io/mi-portafolio/#/demo/x-cms |
| Contacto | https://vientonorte.io/mi-portafolio/#/contacto |
| POC (opcional) | local `#/poc/product-onboarding` en rama `feat/poc-apple-product-onboarding` |

### Plantilla LOG (1 bloque por usuario)

```markdown
### Usuario __ | Fecha __ | Dispositivo __

| Tarea | OK | Tiempo | Notas / quote |
|-------|----|--------|---------------|
| 1 Consultoría + free a11y | S/N | | |
| 2 Demo + ganancia | S/N | | |
| 3 Cierre CTA | S/N | | |

- ¿Mencionó ganancia antes del cierre? S/N
- ¿Confusión GitHub/admin? S/N
- Demo: producto visible / shell vacío / timer OK?
- Quotes:
```

### 5 preguntas de cierre (~1 min)

1. ¿Qué **ganarías** mañana si contratas / agendás?
2. ¿Qué fue lo **más confuso**?
3. ¿Buscaste código o GitHub en algún momento? ¿Por qué?
4. ¿La demo de 5 min te alcanzó o sobró/faltó?
5. En una frase: ¿qué es Viento Norte?

### 6 hipótesis P0/P1 (a validar, no hechos)

| ID | Sev | Hipótesis |
|----|-----|-----------|
| H1 | P0 | No encuentra free a11y sin scroll largo |
| H2 | P0 | No verbaliza **ganancia** en demo (solo “UI bonita”) |
| H3 | P0 | Sale a GitHub o “repos” en vez de contacto |
| H4 | P1 | Timer/demo gate no se entiende (cree que el sitio se rompió) |
| H5 | P1 | CTA “este módulo” no existe / no se ve en consultoría (solo en POC) |
| H6 | P1 | Message match ads→landing débil si final URL no es `/#/demo/x-cms` |

---

## B) Checklist smoke pre-sprint (5 min)

**Orden:**

1. https://vientonorte.io/ — path nav Portafolio / Consultoría  
2. `/#/consultoria` — hero + free a11y  
3. `/#/demo/x-cms` — gate → Iniciar → timer → (opcional) fin overlay  
4. `/#/contacto` — form / assistant  
5. (Opcional local) POC product-onboarding  

| Check | PASS | FAIL |
|-------|------|------|
| Hub CTAs | Links a `.io/mi-portafolio` | 404 / github.io roto |
| Demo gate | Timer, reglas, iframe con UI | Blank Figma / sin reloj |
| Fin demo | Overlay + CTA agenda o módulo | Se queda en Sites sin cierre |
| Contacto | Carga form | Error / sin mensaje |
| No embudo | No OAuth GitHub en CTAs de venta | Botón GitHub en hero consultoría |

**Demo Sites crudos random (ej. nix-lunch-…):** no usar en campaña.

---

## C) Guion copy “ganancia → cierre” (consultoría lite)

### 4 reglas (1 frase)

1. **Sin nube obligatoria** — el módulo corre en tu perímetro.  
2. **Sin terceros de datos** — no entrenamos ni revendemos tu operación.  
3. **La empresa es dueña del producto** — no arriendo eterno de UI.  
4. **Dueño del dato** — tablas, backup y export contigo.

### 3 módulos + CTA

| Módulo | Job (ganancia) | CTA |
|--------|----------------|-----|
| **Dashboard** | Ver operación y KPIs sin 10 herramientas | **Este módulo** → contacto prearmado |
| **Riesgo** | Priorizar alertas antes de que duela | **Este módulo** |
| **Pedidos / operación** | Flujo real de negocio con roles claros | **Este módulo** |

Secondary: “Probar demo 5 min” → `/#/demo/x-cms`  
**No** mergear POC Apple full para esto.

---

## D) Brief Ads / LinkedIn (borrador)

### Final URL (message match)

```text
https://vientonorte.io/mi-portafolio/#/demo/x-cms?utm_source=google&utm_medium=cpc&utm_campaign=xcms_modulos&utm_content=demo_5m
```

LinkedIn: `utm_source=linkedin&utm_medium=paid_social&utm_campaign=xcms_modulos&utm_content=demo_5m`

### Headlines (ganancia)

1. Módulos a medida. Vos dueño del dato.  
2. Demo de producto en 5 minutos — sin SaaS eterno.  
3. No vendemos nube. Construimos el módulo que necesitás.

### Descriptions

1. Probá el dashboard demo con reloj de 5 min. Después elegí módulo o agendá 30 min.  
2. Misma URL de anuncio y landing. Conversión en vientonorte.io, no en Figma suelto.

### Message match gate

- [ ] Anuncio habla de demo/módulo/dueño del dato  
- [ ] Landing = `/#/demo/x-cms` (no Sites crudo)  
- [ ] CTA post-timer = agenda o “este módulo”

---

## E) Handoff Grok 08:30

### MANUAL (vos)

| # | Acción | Doc |
|---|--------|-----|
| 1 | Passkeys GitHub ≥2 + 2FA + recovery | `ops/PASSKEYS-GITHUB-VIENTONORTE.md` |
| 2 | GSC property `vientonorte.io` + sitemap | `docs/SEO-AND-SEARCH-CONSOLE.md` |
| 3 | Crear **un** GTM-XXXX | pegar ID al agente |
| 4 | (Opc) 6 PNG X\|CMS | craft POC después |

### CÓDIGO (post-usabilidad, si H1–H3 no bloquean todo)

1. Doc `URL-FUNNEL-AND-AUTH` + **nav limpia** embudo  
2. Lite **4 reglas + 3 módulos + CTA** en consultoría  
3. Wire GTM si hay `GTM-XXXX`  
4. Login `/#/acceso` solo si hace falta ops (no embudo)

### No mañana 08:30

- Merge POC Apple full  
- R2 Worker full  
- Parsear todos los `.fig`  

---

## Al despertar

1. Abrir esta nota en Obsidian  
2. Sprint A 08:30: passkeys → GSC → GTM-XXXX  
3. Sprint B: 3 usuarios usabilidad con tabla A  
4. LOG + 3 hallazgos → issues  
5. Luego PRs embudo  

**Criterio de oro:** si no hay **ganancia** verbalizada antes del cierre → el flujo es pobre; no es un bug de URL.
