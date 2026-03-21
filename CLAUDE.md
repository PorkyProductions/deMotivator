# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands use **npm** (not pnpm or yarn).

```bash
# From repo root (runs across all workspaces via Turborepo)
npm run dev          # Start all dev servers
npm run build        # Build all packages/apps
npm run lint         # Lint all workspaces
npm run typeCheck    # TypeScript type checking across all workspaces
npm run clean        # Clean build artifacts and caches

# From apps/web (web app specific)
npm run dev          # Vite dev server
npm run build        # Production build → apps/web/out/
npm run preview      # Preview production build
npm run deploy       # Firebase deploy
```

There are no test commands — this project has no testing libraries.

## Architecture

**deMotivator** is a Turborepo monorepo:

```
apps/web/        # Main Svelte 5 web app (Vite MPA)
apps/docs/       # Documentation (Astro Starlight)
packages/demotivator/  # Core insults library (published to npm)
packages/shared/       # Shared TypeScript utilities
packages/ui/           # Shared Svelte UI components
www/             # PWA static assets (copied to apps/web/out/ via postbuild)
```

### Web App

**Stack**: Svelte 5 (Runes mode) + Vite + Firebase (Auth, Firestore, Hosting) + Bootstrap 5.3 + Tailwind CSS 4.2

**Multi-page app**: Vite is configured as `appType: "mpa"` with multiple HTML entry points (`index.html`, `login.html`, `signUp.html`, `list.html`, `settings.html`, `account.html`, `leaderboard.html`, `admin.html`, `404.html`, `500.html`, `egg.html`). All built to `apps/web/out/`.

**Entry flow**: `*.html` → `src/bootstrapper.ts` → Svelte 5 `mount()` → `App.svelte`

**Source layout** (`apps/web/src/`):
- `components/` — Reusable Svelte components (max 200 lines each)
- `pages/` — Page-level components, one subdirectory per HTML entry point
- `utils/firebase/` — Firebase config and helper functions
- `utils/` — Other helpers (darkMode, userSettings, adminAccess, etc.)
- `styles/scss/` — Global SCSS overrides only
- `types/` — TypeScript type definitions

**Vite aliases** (use these import paths):
- `demotivator` → `packages/demotivator/source/index.ts`
- `@demotivator/shared` → `packages/shared/source/index.ts`
- `@demotivator/ui` → `packages/ui/source/index.js`

**Firestore structure**: `users/{userId}`, `leaderboardEntries/{userId}`, `insultRequests/{requestId}`. Admin access is determined by `users/{uid}.admin == true`.

## Code Style

These are enforced by ESLint — follow them strictly:

- **Indentation**: Tabs (not spaces)
- **Line endings**: CRLF (Windows)
- **Quotes**: Single quotes only
- **Semicolons**: Always
- **Naming**: camelCase for everything (variables, functions, constants, files)
- **Functions**: Arrow functions only — never `function` declarations
- **Variables**: `const`/`let` only — never `var`

### Styling Rules

- **Bootstrap**: Structural components only (grid, cards, modals, forms)
- **Tailwind**: Utilities for spacing, colors, responsive breakpoints, dark mode
- **Never write raw CSS** — use `.scss` files only for global overrides
- Always include dark mode Tailwind classes alongside light mode classes
- No `.sass` files — `.scss` only

### Prohibitions

- No testing libraries
- No external UI libraries (shadcn, headlessui, etc.)
- No `.sass` files
- No `function` keyword declarations
- No `var`

## Git Commit Style

Please commit your changes after every run or significant change. This helps keep track of what changes were made and allows for easier debugging if something breaks.

### Commit Title
- Keep it terse and not overly descriptive
- General idea of changes
- Add emoji if it's funny and enhances comedic value

### Commit Message Body
- Be VERY detailed and longwinded
- Overexplain everything
- Reference:
  - Other contributors
  - Bots
  - PRs (#123)
  - Issues
  - Files changed
  - Related commits

Example:
```
🦔 Fixed navbar thing

So I was working on the navbar and noticed that when you clicked the hamburger menu on mobile, it wasn't closing properly when you navigated to a new page. This was happening because the state wasn't being reset properly in Svelte's reactive statements. I talked to @dependabot about updating our Svelte version but decided against it. This relates to PR #42 and fixes issue #38.

Changed files:
- /apps/web/src/components/Navbar.svelte - Added proper cleanup with onDestroy
- /apps/web/src/utils/navbarHelpers.ts - Refactored the toggle logic to be more reusable

Also while I was in there I noticed the dark mode wasn't applying to the dropdown items so I added the appropriate Tailwind classes. Bootstrap was handling most of it but needed the extra dark: modifiers for the text color.

This should work with the deployment pipeline we set up in the GitHub Actions workflow.
```


## Misc Notes:
The project used to be hosted on GitHub pages but we moved to Firebase for better backend support and more control over the hosting environment. 
However, the old link might be in the wild somewhere, so we kept the page up with a redirect to the new version.
That is what is in the docs/ directory, which is still published to GitHub pages but just redirects to the new Firebase-hosted version.


The original version of the app is in `www/dmv1.html` and is included "as-is" in every release. This is a legacy artifact
and should be treated as a piece in a museum. It is not maintained and should **never**, in any circumstance whatsoever
be modified or updated. If you want to make changes to the app, make them in the `apps/web/` version. The `www/dmv1.html` file is just there for historical purposes and should be left alone.

---

Always ask clarifying questions if needed