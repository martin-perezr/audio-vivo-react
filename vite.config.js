import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Bloque test: configuración de Vitest (Guía 15, sección 4).
  test: {
    environment: 'jsdom', // simula el navegador (document, localStorage)
    globals: true, // describe, it y expect sin importarlos
    setupFiles: './src/setupTests.js', // se ejecuta antes de las pruebas
    coverage: {
      provider: 'v8',
      include: ['src/utils/**', 'src/components/**', 'src/services/**'],
    },
  },
})
