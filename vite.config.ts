import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Make sure this plugin is installed: npm install -D @vitejs/plugin-react

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Use the react plugin
  base: '/Price-O2graphic.com/', // Correct base path for GitHub Pages
});
