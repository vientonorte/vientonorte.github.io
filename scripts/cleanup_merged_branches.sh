#!/usr/bin/env bash
#
# cleanup_merged_branches.sh
# Script manual para limpiar ramas mergeadas en origin
#
# Uso:
#   ./scripts/cleanup_merged_branches.sh [--dry-run]
#
# Flags:
#   --dry-run    Solo lista ramas sin eliminarlas

set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=true
fi

echo "Fetching latest changes from origin..."
git fetch --all --prune

echo ""
echo "Finding merged branches..."

# Lista ramas remotas mergeadas (excluyendo main y HEAD)
MERGED_BRANCHES=$(git branch -r --merged origin/main | \
    grep -v "HEAD\|main\|master" | \
    sed 's|origin/||' | \
    grep -E "^(claude|copilot)/" || true)

if [ -z "$MERGED_BRANCHES" ]; then
    echo "✅ No merged branches found to clean up."
    exit 0
fi

echo ""
echo "Merged branches to delete:"
echo "$MERGED_BRANCHES" | sed 's/^/  - /'
echo ""

BRANCH_COUNT=$(echo "$MERGED_BRANCHES" | wc -l | tr -d ' ')

if [ "$DRY_RUN" = true ]; then
    echo "🔍 DRY RUN: Would delete $BRANCH_COUNT branches"
    echo "Run without --dry-run to actually delete them."
    exit 0
fi

read -p "❓ Delete $BRANCH_COUNT branches? [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted."
    exit 1
fi

echo ""
echo "Deleting branches..."
DELETED=0
FAILED=0

while IFS= read -r branch; do
    if git push origin --delete "$branch" 2>/dev/null; then
        echo "  ✅ Deleted: $branch"
        ((DELETED++))
    else
        echo "  ❌ Failed: $branch (may be already deleted)"
        ((FAILED++))
    fi
done <<< "$MERGED_BRANCHES"

echo ""
echo "Summary:"
echo "  - Deleted: $DELETED"
echo "  - Failed: $FAILED"
echo ""
echo "✅ Cleanup complete."
