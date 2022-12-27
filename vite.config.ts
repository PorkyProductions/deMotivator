import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { UserConfig } from 'vite'
/** @type {import('vite').UserConfig} */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      svelte()
    ],
  base: "/",
  build: {
    target: "es2017",
    emptyOutDir: false,
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
        credits: "./credits.html"
        // DMV1: './dmv1.html',
      },
      output: {
        dir: "out",
      },
    },
  },
});
