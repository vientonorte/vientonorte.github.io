import{D as e,F as t}from"./track-DE3FVLHL.js";import{n,t as r}from"./fo-events-Ba-LoJ6P.js";import{t as i}from"./vn-booking-Ch0d42h6.js";import{n as a}from"./navigate-to-contact-BOgO9C1_.js";var o={es:`Hola Viento Norte — quiero la revisión gratis de accesibilidad de un flujo.

Qué revisar: [link o describe el flujo]
Empresa o producto: [breve]
Horario preferido (si no agendaste en Calendar): [día / franja CLT]

Si sirve, hablamos del Diagnóstico completo (5–7 días).

Gracias.`,en:`Hi Viento Norte — I want a free accessibility review of one flow.

What to review: [link or describe the flow]
Company or product: [brief]
Preferred time (if you did not book on Calendar): [day / slot, America/Santiago]

If it helps, we can talk about the full Diagnostic (5–7 days).

Thanks.`};function s(e,t){n(`free_radar_entry_open`,{origin:e,package_id:`radar`,freemium:!0,channel:t}),r.clickHeroFreeAudit()}function c(e,t){n(`generate_lead`,{category:`conversion`,lead_type:`free_a11y`,package_id:`radar`,freemium:!0,channel:t,origin:e})}function l(e,n,r=`free-radar`,l={}){let u=l.mode??`auto`,d=()=>{s(r,`contact_form`),a(e,{origin:r,source:`cta`,intent:`consulting`,packageId:`radar`,message:o[n],consultingQ1:`radar-free`})};return u===`message`?(d(),`contact_form`):u===`schedule`||u===`auto`?(s(r,`google_calendar`),i({origin:r,intent:`radar-free`,notes:`Agenda 30 min · revisión de un flujo (vientonorte.io)`,onConfirmed:()=>c(r,`google_calendar`)}),window.setTimeout(()=>{t(d)},300),`google_calendar`):(d(),`contact_form`)}function u(){return!!e}export{l as n,u as t};