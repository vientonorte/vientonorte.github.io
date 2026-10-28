import{n as e,t}from"./fo-events-D0JENIeF.js";import{l as n,t as r}from"./site-contact-DuTXAabX.js";import{n as i}from"./navigate-to-contact-B9u0i7lu.js";import{t as a}from"./vn-booking-s8hg3vFN.js";var o={es:`Hola Viento Norte — quiero la revisión gratis de accesibilidad de un flujo.

Qué revisar: [link o describe el flujo]
Empresa o producto: [breve]
Horario preferido (si no agendaste en Calendar): [día / franja CLT]

Si sirve, hablamos del Diagnóstico completo (5–7 días).

Gracias.`,en:`Hi Viento Norte — I want a free accessibility review of one flow.

What to review: [link or describe the flow]
Company or product: [brief]
Preferred time (if you did not book on Calendar): [day / slot, America/Santiago]

If it helps, we can talk about the full Diagnostic (5–7 days).

Thanks.`};function s(n,r){e(`free_radar_entry_open`,{origin:n,package_id:`radar`,freemium:!0,channel:r}),t.clickHeroFreeAudit()}function c(t,n){e(`generate_lead`,{category:`conversion`,lead_type:`free_a11y`,package_id:`radar`,freemium:!0,channel:n,origin:t})}function l(e,t,r=`free-radar`,l={}){let u=l.mode??`auto`,d=()=>{s(r,`contact_form`),i(e,{origin:r,source:`cta`,intent:`consulting`,packageId:`radar`,message:o[t],consultingQ1:`radar-free`})};return u===`message`?(d(),`contact_form`):u===`schedule`||u===`auto`?(s(r,`google_calendar`),a({origin:r,intent:`radar-free`,notes:`Agenda 30 min · revisión de un flujo (vientonorte.io)`,onConfirmed:()=>c(r,`google_calendar`)}),window.setTimeout(()=>{n(d)},300),`google_calendar`):(d(),`contact_form`)}function u(){return!!r}export{l as n,u as t};