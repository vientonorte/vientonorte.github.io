# Packages + Design System · 2026-07-26

## Design system (marca)

| Capa | URL |
|------|-----|
| **Figma Sites · SISTEMA DE DISEÑO · MARCA** | https://dot-wool-76997229.figma.site |
| Código npm monorepo | https://github.com/vientonorte/vientonorte-core |
| Runbook publish | https://github.com/vientonorte/vientonorte-core/blob/main/docs/publish-packages.md |

Figma Sites = referencia visual de marca.  
`@vientonorte/tokens|ui|a11y|security` = implementación publicable en GitHub Packages.

## Auth packages (bloqueado hasta refresh)

Token `gh` actual: `gist, read:org, repo, workflow` — **sin** `read:packages`.

### 1) Ampliar gh (terminal local — interactivo)

```bash
# plural: delete:packages
gh auth refresh -h github.com -s read:packages,write:packages,delete:packages
gh auth status
gh api user/packages?package_type=npm
```

### 2) PAT + secret CI (si publish en Actions da 403)

1. Crear PAT classic: `repo` + `read:packages` + `write:packages`  
   https://github.com/settings/tokens/new?scopes=repo,write:packages,read:packages&description=VN_PACKAGES_TOKEN
2. Secret en `vientonorte-core`: **`VN_PACKAGES_TOKEN`**  
   https://github.com/vientonorte/vientonorte-core/settings/secrets/actions
3. En cada package → Connect repository → `vientonorte-core`
4. Publicar:

```bash
gh workflow run "Publish (GitHub Packages)" --repo vientonorte/vientonorte-core
```

## Paquetes listos para publish

| Package | version |
|---------|---------|
| @vientonorte/ui | 0.3.2 |
| @vientonorte/tokens | 0.2.0 |
| @vientonorte/a11y | 0.1.1 (access public) |
| @vientonorte/security | 0.1.1 (access public) |

No reabrir consumo en mi-portafolio hasta CI publish verde.
