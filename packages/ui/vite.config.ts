import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { UserConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
      entry: resolve(__dirname, 'source/index.js'),
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
