#!/usr/bin/env zsh
set -euo pipefail

echo "This script will remove android/ and ios/ directories and update package-lock.json."
read -q "REPLY?Are you sure you want to proceed? (y/N) "
echo
if [[ "$REPLY" != "y" && "$REPLY" != "Y" ]]; then
  echo "Aborting."
  exit 1
fi

# Remove native directories
if [[ -d "android" ]]; then
  echo "Removing android/"
  rm -rf android
else
  echo "android/ not found"
fi

if [[ -d "ios" ]]; then
  echo "Removing ios/"
  rm -rf ios
else
  echo "ios/ not found"
fi

# Remove Capacitor packages from node_modules and update lockfile
echo "Pruning node_modules and reinstalling to update lockfile..."
npm prune --production || true
npm install

echo "Done. Review changes and commit if happy."
