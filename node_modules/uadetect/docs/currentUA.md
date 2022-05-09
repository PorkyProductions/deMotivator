# UADetect `currentUA` Componet

- [UADetect `currentUA` Componet](#uadetect-currentua-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)
    - [#2](#2)

## Description

Gets the full user agent string of the client.

## Possible Returns

A DOMString specifying the complete user agent string the browser provides both in HTTP headers and in response to this and other related methods on the Navigator object.

The user agent string is built on a formal structure which can be decomposed into several pieces of info. Each of these pieces of info comes from other navigator properties which are also settable by the user.

## Usage Example

### #1

```js
import { currentUA } from 'uadetect';

console.log(`You are using ${currentUA}`);
```

### #2

```js
import { currentUA } from 'uadetect';

element.innerHTML = `You are using ${currentUA}`;
```