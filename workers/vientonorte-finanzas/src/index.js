/**
 * vientonorte-finanzas · worker-v21-git-proxy
 *
 * SSOT = git main ops/finanzas/* via raw.githubusercontent.com
 * Does NOT serve stale bundled assets (that caused local≠live).
 *
 * Access: every path, including /health and /__ssot, requires Cloudflare
 * Access. ctx.access is set only when the request passed an Access app.
 * POLICY_AUD must match that app. Missing config fails closed (403).
 * This file does not deploy. workers.dev is off in wrangler.toml.
 */
const GH_API =
  "https://api.github.com/repos/vientonorte/vientonorte.github.io/contents/ops/finanzas";
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

function accessDenied(error) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status: 403,
    headers: baseHeaders({ "Content-Type": "application/json" }),
  });
}

function audMatches(accessAud, expected) {
  if (typeof accessAud === "string") return accessAud === expected;
  if (Array.isArray(accessAud)) return accessAud.includes(expected);
  return false;
}

function requireAccess(env, ctx) {
  const aud = typeof env?.POLICY_AUD === "string" ? env.POLICY_AUD.trim() : "";
  if (!aud) return accessDenied("access_not_configured");
  if (!ctx?.access) return accessDenied("access_required");
  if (!audMatches(ctx.access.aud, aud)) return accessDenied("access_audience");
  return null;
}

async function fetchUpstream(file) {
  const bust = `t=${Date.now()}`;
  try {
    const res = await fetch(`${GH_API}/${file}?ref=main&${bust}`, {
      headers: {
        Accept: "application/vnd.github.raw+json",
        "User-Agent": "vientonorte-finanzas",
      },
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    if (res.ok) return { res, source: `${GH_API}/${file}` };
  } catch (_) {
    /* fall through */
  }
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
  async fetch(request, env, ctx) {
    const denied = requireAccess(env, ctx);
    if (denied) return denied;

    const url = new URL(request.url);
    const path = url.pathname;

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
