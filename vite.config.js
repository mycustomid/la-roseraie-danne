import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
const routes = ['', 'domaine', 'espaces', 'mariages', 'evenements', 'services', 'galerie', 'devis', 'contact', 'faq'];
const input = Object.fromEntries([
  ...routes.map(p => [`fr-${p||'home'}`,resolve(process.cwd(),p,'index.html')]),
  ...routes.map(p => [`en-${p||'home'}`,resolve(process.cwd(),'en',p,'index.html')]),
]);
export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: { rollupOptions: { input } },
});
