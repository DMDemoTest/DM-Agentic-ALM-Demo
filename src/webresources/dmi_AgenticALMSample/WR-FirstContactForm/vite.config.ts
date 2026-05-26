import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'FirstContactForm',
      formats: ['iife'],
      fileName: () => 'FirstContactForm.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]',
      },
    },
  },
});
