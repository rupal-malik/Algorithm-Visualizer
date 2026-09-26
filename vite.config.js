import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base must match the GitHub repo name for GitHub Pages
export default defineConfig({
  base: '/Algorithm-Visualizer/',
  plugins: [react()],
});
