import { resolve } from 'path'
import { defineConfig } from 'vite'

const ROOT = "src"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, ROOT, 'index.html'),
        bitecs: resolve(__dirname, ROOT, 'bitecs-circle-collision.html'),
        ecsy: resolve(__dirname, ROOT, 'ecsy-example.html')
      }
    }
  },
  server: {
    // host: true, // Enable to expose host for running app on phone
    open: true
  },
  base: '/game-dev/', // use repo name https://vitejs.dev/guide/static-deploy.html#github-pages
  root: ROOT
})
