import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import site from '../data/site.json';

export async function GET(context) {
	const posts = await getCollection('blog');
	const allPosts = posts.sort(
	(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
	return rss({
		title: site.title,
		description: site.description,
		site: context.site,
		items: allPosts.map((post) => ({
			link: `/blog/${post.slug}/`,
      ...post.data,
    }))
		});
	}