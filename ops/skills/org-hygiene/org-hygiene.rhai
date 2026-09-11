let meta = #{
    name: "org-hygiene",
    description: "Audit vientonorte org: open PRs, branch noise, protect main, Dependabot red",
    phases: [
        #{ title: "Scan", detail: "list repos and open PRs" },
        #{ title: "Report", detail: "summarize hygiene actions" },
    ],
    when_to_use: "Weekly org hygiene or after mass Dependabot noise",
};

let report_schema = #{
    "type": "object",
    "required": ["summary", "actions", "blockers"],
    "properties": #{
        "summary": #{ "type": "string" },
        "actions": #{
            "type": "array",
            "maxItems": 20,
            "items": #{
                "type": "object",
                "required": ["repo", "action"],
                "properties": #{
                    "repo": #{ "type": "string" },
                    "action": #{ "type": "string" },
                },
            },
        },
        "blockers": #{
            "type": "array",
            "maxItems": 12,
            "items": #{ "type": "string" },
        },
    },
};

phase("Scan");
let scan = agent(
    "You are auditing GitHub user/org vientonorte hygiene. Use gh CLI via shell tools if available, or github MCP. "
    + "For each public live repo (mi-portafolio, antropologia-corrupcion, vientonorte.github.io, uxtools, "
    + "vientonorte-core, table-ro, aruma, dashfin, portafolio): count remote branches, list open PRs with CI status, "
    + "check if default branch has protection. Do not delete or merge anything. "
    + "Return a short bullet report of findings only (facts).",
    #{ label: "scan-org", capability_mode: "execute", agent_type: "explore" }
);

phase("Report");
let prompt = "From this hygiene scan, produce summary, recommended actions (repo+action), and blockers. ";
prompt += "Scan text:\n";
if scan != () && scan.success {
    prompt += json_encode(scan.output);
} else {
    prompt += "(scan failed — list blockers as inability to scan)";
}
prompt += " Prefer close-broken-dependabot, protect-main-public, mass-delete-stale-branches-keep-PR-heads. "
    + "Note private protect needs GitHub Pro. packages need read:packages scope.";

let rep = agent(prompt, #{
    label: "hygiene-report",
    capability_mode: "read-only",
    output_schema: report_schema,
});

if rep != () && rep.success && rep.output != () {
    let path = write_scratch_file("org-hygiene-report.json", json_encode(rep.output));
    complete(#{ path: path, report: rep.output });
}
complete(#{ summary: "org-hygiene incomplete", scan_ok: scan != () && scan.success });
