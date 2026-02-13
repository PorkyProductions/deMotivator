# deMotivator Monorepo

This repository is managed with Turborepo and npm workspaces.

## Workspace layout

- `apps/web` — the main deMotivator web app (`demotivator-web`)
- `packages/demotivator` — the published npm package (`demotivator`)
- `apps/admin` — reserved for future admin app work (not scaffolded yet)

## Commands

Run from repository root:

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typeCheck`

## Publishing `demotivator`

The npm package source lives in `packages/demotivator` and is published from that workspace.
Use a dry run locally with:

```bash
npm publish --dry-run --workspace demotivator
```

Remote/cloud cache is not configured for this Turborepo setup.
