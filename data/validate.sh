#!/bin/bash
# Vientonorte - Projects JSON Validator
# Validates projects.json syntax and basic schema requirements

set -e

JSON_FILE="/home/runner/work/vientonorte.github.io/vientonorte.github.io/data/projects.json"
SCHEMA_FILE="/home/runner/work/vientonorte.github.io/vientonorte.github.io/data/projects-schema.json"

echo "Validating projects.json..."
echo "---"

# 1. Check JSON syntax
echo "1. Checking JSON syntax..."
if python3 -m json.tool "$JSON_FILE" > /dev/null 2>&1; then
    echo "   ✓ JSON syntax valid"
else
    echo "   ✗ JSON syntax invalid"
    exit 1
fi

# 2. Check required fields exist
echo "2. Checking required fields..."
REQUIRED_FIELDS=("version" "updated" "projects")
for field in "${REQUIRED_FIELDS[@]}"; do
    if grep -q "\"$field\"" "$JSON_FILE"; then
        echo "   ✓ Field '$field' exists"
    else
        echo "   ✗ Field '$field' missing"
        exit 1
    fi
done

# 3. Count projects
PROJECT_COUNT=$(grep -o '"id":' "$JSON_FILE" | wc -l)
echo "3. Project count: $PROJECT_COUNT projects found"

# 4. Validate project statuses
echo "4. Checking project statuses..."
VALID_STATUSES=("live" "deprecated" "private" "repo")
INVALID_STATUS=false

while IFS= read -r status; do
    status=$(echo "$status" | tr -d ' ",' )
    if [[ ! " ${VALID_STATUSES[@]} " =~ " ${status} " ]]; then
        echo "   ✗ Invalid status: $status"
        INVALID_STATUS=true
    fi
done < <(grep '"status":' "$JSON_FILE" | cut -d':' -f2)

if [ "$INVALID_STATUS" = false ]; then
    echo "   ✓ All statuses valid"
fi

# 5. Extract and validate URLs
echo "5. Validating external URLs..."
echo "   (This may take a moment...)"

FAILED_URLS=0
while IFS= read -r url; do
    url=$(echo "$url" | tr -d ' ",' )
    
    if [ "$url" != "null" ]; then
        HTTP_CODE=$(curl -L -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
        
        if [ "$HTTP_CODE" = "200" ]; then
            echo "   ✓ $url"
        else
            echo "   ✗ $url (HTTP $HTTP_CODE)"
            FAILED_URLS=$((FAILED_URLS + 1))
        fi
    fi
done < <(grep -oE '"(url|repo)": "[^"]*"' "$JSON_FILE" | cut -d'"' -f4)

# Summary
echo "---"
if [ "$FAILED_URLS" -eq 0 ] && [ "$INVALID_STATUS" = false ]; then
    echo "✓ Validation passed! projects.json is valid."
    exit 0
else
    echo "✗ Validation failed with $FAILED_URLS URL errors"
    exit 1
fi
