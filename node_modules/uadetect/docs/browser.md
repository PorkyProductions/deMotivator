# UADetect `browser` Componet

- [UADetect `browser` Componet](#uadetect-browser-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)
    - [#2](#2)

## Description

Get's the name of the browser that the client is using.

## Possible Returns

- `Opera`
- `Chrome`
- `Firefox`
- `Safari`
- `IE`
- `Edge`
- `Unknown`

## Usage Example

### #1

```js
import { browser } from 'uadetect';

if (browser === 'IE') {
  element.innerHTML = 'Sorry, IE is not supported';
}
```

### #2

```js
import { browser } from 'uadetect';

if (browser === 'Chrome') {
  element.innerHTML = 'You are using Chrome';
  // Do Something
}
```