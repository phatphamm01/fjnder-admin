// vite.config.ts
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { "~": path.resolve(__dirname, "./src"), path: "path-browserify" },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          "babel-plugin-macros",
          [
            "@emotion/babel-plugin-jsx-pragmatic",
            {
              export: "jsx",
              import: "__cssprop",
              module: "@emotion/react",
            },
          ],
          [
            "@babel/plugin-transform-react-jsx",
            { pragma: "__cssprop" },
            "twin.macro",
          ],
        ],
      },
    }),
  ],
});
