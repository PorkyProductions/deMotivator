# UADetect `OS` Componet

- [UADetect `OS` Componet](#uadetect-os-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)
    - [#2](#2)

## Description

Get's the name of the Operating System that the client is using.

## Possible Returns

- `Windows`
- `Mac`
- `Linux`
- `Android`
- `iOS`
- `unknown`

## Usage Example

### #1

```js
import { OS } from 'uadetect';

if (OS === 'Windows') {
  element.innerHTML = 'Download on the Microsoft Store!';
}
```

### #2

```js
import { OS } from 'uadetect';

if (OS === 'Mac') {
  element.innerHTML = 'Download on the Mac App Store!'
}
```