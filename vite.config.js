/** @type {import('vite').UserConfig} */
import dns from 'node:dns';
import path from 'path';
import { defineConfig } from 'vite';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@web-component': path.resolve(__dirname, './src/components'),
    },
  },
});
