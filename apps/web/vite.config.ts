import { svelte } from "@sveltejs/vite-plugin-svelte";
import { visualizer } from "rollup-plugin-visualizer";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from "@tailwindcss/vite";
import type { UserConfig } from "vite";
const config: UserConfig = {
  plugins: [
      svelte({
        preprocess: vitePreprocess()
      }),
      visualizer({
        emitFile: true,
        template: "sunburst",
        filename: "stats.html",
      }),
      tailwindcss()
    ],
  appType: "mpa",
  base: "/",
  css: {
    devSourcemap: true,
  },
  build: {
    target: "es2022",
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
        list: "./list.html",
        settings: "./settings.html",
        leaderboard: "./leaderboard.html",
        admin: "./admin.html",
      },
      output: {
        dir: "out",
      },
    },
  },
};
export default config
