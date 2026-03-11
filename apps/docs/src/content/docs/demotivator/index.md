---
title: 'demotivator'
description: 'Purpose, exports, and data model for the published npm package.'
---

`demotivator` is an open-source npm package containing a curated collection of insults organized into themed packs. It is maintained by [PorkyProductions](https://github.com/PorkyProductions) and licensed under the Apache License 2.0.

The package is designed to be **reusable and extensible** — it ships both raw insult data and utility functions for selecting, combining, and retrieving insults programmatically. It serves as the data layer for the (de)Motivator web app, but can be used independently in any JavaScript or TypeScript project.

## Installation

```bash
npm install demotivator
```

## Quickstart

There are three ways to use the package depending on your preference: **named imports** for tree-shaking, the **`deMotivator` object** for a namespace-style API, or the **`DeMotivator` class** for an instance-based approach.

### Named Imports (recommended)

```typescript
import { generateInsult, insults, createArray } from 'demotivator';

// Random insult from the original pack
const insult = generateInsult(insults);

// Random insult from a custom combination of packs
const pool = createArray({ packs: ['original', 'halloween'] });
const seasonalInsult = generateInsult(pool);
```

### Object API

```typescript
import deMotivator from 'demotivator';

const insult = deMotivator.generateInsult(deMotivator.insults);
```

### Class API

```typescript
import { DeMotivator } from 'demotivator';

const dm = new DeMotivator();

// Defaults to the 'original' pack when no array is provided
const insult = dm.generateInsult();
```

## Package Structure

The package source lives in `packages/demotivator/` within the monorepo and is published to npm as `demotivator`. Internally it is organized into four modules:

| Module             | Purpose                                                    |
| ------------------ | ---------------------------------------------------------- |
| `typings.ts`       | All TypeScript types and interfaces                        |
| `insults.ts`       | Raw insult arrays, pack definitions, and the pack registry |
| `generateinsult.ts`| Functions for selecting insults from an array              |
| `index.ts`         | Public API surface — re-exports, `createArray`, `deMotivator` object, and `DeMotivator` class |

## Documentation Map

- **[Types](./types.md)** — TypeScript type definitions and interfaces
- **[Packs](./packs.md)** — How the insult pack system works
- **[API Reference](./api.md)** — Every exported function, object, and class