#!/usr/bin/env zsh
set -e

SCRIPT_DIR="${0:A:h}"
GUARDIAN_FILE="${SCRIPT_DIR}/ProjectGuardian.kt"
VERSION=$(node -p "require('${SCRIPT_DIR}/../package.json').version")
BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

sed -i.bak "s/const val GUARDIAN_VERSION: String = \"[^\"]*\"/const val GUARDIAN_VERSION: String = \"${VERSION}\"/" "${GUARDIAN_FILE}"
sed -i.bak "s/val createdAt: Instant = Instant.parse(\"[^\"]*\")/val createdAt: Instant = Instant.parse(\"${BUILD_TIME}\")/" "${GUARDIAN_FILE}"
rm -f "${GUARDIAN_FILE}.bak"

echo "ProjectGuardian.kt updated: version=${VERSION}, buildTime=${BUILD_TIME}"
