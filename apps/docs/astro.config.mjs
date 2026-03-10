import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://demotivator.web.app',
	base: '/docs',
	integrations: [
		starlight({
			title: '(de)Motivator Developer',
			description: 'Documentation for the demotivator package and web app.',
			customCss: ['./src/styles/custom.css']
		})
	]
});
