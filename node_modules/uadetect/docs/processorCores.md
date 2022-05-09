# UADetect `processorCores` Componet

- [UADetect `processorCores` Componet](#uadetect-processorcores-componet)
  - [Description](#description)
  - [Possible Returns](#possible-returns)
  - [Usage Example](#usage-example)
    - [#1](#1)
    - [#2](#2)

## Description

Get's the amount of cores the client has in their CPU.

## Possible Returns

A number between 1 and the number of logical processors potentially available to the user agent.

Modern computers have multiple physical processor cores in their CPU (two or four cores is typical), but each physical core is also usually able to run more than one thread at a time using advanced scheduling techniques. So a four-core CPU may offer eight logical processor cores, for example. The number of logical processor cores can be used to measure the number of threads which can effectively be run at once without them having to context switch.

The browser may, however, choose to report a lower number of logical cores in order to represent more accurately the number of Workers that can run at once, so don't treat this as an absolute measurement of the number of cores in the user's system. 

## Usage Example

### #1

```js
import { processorCores } from 'uadetect';

if (processorCores > 16) {
  alert('You have a quad core CPU');
}
```

### #2

```js
import { processorCores } from 'uadetect';

if (processorCores <= 4 ) {
  alert('You have a dual core CPU');
}
```