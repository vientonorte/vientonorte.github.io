import{C as e,E as t,F as n,w as r,z as i}from"./index-DqF-TXhx.js";import{t as a}from"./vn-booking-URchQEFY.js";var o={default:[`recruiter`,`consulting`,`freelance`,`other`],consulting:[`consulting`],freeA11y:[`consulting`]};function s(e){return e?e.consultingQ1===`radar-free`||e.packageId===`radar`&&e.intent===`consulting`:!1}function c(e,t){return e===`freeA11y`||s(t)?`freeA11y`:e===`consulting`?`consulting`:e??`default`}function l(e){return o[e]}function u(e){return e!=="default"}function d(e){return e===`consulting`||e===`freeA11y`?`consulting`:null}function f(e){return i.contact}function p(e){let t=e.split(`?`)[0].replace(/\/$/,``);return t===i.audit||t.endsWith(`/auditoria`)}var m=[`recruiter`,`consulting`,`freelance`,`other`];function h(e){return typeof e==`string`&&m.includes(e)}function g(e){let t=new URLSearchParams(e.startsWith(`?`)?e:`?${e}`).get(`intent`);return h(t)?t:null}function _(e){return{message:e.message?.trim()??``,source:e.source??`cta`,intent:e.intent,packageId:e.packageId,industry:e.industry,timeline:e.timeline,recruiterMode:e.recruiterMode,consultingQ1:e.consultingQ1,conversationTitle:e.conversationTitle?.trim()||void 0}}function v(e,t={}){let n=_(t);r(`contact_assistant_open`,{origin:t.origin??`other`,intent:n.intent??`unset`,source:n.source,has_message:!!n.message,package_id:n.packageId??null});let i=n.intent&&!n.message?`?intent=${encodeURIComponent(n.intent)}`:``,a=f(c(void 0,n));if(p(a))throw Error(`contact assistant must not open /auditoria`);e({pathname:a,search:i},{replace:t.replace,state:{contactDraft:n}})}var y={es:`Hola Viento Norte — quiero la revisión gratis de accesibilidad de un flujo.

Qué revisar: [link o describe el flujo]
Empresa o producto: [breve]
Horario preferido (si no agendaste en Calendar): [día / franja CLT]

Si sirve, hablamos del Diagnóstico completo (5–7 días).

Gracias.`,en:`Hi Viento Norte — I want a free accessibility review of one flow.

What to review: [link or describe the flow]
Company or product: [brief]
Preferred time (if you did not book on Calendar): [day / slot, America/Santiago]

If it helps, we can talk about the full Diagnostic (5–7 days).

Thanks.`};function b(t,n){r(`generate_lead`,{category:`conversion`,lead_type:`free_a11y`,package_id:`radar`,freemium:!0,channel:n,origin:t}),r(`free_radar_entry_open`,{origin:t,package_id:`radar`,freemium:!0,channel:n}),e.clickHeroFreeAudit()}function x(e,t,r=`free-radar`,i={}){let o=i.mode??`auto`,s=()=>{b(r,`contact_form`),v(e,{origin:r,source:`cta`,intent:`consulting`,packageId:`radar`,message:y[t],consultingQ1:`radar-free`})};return o===`message`?(s(),`contact_form`):o===`schedule`||o===`auto`?(b(r,`google_calendar`),a({origin:r,intent:`radar-free`,notes:`Agenda 30 min · revisión de un flujo (vientonorte.io)`}),window.setTimeout(()=>{n(s)},300),`google_calendar`):(s(),`contact_form`)}function S(){return!!t}export{g as a,u as c,v as i,c as l,x as n,l as o,_ as r,d as s,S as t};