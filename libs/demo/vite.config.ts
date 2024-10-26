/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0'
  },
  build: {
    outDir: '../../playground'
  }
})
