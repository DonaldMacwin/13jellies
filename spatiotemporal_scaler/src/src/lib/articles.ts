import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type ArticleRecord = {
	title: string;
	date: string;
	slug: string;
	id: string;
	summary: string;
	author: string;
	image: string;
	imageAlt: string;
	categories: string[];
	tags: string[];
	spaceIndex: number;
	spaceUnit: string;
	timeIndex: number;
	published: boolean;
	fileName: string;
	body: string;
	html: string;
};

const articlesDir = path.resolve(process.cwd(), 'content', 'articles');

marked.setOptions({
	gfm: true,
	breaks: true,
});

const toStringArray = (value: unknown): string[] => {
	if (!Array.isArray(value)) {
		return [];
	}

	return value.map((item) => String(item));
};

const toNumber = (value: unknown, fallback = 0): number => {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}

	if (typeof value === 'string' && value.trim() !== '') {
		const parsed = Number(value);
		if (Number.isFinite(parsed)) {
			return parsed;
		}
	}

	return fallback;
};

const toBoolean = (value: unknown, fallback = true): boolean => {
	if (typeof value === 'boolean') {
		return value;
	}

	if (typeof value === 'string') {
		if (value.toLowerCase() === 'true') {
			return true;
		}
		if (value.toLowerCase() === 'false') {
			return false;
		}
	}

	return fallback;
};

export const parseArticleFile = (filePath: string): ArticleRecord => {
	const source = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(source);
	const fileName = path.basename(filePath);
	const slugFromFile = fileName.replace(/\.md$/i, '');
	const html = String(marked.parse(content));

	return {
		title: String(data.title ?? slugFromFile),
		date: String(data.date ?? ''),
		slug: String(data.slug ?? slugFromFile),
		id: String(data.id ?? data.slug ?? slugFromFile),
		summary: String(data.summary ?? ''),
		author: String(data.author ?? ''),
		image: String(data.image ?? ''),
		imageAlt: String(data.image_alt ?? ''),
		categories: toStringArray(data.categories),
		tags: toStringArray(data.tags),
		spaceIndex: toNumber(data.space_index),
		spaceUnit: String(data.space_unit ?? ''),
		timeIndex: toNumber(data.time_index, 10),
		published: toBoolean(data.published, true),
		fileName,
		body: content,
		html,
	};
};

export const getAllArticles = (): ArticleRecord[] => {
	if (!fs.existsSync(articlesDir)) {
		return [];
	}

	return fs
		.readdirSync(articlesDir)
		.filter((name) => name.toLowerCase().endsWith('.md'))
		.filter((name) => name.toLowerCase() !== 'readme.md')
		.map((name) => parseArticleFile(path.join(articlesDir, name)))
		.filter((article) => article.published)
		.sort((left, right) => {
			if (left.date === right.date) {
				return left.slug.localeCompare(right.slug, 'ja');
			}
			return right.date.localeCompare(left.date);
		});
};

export const getArticleBySlug = (slug: string): ArticleRecord | undefined => {
	return getAllArticles().find((article) => article.slug === slug);
};

export const findNearestArticle = (
	articles: ArticleRecord[],
	spaceIndex: number,
	timeIndex: number,
): ArticleRecord | undefined => {
	if (articles.length === 0) {
		return undefined;
	}

	return articles
		.slice()
		.sort((left, right) => {
			const leftDistance = Math.abs(left.spaceIndex - spaceIndex) + Math.abs(left.timeIndex - timeIndex);
			const rightDistance = Math.abs(right.spaceIndex - spaceIndex) + Math.abs(right.timeIndex - timeIndex);

			if (leftDistance !== rightDistance) {
				return leftDistance - rightDistance;
			}

			return right.date.localeCompare(left.date);
		})[0];
};