/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'GuitarChords',
      fileName: (format) => `guitar-chords.${format}.js`
    }
  }
})
