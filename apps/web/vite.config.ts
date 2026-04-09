import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { visualizer } from "rollup-plugin-visualizer";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const enableBundleAnalysis = mode === 'analyze'
    || process.env.ANALYZE === '1'
    || process.env.ANALYZE === 'true';

  return {
    plugins: [
      svelte({
        preprocess: vitePreprocess()
      }),
      ...(enableBundleAnalysis
        ? [visualizer({
          emitFile: true,
          template: "sunburst",
          filename: "stats.html",
        })]
        : []),
      tailwindcss()
    ],
    appType: "mpa",
    base: "/",
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        'demotivator': resolve(__dirname, '../../packages/demotivator/source/index.ts'),
        '@demotivator/shared': resolve(__dirname, '../../packages/shared/source/index.ts'),
        '@demotivator/ui': resolve(__dirname, '../../packages/ui/source/index.js')
      }
    },
    build: {
      target: "es2022",
      emptyOutDir: false,
      cssCodeSplit: true,
      sourcemap: false,
      minify: "esbuild",
      rollupOptions: {
        treeshake: true,
        input: {
          index: "index.html",
          fourHundredFour: "./404.html",
          fiveHundred: "./500.html",
          login: "./login.html",
          signUp: "./signUp.html",
          list: "./list.html",
          settings: "./settings.html",
          account: "./account.html",
          leaderboard: "./leaderboard.html",
          admin: "./admin.html",
          egg: "./egg.html",
        },
        output: {
          dir: "out",
        },
      },
    },
  };
});
