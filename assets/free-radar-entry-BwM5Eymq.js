import{C as e,E as t,F as n,w as r}from"./index-CQ3uBm3e.js";import{t as i}from"./vn-booking-B5sJQM2Q.js";import{n as a}from"./navigate-to-contact-Rl_vhPVY.js";var o={es:`Hola Viento Norte — quiero la revisión gratis de accesibilidad de un flujo.

Qué revisar: [link o describe el flujo]
Empresa o producto: [breve]
Horario preferido (si no agendaste en Calendar): [día / franja CLT]

Si sirve, hablamos del Diagnóstico completo (5–7 días).

Gracias.`,en:`Hi Viento Norte — I want a free accessibility review of one flow.

What to review: [link or describe the flow]
Company or product: [brief]
Preferred time (if you did not book on Calendar): [day / slot, America/Santiago]

If it helps, we can talk about the full Diagnostic (5–7 days).

Thanks.`};function s(t,n){r(`generate_lead`,{category:`conversion`,lead_type:`free_a11y`,package_id:`radar`,freemium:!0,channel:n,origin:t}),r(`free_radar_entry_open`,{origin:t,package_id:`radar`,freemium:!0,channel:n}),e.clickHeroFreeAudit()}function c(e,t,r=`free-radar`,c={}){let l=c.mode??`auto`,u=()=>{s(r,`contact_form`),a(e,{origin:r,source:`cta`,intent:`consulting`,packageId:`radar`,message:o[t],consultingQ1:`radar-free`})};return l===`message`?(u(),`contact_form`):l===`schedule`||l===`auto`?(s(r,`google_calendar`),i({origin:r,intent:`radar-free`,notes:`Agenda 30 min · revisión de un flujo (vientonorte.io)`}),window.setTimeout(()=>{n(u)},300),`google_calendar`):(u(),`contact_form`)}function l(){return!!t}export{c as n,l as t};