import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { initFlowbite } from 'flowbite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
