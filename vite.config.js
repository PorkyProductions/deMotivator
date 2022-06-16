import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
        input: {
            index: 'index.html',
            fourOhFour: './src/pages/404/404.html',
            fiveHundred: './src/pages/500/500.html',
            // DMV1: './src/pages/dmv1.html',
        },
        output: {
            dir: 'docs',
        }
    }
  }
})