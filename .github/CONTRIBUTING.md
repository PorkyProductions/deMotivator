# (de)Motivator 🔴 Contribution Guidelines


This document defines the mandatory standards for contributing to the (de)Motivator monorepo, including:
- `packages/demotivator` (npm insult generation package)
- `packages/shared` (shared utilities)
- `apps/web` (Svelte 5 + TypeScript web application)

This project operates under a centralized governance model, strict architectural standards, a controlled branching system (feature/* → dev → Stable), and explicit formatting and dependency rules.

Non-compliant contributions will be rejected.

Method / Reasoning

These guidelines exist to:
- Preserve long-term extensibility
- Protect production stability
- Maintain deterministic Turbo builds
- Prevent architectural decay
- Enforce formatting and style uniformity
- Protect Firebase-hosted production deployments
- Safeguard the integrity of the published demotivator npm package

This is not a consensus-driven repository. Final authority rests with maintainers.


## Repository Overview

(de)Motivator is a Turborepo-managed monorepo structured as:

```
/
├── apps/web                # Svelte 5 + TypeScript web app
├── packages/demotivator   # Insult generation npm package
├── packages/shared        # Shared utilities
├── www                    # PWA assets (copied during postbuild)
└── turbo.json             # Task orchestration
```

Build order is enforced by Turbo:

```
shared → demotivator → web
```

All builds must be executed from the repository root.

## Governance Model

This repository operates under centralized maintainership.
- **Primary Maintainer:** Ryan Mullin
- **Co-Founder:** Tristan Winata
- **Organization:** PorkyProductions

Maintainers retain unilateral authority over:
- Merge approvals
- Branch protections
- Release timing
- npm publishing
- Firebase deployment
- Contributor access

Contribution does not grant governance rights.

## Branching Policy (Mandatory)

### Branch Hierarchy

The repository uses a controlled branching structure:
- Stable → Production-ready branch
- dev → Integration branch
- `feature/*` , `fix/*` , `refactor/*` → Individual development branches


### Required Merge Flow

All work must follow:

`feature/* → dev → Stable`

Direct merges into Stable are prohibited.

Pull Requests must target dev.


### Feature Branch Rules

Feature branches must:
- Be created from dev
- Be singular in scope
- Avoid unrelated changes
- Remain focused and clean

Naming examples:

- `feature/insultPackExpansion`
- `fix/leaderboardOverflow`
- `refactor/navbarCleanup`


### Promotion to Stable

dev may only be merged into Stable when:
- Lint passes
- Type checking passes
- Full Turbo build succeeds
- Manual QA checklist completed
- No runtime regressions
- No Firebase rule regressions
- No performance degradation
- No architectural violations

Promotion is typically performed solely by Ryan Mullin.

This is not a voting process.


### Emergency Policy

If Stable is compromised:
- Immediate revert
- Root cause identification
- Patch in dev
- Re-validation
- Controlled re-promotion

Hotfix authority remains with maintainers.


## Development Setup

Prerequisites
- Node 18+ (25 preferred)
- npm
- No global installs unless unavoidable

Install

```bash
npm install
```

Development (Turbo)

```bash
npm run dev
```

Web-only:

```bash
npm run dev --workspace demotivator-web
```

### Environment Variables (Required for apps/web)

Before running the web app, add Firebase environment variables in `apps/web/.env`.

Required keys:

```bash
VITE_FB_API_KEY=
VITE_FB_AUTH_DOMAIN=
VITE_FB_PROJECT_ID=
VITE_FB_STORAGE_BUCKET=
VITE_FB_MESSAGING_SENDER_ID=
VITE_FB_APP_ID=
VITE_FB_MEASUREMENT_ID=
```

Use values from your Firebase project settings. If these are missing, Firebase-dependent features (auth, leaderboard, account sync, etc.) will not work correctly.

All builds must be executed from the root.

## Formatting & Code Standards (Non-Negotiable)

Formatting is enforced via ESLint at the repository root.

Mandatory rules:
- Tabs for indentation
- CRLF line endings
- Single quotes '
- Semicolons required
- camelCase naming for all identifiers
- camelCase file names

> [!WARNING]
> If ESLint disagrees with your formatting, ESLint is correct.

## Function Declaration Policy

Allowed:

```js
const myFunction = () => {
	// body
};

export default () => {
	// component
};
```

Forbidden:

```js
function myFunction() {}
export default function MyComponent() {}
``` 

Arrow functions only.

## Web Application Standards (apps/web)

### Framework
- Svelte 5 (Runes enabled)
- TypeScript for complex components
- JavaScript for simple reusable components

### Component Limits
- Maximum 200 lines per component
- Extract logic to /src/utils
- Separate data for {#each} blocks
- Keep components maintainable


### Styling Policy (Mandatory)
- Bootstrap → structural components only
- TailwindCSS → utility classes
- Dark mode support required
- .scss only (no .sass)
- No raw CSS except global overrides

### Prohibited:
- External UI libraries (MUI, Chakra, shadcn, headlessui, etc.)
- Alternative CSS frameworks
- Custom component libraries


## Insult Package Standards (packages/demotivator)

The demotivator package must remain:
- Framework-agnostic
- Dependency-minimal
- Deterministic
- Extensible
- Reusable outside this repository

Do not introduce web-specific coupling.

Insult packs:
- Must be abstract and randomized
- Must not target real individuals
- Must not contain illegal content
- Must remain modular and grouped by theme


## Dependency Philosophy

Local-first, project-scoped dependency management only.

Allowed:
- Local npm installs
- Tangible node_modules

Prohibited:
- CDN imports
- URL-based package imports
- Forced remote coupling
- Global-only dependency reliance

> [!WARNING]
If it cannot be deleted with rm -rf, it does not belong here.


## Testing Policy

This project uses manual testing.

Do not introduce:
- Jest
- Vitest
- Cypress
- Playwright
- Any testing framework

If a change breaks functionality:
- Revert
- Attempt alternative solution
- Keep it simple

## Pull Request Requirements

All PRs must:
- Target `dev`
- Pass lint
- Pass typeCheck
- Build successfully
- Remain focused in scope
- Avoid opportunistic refactors

PRs may be closed without merge.

Maintainer decisions are final.


## Commit Policy

Commit frequently.

### Commit Title
- Short
- Clear
- Emoji permitted

### Commit Body

Must be:
- Detailed
- Explicit
- Long-form
- Reference issues, PRs, contributors, files changed

Superficial commit messages will be rejected.


## Firebase & Deployment

Production deployment must occur from validated code.

Standard flow:

```bash
npm run build
npm run preview --workspace demotivator-web
npm run push --workspace demotivator-web
```

Deployment from unstable branches is prohibited.


## npm Publishing Policy

For packages/demotivator:
- Only publish from Stable
- Version bumps must reflect validated changes
- dev may contain unreleased code
- Publishing from dev is prohibited unless authorized

Package integrity is non-negotiable.

## Prohibited Contributions

The following will be rejected:
- Overengineering
- Magic abstractions
- Dependency creep
- Testing frameworks
- External UI libraries
- Raw CSS overuse
- Hardcoded architecture
- ESLint violations
- Breaking dark mode
- Direct Stable merges

Repeated violations may result in access removal.


## Stability Philosophy
- Stable protects production users and npm consumers.
- dev absorbs risk.
- Feature branches isolate change.
- Architecture is preserved deliberately.

This structure is enforced.


## Final Authority Clause

PorkyProductions and its maintainers reserve full discretion over:
- Branch protections
- Merge approvals
- Release timing
- Contributor access
- Policy modification

Participation in this repository constitutes acceptance of these guidelines.
