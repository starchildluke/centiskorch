import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import NetlifyCMS from 'astro-netlify-cms';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://centiskor.ch',
	integrations: [
		mdx(),
		sitemap(),
		NetlifyCMS(
			{
				config: {
					backend: {
						name: 'git-gateway',
						branch: 'main',
					},
				media_folder: "/public/images",
				public_folder: "/public",
				collections: [
					{
						name: 'logs',
						label: 'Logs',
						folder: 'src/content/logs',
						create: true,
						delete: true,
						fields: [
							{ name: 'title', widget: 'string', label: 'Log Title'},
							{ name: 'description', widget: 'string', label: 'Log Description'},
							{ name: 'pubDate', widget: 'string', label: 'Published Date'},
							{ name: 'body', widget: 'markdown', label: 'Body'},
						]
					},
					{
						name: 'blog',
						label: 'Blog',
						folder: 'src/content/blog',
						create: true,
						delete: true,
						fields: [
							{ name: 'title', widget: 'string', label: 'Blog Title'},
							{ name: 'description', widget: 'string', label: 'Blog Description'},
							{ name: 'pubDate', widget: 'string', label: 'Published Date'},
							{ name: 'body', widget: 'markdown', label: 'Body'},
						]
					},
					{
						name: 'misc',
						label: 'Misc',
						folder: 'src/content/misc',
						create: true,
						delete: true,
						fields: [
							{ name: 'title', widget: 'string', label: 'Misc Title'},
							{ name: 'description', widget: 'string', label: 'Misc Description'},
							{ name: 'pubDate', widget: 'string', label: 'Published Date'},
							{ name: 'body', widget: 'markdown', label: 'Body'},
						]
					},
					{
						name: 'favourites',
						label: 'Favourites',
						folder: 'src/content/favourites',
						create: true,
						delete: true,
						fields: [
							{ name: 'title', widget: 'string', label: 'Favourites Title'},
							{ name: 'description', widget: 'string', label: 'Favourites Description'},
							{ name: 'body', widget: 'markdown', label: 'Body'},
						]
					},
				],
				},
			},
			),
		],
});