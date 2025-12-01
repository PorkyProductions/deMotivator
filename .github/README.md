
# (de)Motivator 🦔

Also check out [(de)Motivator.js](https://github.com/PorkyProductions/deMotivator.js) for the JavaScript Library

**The Simple, Push-Button Way of Lowering your Self-Esteem**

**Brought to you by your friends at [PorkyProductions](https://porkyproductions.github.io/)**
![PorkyProdutions Logo](https://avatars.githubusercontent.com/u/82683662?s=200&v=4)


## 🚀 Features

- **Dynamic Insults**: Randomized insults from the `demotivator` npm package, with optional user-specific insults.
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

```bash
/
├── index.html              # Main web entry point
├── src/
│   ├── App.svelte          # Top-level Svelte component
│   ├── bootstrapper.ts     # Mounts the app
│   ├── components/         # Reusable Svelte components
│   ├── pages/              # Page-specific Svelte components
│   ├── typescript/         # Helper functions and logic
│   ├── styles/             # Global SCSS styles
│   └── utils/              # Utility functions
├── www/                    # PWA assets (manifest, icons, etc.)
├── android/                # Capacitor Android project
├── ios/                    # Capacitor iOS project
├── out/                    # Build output directory
└── docs/                   # Documentation and redirects
```

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
   npm run preview
   ```

5. Deploy to Firebase:
   ```bash
   npm run push
   ```

6. Build for mobile:
   ```bash
   npm run capBuild
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
   npm run push
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
  - Capacitor
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
