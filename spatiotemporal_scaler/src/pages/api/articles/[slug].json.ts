import type { APIRoute } from 'astro';
import { getAllArticleSummaries, getArticleBySlug } from '../../../lib/articles';

export function getStaticPaths() {
	const articles = getAllArticleSummaries();
	return articles.map((article) => ({ params: { slug: article.slug } }));
}

export const GET: APIRoute = ({ params }) => {
	const slug = params.slug ?? '';
	const article = slug ? getArticleBySlug(slug) : undefined;

	if (!article) {
		return new Response(JSON.stringify({ message: 'Article not found' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		});
	}

	return new Response(
		JSON.stringify({
			title: article.title,
			date: article.date,
			slug: article.slug,
			id: article.id,
			summary: article.summary,
			author: article.author,
			image: article.image,
			imageAlt: article.imageAlt,
			footerImage: article.footerImage,
			footerImageAlt: article.footerImageAlt,
			footerImageEnabled: article.footerImageEnabled,
			categories: article.categories,
			tags: article.tags,
			spaceIndex: article.spaceIndex,
			spaceUnit: article.spaceUnit,
			timeIndex: article.timeIndex,
			html: article.html,
		}),
		{
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		},
	);
};
