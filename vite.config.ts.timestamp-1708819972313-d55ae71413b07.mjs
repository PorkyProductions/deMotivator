// vite.config.ts
import { svelte } from "file:///C:/Users/rpmul/source/repos/-de-Motivator/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import { visualizer } from "file:///C:/Users/rpmul/source/repos/-de-Motivator/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import b from "file:///C:/Users/rpmul/source/repos/-de-Motivator/node_modules/vite-plugin-banner/dist/index.mjs";

// package.json
var package_default = {
  name: "demotivator",
  private: true,
  version: "12.0.0",
  type: "module",
  scripts: {
    dev: "vite serve",
    build: "vite build",
    ssrBuild: "vite ssrBuild",
    lint: "eslint ./src/* --fix",
    buildTS: "tsc --project tsconfig.json",
    typeCheck: "tsc --project tsconfig.json --noEmit",
    supportedBrowsers: "(echo export default && browserslist-useragent-regexp --allowHigherVersions) > src/utils/supportedBrowsers.ts",
    preview: "vite preview",
    push: "firebase deploy",
    capBuild: "cap sync",
    "ionic:build": "npm run build",
    "ionic:serve": "npm run dev"
  },
  devDependencies: {
    "@capacitor/cli": "^5.7.0",
    "@sveltejs/vite-plugin-svelte": "^2.5.3",
    autoprefixer: "^10.4.17",
    "browserslist-useragent-regexp": "^4.1.1",
    eslint: "^8.57.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.29.1",
    postcss: "^8.4.35",
    "rollup-plugin-visualizer": "^5.12.0",
    sass: "^1.71.1",
    svelte: "^4.2.12",
    "svelte-preprocess": "^5.1.3",
    tailwindcss: "^3.4.1",
    vite: "^5.1.4",
    "vite-plugin-banner": "^0.7.1"
  },
  dependencies: {
    "@capacitor/android": "^5.7.0",
    "@capacitor/clipboard": "^5.0.7",
    "@capacitor/core": "^5.7.0",
    "@capacitor/dialog": "^5.0.7",
    "@capacitor/haptics": "^5.0.7",
    "@capacitor/ios": "^5.7.0",
    "@capacitor/splash-screen": "^5.0.7",
    "@porkyproductions/hat": "^1.5.0",
    bootstrap: "^5.3.3",
    "bootstrap-icons": "^1.11.3",
    "canvas-confetti": "^1.9.2",
    "cordova-res": "^0.15.4",
    demotivator: "^12.0.0",
    firebase: "^9.23.0",
    "firebase-tools": "^11.30.0",
    lodash: "^4.17.21",
    serve: "^14.2.1",
    terser: "^5.28.1",
    twemoji: "^14.0.2",
    typescript: "^5.3.3",
    uadetect: "^7.0.0-alpha-2"
  }
};

// src/typescript/constants.ts
var year = (/* @__PURE__ */ new Date()).getFullYear();
var PROD = process.env.NODE_ENV === "production";
var name = "(de)Motivator";
if (!PROD) {
  name = "(dev)Motivator";
}
var version = package_default.version;
var shortName = "deMotivator";
var parentCompany = "PorkyProductions";
var url = "https://demotivator.web.app/";
var banner = `

Copyright (c) 2020-${year}, ${parentCompany}, and contributors

This software is licensed under the ISC License.


`;
var constants_default = {
  PROD,
  name,
  shortName,
  version,
  parentCompany,
  url,
  banner
};
var __Constants = class {
  static {
    this.__PROD = process.env.NODE_ENV === "production";
  }
  static {
    this.__name = "(de)Motivator";
  }
  static {
    this.__shortName = "deMotivator";
  }
  static {
    this.__parentCompany = "PorkyProductions";
  }
  static {
    this.__version = package_default.version;
  }
  static {
    this.__url = this.__PROD ? "https://demotivator.web.app/" : "http://localhost:5173/";
  }
  static {
    this.__banner = `
        Copyright (c) 2020-${year}, ${parentCompany}, and contributors
        This software is licensed under the ISC License.
    `;
  }
  static {
    this.PROD = this.__PROD;
  }
  static {
    this.appName = this.__name;
  }
  static {
    this.shortName = this.__shortName;
  }
  static {
    this.parentCompany = this.__parentCompany;
  }
  static {
    this.version = this.__version;
  }
  static {
    this.url = this.__url;
  }
  static {
    this.banner = this.__banner;
  }
};
var Constants = class _Constants extends __Constants {
  constructor() {
    super();
  }
  static {
    this.__instance = new _Constants();
  }
  static getInstance() {
    return this.__instance;
  }
};

// vite.config.ts
import preprocess from "file:///C:/Users/rpmul/source/repos/-de-Motivator/node_modules/svelte-preprocess/dist/index.js";
var config = {
  plugins: [
    svelte({
      preprocess: preprocess()
    }),
    b(constants_default.banner),
    visualizer({
      emitFile: true,
      template: "sunburst",
      filename: "stats.html"
    })
  ],
  appType: "mpa",
  base: "/",
  css: {
    devSourcemap: true
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
        leaderboard: "./leaderboard.html"
        // DMV1: './dmv1.html',
      },
      output: {
        dir: "out"
      }
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInNyYy90eXBlc2NyaXB0L2NvbnN0YW50cy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHJwbXVsXFxcXHNvdXJjZVxcXFxyZXBvc1xcXFwtZGUtTW90aXZhdG9yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxycG11bFxcXFxzb3VyY2VcXFxccmVwb3NcXFxcLWRlLU1vdGl2YXRvclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcnBtdWwvc291cmNlL3JlcG9zLy1kZS1Nb3RpdmF0b3Ivdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzdmVsdGUgfSBmcm9tIFwiQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZVwiO1xyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xyXG5pbXBvcnQgYiBmcm9tICd2aXRlLXBsdWdpbi1iYW5uZXInXHJcbmltcG9ydCBjb25zdGFudHMgZnJvbSAnLi9zcmMvdHlwZXNjcmlwdC9jb25zdGFudHMnXHJcbmltcG9ydCBwcmVwcm9jZXNzIGZyb20gJ3N2ZWx0ZS1wcmVwcm9jZXNzJ1xyXG5pbXBvcnQgdHlwZSB7IFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5jb25zdCBjb25maWc6IFVzZXJDb25maWcgPSB7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgICBzdmVsdGUoe1xyXG4gICAgICAgIHByZXByb2Nlc3M6IHByZXByb2Nlc3MoKVxyXG4gICAgICB9KSxcclxuICAgICAgYihjb25zdGFudHMuYmFubmVyKSxcclxuICAgICAgdmlzdWFsaXplcih7XHJcbiAgICAgICAgZW1pdEZpbGU6IHRydWUsXHJcbiAgICAgICAgdGVtcGxhdGU6IFwic3VuYnVyc3RcIixcclxuICAgICAgICBmaWxlbmFtZTogXCJzdGF0cy5odG1sXCIsXHJcbiAgICAgIH0pXHJcbiAgICBdLFxyXG4gIGFwcFR5cGU6IFwibXBhXCIsXHJcbiAgYmFzZTogXCIvXCIsXHJcbiAgY3NzOiB7XHJcbiAgICBkZXZTb3VyY2VtYXA6IHRydWUsXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiBcImVzMjAxN1wiLFxyXG4gICAgZW1wdHlPdXREaXI6IGZhbHNlLFxyXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgc291cmNlbWFwOiBmYWxzZSxcclxuICAgIG1pbmlmeTogXCJlc2J1aWxkXCIsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIHRyZWVzaGFrZTogXCJyZWNvbW1lbmRlZFwiLFxyXG4gICAgICBpbnB1dDoge1xyXG4gICAgICAgIGluZGV4OiBcImluZGV4Lmh0bWxcIixcclxuICAgICAgICBmb3VySHVuZHJlZEZvdXI6IFwiLi80MDQuaHRtbFwiLFxyXG4gICAgICAgIGZpdmVIdW5kcmVkOiBcIi4vNTAwLmh0bWxcIixcclxuICAgICAgICBsb2dpbjogXCIuL2xvZ2luLmh0bWxcIixcclxuICAgICAgICBzaWduVXA6IFwiLi9zaWduVXAuaHRtbFwiLFxyXG4gICAgICAgIHNoYXJlOiBcIi4vc2hhcmUuaHRtbFwiLFxyXG4gICAgICAgIGxpc3Q6IFwiLi9saXN0Lmh0bWxcIixcclxuICAgICAgICBjcmVkaXRzOiBcIi4vY3JlZGl0cy5odG1sXCIsXHJcbiAgICAgICAgbGVhZGVyYm9hcmQ6IFwiLi9sZWFkZXJib2FyZC5odG1sXCIsXHJcbiAgICAgICAgLy8gRE1WMTogJy4vZG12MS5odG1sJyxcclxuICAgICAgfSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZGlyOiBcIm91dFwiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBjb25maWdcclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJkZW1vdGl2YXRvclwiLFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwidmVyc2lvblwiOiBcIjEyLjAuMFwiLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImRldlwiOiBcInZpdGUgc2VydmVcIixcclxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXHJcbiAgICBcInNzckJ1aWxkXCI6IFwidml0ZSBzc3JCdWlsZFwiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4vc3JjLyogLS1maXhcIixcclxuICAgIFwiYnVpbGRUU1wiOiBcInRzYyAtLXByb2plY3QgdHNjb25maWcuanNvblwiLFxyXG4gICAgXCJ0eXBlQ2hlY2tcIjogXCJ0c2MgLS1wcm9qZWN0IHRzY29uZmlnLmpzb24gLS1ub0VtaXRcIixcclxuICAgIFwic3VwcG9ydGVkQnJvd3NlcnNcIjogXCIoZWNobyBleHBvcnQgZGVmYXVsdCAmJiBicm93c2Vyc2xpc3QtdXNlcmFnZW50LXJlZ2V4cCAtLWFsbG93SGlnaGVyVmVyc2lvbnMpID4gc3JjL3V0aWxzL3N1cHBvcnRlZEJyb3dzZXJzLnRzXCIsXHJcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcclxuICAgIFwicHVzaFwiOiBcImZpcmViYXNlIGRlcGxveVwiLFxyXG4gICAgXCJjYXBCdWlsZFwiOiBcImNhcCBzeW5jXCIsXHJcbiAgICBcImlvbmljOmJ1aWxkXCI6IFwibnBtIHJ1biBidWlsZFwiLFxyXG4gICAgXCJpb25pYzpzZXJ2ZVwiOiBcIm5wbSBydW4gZGV2XCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGNhcGFjaXRvci9jbGlcIjogXCJeNS43LjBcIixcclxuICAgIFwiQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZVwiOiBcIl4yLjUuM1wiLFxyXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xN1wiLFxyXG4gICAgXCJicm93c2Vyc2xpc3QtdXNlcmFnZW50LXJlZ2V4cFwiOiBcIl40LjEuMVwiLFxyXG4gICAgXCJlc2xpbnRcIjogXCJeOC41Ny4wXCIsXHJcbiAgICBcImVzbGludC1jb25maWctYWlyYm5iLWJhc2VcIjogXCJeMTUuMC4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4taW1wb3J0XCI6IFwiXjIuMjkuMVwiLFxyXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zNVwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS4xMi4wXCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS43MS4xXCIsXHJcbiAgICBcInN2ZWx0ZVwiOiBcIl40LjIuMTJcIixcclxuICAgIFwic3ZlbHRlLXByZXByb2Nlc3NcIjogXCJeNS4xLjNcIixcclxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjFcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjEuNFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1iYW5uZXJcIjogXCJeMC43LjFcIlxyXG4gIH0sXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAY2FwYWNpdG9yL2FuZHJvaWRcIjogXCJeNS43LjBcIixcclxuICAgIFwiQGNhcGFjaXRvci9jbGlwYm9hcmRcIjogXCJeNS4wLjdcIixcclxuICAgIFwiQGNhcGFjaXRvci9jb3JlXCI6IFwiXjUuNy4wXCIsXHJcbiAgICBcIkBjYXBhY2l0b3IvZGlhbG9nXCI6IFwiXjUuMC43XCIsXHJcbiAgICBcIkBjYXBhY2l0b3IvaGFwdGljc1wiOiBcIl41LjAuN1wiLFxyXG4gICAgXCJAY2FwYWNpdG9yL2lvc1wiOiBcIl41LjcuMFwiLFxyXG4gICAgXCJAY2FwYWNpdG9yL3NwbGFzaC1zY3JlZW5cIjogXCJeNS4wLjdcIixcclxuICAgIFwiQHBvcmt5cHJvZHVjdGlvbnMvaGF0XCI6IFwiXjEuNS4wXCIsXHJcbiAgICBcImJvb3RzdHJhcFwiOiBcIl41LjMuM1wiLFxyXG4gICAgXCJib290c3RyYXAtaWNvbnNcIjogXCJeMS4xMS4zXCIsXHJcbiAgICBcImNhbnZhcy1jb25mZXR0aVwiOiBcIl4xLjkuMlwiLFxyXG4gICAgXCJjb3Jkb3ZhLXJlc1wiOiBcIl4wLjE1LjRcIixcclxuICAgIFwiZGVtb3RpdmF0b3JcIjogXCJeMTIuMC4wXCIsXHJcbiAgICBcImZpcmViYXNlXCI6IFwiXjkuMjMuMFwiLFxyXG4gICAgXCJmaXJlYmFzZS10b29sc1wiOiBcIl4xMS4zMC4wXCIsXHJcbiAgICBcImxvZGFzaFwiOiBcIl40LjE3LjIxXCIsXHJcbiAgICBcInNlcnZlXCI6IFwiXjE0LjIuMVwiLFxyXG4gICAgXCJ0ZXJzZXJcIjogXCJeNS4yOC4xXCIsXHJcbiAgICBcInR3ZW1vamlcIjogXCJeMTQuMC4yXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4zLjNcIixcclxuICAgIFwidWFkZXRlY3RcIjogXCJeNy4wLjAtYWxwaGEtMlwiXHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccnBtdWxcXFxcc291cmNlXFxcXHJlcG9zXFxcXC1kZS1Nb3RpdmF0b3JcXFxcc3JjXFxcXHR5cGVzY3JpcHRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHJwbXVsXFxcXHNvdXJjZVxcXFxyZXBvc1xcXFwtZGUtTW90aXZhdG9yXFxcXHNyY1xcXFx0eXBlc2NyaXB0XFxcXGNvbnN0YW50cy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcnBtdWwvc291cmNlL3JlcG9zLy1kZS1Nb3RpdmF0b3Ivc3JjL3R5cGVzY3JpcHQvY29uc3RhbnRzLnRzXCI7dmFyIHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XHJcbmV4cG9ydCB2YXIgUFJPRDogYm9vbGVhbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIlxyXG5cclxuaW1wb3J0IHBrZyBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nXHJcblxyXG5leHBvcnQgbGV0IG5hbWUgPSBcIihkZSlNb3RpdmF0b3JcIlxyXG5cclxuaWYgKCFQUk9EKSB7XHJcbiAgICBuYW1lID0gXCIoZGV2KU1vdGl2YXRvclwiXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gcGtnLnZlcnNpb25cclxuZXhwb3J0IGNvbnN0IHNob3J0TmFtZSA9IFwiZGVNb3RpdmF0b3JcIlxyXG5leHBvcnQgY29uc3QgcGFyZW50Q29tcGFueSA9IFwiUG9ya3lQcm9kdWN0aW9uc1wiXHJcbmV4cG9ydCBjb25zdCB1cmwgPSBcImh0dHBzOi8vZGVtb3RpdmF0b3Iud2ViLmFwcC9cIlxyXG5leHBvcnQgY29uc3QgYmFubmVyID0gYFxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIwLSR7eWVhcn0sICR7cGFyZW50Q29tcGFueX0sIGFuZCBjb250cmlidXRvcnNcclxuXHJcblRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBMaWNlbnNlLlxyXG5cclxuXHJcbmBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIFBST0QsXHJcbiAgICBuYW1lLFxyXG4gICAgc2hvcnROYW1lLFxyXG4gICAgdmVyc2lvbixcclxuICAgIHBhcmVudENvbXBhbnksXHJcbiAgICB1cmwsXHJcbiAgICBiYW5uZXJcclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgX19Db25zdGFudHMge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX19QUk9EOiBib29sZWFuID1cclxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfX25hbWU6IHN0cmluZyA9IFwiKGRlKU1vdGl2YXRvclwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX19zaG9ydE5hbWU6IHN0cmluZyA9IFwiZGVNb3RpdmF0b3JcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9fcGFyZW50Q29tcGFueTogc3RyaW5nID0gXCJQb3JreVByb2R1Y3Rpb25zXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfX3ZlcnNpb246IHN0cmluZyA9IHBrZy52ZXJzaW9uO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX191cmw6IHN0cmluZyA9IHRoaXMuX19QUk9EID8gXCJodHRwczovL2RlbW90aXZhdG9yLndlYi5hcHAvXCIgOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTE3My9cIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9fYmFubmVyOiBzdHJpbmcgPSBgXHJcbiAgICAgICAgQ29weXJpZ2h0IChjKSAyMDIwLSR7eWVhcn0sICR7cGFyZW50Q29tcGFueX0sIGFuZCBjb250cmlidXRvcnNcclxuICAgICAgICBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgTGljZW5zZS5cclxuICAgIGA7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFBST0Q6IGJvb2xlYW4gPSB0aGlzLl9fUFJPRDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYXBwTmFtZTogc3RyaW5nID0gdGhpcy5fX25hbWU7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHNob3J0TmFtZTogc3RyaW5nID0gdGhpcy5fX3Nob3J0TmFtZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgcGFyZW50Q29tcGFueTogc3RyaW5nID0gdGhpcy5fX3BhcmVudENvbXBhbnk7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHZlcnNpb246IHN0cmluZyA9IHRoaXMuX192ZXJzaW9uO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB1cmw6IHN0cmluZyA9IHRoaXMuX191cmw7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGJhbm5lcjogc3RyaW5nID0gdGhpcy5fX2Jhbm5lcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnN0YW50cyBleHRlbmRzIF9fQ29uc3RhbnRzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfX2luc3RhbmNlOiBDb25zdGFudHMgPSBuZXcgQ29uc3RhbnRzKCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9faW5zdGFuY2U7XHJcbiAgICB9XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlULFNBQVMsY0FBYztBQUNoVixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLE9BQU87OztBQ0ZkO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxVQUFZO0FBQUEsSUFDWixNQUFRO0FBQUEsSUFDUixTQUFXO0FBQUEsSUFDWCxXQUFhO0FBQUEsSUFDYixtQkFBcUI7QUFBQSxJQUNyQixTQUFXO0FBQUEsSUFDWCxNQUFRO0FBQUEsSUFDUixVQUFZO0FBQUEsSUFDWixlQUFlO0FBQUEsSUFDZixlQUFlO0FBQUEsRUFDakI7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGdDQUFnQztBQUFBLElBQ2hDLGNBQWdCO0FBQUEsSUFDaEIsaUNBQWlDO0FBQUEsSUFDakMsUUFBVTtBQUFBLElBQ1YsNkJBQTZCO0FBQUEsSUFDN0Isd0JBQXdC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
