# SEO + Search Console · vientonorte.io

**Canon live:** https://vientonorte.io/  
**Portafolio:** https://vientonorte.io/mi-portafolio/  
**Sitemap:** https://vientonorte.io/sitemap.xml  
**robots:** https://vientonorte.io/robots.txt  

## Hecho en código (julio 2026)

- Custom domain + HTTPS en GitHub Pages  
- Canonical / OG del hub → `vientonorte.io`  
- Path nav: Portafolio · Consultoría · Free a11y · Proyectos  
- `data/projects.json` links live → `vientonorte.io/...`  
- Sitemap + robots actualizados  

## Search Console (manual — una vez)

1. [Google Search Console](https://search.google.com/search-console) → **Añadir propiedad**  
2. Tipo preferido: **Prefijo de dominio** `vientonorte.io` (DNS TXT en Cloudflare)  
   - o **Prefijo de URL** `https://vientonorte.io`  
3. Verificación DNS: Cloudflare → DNS → TXT (valor que da GSC)  
4. Tras verificar:  
   - **Sitemaps** → enviar `https://vientonorte.io/sitemap.xml`  
   - **Inspección de URL** → hub + `/mi-portafolio/` → solicitar indexación  
5. (Opcional) property separada no hace falta si usas dominio completo  

## GTM unificado (plan-gtm)

| Superficie | Cómo |
|------------|------|
| Portafolio | `VITE_GTM_ID=GTM-XXXX` en Actions secrets / env de build |
| Hub | Meta `vn-gtm` o `window.__VN_GTM_ID` + snippet en `index.html` (mismo ID) |

Usar **un solo contenedor GTM** para hub + portafolio. Triggers por `Page Path` / hostname.

## HashRouter (diferido)

Las rutas SPA del portafolio usan `/#/...`. Google indexa peor los fragments.

- **Ahora:** listar entradas clave en sitemap (`#/consultoria`, `#/contacto`) + titles en `SEOHead`  
- **Después (P3):** migrar a BrowserRouter + `404.html` GH Pages o Cloudflare `_redirects` — no mezclar con este ship  

## Checklist post-deploy

- [ ] `curl -sI https://vientonorte.io/sitemap.xml` → 200  
- [ ] GSC property verified  
- [ ] Sitemap submitted  
- [ ] 0 errores de cobertura críticos a 7 días  
- [ ] Ads / UTMs apuntan a `vientonorte.io` (no github.io)  
