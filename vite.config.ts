/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    // Test-only fixture so pages render the WhatsApp enquiry flow. Not a real number.
    env: { VITE_WHATSAPP_NUMBER: '+91 90000 00000' },
  },
});
