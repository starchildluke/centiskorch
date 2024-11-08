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
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

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
  data: any
} & { render(): Render[".md"] };
"2023-suckers-2024-dragons.md": {
	id: "2023-suckers-2024-dragons.md";
  slug: "2023-suckers-2024-dragons";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"33-minutes-of-chill-pokemon-beats.md": {
	id: "33-minutes-of-chill-pokemon-beats.md";
  slug: "33-minutes-of-chill-pokemon-beats";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"beastcoast-weak-pokemon-changed-game.mdx": {
	id: "beastcoast-weak-pokemon-changed-game.mdx";
  slug: "beastcoast-weak-pokemon-changed-game";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"every-pokemon-is-someones-favorite.mdx": {
	id: "every-pokemon-is-someones-favorite.mdx";
  slug: "every-pokemon-is-someones-favorite";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"fun-fact-olympics-pokemon-worlds-venues.md": {
	id: "fun-fact-olympics-pokemon-worlds-venues.md";
  slug: "fun-fact-olympics-pokemon-worlds-venues";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-i-caught-lunala-moon-ball.md": {
	id: "how-i-caught-lunala-moon-ball.md";
  slug: "how-i-caught-lunala-moon-ball";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"julesdrawz-awesome-pokemon-illustrations.md": {
	id: "julesdrawz-awesome-pokemon-illustrations.md";
  slug: "julesdrawz-awesome-pokemon-illustrations";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"miraidon-pokemon-motorbike.mdx": {
	id: "miraidon-pokemon-motorbike.mdx";
  slug: "miraidon-pokemon-motorbike";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"my-big-shiny-day.md": {
	id: "my-big-shiny-day.md";
  slug: "my-big-shiny-day";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"my-pokemon-day-2024.mdx": {
	id: "my-pokemon-day-2024.mdx";
  slug: "my-pokemon-day-2024";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"pokemon-excited-reg-e.md": {
	id: "pokemon-excited-reg-e.md";
  slug: "pokemon-excited-reg-e";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"pokemon-fatigue.md": {
	id: "pokemon-fatigue.md";
  slug: "pokemon-fatigue";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"pokemon-learn-trick-room-tailwind.md": {
	id: "pokemon-learn-trick-room-tailwind.md";
  slug: "pokemon-learn-trick-room-tailwind";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"pokemon-purergb.mdx": {
	id: "pokemon-purergb.mdx";
  slug: "pokemon-purergb";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"pokemon-types-more-immunities-realize.mdx": {
	id: "pokemon-types-more-immunities-realize.mdx";
  slug: "pokemon-types-more-immunities-realize";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"prediction-pokemon-day-2024.md": {
	id: "prediction-pokemon-day-2024.md";
  slug: "prediction-pokemon-day-2024";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"quick-thoughts-pokemon-cards.md": {
	id: "quick-thoughts-pokemon-cards.md";
  slug: "quick-thoughts-pokemon-cards";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"quick-thoughts-pokemon-fan-demands.md": {
	id: "quick-thoughts-pokemon-fan-demands.md";
  slug: "quick-thoughts-pokemon-fan-demands";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"review-pokemon-crystal-legacy.md": {
	id: "review-pokemon-crystal-legacy.md";
  slug: "review-pokemon-crystal-legacy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"vgc-law-and-disorder.md": {
	id: "vgc-law-and-disorder.md";
  slug: "vgc-law-and-disorder";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};
"favourites": {
"my-favourite-gen-1-pokemon.mdx": {
	id: "my-favourite-gen-1-pokemon.mdx";
  slug: "my-favourite-gen-1-pokemon";
  body: string;
  collection: "favourites";
  data: any
} & { render(): Render[".mdx"] };
"my-favourite-gen-2-pokemon.mdx": {
	id: "my-favourite-gen-2-pokemon.mdx";
  slug: "my-favourite-gen-2-pokemon";
  body: string;
  collection: "favourites";
  data: any
} & { render(): Render[".mdx"] };
"my-favourite-gen-3-pokemon.mdx": {
	id: "my-favourite-gen-3-pokemon.mdx";
  slug: "my-favourite-gen-3-pokemon";
  body: string;
  collection: "favourites";
  data: any
} & { render(): Render[".mdx"] };
"my-favourite-gen-4-pokemon.mdx": {
	id: "my-favourite-gen-4-pokemon.mdx";
  slug: "my-favourite-gen-4-pokemon";
  body: string;
  collection: "favourites";
  data: any
} & { render(): Render[".mdx"] };
"my-favourite-gen-5-pokemon.mdx": {
	id: "my-favourite-gen-5-pokemon.mdx";
  slug: "my-favourite-gen-5-pokemon";
  body: string;
  collection: "favourites";
  data: any
} & { render(): Render[".mdx"] };
"my-favourite-gen-6-pokemon.mdx": {
	id: "my-favourite-gen-6-pokemon.mdx";
  slug: "my-favourite-gen-6-pokemon";
  body: string;
  collection: "favourites";
  data: any
} & { render(): Render[".mdx"] };
"my-favourite-gen-7-pokemon.mdx": {
	id: "my-favourite-gen-7-pokemon.mdx";
  slug: "my-favourite-gen-7-pokemon";
  body: string;
  collection: "favourites";
  data: any
} & { render(): Render[".mdx"] };
"my-favourite-gen-9-pokemon.mdx": {
	id: "my-favourite-gen-9-pokemon.mdx";
  slug: "my-favourite-gen-9-pokemon";
  body: string;
  collection: "favourites";
  data: any
} & { render(): Render[".mdx"] };
"my-favourite-pokemon-games.md": {
	id: "my-favourite-pokemon-games.md";
  slug: "my-favourite-pokemon-games";
  body: string;
  collection: "favourites";
  data: any
} & { render(): Render[".md"] };
"my-favourite-pokemon-gens.md": {
	id: "my-favourite-pokemon-gens.md";
  slug: "my-favourite-pokemon-gens";
  body: string;
  collection: "favourites";
  data: any
} & { render(): Render[".md"] };
};
"logs": {
"have-i-used-this-pokemon.mdx": {
	id: "have-i-used-this-pokemon.mdx";
  slug: "have-i-used-this-pokemon";
  body: string;
  collection: "logs";
  data: any
} & { render(): Render[".mdx"] };
"my-pokemon-teams.mdx": {
	id: "my-pokemon-teams.mdx";
  slug: "my-pokemon-teams";
  body: string;
  collection: "logs";
  data: any
} & { render(): Render[".mdx"] };
"my-shinies.mdx": {
	id: "my-shinies.mdx";
  slug: "my-shinies";
  body: string;
  collection: "logs";
  data: any
} & { render(): Render[".mdx"] };
"todolist.mdx": {
	id: "todolist.mdx";
  slug: "todolist";
  body: string;
  collection: "logs";
  data: any
} & { render(): Render[".mdx"] };
};
"misc": {
"cool-links.mdx": {
	id: "cool-links.mdx";
  slug: "cool-links";
  body: string;
  collection: "misc";
  data: any
} & { render(): Render[".mdx"] };
"handy-links.md": {
	id: "handy-links.md";
  slug: "handy-links";
  body: string;
  collection: "misc";
  data: any
} & { render(): Render[".md"] };
};
"nicknames": {
"ambipom.md": {
	id: "ambipom.md";
  slug: "ambipom";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"annihilape.md": {
	id: "annihilape.md";
  slug: "annihilape";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"archaludon.md": {
	id: "archaludon.md";
  slug: "archaludon";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"ariados.md": {
	id: "ariados.md";
  slug: "ariados";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"beautifly.md": {
	id: "beautifly.md";
  slug: "beautifly";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"bellibolt.md": {
	id: "bellibolt.md";
  slug: "bellibolt";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"blastoise.md": {
	id: "blastoise.md";
  slug: "blastoise";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"centiskorch.md": {
	id: "centiskorch.md";
  slug: "centiskorch";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"deoxys.md": {
	id: "deoxys.md";
  slug: "deoxys";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"dipplin.md": {
	id: "dipplin.md";
  slug: "dipplin";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"feraligatr.md": {
	id: "feraligatr.md";
  slug: "feraligatr";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"ferrothorn.md": {
	id: "ferrothorn.md";
  slug: "ferrothorn";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"fezandipiti.md": {
	id: "fezandipiti.md";
  slug: "fezandipiti";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"gouging-fire.md": {
	id: "gouging-fire.md";
  slug: "gouging-fire";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"hydrapple.md": {
	id: "hydrapple.md";
  slug: "hydrapple";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"ice-rider-calyrex.md": {
	id: "ice-rider-calyrex.md";
  slug: "ice-rider-calyrex";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"incineroar.md": {
	id: "incineroar.md";
  slug: "incineroar";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"iron-boulder.md": {
	id: "iron-boulder.md";
  slug: "iron-boulder";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"iron-crown.md": {
	id: "iron-crown.md";
  slug: "iron-crown";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"iron-moth.md": {
	id: "iron-moth.md";
  slug: "iron-moth";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"jellicent.md": {
	id: "jellicent.md";
  slug: "jellicent";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"kingdra.md": {
	id: "kingdra.md";
  slug: "kingdra";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"magmortar.md": {
	id: "magmortar.md";
  slug: "magmortar";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"metagross.md": {
	id: "metagross.md";
  slug: "metagross";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"mewtwo.md": {
	id: "mewtwo.md";
  slug: "mewtwo";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"mimikyu.md": {
	id: "mimikyu.md";
  slug: "mimikyu";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"ogerpon.md": {
	id: "ogerpon.md";
  slug: "ogerpon";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"pecharunt.md": {
	id: "pecharunt.md";
  slug: "pecharunt";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"poliwrath.md": {
	id: "poliwrath.md";
  slug: "poliwrath";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"quaquaval.md": {
	id: "quaquaval.md";
  slug: "quaquaval";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"raging-bolt.md": {
	id: "raging-bolt.md";
  slug: "raging-bolt";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"raichu.md": {
	id: "raichu.md";
  slug: "raichu";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"raikou.md": {
	id: "raikou.md";
  slug: "raikou";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"scolipede.md": {
	id: "scolipede.md";
  slug: "scolipede";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"shadow-rider-calyrex.md": {
	id: "shadow-rider-calyrex.md";
  slug: "shadow-rider-calyrex";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"snorlax.md": {
	id: "snorlax.md";
  slug: "snorlax";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"stoutland.md": {
	id: "stoutland.md";
  slug: "stoutland";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"terapagos.md": {
	id: "terapagos.md";
  slug: "terapagos";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"themes/breath-of-fire.md": {
	id: "themes/breath-of-fire.md";
  slug: "themes/breath-of-fire";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"themes/fire-type.md": {
	id: "themes/fire-type.md";
  slug: "themes/fire-type";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"themes/golden-sun.md": {
	id: "themes/golden-sun.md";
  slug: "themes/golden-sun";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"themes/ice-type.md": {
	id: "themes/ice-type.md";
  slug: "themes/ice-type";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"themes/legend-of-zelda.md": {
	id: "themes/legend-of-zelda.md";
  slug: "themes/legend-of-zelda";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"themes/rivals-of-aether.md": {
	id: "themes/rivals-of-aether.md";
  slug: "themes/rivals-of-aether";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"themes/tarot-cards.md": {
	id: "themes/tarot-cards.md";
  slug: "themes/tarot-cards";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"tyranitar.md": {
	id: "tyranitar.md";
  slug: "tyranitar";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"walking-wake.md": {
	id: "walking-wake.md";
  slug: "walking-wake";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
"yanma.md": {
	id: "yanma.md";
  slug: "yanma";
  body: string;
  collection: "nicknames";
  data: any
} & { render(): Render[".md"] };
};
"rooms": {
"blastoise.mdx": {
	id: "blastoise.mdx";
  slug: "blastoise";
  body: string;
  collection: "rooms";
  data: any
} & { render(): Render[".mdx"] };
"centiskorch.mdx": {
	id: "centiskorch.mdx";
  slug: "centiskorch";
  body: string;
  collection: "rooms";
  data: any
} & { render(): Render[".mdx"] };
"dragon-quest.mdx": {
	id: "dragon-quest.mdx";
  slug: "dragon-quest";
  body: string;
  collection: "rooms";
  data: any
} & { render(): Render[".mdx"] };
"glitches.mdx": {
	id: "glitches.mdx";
  slug: "glitches";
  body: string;
  collection: "rooms";
  data: any
} & { render(): Render[".mdx"] };
"golden-sun.mdx": {
	id: "golden-sun.mdx";
  slug: "golden-sun";
  body: string;
  collection: "rooms";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
