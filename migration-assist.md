# Migration Instructions: Svelte MPA to Next.js

## Project Overview
Migrating a multi-page Svelte application (using Vite MPA mode) to Next.js 14+ with App Router. The application has 8-10 separate pages connected via manual routing, uses Firebase for backend services, and needs to preserve all existing UI/UX functionality.

## Phase 1: Project Setup

### Task 1.1: Initialize Next.js Project
Create a new Next.js 14+ project with TypeScript, App Router, and Tailwind CSS (if applicable).

```bash
npx create-next-app@latest demotivator --typescript --app --tailwind
```

Configure the following in the new project:
- Enable TypeScript
- Configure any existing environment variables in `.env.local`

### Task 1.2: Create Route Structure
Based on the original Vite config rollup inputs, create the following Next.js App Router structure:

```
app/
├── page.tsx                    (index.html)
├── login/
│   └── page.tsx               (login.html)
├── sign-up/
│   └── page.tsx               (signUp.html)
├── share/
│   └── page.tsx               (share.html)
├── list/
│   └── page.tsx               (list.html)
├── credits/
│   └── page.tsx               (credits.html)
├── leaderboard/
│   └── page.tsx               (leaderboard.html)
├── not-found.tsx              (404.html)
├── error.tsx                  (500.html)
└── layout.tsx                 (root layout)
├── dmv-1/
│   └── dmv1.html              (the original demotivator. leave completely intact and with no changes)   

```

Create placeholder components for each route that export a basic React component with the page name as an h1.

## Phase 2: Firebase Setup

### Task 2.1: Install Firebase Dependencies
```bash
npm install firebase
```

### Task 2.2: Create Firebase Configuration
Create `lib/firebase.ts` (or `lib/firebase.js`) that:
- Imports Firebase SDK modules (auth, firestore, etc.)
- Initializes Firebase app with existing config object
- Exports initialized services (auth, db, etc.)
- Uses singleton pattern to prevent multiple initializations
- Only initializes on client-side (check `typeof window !== 'undefined'`)

Reference the existing Firebase configuration from the Svelte project and maintain the same initialization structure.

### Task 2.3: Create Firebase Context Provider (if needed)
If the original app uses Firebase authentication state globally:
- Create `components/providers/FirebaseProvider.tsx`
- Mark it as a client component with `'use client'`
- Wrap the app in `app/layout.tsx`
- Export auth state hooks for consumption in other components

## Phase 3: Component Migration

### Task 3.1: Identify Shared Components
List all reusable Svelte components from the original project (components used across multiple pages). Create a components directory structure:

```
components/
```

### Task 3.2: Convert Svelte Components to React
For each Svelte component, convert to React following these patterns:

**Svelte Reactivity → React State:**
```svelte
<!-- Svelte -->
let count = 0;
$: doubled = count * 2;
```
```typescript
// React
const [count, setCount] = useState(0);
const doubled = count * 2;
```

**Svelte Two-Way Binding → React Controlled Components:**
```svelte
<!-- Svelte -->
<input bind:value={name} />
```
```typescript
// React
<input value={name} onChange={(e) => setName(e.target.value)} />
```

**Svelte Stores → React Context/State:**
```svelte
<!-- Svelte -->
import { userStore } from './stores';
```
```typescript
// React
const user = useContext(UserContext);
// or use a state management library
```

**Svelte Events → React Event Handlers:**
```svelte
<!-- Svelte -->
<button on:click={handleClick}>
```
```typescript
// React
<button onClick={handleClick}>
```

### Task 3.3: Handle Client-Side Only Code
For components that use browser APIs or Firebase client SDK:
- Add `'use client'` directive at the top of the file
- Wrap browser-specific code in `useEffect` hooks
- Check for `typeof window !== 'undefined'` when necessary

## Phase 4: Page Migration

### Task 4.1: Convert Each Page Component
For each HTML entry point in the original Vite config:

1. Locate the root Svelte component loaded by that HTML file
2. Convert the component to React using patterns from Task 3.2
3. Place in the corresponding Next.js route from Task 1.2
4. Add `'use client'` directive if the page uses:
   - Browser APIs (localStorage, window, document)
   - Event handlers
   - React hooks (useState, useEffect, etc.)
   - Firebase client SDK

5. Preserve all existing functionality:
   - Form submissions
   - Data fetching logic
   - Authentication checks
   - Navigation flows

### Task 4.2: Migrate Navigation
Replace manual HTML navigation with Next.js navigation:

**Old approach (HTML links):**
```html
<a href="/login.html">Login</a>
```

**New approach (Next.js Link):**
```typescript
import Link from 'next/link';
<Link href="/login">Login</Link>
```

For programmatic navigation:
```typescript
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/dashboard');
```

## Phase 5: Styling Migration

### Task 5.1: Migrate CSS
- Copy global styles to `app/styles/globals.scss`
- Convert component-scoped styles:
  - Svelte `<style>` blocks → CSS Modules or Tailwind classes
  - Maintain existing class names and styling logic
- Maintain bootstrap and scss compatibility
- Use tailwind 4

### Task 5.2: Handle Dynamic Styles
Convert Svelte's dynamic style binding to React patterns:
```svelte
<!-- Svelte -->
<div style:color={userColor}>
```
```typescript
// React
<div style={{ color: userColor }}>
```

## Phase 6: Firebase Integration

### Task 6.1: Convert Firebase Authentication Flows
For login, signup, and authentication checks:
- Use Firebase auth methods from `lib/firebase.ts`
- Implement `onAuthStateChanged` in a provider or layout
- Create protected route logic if needed
- Maintain existing authentication UX

### Task 6.2: Convert Firestore Operations
For each Firestore operation in the original app:
- Maintain same collection/document structure
- Convert to async/await patterns if not already
- Wrap in `useEffect` for data fetching
- Consider using React Query or SWR for data management (optional)

### Task 6.3: Handle Firebase Security
Ensure Firebase operations respect client/server boundaries:
- Authentication should happen client-side
- Sensitive operations should validate user permissions
- Maintain existing security rules in Firebase console

## Phase 7: Environment Variables

### Task 7.1: Migrate Environment Variables
Convert Vite environment variables to Next.js format:

**Vite format:**
```
VITE_FIREBASE_API_KEY=xxx
```

**Next.js format (public):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
```

**Next.js format (server-only):**
```
FIREBASE_ADMIN_KEY=xxx
```

Note: Only variables prefixed with `NEXT_PUBLIC_` are accessible in client components.

## Phase 8: Testing & Validation

### Task 8.1: Test Each Route
For each migrated page:
- Verify the page loads correctly
- Test all interactive elements (buttons, forms, links)
- Confirm Firebase operations work (auth, database reads/writes)
- Check responsive design on mobile/tablet/desktop
- Validate navigation between pages

### Task 8.2: Test Firebase Authentication
- Test signup flow
- Test login flow
- Test logout functionality
- Verify protected routes redirect correctly
- Test password reset (if applicable)
- Confirm user session persistence

### Task 8.3: Cross-Browser Testing
Test the application in:
- Chrome
- Firefox
- Safari
- Edge

### Task 8.4: Performance Validation
- Run Lighthouse audit
- Check bundle size compared to original
- Verify no console errors or warnings
- Test loading speeds

## Phase 9: Deployment

### Task 9.1: Configure Deployment Platform
If deploying to Vercel:
- Connect GitHub repository
- Configure environment variables in Vercel dashboard
- Set up preview deployments for testing

If deploying elsewhere:
- Configure build command: `npm run build`
- Set output directory: `.next`
- Configure environment variables

### Task 9.2: Update Firebase Configuration
- Update authorized domains in Firebase console
- Update OAuth redirect URLs (if using)
- Test authentication in production environment

## Phase 10: Post-Migration Cleanup

### Task 10.1: Documentation
- Update README with new setup instructions
- Document any architectural changes
- Add comments for complex migration decisions
- Create deployment documentation

### Task 10.2: Remove Old Code
Once fully migrated and tested:
- Archive or delete the original Svelte project
- Remove any temporary migration files
- Clean up unused dependencies

## Common Pitfalls & Solutions

### Issue: Hydration Errors
**Solution:** Ensure client and server render the same content. Move dynamic content that depends on browser APIs to `useEffect`.

### Issue: Firebase Not Initialized
**Solution:** Verify Firebase initialization only happens client-side. Wrap in `typeof window` check or use `'use client'` directive.

### Issue: Styles Not Loading
**Solution:** Check CSS import paths. Ensure CSS modules use `.module.css` extension and are imported correctly.

### Issue: Authentication State Lost on Refresh
**Solution:** Implement `onAuthStateChanged` listener in a provider that wraps the app in `layout.tsx`.

### Issue: Environment Variables Undefined
**Solution:** Ensure public variables are prefixed with `NEXT_PUBLIC_`. Restart dev server after changing `.env.local`.

## Migration Checklist

- [ ] Next.js project initialized with TypeScript
- [ ] All routes created in app directory
- [ ] Firebase configuration migrated
- [ ] Firebase authentication provider set up
- [ ] All shared components converted to React
- [ ] All page components converted to React
- [ ] Navigation updated to use Next.js Link
- [ ] Styles migrated (global and component-level)
- [ ] Environment variables converted
- [ ] All Firebase operations tested
- [ ] Authentication flows working
- [ ] Cross-browser testing completed
- [ ] Performance validated
- [ ] Deployment configured
- [ ] Documentation updated

## Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Firebase JavaScript SDK](https://firebase.google.com/docs/web/setup)
- [React Hooks Reference](https://react.dev/reference/react)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)