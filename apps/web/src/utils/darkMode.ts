import type { bool } from '../typescript/types'
export let darkMode: bool = false
export let bsTheme: "light" | "dark" = "light"
function detectDarkMode() {
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? (darkMode = true)
      : (darkMode = false);
}
detectDarkMode();
addEventListener("load", detectDarkMode)
addEventListener("focus", detectDarkMode)
if (darkMode) {
  bsTheme = "dark"
}