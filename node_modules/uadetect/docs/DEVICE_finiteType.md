# UADetect `DEVICE_finiteType` Componet

- [UADetect `DEVICE_finiteType` Componet](#uadetect-device_finitetype-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)
    - [#2](#2)
    - [#3](#3)

## Description

Get's the name of the **MOBILE** Operating System the client is using.

## Possible Returns

- `iOS`
- `Android`
- `BlackBerry`
- `Windows Phone`
- `webOS`
- `unknown`

## Usage Example

### #1

```js
import { DEVICE_finiteType } from 'uadetect';

if (DEVICE_finiteType === 'iOS') {
  downloadOniOS.innerHTML = 'Download on iOS!';
}
```

### #2

```js
import { DEVICE_finiteType } from 'uadetect';

if (DEVICE_finiteType === 'Android') {
  downloadOnAndroid.innerHTML = 'Download on Android!'; 
}
```

### #3

```js
if (DEVICE_finiteType === 'Windows Phone') {
  ew.innerHTML = 'Who uses windows phone???';
}
```