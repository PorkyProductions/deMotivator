#!/usr/bin/env bash
# Copyright 2024, PorkyProductions, and contributors
# Licensed under the Apache License, Version 2.0
#
# sync-insults.bash
# Bash wrapper: builds the demotivator npm package, then runs the Node.js
# sync script to regenerate packages/demotivator-python/demotivator/insults.py.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "==> Building demotivator npm package…"
cd "${REPO_ROOT}"
npm run build --workspace @demotivator/shared --silent
npm run build --workspace demotivator --silent

echo "==> Syncing insults to Python package…"
node "${SCRIPT_DIR}/sync-insults.mjs"

echo "==> Done."
