/**
 * vientonorte-finanzas worker-v20-income
 * Serves / and /ledger.json from bundled public assets (synced from ops/finanzas).
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;
    if (path === "/" || path === "") path = "/index.html";
    if (path === "/ledger.json" || path === "/ledger-ssot.json" || path === "/index.html" || path.endsWith(".md")) {
      // Assets via ASSETS binding (wrangler assets) or fallback fetch to GH raw
    }
    // Prefer ASSETS
    if (env.ASSETS) {
      const assetReq = new Request(new URL(path, url.origin), request);
      let res = await env.ASSETS.fetch(assetReq);
      if (res.status === 404 && path !== "/index.html") {
        res = await env.ASSETS.fetch(new Request(new URL("/index.html", url.origin), request));
      }
      const headers = new Headers(res.headers);
      headers.set("x-vn-finanzas", "worker-v20-income");
      headers.set("x-vn-ssot", "tasks-income-prob-input");
      headers.set("Cache-Control", "no-store, max-age=0");
      headers.set("Access-Control-Allow-Origin", "*");
      return new Response(res.body, { status: res.status, headers });
    }
    // Fallback: GitHub raw
    const rawBase = "https://raw.githubusercontent.com/vientonorte/vientonorte.github.io/main/ops/finanzas";
    const file = path === "/index.html" ? "index.html" : path.replace(/^\//, "");
    const upstream = await fetch(`${rawBase}/${file}?t=${Date.now()}`, { cf: { cacheTtl: 0 } });
    const headers = new Headers(upstream.headers);
    headers.set("x-vn-finanzas", "worker-v20-income");
    headers.set("x-vn-ssot", "tasks-income-prob-input");
    headers.set("Cache-Control", "no-store, max-age=0");
    headers.set("Access-Control-Allow-Origin", "*");
    return new Response(upstream.body, { status: upstream.status, headers });
  }
};