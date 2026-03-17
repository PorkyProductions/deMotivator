---
title: 'Insult Packs'
description: 'How the insult pack system works and how to create custom insult arrays.'
---

Insults in the `demotivator` package are organized into **packs** — themed collections that can be selected, combined, or filtered independently. The pack system is defined in `insults.ts` and is the primary way consumers interact with the insult data.

## Available Packs

| Key | Title | Explicit | Description |
| --- | ----- | -------- | ----------- |
| `original` | Original | No | The core insult collection. General-purpose, no profanity. |
| `profane` | Profane | Yes | Contains strong language and mature content. |
| `halloween` | Halloween 🎃 | No | Seasonal insults themed around Halloween. |
| `christmas` | Christmas 🎄 | No | Seasonal insults themed around Christmas. |
| `valentines` | Valentine's Day 💝 | No | Seasonal insults themed around Valentine's Day. |
| `stPatricks` | St. Patrick's Day ☘️ | No | Seasonal insults themed around St. Patrick's Day. |

## Data Structures

The package exposes pack data in several forms so you can choose the access pattern that fits your use case.

### Individual Arrays

Each pack's insult array is exported directly as a named constant:

```typescript
import { insults, profaneInsults, halloweenInsults, christmasInsults, valentinesInsults, stPatricksInsults } from 'demotivator';
```

These give you direct access to the raw `Insult[]` arrays for each pack. This is useful when you know exactly which pack you want and don't need the pack metadata.

### Pack Registry (`insultPacks`)

```typescript
import { insultPacks } from 'demotivator';

const halloween = insultPacks.halloween;
console.log(halloween.title);    // 'Halloween 🎃'
console.log(halloween.explicit); // false
console.log(halloween.insults);  // Insult[]
```

`insultPacks` is a keyed object (`InsultPackMap`) where each value is a full `InsultPack` with metadata. Use this when you need to look up packs dynamically or need access to the `explicit` flag and `title`.

### Pack List (`insultPackList`)

```typescript
import { insultPackList } from 'demotivator';

for (const pack of insultPackList) {
	console.log(`${pack.title}: ${pack.insults.length} insults`);
}
```

`insultPackList` is the same data as `insultPacks`, but as an `InsultPack[]` array. This is convenient for iteration, rendering UI lists, or any scenario where you want to loop over every available pack.

## Combining Packs with `createArray`

The `createArray` function lets you merge multiple packs into a single flat `Insult[]` array. You pass it a `CreateArrayConfig` with the pack keys you want to include:

```typescript
import { createArray, generateInsult } from 'demotivator';

const pool = createArray({ packs: ['original', 'halloween', 'christmas'] });
const insult = generateInsult(pool);
```

Under the hood, `createArray` deduplicates the pack keys using a `Set`, looks each one up in the `insultPacks` registry, and concatenates their insult arrays. If a key doesn't match any known pack, it is silently skipped.

### Filtering Explicit Content

Since each `InsultPack` has an `explicit` boolean, you can programmatically build safe or unfiltered pools:

```typescript
import { insultPackList, createArray } from 'demotivator';

// Only non-explicit packs
const safePacks = insultPackList
	.filter((pack) => !pack.explicit)
	.map((pack) => pack.key);

const safePool = createArray({ packs: safePacks });
```

## Adding New Packs

To add a new pack to the package:

1. Define a new `Insult[]` array in `insults.ts` with the insults for your pack.
2. Add an entry to the `insultPacks` object with a unique key, a title, the `explicit` flag, and a reference to your array.
3. Export the new array as a named export from `insults.ts`.
4. Re-export it from `index.ts` if you want it available as a top-level import.
5. Add the corresponding properties to the `deMotivator` object and `DeMotivator` class in `index.ts`.
6. Update the `__DeMotivator` interface in `typings.ts` to include the new property.

Because `InsultPackKey` is derived from the keys of the `insultPacks` object at compile time, TypeScript will automatically include your new key in the union type — no manual type updates needed for the key itself.

## Custom Packs

If you want to supply your own insults without modifying the package source, use **custom packs**. A custom pack is any object that satisfies the `InsultPack` interface — you define it in your own code and pass it directly to `createArray` via the `customPacks` option.

Custom packs are **not registered globally**. They apply only to the single `createArray` call where they are passed, keeping the built-in registry immutable and side-effect free.

### Defining a Custom Pack

Use `defineCustomPack` to get TypeScript inference and IDE autocomplete when building your pack object:

```typescript
import { defineCustomPack } from 'demotivator';

const myPack = defineCustomPack({
	key: 'byoi',
	title: 'My Custom Pack',
	explicit: false,
	insults: [
		'You tried.',
		'Almost counts in horseshoes.',
		'Points for effort, I suppose.',
	],
});
```

`defineCustomPack` is an identity function — it returns its argument unchanged. Its only purpose is to give TypeScript the correct type so that missing fields or mistyped values are caught at compile time.

### Passing Custom Packs to `createArray`

Once defined, pass your pack(s) to `createArray` via the `customPacks` field:

```typescript
import { defineCustomPack, createArray, generateInsult } from 'demotivator';

const myPack = defineCustomPack({
	key: 'byoi',
	title: 'My Custom Pack',
	explicit: false,
	insults: ['You tried.', 'Almost counts in horseshoes.'],
});

const pool = createArray({ packs: [], customPacks: [myPack] });
const insult = generateInsult(pool);
```

### Mixing Custom and Built-in Packs

Custom packs can be combined with built-in ones in the same call:

```typescript
const pool = createArray({
	packs: ['original', 'halloween'],
	customPacks: [myPack],
});
```

`createArray` processes built-in packs first, then appends each custom pack's insults in order. Duplicate custom pack keys are deduplicated — if you pass the same `key` more than once, only the first occurrence is used.

### Filtering Explicit Content in Custom Packs

The `explicit` flag on your custom pack is purely metadata — `createArray` does not filter by it automatically. If you want to exclude explicit custom packs, filter before passing:

```typescript
import { insultPackList, createArray } from 'demotivator';

const myPacks = [safePack, explicitPack]; // your custom packs

const pool = createArray({
	packs: insultPackList.filter((p) => !p.explicit).map((p) => p.key),
	customPacks: myPacks.filter((p) => !p.explicit),
});
```