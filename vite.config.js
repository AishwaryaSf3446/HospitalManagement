import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@syncfusion\/ej2-popups$/,
        replacement: resolve(projectRoot, 'node_modules', '@syncfusion', 'ej2-pivotview', 'node_modules', '@syncfusion', 'ej2-popups')
      },
      {
        find: /^@syncfusion\/ej2-react-base$/,
        replacement: resolve(projectRoot, 'node_modules', '@syncfusion', 'ej2-react-pivotview', 'node_modules', '@syncfusion', 'ej2-react-base')
      }
    ]
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: [
      '3000-inxln74gtkp9fy41toid5.e2b.app',
      'localhost',
      '127.0.0.1',
      '0.0.0.0'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
