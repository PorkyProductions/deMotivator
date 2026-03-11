---
title: 'API Reference'
description: 'Every exported function, object, and class in the demotivator package.'
---

# API Reference

Everything documented here is exported from the package root:

```typescript
import { generateInsult, insultAt, searchInsults, createArray, deMotivator, DeMotivator, type InsultSearchResult } from 'demotivator';
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
| `configuration` | `CreateArrayConfig<InsultPackKey>` | Object with a `packs` array of pack keys to include. |

**Returns:** `Insult[]`

The function deduplicates pack keys internally (via `Set`), looks each one up in the `insultPacks` registry, and concatenates their insult arrays into one. Unrecognized keys are silently skipped.

```typescript
import { createArray } from 'demotivator';

const pool = createArray({ packs: ['original', 'profane', 'christmas'] });
console.log(pool.length); // Sum of insults across those three packs
```

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
| `generateInsult` | `(array: Insult[]) => Insult` | Pick a random insult. |
| `insultAt` | `(position: number, array: Insult[]) => Insult` | Get insult at a 1-based index. |
| `searchInsults` | `(term: string, array?: Insult[], withPosition?: boolean) => Insult \| InsultSearchResult` | Find the most relevant insult for a search term. |

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