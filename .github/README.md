
# (de)Motivator 🔴

Also check out [(de)Motivator.js](https://github.com/PorkyProductions/deMotivator.js) for the JavaScript Library

**The Simple, Push-Button Way of Lowering your Self-Esteem**

**Brought to you by your friends at [PorkyProductions](https://porkyproductions.github.io/)**
![PorkyProdutions Logo](https://avatars.githubusercontent.com/u/82683662?s=200&v=4)


## 🚀 Features

- **Dynamic Insults**: Randomized insults from the `demotivator` npm package with extensible insult packs, plus optional user-specific insults.
- **Multi-Platform**: 
  - Web app hosted on **Firebase Hosting**.
- **Dark Mode**: Fully styled with **TailwindCSS** and **Bootstrap**, including dark mode support.
- **Leaderboard**: Track users who have seen the most insults.
- **Shareable Content**: Share insults via email or social media.
- **PWA Support**: Installable as a Progressive Web App.

---

## 🛠️ Tech Stack

- **Frontend**: Svelte 5 + TypeScript
- **Styling**: TailwindCSS + Bootstrap
- **Bundler**: Vite
- **Hosting**: Firebase Hosting
- **Data**: Firebase Firestore
- **Utilities**: 
  - `@porkyproductions/hat` for randomization and utility functions.
  - `demotivator` npm package for insult generation.

---

## 📂 Project Structure

This repository is a monorepo with the web app and local packages organized under apps/ and packages/.

- apps/web/ — the main Svelte 5 + TypeScript web app; contains src/bootstrapper.ts, App.svelte, HTML entry pages (index.html, login.html, etc.), and its own vite.config.ts; this is where the site is built and served. Production output goes to apps/web/out/.
- packages/demotivator/ — local npm package (published as `demotivator` on npm) providing insults and helper code (source/ → dist/), consumed by the web app.
- packages/shared/ — shared utility functions used across packages and apps in the monorepo (@demotivator/shared).
- www/ — PWA assets (manifest, icons, service-worker.js) and static files; copied into apps/web/out/ during postbuild.
- docs/ — legacy GitHub Pages redirect to the new Firebase-hosted app.

Top-level files: package.json, package-lock.json, turbo.json, LICENSE, and CI/config files; node_modules/ holds local dependencies.

See apps/web/src and packages/demotivator/source for the main application entry points and insult data.

---

## 🖥️ Local Development

### Prerequisites
- Node.js 25+
- npm

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/PorkyProductions/deMotivator.git
   cd deMotivator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   - Open your browser at [http://localhost:5173](http://localhost:5173).

4. Preview the production build:
   ```bash
   npm run build
   npm run preview --workspace demotivator-web
   ```

5. Deploy to Firebase:
   ```bash
   npm run push --workspace demotivator-web
   ```

---

## 📦 Deployment

### Firebase Hosting
1. Ensure you are logged into Firebase:
   ```bash
   firebase login
   ```
2. Deploy the app:
   ```bash
   npm run push --workspace demotivator-web
   ```

---

## 🎨 Styling

- **Bootstrap**: Used for structural components (e.g., modals, cards).
- **TailwindCSS**: Used for utility classes (e.g., spacing, colors, dark mode).
- **SCSS**: Global styles and theme overrides.

---

## 🧑‍💻 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## 📜 License

This project is licensed under the **ISC License**. See the LICENSE file for details.

---

## ❤️ Credits

- **Developers**: PorkyProductions (more specifically Ryan Mullin ([@hiteacheryouare](https://github.com/hiteacheryouare))) and contributors.
- **Creator** Tristan Winata ([@HedgehogDubz](https://github.com/HedgehogDubz))
- **Libraries**: 
  - Svelte
  - TailwindCSS
  - Bootstrap
  - Firebase
  - `@porkyproductions/hat`
  - `demotivator`
- **Special Thanks**: To all the users who keep coming back for more insults!

---

## 🌐 Links

- **Live App**: [https://demotivator.web.app](https://demotivator.web.app)
- **Dev Mode** [https://demotivator-dev.web.app](https://demotivator-dev.web.app)
- **GitHub Repo**: [https://github.com/PorkyProductions/deMotivator](https://github.com/PorkyProductions/deMotivator)

---

Enjoy the app, and remember: porky rules 🦔
