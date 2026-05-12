import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
	site: 'https://demotivator.web.app',
	base: '/docs',
	vite: {
		css: {
			postcss: {
				plugins: [tailwindcss()]
			}
		}
	},
	integrations: [
		starlight({
			title: '(de)Motivator Developer',
			description: 'Documentation for monorepo packages, web app architecture, and operations.',
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Introduction',
					slug: 'introduction'
				},
				{
					label: 'npm Package',
					items: [
								{ label: 'Overview', slug: 'demotivator' },
								{ label: 'Insult Packs', slug: 'demotivator/packs' },
								{ label: 'Types', slug: 'demotivator/types' },
								{ label: 'API reference', slug: 'demotivator/api' }
							]
				},
				{
					label: 'Web App',
					items: [
						{ label: 'Overview', slug: 'web-app/web-overview' },
						{ label: 'Using the App', slug: 'web-app/web-using-the-app' },
						{ label: 'Accounts & Progress', slug: 'web-app/web-accounts-and-progress' },
						{ label: 'Settings', slug: 'web-app/web-settings' },
						{ label: 'Secrets & Easter Eggs', slug: 'web-app/web-secrets' }
					]
				},
				{
					label: 'Release Notes',
					items: [
						{ label: '(de)Motivator 1.0', slug: 'release-notes/1-0' },
						{ label: '(de)Motivator 2.0', slug: 'release-notes/2-0' },
						{ label: '(de)Motivator 3.0', slug: 'release-notes/3-0' },
						{ label: '(de)Motivator 4.0', slug: 'release-notes/4-0' },
						{ label: '(de)Motivator 5', slug: 'release-notes/5-0' },
						{ label: '(de)Motivator 6', slug: 'release-notes/6-0' },
						{ label: '(de)Motivator 7', slug: 'release-notes/7-0' },
						{ label: '(de)Motivator 8', slug: 'release-notes/8-0' },
						{ label: '(de)Motivator 9', slug: 'release-notes/9-0' },
						{ label: '(de)Motivator 9.1', slug: 'release-notes/9-1' },
						{ label: '(de)Motivator X', slug: 'release-notes/10-0' },
						{ label: '(de)Motivator 11', slug: 'release-notes/11-0' },
						{ label: '(de)Motivator 12', slug: 'release-notes/12-0' },
						{ label: '(de)Motivator 13', slug: 'release-notes/13-0' },
						{ label: '(de)Motivator 13.2', slug: 'release-notes/13-2' },
						{ label: '(de)Motivator 14', slug: 'release-notes/14-0'}
					]
				}
			]
		})
	]
});
