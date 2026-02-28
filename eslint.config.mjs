import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import parser from "svelte-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
    "**/dist/",
    "**/out/",
    "**/node_modules/",
    "**/.turbo/",
    "dist/*",
    "out/*",
    "node_modules/*",
    ".turbo/*",
    "**/*.min.js",
    "**/*.bundle.js",
    "**/*.config.js",
    "**/*.config.ts",
    "**/*.config.mjs",
    "**/*.config.cjs",
]), {
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        indent: ["error", "tab", {
            SwitchCase: 1,
        }],

        "linebreak-style": ["error", "windows"],

        quotes: ["error", "single", {
            avoidEscape: true,
        }],

        semi: ["error", "always"],
        "comma-dangle": ["error", "never"],
        "object-curly-spacing": ["error", "always"],
        "array-bracket-spacing": ["error", "never"],
        "arrow-parens": ["error", "always"],
        "no-var": "error",
        "prefer-const": "error",

        camelcase: ["error", {
            properties: "always",
        }],

        "func-style": ["error", "expression"],
        "prefer-arrow-callback": "error",
        eqeqeq: ["error", "smart"],
        "block-scoped-var": "error",
        "require-await": "error",
        "no-trailing-spaces": "error",
        "eol-last": ["error", "always"],

        "no-multiple-empty-lines": ["error", {
            max: 1,
        }],
    },
}, {
    files: ["**/*.svelte"],

    languageOptions: {
        parser: parser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            parser: "@typescript-eslint/parser",
        },
    },
}]);