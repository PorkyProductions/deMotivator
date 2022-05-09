# UADetect `maxTouchPoints` Componet

- [UADetect `maxTouchPoints` Componet](#uadetect-maxtouchpoints-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)
    - [#2](#2)

## Description

Returns the total number of touch points on a touch screen device (if the client is using a touch screen).

## Possible Returns

Any Number

## Usage Example

### #1

```js
import { maxTouchPoints } from 'uadetect';

if (maxTouchPoints >= 1 ) {
  console.log("You have " + maxTouchPoints + " touch points");
}
```

### #2

```js
import { maxTouchPoints } from 'uadetect';

if (maxTouchPoints < 1) {
  console.log("You are not using a touchscreen");
}
```