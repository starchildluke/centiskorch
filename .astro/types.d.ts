declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"12-facts-i-didnt-know-about-pokemon.md": {
	id: "12-facts-i-didnt-know-about-pokemon.md";
  slug: "12-facts-i-didnt-know-about-pokemon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"33-minutes-of-chill-pokemon-beats.md": {
	id: "33-minutes-of-chill-pokemon-beats.md";
  slug: "33-minutes-of-chill-pokemon-beats";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"julesdrawz-awesome-pokemon-illustrations.md": {
	id: "julesdrawz-awesome-pokemon-illustrations.md";
  slug: "julesdrawz-awesome-pokemon-illustrations";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"pokemon-excited-reg-e.md": {
	id: "pokemon-excited-reg-e.md";
  slug: "pokemon-excited-reg-e";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"quick-thoughts-pokemon-fan-demands.md": {
	id: "quick-thoughts-pokemon-fan-demands.md";
  slug: "quick-thoughts-pokemon-fan-demands";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"favourites": {
"my-favourite-gen-1-pokemon.mdx": {
	id: "my-favourite-gen-1-pokemon.mdx";
  slug: "my-favourite-gen-1-pokemon";
  body: string;
  collection: "favourites";
  data: InferEntrySchema<"favourites">
} & { render(): Render[".mdx"] };
"my-favourite-gen-2-pokemon.mdx": {
	id: "my-favourite-gen-2-pokemon.mdx";
  slug: "my-favourite-gen-2-pokemon";
  body: string;
  collection: "favourites";
  data: InferEntrySchema<"favourites">
} & { render(): Render[".mdx"] };
"my-favourite-gen-3-pokemon.mdx": {
	id: "my-favourite-gen-3-pokemon.mdx";
  slug: "my-favourite-gen-3-pokemon";
  body: string;
  collection: "favourites";
  data: InferEntrySchema<"favourites">
} & { render(): Render[".mdx"] };
"my-favourite-gen-4-pokemon.mdx": {
	id: "my-favourite-gen-4-pokemon.mdx";
  slug: "my-favourite-gen-4-pokemon";
  body: string;
  collection: "favourites";
  data: InferEntrySchema<"favourites">
} & { render(): Render[".mdx"] };
"my-favourite-gen-5-pokemon.mdx": {
	id: "my-favourite-gen-5-pokemon.mdx";
  slug: "my-favourite-gen-5-pokemon";
  body: string;
  collection: "favourites";
  data: InferEntrySchema<"favourites">
} & { render(): Render[".mdx"] };
"my-favourite-gen-9-pokemon.mdx": {
	id: "my-favourite-gen-9-pokemon.mdx";
  slug: "my-favourite-gen-9-pokemon";
  body: string;
  collection: "favourites";
  data: InferEntrySchema<"favourites">
} & { render(): Render[".mdx"] };
"my-favourite-pokemon-games.md": {
	id: "my-favourite-pokemon-games.md";
  slug: "my-favourite-pokemon-games";
  body: string;
  collection: "favourites";
  data: InferEntrySchema<"favourites">
} & { render(): Render[".md"] };
"my-favourite-pokemon-gens.md": {
	id: "my-favourite-pokemon-gens.md";
  slug: "my-favourite-pokemon-gens";
  body: string;
  collection: "favourites";
  data: InferEntrySchema<"favourites">
} & { render(): Render[".md"] };
};
"logs": {
"my-pokemon-teams.mdx": {
	id: "my-pokemon-teams.mdx";
  slug: "my-pokemon-teams";
  body: string;
  collection: "logs";
  data: InferEntrySchema<"logs">
} & { render(): Render[".mdx"] };
"projects.md": {
	id: "projects.md";
  slug: "projects";
  body: string;
  collection: "logs";
  data: InferEntrySchema<"logs">
} & { render(): Render[".md"] };
"todolist.mdx": {
	id: "todolist.mdx";
  slug: "todolist";
  body: string;
  collection: "logs";
  data: InferEntrySchema<"logs">
} & { render(): Render[".mdx"] };
"trainers-log.md": {
	id: "trainers-log.md";
  slug: "trainers-log";
  body: string;
  collection: "logs";
  data: InferEntrySchema<"logs">
} & { render(): Render[".md"] };
};
"misc": {
"cool-links.mdx": {
	id: "cool-links.mdx";
  slug: "cool-links";
  body: string;
  collection: "misc";
  data: InferEntrySchema<"misc">
} & { render(): Render[".mdx"] };
"handy-links.md": {
	id: "handy-links.md";
  slug: "handy-links";
  body: string;
  collection: "misc";
  data: InferEntrySchema<"misc">
} & { render(): Render[".md"] };
};
"nicknames": {
"blastoise.md": {
	id: "blastoise.md";
  slug: "blastoise";
  body: string;
  collection: "nicknames";
  data: InferEntrySchema<"nicknames">
} & { render(): Render[".md"] };
"centiskorch.md": {
	id: "centiskorch.md";
  slug: "centiskorch";
  body: string;
  collection: "nicknames";
  data: InferEntrySchema<"nicknames">
} & { render(): Render[".md"] };
};
"rooms": {
"blastoise.mdx": {
	id: "blastoise.mdx";
  slug: "blastoise";
  body: string;
  collection: "rooms";
  data: InferEntrySchema<"rooms">
} & { render(): Render[".mdx"] };
"centiskorch.mdx": {
	id: "centiskorch.mdx";
  slug: "centiskorch";
  body: string;
  collection: "rooms";
  data: InferEntrySchema<"rooms">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
