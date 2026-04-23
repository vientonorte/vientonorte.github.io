# Migration Guide: Integrating Vientonorte Design System

Guide for integrating the Vientonorte Design System into existing projects.

## Overview

The Vientonorte Design System provides:
- **Design Tokens**: CSS custom properties for colors, spacing, typography
- **Components**: Reusable UI patterns (cards, badges, stats, etc.)
- **Zero Dependencies**: Pure CSS, no build step required
- **CDN Distribution**: Versioned, cacheable assets

---

## Quick Start

### Option 1: Full Design System (Recommended)

Add to your HTML `<head>`:

```html
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/vientonorte.css">
```

This includes:
- Design tokens
- CSS reset
- All components
- Utility classes

### Option 2: Tokens Only

If you want to keep your own component styles but use consistent design tokens:

```html
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/tokens.css">
```

### Option 3: Tokens + Components (No Reset)

```html
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/tokens.css">
<link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/components.css">
```

---

## Migration Strategy

### Phase 1: Add Design Tokens

1. Add `tokens.css` to your project
2. Gradually replace hardcoded values with tokens:

**Before:**
```css
.my-component {
    background: #161b22;
    color: #e6edf3;
    padding: 16px;
}
```

**After:**
```css
.my-component {
    background: var(--vn-color-surface);
    color: var(--vn-color-text);
    padding: var(--vn-space-3xl);
}
```

### Phase 2: Adopt Components

Replace custom components with design system equivalents:

**Before:**
```html
<div class="project-card">
    <h3>Project Name</h3>
    <span class="status">Live</span>
    <p>Description...</p>
</div>
```

**After:**
```html
<article class="card">
    <div class="card__header">
        <div class="card__title"><a href="#">Project Name</a></div>
        <span class="card__badge card__badge--live">LIVE</span>
    </div>
    <div class="card__desc">Description...</div>
</article>
```

### Phase 3: Clean Up

- Remove duplicate CSS
- Remove unused custom properties
- Consolidate spacing/color values

---

## Component Reference

### Card Component

Full-featured project card with header, description, tags, and links.

```html
<article class="card">
    <div class="card__header">
        <div class="card__title">
            <a href="https://example.com">Project Title</a>
        </div>
        <span class="card__badge card__badge--live">LIVE</span>
    </div>
    
    <div class="card__desc">
        Project description goes here.
    </div>
    
    <div class="card__tags">
        <span class="tag">React</span>
        <span class="tag">TypeScript</span>
    </div>
    
    <div class="card__links">
        <a href="https://example.com">
            <svg class="icon"><use href="#icon-site"></use></svg>
            Ver sitio
        </a>
        <a href="https://github.com/user/repo">
            <svg class="icon"><use href="#icon-github"></use></svg>
            Código
        </a>
    </div>
</article>
```

**Variants:**
- `.card--deprecated`: Reduced opacity for deprecated projects
- Combine with badge variants for different states

### Badge Component

Status indicators for projects.

```html
<!-- Live project -->
<span class="card__badge card__badge--live">LIVE</span>

<!-- Private project -->
<span class="card__badge card__badge--private">PRIVADO</span>

<!-- Repository only -->
<span class="card__badge card__badge--repo">REPO</span>

<!-- Deprecated -->
<span class="card__badge card__badge--deprecated">DEPRECATED</span>
```

### Tag Component

Technology/category tags.

```html
<div class="card__tags">
    <span class="tag">JavaScript</span>
    <span class="tag">CSS</span>
    <span class="tag">HTML</span>
</div>
```

### Stat Component

Dashboard statistics with dot indicators.

```html
<div class="stats">
    <div class="stat">
        <span class="dot dot--live" aria-label="Status"></span>
        <strong>5</strong> description
    </div>
</div>
```

**Dot variants:**
- `.dot--live`: Green (production)
- `.dot--private`: Yellow (private)
- `.dot--off`: Gray (inactive)
- `.dot--deprecated`: Red (deprecated)
- `.dot--sprint`: Blue (active sprint)

### Layout Components

```html
<!-- Header -->
<header>
    <h1><span>Project</span> — Title</h1>
    <p>Subtitle or description</p>
    <div class="stats"><!-- Stats here --></div>
</header>

<!-- Main content area -->
<main id="content">
    <div class="grid">
        <!-- Grid items (cards) -->
    </div>
</main>

<!-- Footer -->
<footer>
    <p>Footer content · <a href="#">Link</a></p>
</footer>
```

### Icon System

Include SVG sprite (inline or external):

```html
<!-- Inline sprite -->
<svg style="display:none" aria-hidden="true" focusable="false">
    <defs>
        <symbol id="icon-site" viewBox="0 0 16 16">
            <!-- SVG paths -->
        </symbol>
        <symbol id="icon-github" viewBox="0 0 16 16">
            <!-- SVG paths -->
        </symbol>
    </defs>
</svg>

<!-- Usage -->
<svg class="icon" aria-hidden="true">
    <use href="#icon-site"></use>
</svg>
```

Or use external sprite:

```html
<svg class="icon" aria-hidden="true">
    <use href="https://vientonorte.github.io/cdn/v1/icons.svg#icon-site"></use>
</svg>
```

---

## Design Tokens Reference

### Color Tokens

```css
/* Background */
--vn-color-bg          /* Main background */
--vn-color-surface     /* Card/surface background */
--vn-color-border      /* Borders */

/* Text */
--vn-color-text        /* Primary text */
--vn-color-text-muted  /* Secondary text */

/* Accent */
--vn-color-accent      /* Primary accent color */
--vn-color-accent-hover
--vn-color-accent-alpha

/* Status */
--vn-color-green       /* Success/live */
--vn-color-yellow      /* Warning/private */
--vn-color-red         /* Error/deprecated */
--vn-color-purple      /* Info/repo */
```

### Spacing Tokens

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

### Typography Tokens

```css
/* Font sizes */
--vn-font-size-xs    /* 0.7rem - tags, badges */
--vn-font-size-sm    /* 0.8rem - links */
--vn-font-size-base  /* 0.85rem - stats */
--vn-font-size-md    /* 0.875rem - descriptions */
--vn-font-size-lg    /* 0.95rem - subtitles */
--vn-font-size-xl    /* 1.1rem - card titles */
--vn-font-size-2xl   /* 1.3rem - mobile headers */
--vn-font-size-3xl   /* 1.75rem - desktop headers */

/* Font weights */
--vn-font-weight-normal    /* 400 */
--vn-font-weight-medium    /* 500 */
--vn-font-weight-semibold  /* 600 */
```

### Border Tokens

```css
--vn-border-radius-sm      /* 8px - cards */
--vn-border-radius-full    /* 12px - badges, tags */
--vn-border-radius-circle  /* 50% - dots */
```

---

## Backward Compatibility

Legacy tokens are provided for gradual migration:

```css
/* Legacy */          /* New */
--bg          →      --vn-color-bg
--surface     →      --vn-color-surface
--text        →      --vn-color-text
--accent      →      --vn-color-accent
```

Both work, but prefer the `--vn-*` prefixed versions in new code.

---

## Best Practices

1. **Use semantic tokens**: Prefer `--vn-color-accent` over hardcoded colors
2. **Maintain spacing scale**: Use spacing tokens instead of arbitrary values
3. **Leverage components**: Don't recreate existing patterns
4. **Test responsiveness**: Design system includes mobile breakpoints
5. **Follow BEM naming**: Component classes use BEM methodology
6. **Accessibility**: Use ARIA labels and semantic HTML

---

## Troubleshooting

### Styles not applying

1. Check CDN URL is correct and accessible
2. Verify CSS is loaded (check browser DevTools Network tab)
3. Check for CSS specificity conflicts
4. Ensure component HTML structure matches exactly

### Design tokens not working

1. Verify `tokens.css` is loaded before your custom CSS
2. Check browser DevTools to see computed variable values
3. Ensure you're using `var(--token-name)` syntax

### Icons not showing

1. Include SVG sprite in your HTML
2. Verify icon IDs match (`#icon-site`, `#icon-github`)
3. Check that `.icon` class is applied
4. For external sprite, verify path is correct

---

## Example: Complete Migration

### Before (Custom Styles)

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background: #0d1117;
            color: #e6edf3;
        }
        .project {
            background: #161b22;
            border: 1px solid #30363d;
            padding: 20px;
        }
        .status {
            color: #3fb950;
            border: 1px solid #3fb950;
            padding: 4px 8px;
        }
    </style>
</head>
<body>
    <div class="project">
        <h3>My Project</h3>
        <span class="status">Live</span>
    </div>
</body>
</html>
```

### After (Design System)

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://vientonorte.github.io/cdn/v1/vientonorte.css">
</head>
<body>
    <main>
        <div class="grid">
            <article class="card">
                <div class="card__header">
                    <div class="card__title">My Project</div>
                    <span class="card__badge card__badge--live">LIVE</span>
                </div>
            </article>
        </div>
    </main>
</body>
</html>
```

**Benefits:**
- Reduced custom CSS
- Consistent styling
- Responsive out of the box
- Accessible markup
- Maintainable long-term

---

## Support

- **Documentation**: https://vientonorte.github.io/design-system/docs/
- **Issues**: https://github.com/vientonorte/vientonorte.github.io/issues
- **Changelog**: See `CHANGELOG.md` in repository

---

## Version History

- **v1.0.0** (2026-04-23): Initial release
  - Design tokens extracted
  - Core components (card, badge, tag, stat, layout)
  - CDN distribution
  - Zero-dependency architecture
