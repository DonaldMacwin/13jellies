import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

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

const toStringArray = (value: unknown): string[] => {
	if (!Array.isArray(value)) return [];
	return value.map((item) => String(item));
};

const toNumber = (value: unknown, fallback = 0): number => {
	if (typeof value === 'number' && Number.isFinite(value)) return value;
	if (typeof value === 'string' && value.trim() !== '') {
		const parsed = Number(value);
		if (Number.isFinite(parsed)) return parsed;
	}
	return fallback;
};

const toBoolean = (value: unknown, fallback = true): boolean => {
	if (typeof value === 'boolean') return value;
	if (typeof value === 'string') {
		if (value.toLowerCase() === 'true') return true;
		if (value.toLowerCase() === 'false') return false;
	}
	return fallback;
};

const preprocessMarkdown = (source: string): string => {
	return source
		.replace(/｜([^｜《\n\r]+)《([^》\n\r]+)》/g, '<ruby>$1<rt>$2</rt></ruby>')
		.replace(/^\s*[—―─]+\s*$/gm, '---');
};

const isPreferredArticleFile = (fileName: string): boolean => fileName.startsWith('sagan_');

const isGeneratedFallbackFile = (fileName: string): boolean => /^\d{4}-\d{2}-\d{2}-/.test(fileName);

const articlePriority = (article: ArticleRecord): number => {
	if (isPreferredArticleFile(article.fileName)) return 2;
	if (isGeneratedFallbackFile(article.fileName)) return 1;
	return 0;
};

const isDisplayableArticle = (article: ArticleRecord): boolean => {
	return isPreferredArticleFile(article.fileName) || article.published;
};

const comparePreferredArticle = (left: ArticleRecord, right: ArticleRecord): number => {
	const priorityDiff = articlePriority(right) - articlePriority(left);
	if (priorityDiff !== 0) return priorityDiff;

	const dateDiff = right.date.localeCompare(left.date);
	if (dateDiff !== 0) return dateDiff;

	return left.fileName.localeCompare(right.fileName, 'ja');
};

// unified synchronous pipeline for Markdown -> HTML with math support
const markdownToHtmlSync = (source: string): string => {
	const file = unified()
		.use(remarkParse)
		.use(remarkMath)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeKatex)
		.use(rehypeStringify, { allowDangerousHtml: true })
		.processSync(preprocessMarkdown(source));
	return String(file);
};

export const parseArticleFile = (filePath: string): ArticleRecord => {
	const source = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(source);
	const fileName = path.basename(filePath);
	const slugFromFile = fileName.replace(/\.md$/i, '');
	const html = markdownToHtmlSync(content);

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
		timeIndex: toNumber(data.time_index, 9),
		published: toBoolean(data.published, true),
		fileName,
		body: content,
		html,
	};
};

export const getAllArticles = (): ArticleRecord[] => {
	if (!fs.existsSync(articlesDir)) return [];

	const parsedArticles = fs
		.readdirSync(articlesDir)
		.filter((name) => name.toLowerCase().endsWith('.md'))
		.filter((name) => name.toLowerCase() !== 'readme.md')
		.map((name) => parseArticleFile(path.join(articlesDir, name)))
		.filter(isDisplayableArticle);

	const selectedByCoordinate = new Map<string, ArticleRecord>();
	for (const article of parsedArticles) {
		const coordinateKey = `${article.spaceIndex}:${article.timeIndex}`;
		const current = selectedByCoordinate.get(coordinateKey);
		if (!current || comparePreferredArticle(article, current) < 0) {
			selectedByCoordinate.set(coordinateKey, article);
		}
	}

	return Array.from(selectedByCoordinate.values())
		.sort((left, right) => {
			if (left.date === right.date) return left.slug.localeCompare(right.slug, 'ja');
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
	if (articles.length === 0) return undefined;

	return articles
		.slice()
		.sort((left, right) => {
			const leftDistance = Math.abs(left.spaceIndex - spaceIndex) + Math.abs(left.timeIndex - timeIndex);
			const rightDistance = Math.abs(right.spaceIndex - spaceIndex) + Math.abs(right.timeIndex - timeIndex);

			if (leftDistance !== rightDistance) return leftDistance - rightDistance;

			return comparePreferredArticle(left, right);
		})[0];
};
