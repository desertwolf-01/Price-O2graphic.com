import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Price-O2graphic.com/', // ← هذا هو المفتاح! لا تغيره!
});
