import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import site from '../data/site.json';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function get(context) {
	const posts = await getCollection('blog');
	const allPosts = Object.values(posts).sort(
	  (a, b) =>
	    new Date(b.pubDate).valueOf() -
	    new Date(a.pubDate).valueOf()
	);
	return rss({
		title: site.title,
		description: site.description,
		site: context.site,
		items: allPosts.map((post) => ({
			link: `/blog/${post.slug}/`,
			content: sanitizeHtml(parser.render(post.body)),
      ...post.data,
    }))
		});
	}