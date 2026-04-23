#!/bin/bash
# Vientonorte Design System - Build Script
# Concatenates CSS files and creates minified versions for CDN distribution

set -e

echo "Building Vientonorte Design System v1..."

# Define paths
DESIGN_SYSTEM_DIR="/home/runner/work/vientonorte.github.io/vientonorte.github.io/design-system"
CDN_DIR="/home/runner/work/vientonorte.github.io/vientonorte.github.io/cdn/v1"
COMPONENTS_DIR="$DESIGN_SYSTEM_DIR/components"

# Create combined vientonorte.css
echo "/* Vientonorte Design System v1.0.0 - Combined Distribution */" > "$CDN_DIR/vientonorte.css"
echo "/* https://vientonorte.github.io */" >> "$CDN_DIR/vientonorte.css"
echo "" >> "$CDN_DIR/vientonorte.css"

# Concatenate all CSS files in order
cat "$DESIGN_SYSTEM_DIR/tokens.css" >> "$CDN_DIR/vientonorte.css"
echo "" >> "$CDN_DIR/vientonorte.css"
cat "$DESIGN_SYSTEM_DIR/reset.css" >> "$CDN_DIR/vientonorte.css"
echo "" >> "$CDN_DIR/vientonorte.css"
cat "$COMPONENTS_DIR/layout.css" >> "$CDN_DIR/vientonorte.css"
echo "" >> "$CDN_DIR/vientonorte.css"
cat "$COMPONENTS_DIR/card.css" >> "$CDN_DIR/vientonorte.css"
echo "" >> "$CDN_DIR/vientonorte.css"
cat "$COMPONENTS_DIR/badge.css" >> "$CDN_DIR/vientonorte.css"
echo "" >> "$CDN_DIR/vientonorte.css"
cat "$COMPONENTS_DIR/tag.css" >> "$CDN_DIR/vientonorte.css"
echo "" >> "$CDN_DIR/vientonorte.css"
cat "$COMPONENTS_DIR/stat.css" >> "$CDN_DIR/vientonorte.css"
echo "" >> "$CDN_DIR/vientonorte.css"
cat "$COMPONENTS_DIR/icon.css" >> "$CDN_DIR/vientonorte.css"
echo "" >> "$CDN_DIR/vientonorte.css"
cat "$DESIGN_SYSTEM_DIR/utilities.css" >> "$CDN_DIR/vientonorte.css"

# Create components.css (all components without tokens/reset)
echo "/* Vientonorte Design System v1.0.0 - Components Only */" > "$CDN_DIR/components.css"
cat "$COMPONENTS_DIR/layout.css" >> "$CDN_DIR/components.css"
echo "" >> "$CDN_DIR/components.css"
cat "$COMPONENTS_DIR/card.css" >> "$CDN_DIR/components.css"
echo "" >> "$CDN_DIR/components.css"
cat "$COMPONENTS_DIR/badge.css" >> "$CDN_DIR/components.css"
echo "" >> "$CDN_DIR/components.css"
cat "$COMPONENTS_DIR/tag.css" >> "$CDN_DIR/components.css"
echo "" >> "$CDN_DIR/components.css"
cat "$COMPONENTS_DIR/stat.css" >> "$CDN_DIR/components.css"
echo "" >> "$CDN_DIR/components.css"
cat "$COMPONENTS_DIR/icon.css" >> "$CDN_DIR/components.css"

# Copy individual files
cp "$DESIGN_SYSTEM_DIR/tokens.css" "$CDN_DIR/tokens.css"
cp "$COMPONENTS_DIR/icons.svg" "$CDN_DIR/icons.svg"

# Create minified version (simple minification - remove comments, extra whitespace)
echo "Creating minified version..."
sed '/^[[:space:]]*\/\*/,/\*\//d' "$CDN_DIR/vientonorte.css" | \
  sed '/^[[:space:]]*$/d' | \
  tr -s ' ' > "$CDN_DIR/vientonorte.min.css"

echo "✓ Build complete!"
echo "  - vientonorte.css (combined)"
echo "  - vientonorte.min.css (minified)"
echo "  - components.css (components only)"
echo "  - tokens.css (design tokens)"
echo "  - icons.svg (icon sprite)"
