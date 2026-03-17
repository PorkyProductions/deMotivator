---
title: 'Types'
description: 'TypeScript types and interfaces for the demotivator package.'
---

All types are defined in `typings.ts` and re-exported from the package root. Import them with the `type` keyword:

```typescript
import { type Insult, type InsultPack, type InsultPackMap, type CreateArrayConfig } from 'demotivator';
```

## `Insult`

```typescript
type Insult = string;
```

A semantic alias for `string`. Every insult in the package is typed as `Insult` rather than raw `string` to improve readability across the codebase. You can use it interchangeably with `string` — it exists purely for intent signaling.

## `InsultPack`

```typescript
interface InsultPack {
	key: string;
	title: string;
	explicit: boolean;
	insults: Insult[];
}
```

Represents a single themed collection of insults. Each pack has:

- **`key`** — A unique identifier used to look up the pack (e.g. `'original'`, `'profane'`).
- **`title`** — A human-readable display name (e.g. `'Halloween 🎃'`).
- **`explicit`** — Whether the pack contains profanity or mature content. Useful for filtering in consumer applications.
- **`insults`** — The array of `Insult` strings belonging to this pack.

## `InsultPackMap`

```typescript
type InsultPackMap = Record<string, InsultPack>;
```

A dictionary that maps pack keys to their `InsultPack` definitions. This is the type of the exported `insultPacks` object, which lets you look up any pack by its string key.

## `InsultPackKey`

```typescript
type InsultPackKey = keyof typeof import('./insults').insultPacks;
```

A union of the literal string keys for every built-in insult pack. As of the current version, this resolves to:

```typescript
'original' | 'profane' | 'halloween' | 'christmas'
```

This type is derived directly from the `insultPacks` object at compile time, so it updates automatically when new packs are added to the source. It is used to enforce type safety on functions like `createArray`, ensuring you can only pass valid pack identifiers.

## `CreateArrayConfig<TPackKey>`

```typescript
interface CreateArrayConfig<TPackKey extends string = InsultPackKey> {
	packs: TPackKey[];
	customPacks?: InsultPack[];
}
```

The configuration object accepted by `createArray`. It has two fields:

- **`packs`** — An array of built-in pack keys to include. The generic parameter `TPackKey` defaults to `InsultPackKey`, which means you get autocomplete and compile-time validation of pack names out of the box.
- **`customPacks`** *(optional)* — An array of user-supplied `InsultPack` objects. Their insults are appended after those from `packs`. Duplicate `key` values within `customPacks` are deduplicated — only the first occurrence of each key is used.

### Example

```typescript
import { defineCustomPack, createArray, type CreateArrayConfig } from 'demotivator';

// TypeScript will error if you pass an invalid built-in pack key
const config: CreateArrayConfig = {
	packs: ['original', 'halloween'],
};

// Extend with your own insults via customPacks
const myPack = defineCustomPack({ key: 'byoi', title: 'My Pack', explicit: false, insults: ['You tried.'] });
const poolWithCustom = createArray({ packs: ['original'], customPacks: [myPack] });
```

## `__DeMotivator<TPackKey>`

```typescript
interface __DeMotivator<TPackKey extends string = InsultPackKey> {
	insults: Insult[];
	profaneInsults: Insult[];
	halloweenInsults: Insult[];
	christmasInsults: Insult[];
	insultPacks: InsultPackMap;
	insultPackList: InsultPack[];
	createArray: (configuration: CreateArrayConfig<TPackKey>) => Insult[];
	generateInsult: (array: Insult[]) => Insult;
	insultAt: (position: number, array: Insult[]) => Insult;
}
```

The internal interface that both the `deMotivator` plain object and the `DeMotivator` class implement. It defines the full shape of the package's API surface. The double-underscore prefix signals that this type is intended for internal use — you generally won't need to reference it directly, but it is exported for advanced use cases like building custom wrappers.