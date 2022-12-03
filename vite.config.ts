import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import legacy from '@vitejs/plugin-legacy'
import { UserConfig } from 'vite'
/** @type {import('vite').UserConfig} */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      svelte(),
      // legacy({ 
      //   targets: [">0.3%, cover 70%, not dead"] 
      // })
    ],
  base: "/",
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        index: "index.html",
        fourOhFour: "./404.html",
        fiveHundred: "./500.html",
        login: "./login.html",
        signUp: "./signUp.html",
        list: "./list.html",
        // DMV1: './dmv1.html',
      },
      output: {
        dir: "out",
      },
    },
  },
});
