import{n as e}from"./routes-CqcnD15S.js";import{_ as t,i as n,r,w as i}from"./index-DklCOEAE.js";import{t as a}from"./vn-booking-BEZOd4-C.js";var o=[`recruiter`,`consulting`,`freelance`,`other`];function s(e){return typeof e==`string`&&o.includes(e)}function c(e){let t=new URLSearchParams(e.startsWith(`?`)?e:`?${e}`).get(`intent`);return s(t)?t:null}function l(e){return{message:e.message?.trim()??``,source:e.source??`cta`,intent:e.intent,packageId:e.packageId,industry:e.industry,timeline:e.timeline,recruiterMode:e.recruiterMode,consultingQ1:e.consultingQ1,conversationTitle:e.conversationTitle?.trim()||void 0}}function u(t,r={}){let i=l(r);n(`contact_assistant_open`,{origin:r.origin??`other`,intent:i.intent??`unset`,source:i.source,has_message:!!i.message,package_id:i.packageId??null});let a=i.intent&&!i.message?`?intent=${encodeURIComponent(i.intent)}`:``;t({pathname:e.contact,search:a},{replace:r.replace,state:{contactDraft:i}})}var d={es:`Hola Viento Norte — quiero la revisión gratis de accesibilidad de un flujo.

Qué revisar: [link o describe el flujo]
Empresa o producto: [breve]
Horario preferido (si no agendaste en Calendar): [día / franja CLT]

Si sirve, hablamos del Diagnóstico completo (5–7 días).

Gracias.`,en:`Hi Viento Norte — I want a free accessibility review of one flow.

What to review: [link or describe the flow]
Company or product: [brief]
Preferred time (if you did not book on Calendar): [day / slot, America/Santiago]

If it helps, we can talk about the full Diagnostic (5–7 days).

Thanks.`};function f(e,t){n(`generate_lead`,{category:`conversion`,lead_type:`free_a11y`,package_id:`radar`,freemium:!0,channel:t,origin:e}),n(`free_radar_entry_open`,{origin:e,package_id:`radar`,freemium:!0,channel:t}),r.clickHeroFreeAudit()}function p(e,t,n=`free-radar`,r={}){let o=r.mode??`auto`,s=()=>{f(n,`contact_form`),u(e,{origin:n,source:`cta`,intent:`consulting`,packageId:`radar`,message:d[t],consultingQ1:`radar-free`})};return o===`message`?(s(),`contact_form`):o===`schedule`||o===`auto`?(f(n,`google_calendar`),a({origin:n,intent:`radar-free`,notes:`Agenda 30 min · revisión de un flujo (vientonorte.io)`}),i(s),`google_calendar`):(s(),`contact_form`)}function m(){return!!t}export{c as a,u as i,p as n,l as r,m as t};