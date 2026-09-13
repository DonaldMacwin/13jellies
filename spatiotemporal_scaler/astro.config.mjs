// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Produce a static site suitable for FTP upload.
  output: 'static',
  site: 'https://cf268321.cloudfree.jp',
  base: '/13jellies/spatiotemporal_scaler/',
  integrations: [react(), mdx(), sitemap()],
});