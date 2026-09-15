#!/usr/bin/env bash
# Lint index.html only when it is a static hub page.
# SPA shell (published from mi-portafolio) has id="root" — skip hub eslint/htmlhint.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INDEX="$ROOT/index.html"
if [[ ! -f "$INDEX" ]]; then
  echo "no index.html"
  exit 1
fi
if grep -q 'id="root"' "$INDEX" || grep -q "id='root'" "$INDEX"; then
  echo "skip lint: SPA shell at root (owned by mi-portafolio CI)"
  exit 0
fi
mode="${1:-all}"
cd "$ROOT"
case "$mode" in
  js) npx eslint index.html --ext .html ;;
  html) npx htmlhint index.html ;;
  all)
    npx eslint index.html --ext .html
    npx htmlhint index.html
    ;;
  *)
    echo "usage: $0 [js|html|all]" >&2
    exit 2
    ;;
esac
