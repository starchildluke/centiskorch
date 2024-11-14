import { defineCollection, z } from 'astro:content';

const logs = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().optional(),
		robots: z.string().optional()
	}),
});

const favourites = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().optional(),
		robots: z.string().optional()
	}),
});

const misc = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().optional(),
		robots: z.string().optional()
	}),
});

const nicknames = defineCollection({
	type: 'content',
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
	type: 'content',
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
	type: 'content',
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