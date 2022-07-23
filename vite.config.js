import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // host: true, // Enable to expose host for running app on phone
    open: true
  },
  base: '/game-dev/', // use repo name https://vitejs.dev/guide/static-deploy.html#github-pages
  root: 'src'
})
