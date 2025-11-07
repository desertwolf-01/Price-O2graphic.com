import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/https://github.com/desertwolf-01/Price-O2graphic.com/', // ← هذا هو المفتاح!
});
