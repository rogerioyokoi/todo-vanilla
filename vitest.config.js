import { defineConfig } from 'vitest';

/** @type {import('vitest').UserConfig} */
export default defineConfig({
  test: {
    setupFiles: ['vitest-axe.setup.js'],
  },
});