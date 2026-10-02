import{C as e,M as t}from"./track-CSYU-W1j.js";import{n,t as r}from"./fo-events-Ba-LoJ6P.js";import{t as i}from"./vn-booking-BjpQwYxz.js";import{n as a}from"./navigate-to-contact-B9E-kefQ.js";var o={es:`Hola Viento Norte — quiero la revisión gratis de accesibilidad de un flujo.

Qué revisar: [link o describe el flujo]
Empresa o producto: [breve]
Horario preferido (si no agendaste en Calendar): [día / franja CLT]

Si sirve, hablamos del Diagnóstico completo (5–7 días).

Gracias.`,en:`Hi Viento Norte — I want a free accessibility review of one flow.

What to review: [link or describe the flow]
Company or product: [brief]
Preferred time (if you did not book on Calendar): [day / slot, America/Santiago]

If it helps, we can talk about the full Diagnostic (5–7 days).

Thanks.`};function s(e,t){n(`generate_lead`,{category:`conversion`,lead_type:`free_a11y`,package_id:`radar`,freemium:!0,channel:t,origin:e}),n(`free_radar_entry_open`,{origin:e,package_id:`radar`,freemium:!0,channel:t}),r.clickHeroFreeAudit()}function c(e,n,r=`free-radar`,c={}){let l=c.mode??`auto`,u=()=>{s(r,`contact_form`),a(e,{origin:r,source:`cta`,intent:`consulting`,packageId:`radar`,message:o[n],consultingQ1:`radar-free`})};return l===`message`?(u(),`contact_form`):l===`schedule`||l===`auto`?(s(r,`google_calendar`),i({origin:r,intent:`radar-free`,notes:`Agenda 30 min · revisión de un flujo (vientonorte.io)`}),window.setTimeout(()=>{t(u)},300),`google_calendar`):(u(),`contact_form`)}function l(){return!!e}export{c as n,l as t};