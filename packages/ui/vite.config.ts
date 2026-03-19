import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [
    svelte({
      preprocess: vitePreprocess(),
      compilerOptions: {
        // Preserve component names in the output for easier debugging.
        dev: false,
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'source/index.js'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // Svelte and Bootstrap are provided by the consuming app.
      external: ['svelte', /^svelte\//, 'bootstrap', /^bootstrap\//],
    },
    sourcemap: true,
  },
};

export default config;
