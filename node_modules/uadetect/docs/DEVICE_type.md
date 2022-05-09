# UADetect `DEVICE_type` Componet

- [UADetect `DEVICE_type` Componet](#uadetect-device_type-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)
    - [#2](#2)

## Description

Shows whether the client is using a mobile, desktop, or tablet device.

## Possible Returns

- `mobile`  
- `tablet`
- `desktop`

## Usage Example

### #1

```js
import { DEVICE_type } from 'uadetect';

if (DEVICE_type === 'mobile') {
  element.style.display = 'none';
}
```

### #2

```js
import { DEVICE_type } from 'uadetect';

if (DEVICE_type === 'desktop') {
  element.style.display = 'block';
}
```