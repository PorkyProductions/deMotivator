# UADetect `robotStatus` Componet

- [UADetect `robotStatus` Componet](#uadetect-robotstatus-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)
    - [#2](#2)

## Description

Tells whether the client is being operated by a webdriver (robot) or not.

## Possible Returns

- `ROBOT_controlled`
- `HUMAN_controlled`
- `ERROR`

## Usage Example

### #1

```js
import { robotStatus } from 'uadetect';

if (robotStatus === 'ROBOT_controlled') {
  alert('🤖')
}
```

### #2

```js
import { robotStatus } from 'uadetect';

if (robotStatus === 'HUMAN_controlled') {
  alert('👤')
}
```