# Packages status · 2026-07-26

**Blocked inventory:** `gh` token scopes = gist, read:org, repo, workflow — missing `read:packages`.

**User action once:**
```bash
gh auth refresh -h github.com -s read:packages,write:packages,delete:packages
```

Then:
```bash
gh api user/packages?package_type=npm --jq '.[] | {name, html_url, updated_at}'
```

**Publish runbook:** https://github.com/vientonorte/vientonorte-core/blob/main/docs/publish-packages.md
