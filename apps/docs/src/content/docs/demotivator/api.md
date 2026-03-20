---
title: 'API Reference'
description: 'Every exported function, object, and class in the demotivator package.'
---

# API Reference

Everything documented here is exported from the package root:

```typescript
import {
	generateInsult,
	insultAt,
	searchInsults,
	createArray,
	purify,
	packInfo,
	porkify,
	makeAngry,
	deMotivator,
	DeMotivator,
	type InsultSearchResult,
	type InsultPackInfo
} from 'demotivator';
```

## Functions

### `generateInsult(array?)`

Returns a pseudorandom insult from the provided array. Internally delegates to `pickRandom` from `@demotivator/shared`.

| Parameter | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `array` | `Insult[]` | `insults` (original pack) | The pool of insults to select from. |

**Returns:** `Insult`

**Throws:** `Error` if the array is empty or the random selection fails.

```typescript
import { generateInsult, insults } from 'demotivator';

const insult = generateInsult(insults);
```

You can pass any `Insult[]` — including one built with `createArray` — to randomize across multiple packs:

```typescript
import { generateInsult, createArray } from 'demotivator';

const pool = createArray({ packs: ['original', 'halloween'] });
const insult = generateInsult(pool);
```

---

### `insultAt(position, array?)`

Returns the insult at a specific position in an array. Uses **1-based indexing** (the first insult is at position `1`, not `0`).

| Parameter | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `position` | `number` | — | The 1-based index of the insult to retrieve. |
| `array` | `Insult[]` | `createArray({ packs: ['original'] })` | The pool to index into. |

**Returns:** `Insult`

**Throws:**

- `TypeError` if `position` is not an integer.
- `RangeError` if `position` is less than `1` or greater than `array.length`.
- `Error` if the resolved element is falsy (safety check).

```typescript
import { insultAt } from 'demotivator';

const first = insultAt(1);           // First insult in the original pack
const fifth = insultAt(5, myArray);  // Fifth insult in a custom array
```

---

### `createArray(configuration)`

Builds a flat `Insult[]` by merging one or more packs together. Introduced in version 12.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `configuration.packs` | `InsultPackKey[]` | Built-in pack keys to include. |
| `configuration.customPacks` | `InsultPack[]` (optional) | User-supplied packs to append after built-in packs. |

**Returns:** `Insult[]`

The function deduplicates built-in pack keys internally (via `Set`), looks each one up in the `insultPacks` registry, and concatenates their insult arrays. Unrecognized keys are silently skipped. If `customPacks` is provided, each pack's insults are appended in order; duplicate `key` values among custom packs are also deduplicated.

```typescript
import { createArray } from 'demotivator';

const pool = createArray({ packs: ['original', 'profane', 'christmas'] });
console.log(pool.length); // Sum of insults across those three packs
```

Pass `customPacks` to inject your own insults alongside built-in ones:

```typescript
import { createArray, defineCustomPack, generateInsult } from 'demotivator';

const myPack = defineCustomPack({ key: 'byoi', title: 'My Pack', explicit: false, insults: ['You tried.'] });
const pool = createArray({ packs: ['original'], customPacks: [myPack] });
const insult = generateInsult(pool);
```

---

### `defineCustomPack(pack)`

An identity-function helper for defining a custom insult pack with full TypeScript inference and IDE autocomplete.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `pack` | `InsultPack` | The custom pack object to define. |

**Returns:** `InsultPack` (the same object passed in, unchanged)

`defineCustomPack` has zero runtime overhead — it returns its argument as-is. Its sole purpose is to give TypeScript the correct type at the call site so that missing fields or mistyped values are caught at compile time.

```typescript
import { defineCustomPack } from 'demotivator';

const myPack = defineCustomPack({
	key: 'byoi',
	title: 'My Custom Pack',
	explicit: false,
	insults: ['You tried.', 'Almost counts in horseshoes.'],
});
```

Pass the result to `createArray` via the `customPacks` field. See the [Custom Packs](/demotivator/packs#custom-packs) guide for full usage details.

---

### `searchInsults(term, array?)`

Searches the provided insult array and returns the single most relevant match for `term`. Relevance is ranked by the following priority:

| Priority | Condition |
| -------- | --------- |
| 1 (highest) | The insult exactly equals the term (case-insensitive). |
| 2 | The insult starts with the term. |
| 3 | The term appears as a complete word inside the insult. |
| 4 | The term appears anywhere as a substring. |

When multiple insults share the same highest score, the first one encountered is returned.

| Parameter | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `term` | `string` | — | The search string to match against each insult. |
| `array` | `Insult[]` | `createArray({ packs: ['original'] })` | The pool of insults to search. |
| `withPosition` | `boolean` | `false` | When `true`, returns an `InsultSearchResult` instead of a plain string. |

**Returns:** `Insult` when `withPosition` is `false` (default), or `InsultSearchResult` when `true`.

`InsultSearchResult` has two fields:

| Field | Type | Description |
| ----- | ---- | ----------- |
| `insult` | `Insult` | The most relevant insult found. |
| `position` | `number` | 1-based index of the insult in the array — pass it directly to `insultAt`. |

**Throws:**

- `Error` if the array is empty.
- `Error` if no insult matches the term.

```typescript
import { searchInsults } from 'demotivator';

// Default — returns a plain string
const insult = searchInsults('stupid');

// withPosition: true — returns { insult, position }
const { insult, position } = searchInsults('stupid', undefined, true);
```

The `position` value is 1-based, matching `insultAt`, so you can round-trip directly:

```typescript
import { searchInsults, insultAt } from 'demotivator';

const { position } = searchInsults('stupid', undefined, true);
const same = insultAt(position); // retrieves the exact same insult
```

You can search across multiple packs by passing a custom array built with `createArray`:

```typescript
import { searchInsults, createArray } from 'demotivator';

const pool = createArray({ packs: ['original', 'halloween'] });
const result = searchInsults('ghost', pool);
```

---

### `purify(insult, symbol?)`

Masks known profanity words in an insult string with a replacement symbol.

| Parameter | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `insult` | `Insult` | — | Insult text to sanitize. |
| `symbol` | `string` | `'*'` | Replacement symbol or token used for masking. |

**Returns:** `Insult`

**Throws:**

- `TypeError` if `insult` is not a string.
- `Error` if `insult` is empty.
- `TypeError` if `symbol` is empty or not a string.

```typescript
import { purify } from 'demotivator';

const safe = purify('You are so fucking stupid');
// => 'You are so ******* stupid'

const alt = purify('You are so fucking stupid', '#');
// => 'You are so ####### stupid'
```

---

### `packInfo(insult | position | searchResult, array?)`

Finds the first built-in pack containing an insult and returns pack metadata with a 1-based position.

Supported signatures:

- `packInfo(insult: Insult)`
- `packInfo(position: number, array?: Insult[])`
- `packInfo(searchResult: InsultSearchResult, array?: Insult[])`

**Returns:** `InsultPackInfo`

**Throws:** `Error` if the insult is not found in any built-in pack.

```typescript
import { createArray, searchInsults, insultAt, packInfo } from 'demotivator';

const target = insultAt(1);
const info = packInfo(target);
// => { insult, packKey: 'original', packTitle: 'Original', explicit: false, position: 1 }

const pool = createArray({ packs: ['original', 'halloween'] });
const found = searchInsults('ghost', pool, true);
const roundTripped = insultAt(found.position, pool);
const samePackInfo = packInfo(found, pool);
// `samePackInfo.insult` matches `roundTripped`
```

---

### `porkify(insult, amount?)`

Inserts the token `Porky` into random positions in the insult.

| Parameter | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `insult` | `Insult` | — | Insult text to modify. |
| `amount` | `number` | `1` | Number of `Porky` insertions. Must be a positive integer. |

**Returns:** `Insult`

```typescript
import { porkify } from 'demotivator';

const result = porkify('You are a toaster', 2);
// One possible output: 'You Porky are a Porky toaster'
```

---

### `makeAngry(insult, exclamationCount?)`

Uppercases an insult, strips trailing punctuation, and appends exclamation points.

| Parameter | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `insult` | `Insult` | — | Insult text to transform. |
| `exclamationCount` | `number` | `3` | Number of exclamation marks to append. Must be a positive integer. |

**Returns:** `Insult`

```typescript
import { makeAngry } from 'demotivator';

makeAngry('you are a walnut.');
// => 'YOU ARE A WALNUT!!!'

makeAngry('you are a walnut...', 5);
// => 'YOU ARE A WALNUT!!!!!'
```

---

## `deMotivator` Object

The default export. A plain object that bundles every piece of the API into a single namespace. Implements the `__DeMotivator` interface.

```typescript
import deMotivator from 'demotivator';
```

### Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `insults` | `Insult[]` | The original (core) insult array. |
| `profaneInsults` | `Insult[]` | The profane insult array. |
| `halloweenInsults` | `Insult[]` | The Halloween insult array. |
| `christmasInsults` | `Insult[]` | The Christmas insult array. |
| `insultPacks` | `InsultPackMap` | All packs keyed by their string ID. |
| `insultPackList` | `InsultPack[]` | All packs as an array. |

### Methods

| Method | Signature | Description |
| ------ | --------- | ----------- |
| `createArray` | `(config: CreateArrayConfig) => Insult[]` | Merge packs into a single array. |
| `defineCustomPack` | `(pack: InsultPack) => InsultPack` | Type-safe helper for defining a custom pack. |
| `generateInsult` | `(array: Insult[]) => Insult` | Pick a random insult. |
| `insultAt` | `(position: number, array: Insult[]) => Insult` | Get insult at a 1-based index. |
| `searchInsults` | `(term: string, array?: Insult[], withPosition?: boolean) => Insult \| InsultSearchResult` | Find the most relevant insult for a search term. |
| `purify` | `(insult: Insult, symbol?: string) => Insult` | Mask profane words in a string. |
| `packInfo` | `(insult: Insult) => InsultPackInfo` | Get first matching built-in pack metadata and position. |
| `porkify` | `(insult: Insult, amount?: number) => Insult` | Insert `Porky` at random positions. |
| `makeAngry` | `(insult: Insult, exclamationCount?: number) => Insult` | Uppercase text and append exclamation marks. |

```typescript
const pool = deMotivator.createArray({ packs: ['original', 'halloween'] });
const insult = deMotivator.generateInsult(pool);
```

---

## `DeMotivator` Class

A class-based alternative to the `deMotivator` object. Also implements `__DeMotivator`. The key difference is that its `generateInsult` and `insultAt` methods **default to the original pack** when called without arguments, via a private `__createBasicArray()` helper.

```typescript
import { DeMotivator } from 'demotivator';

const dm = new DeMotivator();
```

### Properties

Identical to the `deMotivator` object:

| Property | Type |
| -------- | ---- |
| `insults` | `Insult[]` |
| `profaneInsults` | `Insult[]` |
| `halloweenInsults` | `Insult[]` |
| `christmasInsults` | `Insult[]` |
| `insultPacks` | `InsultPackMap` |
| `insultPackList` | `InsultPack[]` |

### Methods

#### `createArray(configuration)`

Same behavior as the standalone `createArray` function.

```typescript
const pool = dm.createArray({ packs: ['profane'] });
```

#### `generateInsult(array?)`

Returns a random insult. If `array` is omitted, defaults to the original pack (built internally via `__createBasicArray()`).

```typescript
const insult = dm.generateInsult();           // Random from 'original'
const spooky = dm.generateInsult(dm.halloweenInsults); // Random from Halloween
```

#### `insultAt(position, array?)`

Returns the insult at a 1-based position. If `array` is omitted, defaults to the original pack.

```typescript
const tenth = dm.insultAt(10);                // 10th insult in 'original'
const third = dm.insultAt(3, dm.profaneInsults); // 3rd profane insult
```

#### `searchInsults(term, array?, withPosition?)`

Returns the most relevant insult matching `term`. If `array` is omitted, defaults to the original pack. Pass `withPosition: true` to get an `InsultSearchResult` instead of a plain string.

```typescript
const insult = dm.searchInsults('dumb');                              // plain string
const { insult, position } = dm.searchInsults('dumb', undefined, true); // with position

const spooky = dm.searchInsults('ghost', dm.halloweenInsults);        // Halloween pack
```

---

## Choosing an API Style

| Style | Best For |
| ----- | -------- |
| **Named imports** (`generateInsult`, `createArray`, etc.) | Tree-shaking, minimal bundle size, functional codebases. |
| **`deMotivator` object** | Namespace-style access, passing the full API as a single dependency. |
| **`DeMotivator` class** | Instance-based patterns, convenient defaults (no need to pass the insult array every time). |

All three styles expose the same underlying logic — pick whichever fits your project's conventions.
