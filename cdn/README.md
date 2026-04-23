# Vientonorte CDN

Static assets for the Vientonorte Design System, served via GitHub Pages.

## Available Files

### Version 1.0.0 (`/cdn/v1/`)

| File | Size | Description | URL |
|------|------|-------------|-----|
| `vientonorte.css` | ~15KB | Full design system (tokens + components + utilities) | [Link](https://vientonorte.github.io/cdn/v1/vientonorte.css) |
| `vientonorte.min.css` | ~7KB | Minified version | [Link](https://vientonorte.github.io/cdn/v1/vientonorte.min.css) |
| `tokens.css` | ~5KB | Design tokens only | [Link](https://vientonorte.github.io/cdn/v1/tokens.css) |
| `components.css` | ~8KB | Components only (requires tokens) | [Link](https://vientonorte.github.io/cdn/v1/components.css) |
| `icons.svg` | ~2KB | SVG icon sprite | [Link](https://vientonorte.github.io/cdn/v1/icons.svg) |

## Usage

### Quick Start

Add to your HTML `<head>`:

```html
<!-- Production (minified) -->
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/vientonorte.min.css">

<!-- Development (readable) -->
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/vientonorte.css">
```

### Modular Import

```html
<!-- Tokens only -->
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/tokens.css">

<!-- Tokens + Components -->
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/tokens.css">
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/components.css">
```

## Versioning

- **Immutable versions**: Published versions (`/cdn/v1/`) are never modified
- **Semantic versioning**: MAJOR.MINOR.PATCH
- **Breaking changes**: Will be published as new major version (`/cdn/v2/`)
- **Cache safely**: Assets are versioned and safe to cache indefinitely

## CORS

All CDN assets are served with appropriate CORS headers for cross-origin use.

## Performance

- **Gzip compression**: Enabled by GitHub Pages
- **HTTP/2**: Supported by GitHub Pages
- **CDN**: Distributed via GitHub's global CDN
- **Cache-Control**: Configured for optimal caching

## Building

CDN files are generated from source using:

```bash
cd design-system
./build.sh
```

This concatenates source files and creates minified versions.

## Source Files

Source files are located in `/design-system/`:

```
/design-system/
├── tokens.css
├── reset.css
├── utilities.css
├── components/
│   ├── card.css
│   ├── badge.css
│   ├── tag.css
│   ├── stat.css
│   ├── layout.css
│   ├── icon.css
│   └── icons.svg
└── build.sh
```

## Support

- Documentation: https://vientonorte.github.io/design-system/docs/
- Migration Guide: See `MIGRATION.md` in repository root
- Issues: https://github.com/vientonorte/vientonorte.github.io/issues
