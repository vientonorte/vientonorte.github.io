import{n as e,t}from"./fo-events-Ba-LoJ6P.js";import"./site-contact-CkKqupa0.js";import"./admin-config-DkWTKoWG.js";import{n}from"./navigate-to-contact-C9r2ID0A.js";var r=`vn-contact-session-v1`;function i(){try{return typeof sessionStorage<`u`}catch{return!1}}function a(){if(!i())return null;try{let e=sessionStorage.getItem(r);if(!e)return null;let t=JSON.parse(e);return typeof t.name!=`string`||typeof t.email!=`string`||typeof t.message!=`string`?null:{name:t.name,email:t.email,message:t.message,activeTab:t.activeTab===`form`?`form`:`assistant`,updatedAt:typeof t.updatedAt==`number`?t.updatedAt:Date.now()}}catch{return null}}function o(e){if(i())try{sessionStorage.setItem(r,JSON.stringify({...e,updatedAt:Date.now()}))}catch{}}function s(){if(i())try{sessionStorage.removeItem(r)}catch{}}var c={es:`Hola Viento Norte — quiero la revisión gratis de accesibilidad de un flujo.

Qué revisar: [link o describe el flujo]
Empresa o producto: [breve]
Horario preferido (si no agendaste en Calendar): [día / franja CLT]

Si sirve, hablamos del Diagnóstico completo (5–7 días).

Gracias.`,en:`Hi Viento Norte — I want a free accessibility review of one flow.

What to review: [link or describe the flow]
Company or product: [brief]
Preferred time (if you did not book on Calendar): [day / slot, America/Santiago]

If it helps, we can talk about the full Diagnostic (5–7 days).

Thanks.`};function l(n,r){e(`free_radar_entry_open`,{origin:n,package_id:`radar`,freemium:!0,channel:r}),t.clickHeroFreeAudit()}function u(e,t,r=`free-radar`,i={}){return i.mode,l(r,`contact_form`),n(e,{origin:r,source:`cta`,intent:`consulting`,packageId:`radar`,message:c[t],consultingQ1:`radar-free`}),`contact_form`}function d(){return!1}export{o as a,a as i,u as n,s as r,d as t};