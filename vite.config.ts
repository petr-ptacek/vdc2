import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue              from "@vitejs/plugin-vue";
// https://www.npmjs.com/package/vite-svg-loader
import svgLoader        from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: "assets"
  },
  plugins: [
    vue(),
    svgLoader({
      defaultImport: "url"
    })
  ],
  resolve: {
    alias: {
      "@": getFilePath("./src")
    }
  }
});

function getFilePath(input: string) {
  return fileURLToPath(new URL(input, import.meta.url));
}