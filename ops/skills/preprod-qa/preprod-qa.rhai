let meta = #{
    name: "preprod-qa",
    description: "Orquesta gate técnico FO + revisión multi-agente antes de prod (GO/NO-GO)",
    phases: [
        #{ title: "Gate", detail: "preprod-gate.sh technical" },
        #{ title: "Review", detail: "parallel: routes · SEO · a11y residual" },
        #{ title: "Verdict", detail: "synthesize GO/NO-GO + human checklist" },
    ],
    when_to_use: "Before merge to main / ship FO. Prefer local M5. Human Test path still required.",
};

// args.repo optional; args.mode: quick | full | with-dev | with-routes
let mode = if args == () { () } else { args.mode };
if mode == () { mode = "full"; }

let repo = if args == () { () } else { args.repo };
if repo == () {
    repo = "/Users/ro/code/mi-portafolio";
}

let base = if args == () { () } else { args.base };
if base == () {
    base = "http://127.0.0.1:5173";
}

let gate_flags = "";
if mode == "quick" {
    gate_flags = " --quick";
} else if mode == "with-dev" {
    gate_flags = " --with-dev";
} else if mode == "with-routes" {
    gate_flags = " --with-routes";
}

phase("Gate");
log("Running preprod-gate mode=" + mode + " repo=" + repo);

let gate_cmd = "cd " + repo + " && BASE=" + base + " bash scripts/preprod-gate.sh" + gate_flags;
let gate_prompt = "";
gate_prompt += "You are the technical QA runner for Viento Norte FO (mi-portafolio). ";
gate_prompt += "Run this exact shell command with execute tools. Do not skip. ";
gate_prompt += "Return: exit code, PASS/FAIL summary lines, and whether GO technical. ";
gate_prompt += "Command:\n" + gate_cmd;

let gate = agent(gate_prompt, #{
    label: "preprod-gate",
    capability_mode: "execute",
});

let gate_ok = gate != () && gate.success;
if !gate_ok {
    complete(#{
        summary: "NO-GO · preprod-gate agent failed to run",
        verdict: "NO-GO",
        mode: mode,
        gate_ran: false,
    });
}

phase("Review");
// Parallel advisory reviews (read-only). Fail-open for advisory; verdict synthesizer is strict on gate.
let jobs = [
    #{
        prompt: "Read-only review of FO pre-prod risk for ROUTES/HashRouter. Repo: "
            + repo
            + ". Use grep/read_file on src routing, nav-config, and scripts/qa-routes.mjs. "
            + "List at most 5 concrete ship-blockers (missing redirect, broken embudo anchors, stale /mi-portafolio). "
            + "If none after reading code, say none with evidence of files read.",
        label: "review-routes",
        capability_mode: "read-only",
    },
    #{
        prompt: "Read-only SEO/SEM pre-prod check for Viento Norte FO. Repo: "
            + repo
            + ". Inspect index.html meta, sitemap/robots if present, consultoria routes, canonical hints. "
            + "Flag only blockers for organic/SEM (title wrong brand, missing noindex on /ops is OK). Max 5. "
            + "Read files before answering.",
        label: "review-seo",
        capability_mode: "read-only",
    },
    #{
        prompt: "Read-only a11y residual scan for FO ship. Repo: "
            + repo
            + ". Look at known funnel components (home embudo, consultoria tour, contacto free a11y). "
            + "Max 5 likely WCAG AA issues that should block ship (missing labels, focus traps). "
            + "Do not invent — cite file paths you opened.",
        label: "review-a11y",
        capability_mode: "read-only",
    },
];

let reviews = parallel(jobs);

phase("Verdict");
let synth = "";
synth += "Synthesize a PRE-PROD verdict for Viento Norte FO.\n";
synth += "Mode: " + mode + "\n";
synth += "Gate agent success: " + gate_ok.to_string() + "\n";
synth += "Gate output (technical):\n";
if gate.output != () {
    synth += json_encode(gate.output) + "\n";
} else {
    synth += "(empty)\n";
}
synth += "\nParallel reviews (routes/seo/a11y) — treat as advisory unless they cite clear ship-blockers:\n";
let i = 0;
for r in reviews {
    synth += "--- review " + i.to_string() + " ---\n";
    if r != () && r.success {
        synth += json_encode(r.output) + "\n";
    } else {
        synth += "(failed or empty — ignore as evidence)\n";
    }
    i += 1;
}
synth += "\nRules:\n";
synth += "1) If technical gate reported FAIL/NO-GO or non-zero exit → verdict NO-GO technical.\n";
synth += "2) If gate GO but advisory finds S0/S1 with file evidence → NO-GO conditional.\n";
synth += "3) If gate GO and no evidenced blockers → GO technical.\n";
synth += "4) ALWAYS end with: Human still must run Test path H2/H4/H5/S2 + SEM $0 gate from ";
synth += "https://vientonorte.io/ops/AHORA-CLOSE-CHECKLIST.md — agent never closes HUMANO items.\n";
synth += "5) Write a short markdown report via tools if useful, then return structured summary text with verdict line first: VERDICT: GO|NO-GO|CONDITIONAL\n";

let final = agent(synth, #{
    label: "verdict",
    capability_mode: "read-write",
});

let report_path = write_scratch_file("preprod-verdict.md", json_encode(#{
    mode: mode,
    repo: repo,
    base: base,
    gate_ok: gate_ok,
    final: if final != () { final.output } else { () },
}));

complete(#{
    summary: "preprod-qa finished · see scratch preprod-verdict.md · human Test path still required",
    path: report_path,
    mode: mode,
    gate_ok: gate_ok,
});
