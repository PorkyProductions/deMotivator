import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindCss from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://demotivator.web.app',
	base: '/docs',
	vite: {
		plugins: [tailwindCss()]
	},
	integrations: [
		starlight({
			title: '(de)Motivator Developer',
			description: 'Documentation for the demotivator package and web app.',
			customCss: ['./src/styles/custom.css']
		})
	]
});
