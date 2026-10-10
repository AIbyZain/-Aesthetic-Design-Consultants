import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Plain Vite + React setup. Files in /public are served from the site root,
// so images are referenced as /images/photo-x.jpg in both dev and build.
export default defineConfig({
  plugins: [react()],
  server: { open: true },
});
