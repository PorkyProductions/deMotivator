import type { bool } from '../typescript/types';
export let darkMode: bool = false;
export let bsTheme: 'light' | 'dark' = 'light';
const prefersDarkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
const detectDarkMode = () => {
	darkMode = prefersDarkModeMedia.matches;
	bsTheme = darkMode ? 'dark' : 'light';
};
detectDarkMode();
addEventListener('load', detectDarkMode);
addEventListener('focus', detectDarkMode);
prefersDarkModeMedia.addEventListener('change', detectDarkMode);
