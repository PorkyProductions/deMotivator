#!/usr/bin/env zsh
set -e

SCRIPT_DIR="${0:A:h}"
node "${SCRIPT_DIR}/updateGuardian.mjs"
