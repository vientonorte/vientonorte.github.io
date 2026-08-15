import{n as e}from"./routes-CqcnD15S.js";import{c as t,t as n}from"./site-contact-EpDzpJtx.js";import{i as r,r as i}from"./index-g7JGi7dN.js";import{t as a}from"./vn-booking-B7q0hiwI.js";var o=[`recruiter`,`consulting`,`freelance`,`other`];function s(e){return typeof e==`string`&&o.includes(e)}function c(e){let t=new URLSearchParams(e.startsWith(`?`)?e:`?${e}`).get(`intent`);return s(t)?t:null}function l(e){return{message:e.message?.trim()??``,source:e.source??`cta`,intent:e.intent,packageId:e.packageId,industry:e.industry,timeline:e.timeline,recruiterMode:e.recruiterMode,consultingQ1:e.consultingQ1,conversationTitle:e.conversationTitle?.trim()||void 0}}function u(t,n={}){let i=l(n);r(`contact_assistant_open`,{origin:n.origin??`other`,intent:i.intent??`unset`,source:i.source,has_message:!!i.message,package_id:i.packageId??null});let a=i.intent&&!i.message?`?intent=${encodeURIComponent(i.intent)}`:``;t({pathname:e.contact,search:a},{replace:n.replace,state:{contactDraft:i}})}var d={es:`Hola Viento Norte — quiero la revisión gratis de accesibilidad de un flujo.

Qué revisar: [link o describe el flujo]
Empresa o producto: [breve]
Horario preferido (si no agendaste en Calendar): [día / franja CLT]

Si sirve, hablamos del Diagnóstico completo (5–7 días).

Gracias.`,en:`Hi Viento Norte — I want a free accessibility review of one flow.

What to review: [link or describe the flow]
Company or product: [brief]
Preferred time (if you did not book on Calendar): [day / slot, America/Santiago]

If it helps, we can talk about the full Diagnostic (5–7 days).

Thanks.`};function f(e,t){r(`generate_lead`,{category:`conversion`,lead_type:`free_a11y`,package_id:`radar`,freemium:!0,channel:t,origin:e}),r(`free_radar_entry_open`,{origin:e,package_id:`radar`,freemium:!0,channel:t}),i.clickHeroFreeAudit()}function p(e,n,r=`free-radar`,i={}){let o=i.mode??`auto`,s=()=>{f(r,`contact_form`),u(e,{origin:r,source:`cta`,intent:`consulting`,packageId:`radar`,message:d[n],consultingQ1:`radar-free`})};return o===`message`?(s(),`contact_form`):o===`schedule`||o===`auto`?(f(r,`google_calendar`),a({origin:r,intent:`radar-free`,notes:`Agenda 30 min · revisión de un flujo (vientonorte.io)`}),t(s),`google_calendar`):(s(),`contact_form`)}function m(){return!!n}export{c as a,u as i,p as n,l as r,m as t};