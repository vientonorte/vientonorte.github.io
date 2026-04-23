# Vientonorte Design System

Unified design system for all vientonorte projects. Zero dependencies, pure CSS, CDN-distributed.

## Overview

This design system provides:
- **Design Tokens**: CSS custom properties for colors, spacing, typography, etc.
- **Components**: Reusable UI components (cards, badges, stats, etc.)
- **Documentation**: Interactive docs and migration guides
- **Build System**: Scripts to generate CDN-ready assets

## Structure

```
/design-system/
├── tokens.css          # Design tokens (colors, spacing, typography)
├── reset.css           # CSS reset and base styles
├── utilities.css       # Utility classes
├── components/
│   ├── card.css        # Project card component
│   ├── badge.css       # Status badge component
│   ├── tag.css         # Technology tag component
│   ├── stat.css        # Statistics/KPI component
│   ├── layout.css      # Header, main, footer, grid
│   ├── icon.css        # Icon system styles
│   └── icons.svg       # SVG sprite
├── build.sh           # Build script for CDN
└── docs/
    └── index.html     # Interactive documentation
```

## Quick Start

### Using the Design System

Add to your HTML:

```html
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/vientonorte.css">
```

See [MIGRATION.md](../MIGRATION.md) for detailed integration guide.

### Development

1. **Edit source files** in `/design-system/`:
   ```bash
   vim tokens.css
   vim components/card.css
   ```

2. **Build CDN assets**:
   ```bash
   ./build.sh
   ```

3. **Test locally**:
   ```bash
   cd ..
   npx serve .
   # Open http://localhost:3000
   ```

4. **Commit changes**:
   ```bash
   git add design-system/ cdn/
   git commit -m "feat(design-system): description"
   git push origin main
   ```

## Build System

The `build.sh` script concatenates source files into CDN-ready distributions:

```bash
./build.sh
```

**Outputs** (in `/cdn/v1/`):
- `vientonorte.css` - Full design system (15KB)
- `vientonorte.min.css` - Minified version (7KB)
- `components.css` - Components only (8KB)
- `tokens.css` - Design tokens only (5KB)
- `icons.svg` - SVG sprite (2KB)

## Design Tokens

### Colors

```css
--vn-color-bg           /* #0d1117 - Main background */
--vn-color-surface      /* #161b22 - Card background */
--vn-color-border       /* #30363d - Borders */
--vn-color-text         /* #e6edf3 - Primary text */
--vn-color-text-muted   /* #8b949e - Secondary text */
--vn-color-accent       /* #58a6ff - Accent color */
--vn-color-green        /* #3fb950 - Success/live */
--vn-color-yellow       /* #d29922 - Warning/private */
--vn-color-red          /* #f85149 - Error/deprecated */
--vn-color-purple       /* #bc8cff - Info/repo */
```

### Spacing Scale

```css
--vn-space-xs    /* 0.15rem (2.4px) */
--vn-space-sm    /* 0.25rem (4px) */
--vn-space-md    /* 0.3rem (4.8px) */
--vn-space-lg    /* 0.4rem (6.4px) */
--vn-space-xl    /* 0.5rem (8px) */
--vn-space-2xl   /* 0.75rem (12px) */
--vn-space-3xl   /* 1rem (16px) */
--vn-space-4xl   /* 1.25rem (20px) */
--vn-space-5xl   /* 1.5rem (24px) */
--vn-space-6xl   /* 2rem (32px) */
```

### Typography

```css
--vn-font-size-xs    /* 0.7rem - tags, badges */
--vn-font-size-sm    /* 0.8rem - links */
--vn-font-size-base  /* 0.85rem - stats */
--vn-font-size-md    /* 0.875rem - descriptions */
--vn-font-size-xl    /* 1.1rem - card titles */
--vn-font-size-3xl   /* 1.75rem - headers */
```

## Components

### Card Component

```html
<article class="card">
    <div class="card__header">
        <div class="card__title"><a href="#">Title</a></div>
        <span class="card__badge card__badge--live">LIVE</span>
    </div>
    <div class="card__desc">Description...</div>
    <div class="card__tags">
        <span class="tag">Tag</span>
    </div>
    <div class="card__links">
        <a href="#">Link</a>
    </div>
</article>
```

**Modifiers:**
- `.card--deprecated` - Reduced opacity for deprecated projects

### Badge Component

```html
<span class="card__badge card__badge--live">LIVE</span>
<span class="card__badge card__badge--private">PRIVADO</span>
<span class="card__badge card__badge--repo">REPO</span>
<span class="card__badge card__badge--deprecated">DEPRECATED</span>
```

### Stat Component

```html
<div class="stats">
    <div class="stat">
        <span class="dot dot--live"></span>
        <strong>5</strong> description
    </div>
</div>
```

**Dot variants:**
- `.dot--live` - Green
- `.dot--private` - Yellow
- `.dot--off` - Gray
- `.dot--deprecated` - Red
- `.dot--sprint` - Blue

## Versioning

**Current version:** 1.0.0

The design system follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (2.0.0): Breaking changes
- **MINOR** (1.1.0): New features, backward compatible
- **PATCH** (1.0.1): Bug fixes

Published versions in `/cdn/v1/` are **immutable**. Breaking changes will be published as `/cdn/v2/`.

## Documentation

- **Interactive Docs**: https://vientonorte.github.io/design-system/docs/
- **Migration Guide**: [MIGRATION.md](../MIGRATION.md)
- **CDN Documentation**: [cdn/README.md](../cdn/README.md)
- **Changelog**: [CHANGELOG.md](../CHANGELOG.md)

## Contributing

1. Propose changes via GitHub issue
2. Edit source files in `/design-system/`
3. Run `./build.sh` to rebuild CDN assets
4. Test locally
5. Update `CHANGELOG.md`
6. Create PR with detailed description

## Philosophy

- **Zero dependencies**: No npm, no build tools required for consumption
- **Progressive enhancement**: Works without JavaScript
- **Semantic HTML**: Accessible, meaningful markup
- **Design tokens first**: All values come from tokens
- **BEM naming**: Consistent, predictable class names
- **Versioned releases**: Safe to cache, never breaks

## Support

- **Issues**: https://github.com/vientonorte/vientonorte.github.io/issues
- **Discussions**: GitHub Discussions
- **Email**: Contact via GitHub profile

---

Built with ❤️ by [@vientonorte](https://github.com/vientonorte) · April 2026
