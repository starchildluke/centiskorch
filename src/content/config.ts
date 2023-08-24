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

export const collections = { logs, misc, blog, favourites };
