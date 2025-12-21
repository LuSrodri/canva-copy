import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import compression from 'vite-plugin-compression'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          transformers: ['@huggingface/transformers'],
          ui: ['lucide-react', 'clsx', 'tailwind-merge', 'class-variance-authority'],
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'hero.webp') {
            return 'assets/hero.webp'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
  worker: {
    format: 'es',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
})
