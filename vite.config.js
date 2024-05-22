/** @type {import('vite').UserConfig} */
import dns from 'node:dns'
import { defineConfig } from 'vite'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  // omit
  server: {
    port: 8080
  }
})