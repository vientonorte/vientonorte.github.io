# Packages · Core org `vientonorte`

**Tab:** https://github.com/vientonorte?tab=packages  
**Doc monorepo:** https://github.com/vientonorte/vientonorte-core/blob/main/docs/PACKAGES-CORE.md  
**Siguiente sprint:** [SPRINT-CORE-ONBOARDING.md](./SPRINT-CORE-ONBOARDING.md) · *usar core bien* → luego onboarding + env pub/priv  
**Finanzas $:** [finanzas/](./finanzas/) (ops, no embudo)

Este registry es el **core compartido** entre todos los repos (design system + security + a11y + cli).

## Latest

| Package | Version |
|---------|---------|
| @vientonorte/tokens | 0.2.0 |
| @vientonorte/ui | 0.3.2 |
| @vientonorte/a11y | 0.1.1 |
| @vientonorte/security | 0.1.1 |
| @vientonorte/cli | 0.1.1 |
| @vientonorte/analytics | 0.1.0 |

## Consumidores

| Repo | Consume | `VN_PACKAGES_TOKEN` |
|------|---------|---------------------|
| mi-portafolio | a11y, security, tokens, ui (+ cli local) | yes |
| table-ro | a11y 0.1.1, security 0.1.1, tokens 0.2.0 | yes |
| uxtools, aruma, dashfin | `.npmrc` ready | yes |
| vientonorte.github.io | secret ready | yes |

## Publish

```bash
gh workflow run "Publish (GitHub Packages)" --repo vientonorte/vientonorte-core
```

DS visual: https://dot-wool-76997229.figma.site
