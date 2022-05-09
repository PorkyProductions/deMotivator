# UADetect `cookieStatus` Componet

- [UADetect `cookieStatus` Componet](#uadetect-cookiestatus-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)
    - [#2](#2)

## Description

Tell's whether the client has cookies enabled or disabled.

## Possible Returns

- `COOKIES_enabled`
- `COOKIES_notEnabled`
- `ERROR`

## Usage Example

### #1

```js
import { cookieStatus } from 'uadetect';

if (cookieStatus === 'COOKIES_enabled') {
  document.cookie = 'test=test';
}
```

### #2

```js
import { cookieStatus } from 'uadetect';

if (cookieStatus === 'COOKIES_notEnabled') {
  element.innerHTML = 'You should enable cookies to use this website';
}
```