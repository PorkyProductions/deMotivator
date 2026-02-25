#!/usr/bin/env bash
set -e

if [ -z "$1" ]; then
	echo 'Usage: setVersion.sh <version>'
	exit 1
fi

VERSION="$1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

PACKAGES=(
	"$ROOT_DIR/package.json"
	"$ROOT_DIR/apps/web/package.json"
	"$ROOT_DIR/packages/demotivator/package.json"
	"$ROOT_DIR/packages/shared/package.json"
)

for PKG in "${PACKAGES[@]}"; do
	node -e "
		const fs = require('fs');
		const pkg = JSON.parse(fs.readFileSync('$PKG', 'utf8'));
		pkg.version = '$VERSION';
		fs.writeFileSync('$PKG', JSON.stringify(pkg, null, '\t') + '\n');
	"
	echo "Updated $PKG -> $VERSION"
done
