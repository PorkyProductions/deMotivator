import { svelte } from "@sveltejs/vite-plugin-svelte";
import { visualizer } from "rollup-plugin-visualizer";
import preprocess from 'svelte-preprocess'
import type { UserConfig, PluginOption } from "vite";
const config: UserConfig = {
  plugins: [
      svelte({
        preprocess: preprocess()
      }),
      visualizer({
        emitFile: true,
        filename: "stats.html",
      }) as PluginOption
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
    sourcemap: true,
    minify: "esbuild",
    rollupOptions: {
      treeshake: "recommended",
      input: {
        index: "index.html",
        fourOhFour: "./404.html",
        fiveHundred: "./500.html",
        login: "./login.html",
        signUp: "./signUp.html",
        share: "./share.html",
        list: "./list.html",
        credits: "./credits.html",
        // DMV1: './dmv1.html',
      },
      output: {
        dir: "out",
      },
    },
  },
};
export default config
