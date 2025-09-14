import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	server: { port: 4322 },
	site: 'https://centiskor.ch',
	integrations: [
		mdx(),
		sitemap()]
});