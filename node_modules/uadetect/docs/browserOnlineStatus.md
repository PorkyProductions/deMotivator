# UADetect `browserOnlineStatus` Componet

- [UADetect `browserOnlineStatus` Componet](#uadetect-browseronlinestatus-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)
    - [#2](#2)

## Description

Tell's if the client's browser is online or offline.

## Possible Returns

- `BROWSER_online`
- `BROWSER_offline`

## Usage Example

### #1

```js
import { browserOnlineStatus } from 'uadetect';

if (browserOnlineStatus === 'BROWSER_online') {
  // Load the webpage from server
}
```

### #2

```js
import { browserOnlineStatus } from 'uadetect';

if (browserOnlineStatus === 'BROWSER_offline') {
  // Load the webpage from cache
}
```