/**
 * vientonorte-finanzas · worker-v21-git-proxy
 *
 * SSOT = git main ops/finanzas/* via raw.githubusercontent.com
 * Does NOT serve stale bundled assets (that caused local≠live).
 *
 * One-time after this lands:
 *   npx wrangler login && deploy-finanzas.cmd
 * Then every git push to ops/finanzas updates live automatically.
 */
const GH_RAW =
  "https://raw.githubusercontent.com/vientonorte/vientonorte.github.io/main/ops/finanzas";
const GH_PAGES = "https://vientonorte.github.io/ops/finanzas";

function fileFor(path) {
  if (path === "/" || path === "" || path === "/index.html") return "index.html";
  return path.replace(/^\//, "") || "index.html";
}

function baseHeaders(extra = {}) {
  return {
    "Cache-Control": "no-store, max-age=0",
    "Access-Control-Allow-Origin": "*",
    "x-vn-finanzas": "worker-v21-git-proxy",
    "x-vn-ssot": "git-main-ops-finanzas",
    ...extra,
  };
}

async function fetchUpstream(file) {
  const bust = `t=${Date.now()}`;
  for (const base of [GH_RAW, GH_PAGES]) {
    try {
      const res = await fetch(`${base}/${file}?${bust}`, {
        cf: { cacheTtl: 0, cacheEverything: false },
      });
      if (res.ok) return { res, source: `${base}/${file}` };
    } catch (_) {
      /* next */
    }
  }
  return null;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    if (path === "/health" || path === "/__ssot") {
      const up = await fetchUpstream("ledger.json");
      if (!up) {
        return new Response(JSON.stringify({ ok: false, error: "upstream_fail" }), {
          status: 502,
          headers: baseHeaders({ "Content-Type": "application/json" }),
        });
      }
      const body = await up.res.json();
      return new Response(
        JSON.stringify(
          {
            ok: true,
            worker: "worker-v21-git-proxy",
            source: up.source,
            summary_today_tasks: body?.meta?.summary_today_tasks ?? null,
            summary_mtd_tasks: body?.meta?.summary_mtd_tasks ?? null,
            summary_today_usd: body?.meta?.summary_today_usd ?? null,
            summary_mtd_usd: body?.meta?.summary_mtd_usd ?? null,
            sync: body?.meta?.sync ?? null,
            updated: body?.meta?.updated ?? null,
          },
          null,
          2
        ),
        { headers: baseHeaders({ "Content-Type": "application/json" }) }
      );
    }

    const file = fileFor(path);
    const up = await fetchUpstream(file);
    if (!up) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "ssot_upstream_unavailable",
          want: `${GH_RAW}/${file}`,
        }),
        { status: 502, headers: baseHeaders({ "Content-Type": "application/json" }) }
      );
    }

    const ct = file.endsWith(".json")
      ? "application/json; charset=utf-8"
      : file.endsWith(".html")
        ? "text/html; charset=utf-8"
        : "text/plain; charset=utf-8";

    return new Response(up.res.body, {
      status: up.res.status,
      headers: baseHeaders({
        "Content-Type": ct,
        "x-vn-upstream": up.source,
      }),
    });
  },
};
