# Checklist ĀRŪḾA · cuenta Google + 3 agendas + deploy

**Estado:** bloqueado en **paso humano** · sitio live en https://vientonorte.io/aruma/  
**Horas:** tramo VN 1.5h (no comer M1 5.5h). Método Ro 18 ago.  
**SoT código:** `aruma/SPRINT_ARUMA.md` · `lib/brand.config.ts` (`bookingUrl: ''`)

---

## Decisión (no reabrir)

| | |
|--|--|
| Cara pública | Cuenta Google **tercera solo-ĀRŪḾA** |
| Operador | `gaete.gaona` vía calendario **compartido** |
| Fuera de booking | IGNIARUS · ANTAKUNZA |
| Fallback hoy | mailto `contacto@vientonorte.io` |

---

## Checklist humano (en orden)

### A · Cuenta

- [ ] Crear Gmail / Workspace **Estudio ĀRŪḾA** (sin nombre Rodrigo/Gaete en público)
- [ ] Foto de perfil = logo ĀRŪḾA
- [ ] 2FA activado
- [ ] **No** usar `gaete.gaona` como anfitrión de citas

### B · Calendar

- [ ] Crear calendario secundario **ĀRŪḾA · Citas**
- [ ] TZ **America/Santiago**
- [ ] Compartir con `gaete.gaona` → permiso **Hacer cambios en eventos**
- [ ] (Opcional) Compartir solo lectura con mail de prueba ajeno

### C · Páginas de reserva (Appointment Schedule)

URL: https://calendar.google.com/calendar/u/0/r/appointments  

Crear **3** agendas en el calendario ĀRŪḾA · Citas:

| # | Título | Duración | Link copiado |
|---|--------|----------|--------------|
| 1 | Consulta inicial | 30 min | `calendar.app.google/____` |
| 2 | Sesión fotográfica íntima | 90 min | `calendar.app.google/____` |
| 3 | Exploración Rigger / Tantra | 120 min | `calendar.app.google/____` |

- [ ] Ubicación pública: `Santiago (detalle al confirmar)`
- [ ] Recordatorio **24 h** activo
- [ ] Buffer entre citas (si aplica)
- [ ] QA enmascarado: reserva desde Gmail **ajeno** → organizador = mail ĀRŪḾA (no Gaete)

### D · Pegar en código (agente o Rö)

Archivo: `aruma/lib/brand.config.ts`

```ts
bookingUrl: 'https://calendar.app.google/XXXX', // hub o consulta
// y/o por sessionTypes[i].bookingUrl
```

- [ ] Links pegados
- [ ] `npm run build`
- [ ] Deploy Pages (workflow aruma `nextjs.yml`)
- [ ] Smoke https://vientonorte.io/aruma → CTA **Continuar en Google Calendar** (no solo mailto)
- [ ] Reserva de prueba → cancelar

### E · Ops

- [ ] Marcar DoD en `SPRINT_ARUMA.md`
- [ ] Nota 1 línea en Session del día
- [ ] (Opcional) ítem canvas ops → done

---

## Cuando termines A–C

Responde en chat: **“ĀRŪḾA links listos”** + pega los 3 URLs.  
El agente hace D (código + deploy) en el **10% VN**.

— 2026-08-06
