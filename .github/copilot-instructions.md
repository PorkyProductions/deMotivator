# Welcome!

This is (de)Motivator — a small satirical web app that shows short, cheeky one-liners. This repo is a Svelte (not SvelteKit) multi-page app built with Vite, packaged for web and mobile via Capacitor, and deployed to Firebase hosting.

## Quick overview

- Language/frameworks: Svelte 4 + TypeScript
- Bundler: Vite (config in `vite.config.ts`)
- Mobile: Capacitor (Android/iOS under `android/` and `ios/`)
- Hosting: Firebase (`firebase.json` + `npm run push`)
- UI: Tailwind + Bootstrap (some customized theme files)
- Insults/data: provided by the `demotivator` npm package (dependency)

## Project layout (high level)

- `index.html` — main web entry HTML. This includes a `<div id="app"></div>` and loads `./src/bootstrapper.ts` which mounts the Svelte app.
- `src/bootstrapper.ts` — creates and mounts `App.svelte` to `#app`.
- `src/App.svelte` — top-level Svelte app. Components live under `src/components/`.
- `vite.config.ts` — build configuration. The Rollup `input` includes several HTML pages (login, signUp, list, etc.). The production build writes assets according to the Rollup options (see notes below).
- `www/` — generated PWA assets (manifest, icons, service-worker.js). Used by Capacitor and for the PWA.

## How to run (local dev)

Assumptions: Node 18+ and npm installed. The repo uses the `package.json` scripts below.

1. Install dependencies

	npm install

2. Start dev server (Vite)

	npm run dev

	- This runs `vite serve`. By default Vite serves the project on http://localhost:5173 (or a nearby port if taken).
	- Open the root `index.html` in the browser (Vite's dev server serves it).

3. Preview a production build locally

	npm run build
	npm run preview

	- `npm run build` runs `vite build`. The Rollup options in `vite.config.ts` use multiple HTML inputs. The build outputs are controlled under `rollupOptions.output.dir` (note: `dir: "out"` is set in the config, and `emptyOutDir: false` — be aware builds don't wipe the `out` dir automatically).
	- `npm run preview` runs `vite preview` to locally serve the built output.

4. Firebase deploy

	npm run push

	- This runs `firebase deploy`. Make sure you are logged in (`firebase login`) and have the correct project selected (`firebase use`).

5. Capacitor / Mobile

	- Sync Capacitor (copy web assets into native projects):

	  npm run capBuild

	  (runs `cap sync`)

	- Android/iOS projects live under `android/` and `ios/` directories. Use the native IDE (Android Studio / Xcode) to build/run after `cap sync`.

## Helpful npm scripts (from `package.json`)

- `npm run dev` — start vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run push` — `firebase deploy`
- `npm run capBuild` — `cap sync`
- `npm run lint` — eslint (auto-fix)
- `npm run typeCheck` — TypeScript type check (noEmit)
- `npm run supportedBrowsers` — regenerates `src/utils/supportedBrowsers.ts`

## Important implementation notes / gotchas

- The project's HTML entry is the repo root `index.html` (not `src/index.html`). That file includes `<script type="module" src="./src/bootstrapper.ts"></script>` which mounts the Svelte app to `#app`.
- `vite.config.ts` sets `appType: "mpa"` and enumerates multiple HTML inputs (index, login, signUp, share, list, credits, leaderboard, 404/500). Keep that in mind when adding new pages — add them to `vite.config.ts` so they get built.
- Build output: `rollupOptions.output.dir` is set to `out`. After `npm run build` inspect the `out/` directory (or wherever your tooling writes assets). The project also uses `www/` for some static PWA assets — don't confuse `out/` and `www/`.
- There is a duplicate import of `easterEggs.ts` in `index.html` (harmless but may be worth cleaning up).

## QA checklist (quick)

1. Fresh clone

	npm ci

2. Dev server

	npm run dev -> visit http://localhost:5173 -> confirm app mounts and button loads insults

3. Lint & typecheck

	npm run lint
	npm run typeCheck

4. Production build + preview

	npm run build
	npm run preview -> confirm built pages load and static assets (icons/manifest) are available

5. Deploy to Firebase (if you have access)

	npm run push

If anything fails during these steps, capture the error output and open an issue with the reproduction steps.

## Where to look for things

- Svelte components: `src/components/`
- Top-level app: `src/App.svelte` and `src/bootstrapper.ts`
- Styles: `src/styles/` and `tailwind.config.cjs`
- Vite config: `vite.config.ts`
- Capacitor config: `capacitor.config.ts`
- Firebase config: `firebase.json`

## Questions / notes for the repo owner

Enjoy working on (de)Motivator — ping me (or the vibecoder) with any clarifying preferences and I'll adapt the instructions.