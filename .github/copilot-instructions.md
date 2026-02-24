# (de)Motivator Agent Instructions

## Project Context
(de)Motivator is a set of two distinct packages. The primary packages is a enormous set of insults,
hand curated and split into "packs" that are grouped by theme. This is open source and published to the npm registry
as the `demotivator` package. The second of which is our (PorkyProductions) first party implementation of the package
in a web app format with numerous features added on top of it.

The app was started by request of Ryan Mullin (@hiteacheryouare) and initially created by Tristan Winata (@HedgehogDubz).
Today, both packages are actively maintained by Ryan, Tristan, and the PorkyProductions community.

## Quick Overview

### Repo-Wide:
- **Language**: Multiple
- **Build System**: Turborepo
- **Linting**: ESLint (configured in `.eslintrc.json` at repo root)

### Insult Package:
-- **Language/frameworks**: TypeScript (published as `demotivator` on npm)

### Web App:
- **Language/frameworks**: Svelte 5 (with Runes enabled) + TypeScript
- **Bundler**: Vite (config in `apps/web/vite.config.ts`)
- **Hosting**: Firebase (`apps/web/firebase.json, firestore.rules, .firebaserc`, config)
- **UI**: Tailwind + Bootstrap (some customized theme files)
- **Insults/data**: provided by the `demotivator` npm package (dependency)
- **Tools**: Lodash and PorkyProductions HAT

## Project Layout

This is a monorepo. When building, the main goal for this should be maximizing future growth and extensibility. Create
solutions that don't rely on hardcoding and one-off implementations that only work for this project. The insult package
espcially should be built with the mindset of being reusable and extensible for other projects. The web app should be built
with the mindset of being easily maintainable and extensible for future features and changes.

We host code-only packages in the `packages/` directory and full apps in the `apps/` directory.

When building/testing run the turbo scripts from the root, as they build the packages in the correct order.

- **Insult package**: `packages/demotivator/`
- **Shared utilities**: `packages/shared/` (for things that could be shared across multiple packages/apps in the future)
- **Web app**: `apps/web/`

## Language and Framework Rules

### Svelte Components
- Use Svelte 5 (with runes) as the primary framework for the web app.
- TypeScript for all helper functions and complex components
- Use JavaScript (not TypeScript) for simple components that:
    - Don't use props
    - Are highly reusable
    - Don't need type safety

## Code Style Requirements

### Formatting (Per ESLint Config)
- **Indentation**: TABS (not spaces)
- **Line endings**: Windows (CRLF)
- **Quotes**: Single quotes only `'like this'`
- **Semicolons**: ALWAYS use semicolons;
- **Line length**: No explicit limit, use common sense

For discrepancies, always prefer the eslint config rules.

### Naming Conventions
- **Everything**: camelCase
    - Variables: `myVariable`
    - Functions: `myFunction`
    - Constants: `myConstant` (NOT UPPER_SNAKE_CASE)
    - Files: `myComponent.svelte` or `myComponent.ts`

### Function Declarations
```javascript
// ✅ CORRECT - Named anonymous arrow functions
const myFunction = () => {
	// function body
};

// ✅ CORRECT - Anonymous default export
export default () => {
	// component body
};

// ❌ WRONG - Never use explicit function declaration
function myFunction() { } // NEVER DO THIS

// ❌ WRONG - Never name default exports
export default function MyComponent() { } // NEVER DO THIS
```

### Svelte Component Rules
- File name = Component name
- Maximum 200 lines per component
- If longer, break into smaller components with props/slots
- Move non-Svelte operations to `/src/utils` folder
- Exception: Reactive statements and component-critical logic stay in component
- Data for `{#each}` blocks go in separate files

Example structure:
```svelte
<!-- ❌ BAD - Everything in one file -->
<script lang="ts">
	const data = [/* lots of data */];
	const processData = () => { /* complex logic */ };
</script>

<div>{#each data as item}...{/each}</div>

<!-- ✅ GOOD - Separated concerns -->
<!-- In /src/utils/data.ts -->
export const data = [/* lots of data */];

<!-- In /src/utils/processData.ts -->
export const processData = () => { /* complex logic */ };

<!-- In /src/components/MyComponent.svelte -->
<script lang="ts">
	import { data } from '../utils/data';
	import { processData } from '../utils/processData';
</script>

<div>{#each data as item}...{/each}</div>
```

## Styling Rules

### MANDATORY Styling Approach
1. **Bootstrap COMPONENTS only** - Use for structural components (modals, cards, navbars, etc.)
2. **Tailwind for utility classes** - Use for spacing, colors, responsive design
3. **NEVER write raw CSS** - Exception: Global styles or overriding Bootstrap/Tailwind
4. **Use .scss files** (not .sass) - Only for global styles when absolutely necessary
5. **Dark mode**: Include Tailwind dark mode classes for everything

```svelte
<!-- ✅ CORRECT -->
<div class="card">
	<div class="card-body p-4 dark:bg-gray-800">
		<h2 class="text-2xl font-bold dark:text-white">Title</h2>
	</div>
</div>

<!-- ❌ WRONG - Don't use other UI libraries -->
<script>
	import { Card } from '@shadcn/ui'; // NEVER
	import { Dialog } from '@headlessui/react'; // NEVER
</script>
```

## What Copilot Should NEVER Suggest

### Absolute Prohibitions
1. **NO testing libraries** - We test manually only
2. **NO external UI libraries** - Only Bootstrap and Tailwind
    - No shadcn/ui
    - No headlessui
    - No Material-UI
    - No Chakra UI
    - No other component libraries
3. **NO explicit function declarations** - Always use arrow functions
4. **NO `var` keyword** - **Exception**: Single-use variables without hoisting issues
5. **NO .sass files** - Use .scss instead
6. **NO mainstream conventions just because they're popular**
7. **NO magic** - codemods and random naming conventions that do crazy things just because they are named a certain way should be avoided at all costs. All things should be explicit and easy to understand.

### Error Handling
When errors occur:
1. Git revert to last working version
2. Try a different approach
3. Don't overcomplicate error handling

### Comments
- Only comment complex/unreadable code with esoteric operators
- No unnecessary comments for simple code
- No JSDoc unless absolutely needed

## 📦 Dependency & Environment Management

**Local-First, Project-Scoped Everything**
- Every project should have its own isolated dependency environment
- No global installations unless absolutely unavoidable
- Dependencies should live in the project directory where you can see and delete them
- Reproducibility > convenience

**Preferred Patterns:**
- ✅ npm with local node_modules
- ✅ Local package installation that you can `rm -rf` when things break

**Rejected Patterns:**
- ❌ CDN imports (looking at you, `<script src="https://cdn..."`)
- ❌ URL-based package imports (Deno's import maps)
- ❌ Globally-scoped package managers (pip's default behavior)
- ❌ Forced remote coupling (Go's GitHub requirement)

**Why:**
- If your internet dies, your project should still work
- If a CDN goes down, your site shouldn't break
- If you delete a project folder, all traces should vanish with it
- Dependencies should be *tangible things you can inspect*, not abstract remote references

**Golden Rule:**
If I can't `cd` into it, `ls` it, and `rm -rf` it, I don't trust it.

## How to Run (Local Dev)

Assumptions: Node 18+ and npm installed.

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start monorepo dev (Turbo)**
   ```bash
   npm run dev
   ```
    - Runs `turbo run dev` from repo root.
    - For web-only dev, run `npm run dev --workspace demotivator-web`.

3. **Build + preview the web app**
   ```bash
   npm run build
   npm run preview --workspace demotivator-web
   ```
    - Root `npm run build` runs Turbo builds across packages/apps.
    - Web output lives in `apps/web/out/`.

4. **Deploy web app to Firebase**
   ```bash
   npm run push --workspace demotivator-web
   ```
    - Ensure logged in: `firebase login`
    - Select project: `firebase use`

## Helpful npm Scripts

- **Root (Turbo):**
    - `npm run dev` — run all `dev` tasks via Turbo
    - `npm run build` — run all `build` tasks via Turbo
    - `npm run build:force` — force rebuild without cache
    - `npm run lint` — run lint across workspaces
    - `npm run typeCheck` — run type checks across workspaces
    - `npm run clean` — run Turbo clean + remove root caches
- **Web workspace (`demotivator-web`):**
    - `npm run preview --workspace demotivator-web` — preview web production build
    - `npm run push --workspace demotivator-web` — deploy web app to Firebase
    - `npm run supportedBrowsers --workspace demotivator-web` — regenerate `apps/web/src/utils/supportedBrowsers.ts`

## Important Implementation Notes

- **Web entry points**: HTML files are in `apps/web/*.html` and load page entry files from `apps/web/src/`
- **Main web page entry**: `apps/web/index.html` loads `./src/bootstrapper.ts`
- **Multi-page app**: `apps/web/vite.config.ts` sets `appType: "mpa"` with inputs for index, login, signUp, list, settings, leaderboard, admin, 404, and 500
- **Adding new pages**: Add the HTML file and include it in `apps/web/vite.config.ts` `rollupOptions.input`
- **Build output**: web output dir is `apps/web/out/`
- **PWA assets**: canonical source is repo-root `www/`, copied into `apps/web/out/` during web `postbuild`

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

## QA Checklist

1. **Fresh clone**
   ```bash
   npm ci
   ```

2. **Dev server (Turbo)**
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173 → confirm web app mounts and button loads insults

3. **Lint & typecheck**
   ```bash
   npm run lint
   npm run typeCheck
   ```

4. **Production build + preview**
   ```bash
   npm run build
   npm run preview --workspace demotivator-web
   ```
   Confirm built pages load and static assets (icons/manifest) are available

5. **Deploy to Firebase** (if you have access)
   ```bash
   npm run push --workspace demotivator-web
   ```

## Where to Look for Things

- **Web Svelte components**: `apps/web/src/components/`
- **Top-level web app**: `apps/web/src/App.svelte` and `apps/web/src/bootstrapper.ts`
- **Web styles**: `apps/web/src/styles/` and `apps/web/tailwind.config.cjs`
- **Web Vite config**: `apps/web/vite.config.ts`
- **Web Firebase config**: `apps/web/firebase.json`, `apps/web/firestore.rules`, `apps/web/.firebaserc`
- **Package code**: `packages/demotivator/source/` and `packages/shared/source/`
- **Monorepo task orchestration**: root `turbo.json`

## Data Fetching
- Avoid complex data fetching libraries unless absolutely necessary
- Keep it simple with native fetch or basic implementations

## Philosophy
- Pragmatic solutions over dogmatic adherence to "best practices"
- Avoid bikeshedding at all costs
- Conventions are guidelines, not laws
- Keep things simple and working
- If mainstream conventions conflict with these rules, ignore the conventions

## Remember
When in doubt:
1. Use arrow functions
2. Use Bootstrap components + Tailwind utilities
3. Keep components under 200 lines
4. Don't overthink it
5. Giraffes and hedgehogs are cool 🦒🦔

---

Always ask claifying questions if needed
