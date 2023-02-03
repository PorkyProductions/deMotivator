import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess({
		// default options are shown. On some platforms
		// these options are set automatically — see below
		pages: 'build',
		assets: 'build',
		fallback: null,
		precompress: false,
		strict: true
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
// preprocess: vitePreprocess({
// 	// default options are shown. On some platforms
// 	// these options are set automatically — see below
// 	pages: 'build',
// 	assets: 'build',
// 	fallback: null,
// 	precompress: false,
// 	strict: true
// }),