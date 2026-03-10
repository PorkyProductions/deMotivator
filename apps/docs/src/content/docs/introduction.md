---
title: Introduction to (de)Motivator
description: What is (de)Motivator, and who is this documentation for?
---

# (de)Motivator

*A curated collection of satirical insults, available as an npm package and a feature-rich web app.*

Built and maintained by [PorkyProductions](https://github.com/PorkyProductions). Started by request of Ryan Mullin ([@hiteacheryouare](https://github.com/hiteacheryouare)), initially created by Tristan Winata ([@HedgehogDubz](https://github.com/HedgehogDubz)), and actively maintained by both alongside the PorkyProductions community.

---

## What is (de)Motivator?

(de)Motivator is two things:

1. **An npm package** (`demotivator`) — a TypeScript library containing hundreds of hand-curated insults organized into themed packs. It's open source, published to the npm registry, and designed to be dropped into any JavaScript or TypeScript project.

2. **A web app** ([demotivator.web.app](https://demotivator.web.app/)) — PorkyProductions' first-party implementation of that package, wrapped in a full-featured web experience with user accounts, achievements, a leaderboard, sharing, customizable settings, and more.

The two are connected — the web app consumes the npm package as its data source — but they can be used completely independently. You can use the package in your own project without ever touching the web app, and you can use the web app without knowing the package exists.

---

## Who Are You?

This documentation covers everything from casual app usage to deep API references. Jump to the section that matches what you're here to do:

### "I just want to use the web app."

You're in the right place. The web app is free, runs in any modern browser, and doesn't require an account to get started (though creating one unlocks a lot more). Here's where to go:

| Guide | What You'll Learn |
| ----- | ----------------- |
| [**Web App Overview**](/docs/web-app/web-overview) | A quick orientation of every page and feature in the app. Start here. |
| [**Using the App**](/docs/web-app/web-using-the-app) | How to generate insults, use MEGAMODE, browse the full insult catalog, share insults, save favorites, and submit your own insult ideas. |
| [**Accounts & Progress**](/docs/web-app/web-accounts-and-progress) | Creating a free PorkyProductionsID, insult streaks, the full achievements list, and the leaderboard. |
| [**Settings**](/docs/web-app/web-settings) | Profanity filtering, insult length limits, choosing which packs are active, and pack weighting. |
| [**Secrets**](/docs/web-app/web-secrets) | Easter eggs, hidden pages, and surprises worth discovering. |

**Quickstart:** Head to [demotivator.web.app](https://demotivator.web.app/), press the big red button, and receive your first insult. That's it. Everything else is optional.

---

### "I want to use the npm package in my own project."

The `demotivator` package gives you access to the full insult library and utility functions for selecting, combining, and retrieving insults programmatically. It works in any JavaScript or TypeScript environment — Node, browsers, Bun, Deno, whatever you've got.

| Guide | What You'll Learn |
| ----- | ----------------- |
| [**Package Overview**](/docs/demotivator/) | Installation, quickstart with code examples, and how the package is structured internally. Start here. |
| [**Types**](/docs/demotivator/types) | Every TypeScript type and interface the package exports: `Insult`, `InsultPack`, `InsultPackMap`, `CreateArrayConfig`, and more. |
| [**Packs**](/docs/demotivator/packs) | How the insult pack system works — available packs, data structures, combining packs with `createArray`, filtering explicit content, and how to add new packs. |
| [**API Reference**](/docs/demotivator/api) | Complete documentation for every exported function, the `deMotivator` object, and the `DeMotivator` class. |

**Quickstart:**

```bash
npm install demotivator
```

```typescript
import { generateInsult, insults } from 'demotivator';

const insult = generateInsult(insults);
console.log(insult);
// => "You're the human equivalent of a participation award"
```

That's the minimum viable roast. From there you can combine packs, use weighted selection, retrieve insults by index, and more — it's all in the guides above.

---

### "I want to contribute or understand the codebase."

Welcome aboard. Here's the lay of the land.

#### Repository Structure

The project is a **Turborepo monorepo** with packages in `packages/` and apps in `apps/`:

```
(de)Motivator/
├── packages/
│   ├── demotivator/       ← The npm insult package (TypeScript)
│   └── shared/            ← Shared utilities used across packages/apps
├── apps/
│   └── web/               ← The Svelte 5 web app (Firebase-hosted)
├── www/                   ← PWA assets & the preserved v1.0 original
├── docs/                  ← GitHub Pages redirect (legacy hosting)
├── turbo.json             ← Monorepo task orchestration
└── package.json           ← Root workspace config
```

#### Technology Stack

The npm package and web app use different technologies but share some tooling:

| Layer | Technology |
| ----- | ---------- |
| **Monorepo** | Turborepo |
| **Linting** | ESLint (config at repo root) |
| **Package** | TypeScript, published as `demotivator` on npm |
| **Web App** | Svelte 5 (Runes), TypeScript, Vite |
| **Web Styling** | Bootstrap (components) + Tailwind (utilities) |
| **Web Hosting** | Firebase Hosting + Firestore |
| **Web Auth** | Firebase Authentication (email/password + Google) |
| **Utilities** | Lodash, PorkyProductions HAT |

#### Development Setup

Prerequisites: Node 18+ and npm.

```bash
# Clone the repo
git clone https://github.com/PorkyProductions/deMotivator.git
cd deMotivator

# Install all dependencies (monorepo-wide)
npm install

# Start everything in dev mode via Turborepo
npm run dev
```

The web app will be available at `http://localhost:5173`. Turborepo handles building packages in the correct dependency order automatically.

#### Useful Scripts

From the repo root:

| Script | What It Does |
| ------ | ------------ |
| `npm run dev` | Start all dev servers via Turborepo. |
| `npm run build` | Production build across all packages and apps. |
| `npm run build:force` | Force rebuild, ignoring Turbo cache. |
| `npm run lint` | Lint all workspaces. |
| `npm run typeCheck` | Type-check all workspaces. |
| `npm run clean` | Remove caches and build artifacts. |

From the web workspace specifically:

| Script | What It Does |
| ------ | ------------ |
| `npm run preview --workspace demotivator-web` | Preview the production build locally. |
| `npm run push --workspace demotivator-web` | Deploy to Firebase (requires `firebase login`). |

#### Code Style at a Glance

The project has strong opinions. Here are the ones that matter most:

- **Tabs, not spaces.** Always.
- **Single quotes.** Always.
- **Semicolons.** Always.
- **Arrow functions only.** Never use `function` declarations.
- **camelCase everything.** Variables, functions, constants, file names. No UPPER_SNAKE_CASE.
- **No testing frameworks.** Testing is manual.
- **No external UI libraries** besides Bootstrap and Tailwind.
- **Lazy-load** modules and dependencies with `await import()` wherever possible.
- **Components under 200 lines.** Break them up if they're longer.

When the ESLint config and these guidelines disagree, the ESLint config wins. For the full details, see the `AGENTS.md` file in the repo root.

#### Commit Style

Commit titles should be terse — a general idea of what changed, with an emoji if it's funny. Commit *bodies* should be the opposite: detailed, longwinded, and overexplained. Reference contributors, PRs, issues, changed files, and related commits liberally.

#### Key Directories to Know

If you're looking for something specific:

| Looking For... | Go To... |
| -------------- | -------- |
| Web Svelte components | `apps/web/src/components/` |
| Web page-specific code | `apps/web/src/pages/` |
| Web utility modules | `apps/web/src/utils/` |
| Web styles | `apps/web/src/styles/` |
| Web Vite config | `apps/web/vite.config.ts` |
| Web Firebase config | `apps/web/firebase.json`, `apps/web/.firebaserc` |
| Firestore security rules | `apps/web/firestore.rules` |
| Package source code | `packages/demotivator/source/` |
| Shared utilities | `packages/shared/source/` |
| The original v1.0 app | `www/dmv1.html` (read-only, never modify) |

---

## Available Insult Packs

Both the npm package and the web app share the same set of insult packs:

| Pack | Key | Explicit? | Description |
| ---- | --- | --------- | ----------- |
| **Original** | `original` | No | The core collection. General-purpose insults, no profanity. The default pack. |
| **Profane** | `profane` | Yes | Strong language and mature content. Opt-in only. |
| **Halloween** 🎃 | `halloween` | No | Seasonal — ghosts, monsters, candy, and spooky roasts. |
| **Christmas** 🎄 | `christmas` | No | Seasonal — holiday-themed insults and festive burns. |

In the npm package, packs are accessed through `insultPacks`, `insultPackList`, and the individual named exports. In the web app, packs are managed through the Settings page. See [Packs (package)](./packs.md) or [Settings (web app)](./web-app-docs/web-settings.md) for details.

---

## Documentation Index

Every documentation file in this project, organized by audience:

### For Web App Users

| File | Description |
| ---- | ----------- |
| [`web-app-docs/web-overview.md`](/docs/web-app/web-overview) | App orientation and page directory. |
| [`web-app-docs/web-using-the-app.md`](/docs/web-app/web-using-the-app) | Generating, browsing, sharing, and submitting insults. |
| [`web-app-docs/web-accounts-and-progress.md`](/docs/web-app/web-accounts-and-progress) | Accounts, streaks, achievements, and the leaderboard. |
| [`web-app-docs/web-settings.md`](/docs/web-app/web-settings) | Content filtering, packs, and weighting. |
| [`web-app-docs/web-secrets.md`](/docs/web-app/web-secrets) | Easter eggs and hidden features. |

### For Package Consumers (Developers)

| File | Description |
| ---- | ----------- |
| [`overview.md`](/docs/overview) | Package installation, quickstart, and structure. |
| [`types.md`](/docs/types) | TypeScript type and interface reference. |
| [`packs.md`](/docs/packs) | The insult pack system in depth. |
| [`api.md`](/docs/api) | Full API reference for every export. |

---

## Links

| Resource | URL |
| -------- | --- |
| **Web App** | [demotivator.web.app](https://demotivator.web.app/) |
| **npm Package** | [npmjs.com/package/demotivator](https://www.npmjs.com/package/demotivator) |
| **GitHub** | [github.com/PorkyProductions/deMotivator](https://github.com/PorkyProductions/deMotivator) |
| **PorkyProductions** | [github.com/PorkyProductions](https://github.com/PorkyProductions) |

---

*Licensed under the ISC License. Copyright 2026, PorkyProductions, and contributors.*