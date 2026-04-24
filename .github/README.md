
# (de)Motivator 🔴

**The Simple, Push-Button Ecosystem for Lowering your Self-Esteem**

**Brought to you by your friends at [PorkyProductions](https://porkyproductions.github.io/)**
<br>
![PorkyProdutions Logo](https://avatars.githubusercontent.com/u/82683662?s=200&v=4)

---

![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting%20%2B%20Firestore-FFCA28?logo=firebase&logoColor=black)
![Turborepo](https://img.shields.io/badge/Turborepo-2-EF4444?logo=turborepo&logoColor=white)
![npm](https://img.shields.io/badge/npm-workspaces-CB3837?logo=npm&logoColor=white)


## 🚀 Features

- **Dynamic Insults**: Randomized insults from the `demotivator` npm package with extensible insult packs, plus optional user-specific insults.
- **Multi-Platform**: 
  - Web app hosted on **Firebase Hosting**.
- **Dark Mode**: Fully styled with **TailwindCSS** and **Bootstrap**, including dark mode support.
- **Leaderboard**: Track users who have seen the most insults.
- **Shareable Content**: Share insults via email or social media.
- **PWA Support**: Installable as a Progressive Web App.

---

## 🛠️ Tech Stack

- **Frontend**: Svelte 5 + TypeScript
- **Styling**: TailwindCSS + Bootstrap
- **Bundler**: Vite
- **Hosting**: Firebase Hosting
- **Data**: Firebase Firestore
- **Shared Components**: `@demotivator/ui` — Bootstrap-wrapper Svelte component library.
- **Utilities**: 
  - `@porkyproductions/hat` for randomization and utility functions.
  - `demotivator` npm package for insult generation.

---

## 📂 Project Structure

This repository is a **monorepo** managed with [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) and [Turborepo](https://turbo.build/). Apps live under `apps/` and reusable packages live under `packages/`. Turbo ensures packages are always built before the apps that depend on them, and caches outputs so repeated builds are near-instant.

```
/
├── apps/
│   ├── web/                  # Svelte 5 + TypeScript web app (demotivator-web)
│   │   ├── src/              # Application source (bootstrapper.ts, App.svelte, components/, utils/, styles/)
│   │   ├── *.html            # HTML entry pages (index, login, signUp, list, settings, account, leaderboard, admin, egg, 404, 500)
│   │   ├── vite.config.ts    # Vite multi-page app config
│   │   └── out/              # Production build output (includes /docs on deploy flow)
│   └── docs/                 # Astro + Starlight docs app (demotivator-docs)
│       ├── src/content/docs/ # Markdown docs content
│       └── dist/             # Static docs build output
│
├── packages/
│   ├── demotivator/          # `demotivator` npm package — insult packs and generation helpers (source/ → dist/)
│   ├── shared/               # `@demotivator/shared` — utility functions shared across packages and apps
│   └── ui/                   # `@demotivator/ui` — shared Bootstrap-wrapper Svelte components
│
├── www/                      # PWA assets (manifest.json, icons, service-worker.js) — copied into apps/web/out/ at postbuild
├── docs/                     # Legacy GitHub Pages redirect → demotivator.web.app
├── turbo.json                # Turborepo task pipeline
└── package.json              # Root workspace config (npm workspaces)
```

### 🔄 Turbo Build Pipeline

Turbo orchestrates tasks across the monorepo in dependency order with intelligent caching:

| Task | Depends on | What it does |
|---|---|---|
| `lint` | upstream `lint` | Runs ESLint across each workspace, upstream first |
| `lint:check` | upstream `lint:check` | Runs ESLint in check (non-fixing) mode |
| `build` | `lint`, upstream `build` | Compiles package/app outputs (`dist/`, `out/`) across workspaces |
| `typeCheck` | upstream `typeCheck`, upstream `build` | Runs `tsc --noEmit` across all workspaces |
| `dev` | upstream `build` | Starts the dev server after packages are compiled |
| `deploy` | `build` | Deploys to Firebase (always re-runs, never cached) |

Because `build` has `^build` as a dependency, running `npm run build` from the root compiles upstream workspace dependencies first and then app workspaces. Turbo caches all outputs, so if source files haven't changed, tasks are skipped entirely.

```
packages/shared ─────build──┐
packages/demotivator ──build──┤
packages/ui ─────────build──┼──► apps/web build
apps/docs ───────────build──┘
```

---

## 🖥️ Local Development

### Prerequisites
- Node.js 25+
- npm

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/PorkyProductions/deMotivator.git
   cd deMotivator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


3. Add environment variables for the web app in `apps/web/.env`:
   ```bash
   VITE_FB_API_KEY=
   VITE_FB_AUTH_DOMAIN=
   VITE_FB_PROJECT_ID=
   VITE_FB_STORAGE_BUCKET=
   VITE_FB_MESSAGING_SENDER_ID=
   VITE_FB_APP_ID=
   VITE_FB_MEASUREMENT_ID=
   ```
   - Use your Firebase project values.
   - Firebase-backed features require these variables to be set.

4. Start the development server:
   ```bash
   npm run dev
   ```
    - Open your browser at [http://localhost:5173](http://localhost:5173).
    - For docs-only dev: `npm run dev --workspace demotivator-docs`

5. Preview the production build:
   ```bash
   npm run build
   npm run preview --workspace demotivator-web
   ```
   Docs are published under `/docs` in the web app build output.

6. Deploy to Firebase:
   ```bash
   npm run push --workspace demotivator-web
   ```

---

## 📦 Deployment

### Firebase Hosting
1. Ensure you are logged into Firebase:
   ```bash
   firebase login
   ```
2. Deploy the app:
   ```bash
   npm run push --workspace demotivator-web
   ```

---

## 🎨 Styling

- **Bootstrap**: Used for structural components (e.g., modals, cards).
- **TailwindCSS**: Used for utility classes (e.g., spacing, colors, dark mode).
- **SCSS**: Global styles and theme overrides.

---

## 🧑‍💻 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## 📜 License

This project is licensed under the **ISC License**. See the LICENSE file for details.

---

## ❤️ Credits

- **Developers**: PorkyProductions (more specifically Ryan Mullin ([@hiteacheryouare](https://github.com/hiteacheryouare))) and contributors.
- **Creator** Tristan Winata ([@HedgehogDubz](https://github.com/HedgehogDubz))
- **Libraries**: 
  - Svelte
  - TailwindCSS
  - Bootstrap
  - Firebase
  - `@porkyproductions/hat`
  - `demotivator`
  - `@demotivator/ui`
  - `@demotivator/shared`
- **Special Thanks**: To all the users who keep coming back for more insults!

---

## 🌐 Links

- **Live App**: [https://demotivator.web.app](https://demotivator.web.app)
- **Live Docs**: [https://demotivator.web.app/docs](https://demotivator.web.app/docs)
- **Dev Mode** [https://demotivator-dev.web.app](https://demotivator-dev.web.app)
- **GitHub Repo**: [https://github.com/PorkyProductions/deMotivator](https://github.com/PorkyProductions/deMotivator)

---

Enjoy the app, and remember: porky rules 🦔
