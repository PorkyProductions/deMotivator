import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import legacy from '@vitejs/plugin-legacy'
import { UserConfig } from 'vite'
/** @type {import('vite').UserConfig} */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    legacy()
  ],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        fourOhFour: './404.html',
        fiveHundred: './500.html',
        login: './login.html',
        signUp: './signUp.html',
        list: './list.html'
        // DMV1: './dmv1.html',
      },
      output: {
        dir: 'out',
      }
    }
  }
})