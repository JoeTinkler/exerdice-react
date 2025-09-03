import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets'),
      '@db': resolve(__dirname, './src/db'),
      '@components': resolve(__dirname, './src/components'),
      '@helpers': resolve(__dirname, './src/helpers'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@providers': resolve(__dirname, './src/providers'),
      '@stories': resolve(__dirname, './src/stories'),
      '@themes': resolve(__dirname, './src/themes'),
    },
  },
  plugins: [react(), svgr()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  worker: {
    format: "es"
  },
  optimizeDeps: {
    exclude: ['sqlocal'],
  },
})
