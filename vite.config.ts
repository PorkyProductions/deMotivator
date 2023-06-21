import { svelte } from "@sveltejs/vite-plugin-svelte";
import { visualizer } from "rollup-plugin-visualizer";
import b from 'vite-plugin-banner'
import constants from './src/typescript/constants'
import preprocess from 'svelte-preprocess'
import type { UserConfig } from "vite";
const config: UserConfig = {
  plugins: [
      svelte({
        preprocess: preprocess()
      }),
      b(constants.banner),
      visualizer({
        emitFile: true,
        template: "sunburst",
        filename: "stats.html",
      })
    ],
  appType: "mpa",
  base: "/",
  css: {
    devSourcemap: true,
  },
  build: {
    target: "es2017",
    emptyOutDir: false,
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      treeshake: "recommended",
      input: {
        index: "index.html",
        fourHundredFour: "./404.html",
        fiveHundred: "./500.html",
        login: "./login.html",
        signUp: "./signUp.html",
        share: "./share.html",
        list: "./list.html",
        credits: "./credits.html",
        leaderboard: "./leaderboard.html",
        // DMV1: './dmv1.html',
      },
      output: {
        dir: "out",
      },
    },
  },
};
export default config
