import { defineCollection, z } from 'astro:content';

const logs = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string()
	}),
});

const favourites = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string()
	}),
});

const misc = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string()
	}),
});

const nicknames = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string()
	}),
});

const rooms = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		bodyColour: z.string(),
		bgContentColour: z.string(),
		outlineContentColour: z.string(),
		borderContentColour: z.string(),
		headingTextColour: z.string(),
		lcpMediaAs: z.string(),
		lcpSrc: z.string(),
		lcpMediaType: z.string()	
	}),
});

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val))
	}),
});

export const collections = { logs, misc, blog, favourites, rooms, nicknames };
