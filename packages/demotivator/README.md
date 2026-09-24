![demotivator.js](https://raw.githubusercontent.com/PorkyProductions/deMotivator.js/dev/images/dmvjslogo_tagline.png)

**Hand-curated insult packs and generation utilities for JavaScript/TypeScript.**

Part of the [(de)Motivator monorepo](https://github.com/PorkyProductions/deMotivator) by [PorkyProductions](https://github.com/PorkyProductions).

![npm](https://img.shields.io/npm/v/demotivator?color=CB3837&logo=npm&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

---

## Description

`demotivator` is a TypeScript library containing 500+ hand-curated insults organized into themed packs, along with utilities to generate, search, and transform them.

## Documentation

Full documentation at [demotivator.web.app/docs/demotivator](https://demotivator.web.app/docs/demotivator/).

## Installation

```bash
npm install demotivator
```

## Quick Start

```ts
import { generateInsult, purify, makeAngry, createArray } from 'demotivator';

// Random insult from the original pack
const insult = generateInsult();

// Censor profane words
const clean = purify(insult, '#');

// Make it ANGRY
const angry = makeAngry(clean, 5);

// Combine multiple packs
const custom = createArray({ packs: ['original', 'halloween'] });
const scary = generateInsult(custom);
```

## Insult Packs

| Key | Description | Explicit |
|---|---|---|
| `original` | The standard insult collection | No |
| `profane` | Adult-only insults with profanity | Yes |
| `halloween` | Spooky seasonal insults | No |
| `christmas` | Holiday-themed insults | No |
| `valentines` | Valentine's Day insults | No |
| `stPatricks` | St. Patrick's Day insults | No |

## API

### `generateInsult(array?)`

Returns a random insult from `array`. Defaults to the `original` pack.

```ts
import { generateInsult, insults } from 'demotivator';

generateInsult();         // random from original pack
generateInsult(insults);  // random from all insults combined
```

---

### `insultAt(position, array?)`

Returns the insult at a 1-based `position`. Defaults to the `original` pack.

```ts
import { insultAt } from 'demotivator';

insultAt(1); // first insult in the original pack
```

---

### `searchInsults(term, array?, withPosition?)`

Returns the most relevant insult matching `term`. Pass `withPosition: true` to also get the 1-based position.

```ts
import { searchInsults } from 'demotivator';

const insult = searchInsults('ugly');
const result = searchInsults('ugly', undefined, true);
// { insult: '...', position: 42 }
```

Relevance is ranked: exact match → prefix match → whole-word match → substring match.

---

### `createArray(config)`

Builds a custom insult array from one or more packs. Supports mixing built-in packs with custom ones.

```ts
import { createArray } from 'demotivator';

const array = createArray({ packs: ['original', 'halloween'] });

const withCustom = createArray({
	packs: ['original'],
	customPacks: [{
		key: 'mine',
		title: 'My Pack',
		explicit: false,
		insults: ['You use spaces instead of tabs.']
	}]
});
```

---

### `defineCustomPack(pack)`

TypeScript identity helper — returns its argument typed as `InsultPack` for full inference.

```ts
import { defineCustomPack } from 'demotivator';

const myPack = defineCustomPack({
	key: 'mine',
	title: 'My Pack',
	explicit: false,
	insults: ['You use spaces instead of tabs.']
});
```

---

### `packInfo(insult | position | searchResult, array?)`

Returns metadata about which pack an insult belongs to and its position within it.

```ts
import { generateInsult, packInfo } from 'demotivator';

const insult = generateInsult();
const info = packInfo(insult);
// { insult, packKey, packTitle, explicit, position }
```

---

### `purify(insult, symbol?)`

Masks profane words. Default symbol is `*`.

```ts
import { purify } from 'demotivator';

purify('You dumb ass.', '#'); // 'You dumb ###.'
```

---

### `porkify(insult, amount?)`

Inserts `'Porky'` into random positions in the insult. Default amount is `1`.

```ts
import { porkify } from 'demotivator';

porkify('You are terrible.', 2); // 'You Porky are Porky terrible.'
```

---

### `makeAngry(insult, exclamationCount?)`

Uppercases the insult, strips trailing punctuation, and appends exclamation marks. Default count is `3`.

```ts
import { makeAngry } from 'demotivator';

makeAngry('You are awful.', 5); // 'YOU ARE AWFUL!!!!!'
```

---

## Object / Class API

All functions are also available on the `deMotivator` default export object or the `DeMotivator` class:

```ts
import deMotivator, { DeMotivator } from 'demotivator';

deMotivator.generateInsult();

const dm = new DeMotivator();
dm.generateInsult();
```

---

## Raw Data Exports

| Export | Description |
|---|---|
| `insults` | All insults combined |
| `profaneInsults` | Explicit insults only |
| `halloweenInsults` | Halloween pack |
| `christmasInsults` | Christmas pack |
| `valentinesInsults` | Valentine's Day pack |
| `stPatricksInsults` | St. Patrick's Day pack |
| `insultPacks` | Map of all packs keyed by pack key |
| `insultPackList` | Array of all pack objects |

---

## License

ISC — see the LICENSE file for details.
