# [(de)Motivator](https://demotivator.web.app)

Also check out [(de)Motivator.js](https://github.com/PorkyProductions/deMotivator.js) for the JavaScript Library

**The Simple, Push-Button Way of Lowering your Self-Esteem**

**Brought to you by your friends at [PorkyProductions](https://porkyproductions.github.io/)**
![PorkyProdutions Logo](https://avatars.githubusercontent.com/u/82683662?s=200&v=4)

- [(de)Motivator](#demotivator)
- [How to Download](#how-to-download)
  - [For desktop](#for-desktop)
    - [PWA](#pwa)
    - [Windows Native](#windows-native)
  - [For Android](#for-android)
  - [For iOSc](#for-iosc)
- [Technologies Used](#technologies-used)
- [Available On](#available-on)
- [Tour](#tour)


# How to Download

## For desktop
### PWA
Navigate to [(de)Motivator Web](https://demotivator.web.app). Your browser should prompt you to install the app to your system.
### Windows Native
Navigate to the [releases page](https://github.com/PorkyProductions/deMotivator/releases), and select one of the installer options. We reccomend the `demotivator.(version).setup.exe` file for the easiest experience
## For Android
Navigate to [(de)Motivator Web](https://demotivator.web.app). Your browser should prompt you to install the app to your system. If not, you may need to add the website to your home screen.

Alternatively, you may want to build the app from its source. Becuase the app is not available on the play store, you must build the APK yourself. Navigate to the [releases page](https://github.com/PorkyProductions/deMotivator/releases) and download `android.zip`, open the extracted folder in android studio, and build the app from source there.
## For iOSc
Navigate to [(de)Motivator Web](https://demotivator.web.app). You will need to add the website to your home screen.

Alternatively, becuase the app is not available on the app store, you may want to build the app from its source. Navigate to the [releases page](https://github.com/PorkyProductions/deMotivator/releases) and download `ios.zip`, and open the extracted folder in Xcode. You can build the app from source there


# Technologies Used

<img alt="HTML5" width="26px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png" /><img alt="CSS3" width="20px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png" /><img alt="TypeScript" width="26px" src="https://blog.jeremylikness.com/blog/2019-03-05_typescript-for-javascript-developers-by-refactoring-part-1-of-2/images/1.jpeg"/><img alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" /><img alt="TailwindCSS" width="26px" src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"><img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="bootstrap" width="30px" /><img src="https://user-images.githubusercontent.com/236501/105104854-e5e42e80-5a67-11eb-8cb8-46fccb079062.png" alt="capacitor" width="100px"><img src="https://avatars.githubusercontent.com/u/23617963?s=200&v=4" width="30px" alt="svelte">

# Available On
<img src="https://user-images.githubusercontent.com/3104648/28351989-7f68389e-6c4b-11e7-9bf2-e9fcd4977e7a.png" alt="PWA" width="100px"><br>
<img src="https://static.wikia.nocookie.net/logopedia/images/6/63/IOS_wordmark_%282017%29.svg/revision/latest/scale-to-width-down/200?cb=20170621150256" alt="iOS" width="85px"><br>
<img src="https://developer.android.com/images/brand/Android_Robot.png" alt="android" width="75"><br>
<img src="https://static.wikia.nocookie.net/logopedia/images/b/b3/Windows_2021.svg/revision/latest?cb=20220510113535" alt="windows" width="150">

# Tour

This is a **monorepo**, meaning multiple apps are being hosted from this one repository. Let's take a tour of all of the directories

- `.github/` 
  - this hosts all of the files for maintaining the upstream repository on GitHub, additionally
  - `/workflows`
    - the CI workflows used in GitHub actions
- `.vscode/`
  - configuration files for Visual Studio code users. Most importantly, the reccomended extentions
- `android/`
  - the andorid port of (de)Motivator. Open this folder in android studio to run the android app
- `docs/`
  - This is the redirect file used to redirect users who used the legacy GitHub pages link to the new firebase link. 
- `electron/`
  - The Desktop port of (de)Motivator. Works as a standard node.js project would.
- `ios/`
  -  the iOS port of (de)Motivator. Open this folder in Xcode to run the iOS app
- `src/`
  - `components/`
    - all of the svelte UI components for the main website.
  - `icons/`
    - All icons and sizes of icons used in the apps.
  - `pages/`
    - different directories for the different pages of the site. Purely for organization
  - `styles/`
    - All of the `.css` and `.scss` files used for manual styling
  - `typescript/`
    - All of the typescript files used for manual scripting used outside of the svelte files
  - `App.svelte`
    - This is main svelte file for the `index.html`
  - `bootstrapper.ts`
    - This is what links the `html` file to the svelte file for vite
  - `vite-env.d.ts`
- `www/`
  - All files needed to maintain the PWA of the app. 
- `./`
  - The root of the project contains misc config files, as well as the `.html` files that vite uses as entry points to the app. 