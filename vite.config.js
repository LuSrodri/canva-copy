import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import compression from 'vite-plugin-compression'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('hero')) {
          return new URLSearchParams('format=webp&quality=85&w=600')
        }
        if (url.searchParams.has('thumb')) {
          return new URLSearchParams('format=webp&quality=75&w=120&h=120')
        }
        if (url.searchParams.has('icon')) {
          return new URLSearchParams('format=webp&quality=90&w=80')
        }
        return new URLSearchParams()
      }
    }),
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
