import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const logs = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/logs" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().optional(),
		robots: z.string().optional(),
		gen: z.number().optional()
	}),
});

const favourites = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/favourites" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().optional(),
		robots: z.string().optional()
	}),
});

const misc = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/misc" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().optional(),
		robots: z.string().optional()
	}),
});

const nicknames = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/nicknames" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		theme: z.string().optional(),
		pokedexNumber: z.string().optional(),
		lcpSrc: z.string().optional(),
		lcpMediaAs: z.string().optional(),
		lcpMediaType: z.string().optional(),
		draft: z.boolean().optional(),
		robots: z.string().optional()
	}),
});

const rooms = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/rooms" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().optional(),
		bodyColour: z.string(),
		bgContentColour: z.string(),
		outlineContentColour: z.string(),
		borderContentColour: z.string(),
		headingTextColour: z.string(),
		lcpMediaAs: z.string(),
		lcpSrc: z.string(),
		lcpMediaType: z.string(),
		robots: z.string().optional()	
	}),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		ogimage: z.string().optional(),
		imgtype: z.string().optional(),
		draft: z.boolean().optional(),
		robots: z.string().optional(),
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val))
	}),
});

export const collections = { logs, misc, blog, favourites, rooms, nicknames };