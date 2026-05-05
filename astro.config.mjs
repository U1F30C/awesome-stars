import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  base: '/awesome-stars/',
  integrations: [tailwind()],
  output: 'static',
  outDir: './dist',
});
