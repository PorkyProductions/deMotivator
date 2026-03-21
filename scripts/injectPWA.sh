#!/usr/bin/env zsh
set -e

SCRIPT_DIR="${0:A:h}"
REPO_ROOT="${SCRIPT_DIR}/.."
SW_FILE="${REPO_ROOT}/www/service-worker.js"
OUT_DIR="${REPO_ROOT}/apps/web/out"

# Extract the HTML block from inside the /* ... */ block comment in service-worker.js.
# The block must open with a line that is exactly "/*" and close with "*/".
PWA_LINKS_FILE=$(mktemp)
awk '/^\/\*$/{found=1; next} /^\*\//{found=0; next} found{print}' "${SW_FILE}" > "${PWA_LINKS_FILE}"

if [ ! -s "${PWA_LINKS_FILE}" ]; then
    echo "ERROR: Could not find HTML block in service-worker.js" >&2
    rm -f "${PWA_LINKS_FILE}"
    exit 1
fi

for HTML_FILE in "${OUT_DIR}"/*.html; do
    [ -f "${HTML_FILE}" ] || continue
    if grep -q "apple-touch-icon" "${HTML_FILE}"; then
        echo "Skipping $(basename ${HTML_FILE}) (already has PWA links)"
        continue
    fi
    TMPFILE=$(mktemp)
    awk -v linksfile="${PWA_LINKS_FILE}" '
        /<\/head>/ {
            while ((getline line < linksfile) > 0) print line
            close(linksfile)
        }
        { print }
    ' "${HTML_FILE}" > "${TMPFILE}"
    mv "${TMPFILE}" "${HTML_FILE}"
    echo "Injected PWA links into $(basename ${HTML_FILE}) ✅"
done

rm -f "${PWA_LINKS_FILE}"
