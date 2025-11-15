# Removing Capacitor native apps

This change removes Capacitor runtime dependencies from `package.json` and prepares the repo to drop the `android/` and `ios/` native projects.

What I changed in this branch:
- Removed `@capacitor/*` packages from `package.json` and removed `@capacitor/cli` from `devDependencies`.
- Removed `capacitor.config.ts`.
- Replaced direct runtime imports of Capacitor plugins with a safe helper `src/utils/capacitor.ts` and fallbacks where appropriate.

Next steps (recommended, destructive):
1. Run the removal script locally to delete native folders and update lockfile:

```bash
# from repo root (zsh)
chmod +x ./scripts/remove-capacitor.sh
./scripts/remove-capacitor.sh
```

2. Review changes and commit the removal locally, then open a PR.

Notes:
- This is a destructive operation (deletes `android/` and `ios/` folders). Make sure you have a clean git branch or backup before running the script.
- I kept `www/` assets (icons/manifest) since they are used by the web build.
- I did not automatically remove any code that references Capacitor at build-time; instead, runtime imports were wrapped with `src/utils/capacitor.ts` which resolves safely when packages are removed.

If you want me to delete the native folders in this repository directly and commit the removals, confirm and I will proceed (I will create a branch, delete the folders, and open a PR). Otherwise, run the script locally and I will prepare the PR instructions for you.
