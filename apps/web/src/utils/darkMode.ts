import type { bool } from '../typescript/types';
export let darkMode: bool = false;
export let bsTheme: 'light' | 'dark' = 'light';
const detectDarkMode = () => {
	darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
};
detectDarkMode();
addEventListener('load', detectDarkMode);
addEventListener('focus', detectDarkMode);
if (darkMode) {
	bsTheme = 'dark';
}
