// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Produce a static site suitable for FTP upload.
  output: 'static',
  site: 'https://cf268321.cloudfree.jp',
  base: '/13jellies/spatiotemporal_scaler/',
  integrations: [
    react(),
    mdx({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});