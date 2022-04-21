# (de)Motivator.js

- [(de)Motivator.js](#demotivatorjs)
  - [Technologies Used](#technologies-used)
  - [Description](#description)
  - [Use Cases](#use-cases)
  - [Installation](#installation)
    - [via `npm`](#via-npm)
  - [Usage](#usage)
  - [Examples](#examples)
    - [HTML](#html)
    - [JavaScript](#javascript)
  - [Update Schedule](#update-schedule)
  - [License](#license)

## Technologies Used
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1920px-Npm-logo.svg.png" width="30px">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png" width="30px">
<img src="https://logos-download.com/wp-content/uploads/2019/01/JavaScript_Logo.png" width="30px">
<img alt="TypeScript" width="30px" src="https://blog.jeremylikness.com/blog/2019-03-05_typescript-for-javascript-developers-by-refactoring-part-1-of-2/images/1.jpeg"/>

## Description
An extensive JavaScript Library to integrate the power of (de)Motivator into your webapp.

## Use Cases
- Casually throw shade at your users.
- Need a random insult
- Just been roasted, and you dont feel like visiting [(de)Motivator](https://porkyproductions.github.io/deMotivator)
- You feel as if your userbase's ego is far too high

## Installation

### via `npm`

Install the `demotivator` package

```bash
npm i demotivator

```

Include the `demotivator` package in your `package.json` (this should be done automatically by npm)

In your javascript file, import the required packages

```javascript
import { insults, GenerateInsult } from 'demotivator';

```

## Usage
In your HTML, add any element with the id `insult`. This will be the element that will be updated with the insult.

Add any element, and pass the `onclick="GenerateInsult()"` attribute to it. This will be the element that will trigger the insult.


## Examples

This is an example for a basic web page integrated with (de)Motivator.js

### HTML

```html
<!--index.html-->
<!--As always, you'll need a module bundler like webpack or rollup to compile your code into a form the browser can understand. -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>(de)Motivator.js example</title>
    <script src="dist/js/index.js" defer></script>

    <!--Notice the "dist" directory ^^ -->
</head>
    <body>
    <br>
    <h1>(de)Motivator.js example</h1>
    <button onclick="GenerateInsult()">Click Me</button> 
    <br/>
    <div>
      <p id = "insult">
        Insult will appear here
      </p>

```


### JavaScript

```javascript
// src/index.js
// As always, you'll need a module bundler like webpack or rollup to compile your code into a form the browser can understand.
import { insults, GenerateInsult } from 'demotivator';

```

## Update Schedule
DMV.js will follow the same update schedule as [(de)Motivator](https://porkyproductions.github.io/deMotivator), with a release every 2-3 weeks.

## License

We are licenced under the Apache-2.0 licnse. Please see [LICENSE](LICENSE) for more information.
