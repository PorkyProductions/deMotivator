# UADetect `browserRam` Componet

- [UADetect `browserRam` Componet](#uadetect-browserram-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)

## Description

The amount of ram the client has.

The reported value is imprecise to curtail fingerprinting. It's approximated by rounding down to the nearest power of 2, then dividing that number by 1024. It is then clamped within lower and upper bounds to protect the privacy of owners of very low- or high-memory devices. 

## Possible Returns

A floating point number; one of:
- 0.25,
- 0.5
- 1
- 2
- 4
- 8

## Usage Example

### #1

```js
import { browserRam } from 'uadetect';

console.log(`You have ${browserRam} GB of RAM`);
```