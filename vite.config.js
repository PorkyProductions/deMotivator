import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
        input: {
            index: 'index.html',
            fourOhFour: './404.html',
            fiveHundred: './500.html',
            // DMV1: './dmv1.html',
        },
        output: {
            dir: 'out',
        }
    }
  }
})