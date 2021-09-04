import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import WindiCSS from "vite-plugin-windicss";
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [vue(), WindiCSS(), eslintPlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    open: true,
  },
});
