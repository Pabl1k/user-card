import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: '/user-card',
  plugins: [
    react(),

    ViteImageOptimizer({
      test: /\.(jpeg|svg)$/i,
      includePublic: true,
      jpeg: {
        quality: 70,
        chromaSubsampling: '4:4:4',
        progressive: true
      }
    })
  ]
});
