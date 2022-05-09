# SETUP

- [SETUP](#setup)
  - [Initalize Project](#initalize-project)
  - [Download](#download)
  - [Project Structure](#project-structure)
    - [NOTE:](#note)
  - [Next Section](#next-section)

## Initalize Project

Run the following command in your terminal to setup a basic node.js project (skip if you've already done this):

```bash
npm init
```
npm will then ask you a few questions, and then create a `package.json` file for you. Once this is done, move on to the next step.

## Download
Downloading the package can be done in one command.

```bash
npm i -d uadetect
```

This will add the package to your project, and then install all of the dependencies. To verify that the process has completed, check your `package.json` file.

## Project Structure

In your `index.html` file, add the following code to your `<head>` section:

```html
<script type="module" src="src/uadetect.js"></script>
```
Then, create a `src` directory, and add the following code to your `src/uadetect.js` file:

```js
import {  } from 'uadetect';
```

### NOTE:
It's important that you leave the `{  }` in the import statement, as it will be used later on to selectively import the components you need.

## Next Section

<button>[Componets Overview](componets.md)</button>