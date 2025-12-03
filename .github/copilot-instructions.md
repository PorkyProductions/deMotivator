# GitHub Copilot Instructions

## Project Context
This is (de)Motivator — a satirical web app that shows short, cheeky one-liners. Built with Svelte 5 + TypeScript, bundled with Vite, and deployed to Firebase hosting. We value pragmatic solutions over dogmatic conventions. No bikeshedding allowed. We like giraffes and hedgehogs.

## Quick Overview

- **Language/frameworks**: Svelte 5 (with Runes enabled) + TypeScript
- **Bundler**: Vite (config in `vite.config.ts`)
- **Hosting**: Firebase (`firebase.json` + `npm run push`)
- **UI**: Tailwind + Bootstrap (some customized theme files)
- **Insults/data**: provided by the `demotivator` npm package (dependency)

## Project Layout

```
/
  index.html              # Main web entry (NOT in src/)
  /src
    bootstrapper.ts       # Mounts Svelte app to #app
    App.svelte           # Top-level Svelte component
    /components          # All Svelte components
    /utils               # Helper functions and data
    /styles              # Global .scss files only
  /www                   # PWA assets (manifest, icons, service-worker.js)
  /android               # Capacitor Android project
  /ios                   # Capacitor iOS project
  /out                   # Build output directory
```

## Language and Framework Rules

### Svelte Components
- Use Svelte 5 (with runes) as the primary framework
- TypeScript for all helper functions and complex components
- Use JavaScript (not TypeScript) for simple components that:
  - Don't use props
  - Are highly reusable
  - Don't need type safety

### File Structure
- Entry point: root `index.html` (not `src/index.html`)
- `bootstrapper.ts` mounts the app
- Components in `/src/components`
- Utilities in `/src/utils`
- Global styles in `/src/styles`

## Code Style Requirements

### Formatting (Per ESLint Config)
- **Indentation**: TABS (not spaces)
- **Line endings**: Windows (CRLF)
- **Quotes**: Single quotes only `'like this'`
- **Semicolons**: ALWAYS use semicolons;
- **Line length**: No explicit limit, use common sense

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
- ✅ uv for Python (project-scoped virtual environments)
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

2. **Start dev server (Vite)**
   ```bash
   npm run dev
   ```
   - Runs `vite serve` on http://localhost:5173
   - Open root `index.html` in browser

3. **Preview production build locally**
   ```bash
   npm run build
   npm run preview
   ```
   - `npm run build` runs `vite build` (outputs to `out/`)
   - Note: `emptyOutDir: false` in config - builds don't auto-wipe `out/`

4. **Firebase deploy**
   ```bash
   npm run push
   ```
   - Ensure logged in: `firebase login`
   - Select project: `firebase use`

5. **Capacitor / Mobile**
   ```bash
   npm run capBuild
   ```
   - Syncs web assets to native projects
   - Use Android Studio / Xcode for `android/` and `ios/` projects

## Helpful npm Scripts

- `npm run dev` — start vite dev server
- `npm run build` — build for production
- `npm run preview` — preview production build locally
- `npm run push` — `firebase deploy`
- `npm run capBuild` — `cap sync`
- `npm run lint` — eslint (auto-fix)
- `npm run typeCheck` — TypeScript type check (noEmit)
- `npm run supportedBrowsers` — regenerates `src/utils/supportedBrowsers.ts`

## Important Implementation Notes

- **Entry point**: Root `index.html` (NOT `src/index.html`) loads `./src/bootstrapper.ts`
- **Multi-page app**: `vite.config.ts` sets `appType: "mpa"` with multiple HTML inputs (index, login, signUp, share, list, credits, leaderboard, 404/500)
- **Adding new pages**: Add them to `vite.config.ts` input array so they get built
- **Build output**: `rollupOptions.output.dir` set to `out/`
- **PWA assets**: `www/` directory (don't confuse with `out/`)
- **Known issue**: Duplicate import of `easterEggs.ts` in `index.html` (harmless)

## Git Commit Style

### Commit Title
- Keep it terse and not overly descriptive
- General idea of changes
- Add emoji if it's funny and enhances comedic value 🦒

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
- /src/components/Navbar.svelte - Added proper cleanup with onDestroy
- /src/utils/navbarHelpers.ts - Refactored the toggle logic to be more reusable

Also while I was in there I noticed the dark mode wasn't applying to the dropdown items so I added the appropriate Tailwind classes. Bootstrap was handling most of it but needed the extra dark: modifiers for the text color.

This should work with the deployment pipeline we set up in the GitHub Actions workflow.
```

## QA Checklist

1. **Fresh clone**
   ```bash
   npm ci
   ```

2. **Dev server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173 → confirm app mounts and button loads insults

3. **Lint & typecheck**
   ```bash
   npm run lint
   npm run typeCheck
   ```

4. **Production build + preview**
   ```bash
   npm run build
   npm run preview
   ```
   Confirm built pages load and static assets (icons/manifest) are available

5. **Deploy to Firebase** (if you have access)
   ```bash
   npm run push
   ```

## Where to Look for Things

- **Svelte components**: `src/components/`
- **Top-level app**: `src/App.svelte` and `src/bootstrapper.ts`
- **Styles**: `src/styles/` and `tailwind.config.cjs`
- **Vite config**: `vite.config.ts`
- **Capacitor config**: `capacitor.config.ts`
- **Firebase config**: `firebase.json`

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

**Questions / notes for the repo owner**: Enjoy working on (de)Motivator — ping me (or the vibecoder) with any clarifying preferences and I'll adapt the instructions.