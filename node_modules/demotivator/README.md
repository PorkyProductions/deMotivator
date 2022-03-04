# (de)Motivator.js

- [(de)Motivator.js](#demotivatorjs)
  - [Technologies Used](#technologies-used)
  - [Description](#description)
  - [Use Cases](#use-cases)
  - [Installation](#installation)
    - [via `npm`](#via-npm)
    - [via JavaScript](#via-javascript)
  - [Usage](#usage)
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

In your javascript file, import the `demotivator` package

`var demotivator = require("demotivator")`


### via JavaScript
Create a JavaScript file, and add the code from the [`index.js`](https://raw.githubusercontent.com/PorkyProductions/deMotivator.js/main/index.js) to it. Add the JavaScript to your HTML file via a `<script>` tag.

## Usage
In your HTML, add a `<p>` element with the id `insult`. This will be the element that will be updated with the insult.

Add any element, and pass the `onclick="GenerateInsult()"` attribute to it. This will be the element that will trigger the insult.

## Update Schedule
DMV.js will follow the same update schedule as [(de)Motivator](https://porkyproductions.github.io/deMotivator), with a release every 2-3 weeks.

## License

We are licenced under the Apache-2.0 licnse. Please see [LICENSE](LICENSE) for more information.
