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

# Internal package names whose version constraints should be kept in sync
INTERNAL_PACKAGES=(
	"demotivator"
	"@demotivator/shared"
)

for PKG in "${PACKAGES[@]}"; do
	node -e "
		const fs = require('fs');
		const pkg = JSON.parse(fs.readFileSync('$PKG', 'utf8'));

		// Update the package's own version
		pkg.version = '$VERSION';

		// Update version constraints for internal packages across all dep fields
		const depFields = ['dependencies', 'devDependencies', 'peerDependencies'];
		const internalPackages = $(printf '%s\n' "${INTERNAL_PACKAGES[@]}" | node -e "
			const lines = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n');
			process.stdout.write(JSON.stringify(lines));
		");

		for (const field of depFields) {
			if (!pkg[field]) continue;
			for (const name of internalPackages) {
				if (pkg[field][name] !== undefined) {
					pkg[field][name] = '^$VERSION';
				}
			}
		}

		fs.writeFileSync('$PKG', JSON.stringify(pkg, null, '\t') + '\n');
	"
	echo "Updated $PKG -> $VERSION"
done