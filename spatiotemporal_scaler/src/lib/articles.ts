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
	footerImage: string;
	footerImageAlt: string;
	footerImageEnabled: boolean;
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

export type ArticleSummaryRecord = Omit<ArticleRecord, 'body' | 'html' | 'published' | 'fileName'>;

const articlesDir = path.resolve(process.cwd(), 'content', 'articles');

let cachedArticles: ArticleRecord[] | null = null;
let cachedArticleBySlug: Map<string, ArticleRecord> | null = null;
let cachedArticleSummaries: ArticleSummaryRecord[] | null = null;
let cachedArticlesRevision = '';

const isDevRuntime = process.env.NODE_ENV !== 'production';

// Only sagan_*.md are articles; the original 2026-09-13-* sources live in content/articles/元素材/
const isArticleFile = (fileName: string): boolean =>
	fileName.startsWith('sagan_') && fileName.toLowerCase().endsWith('.md');

const listArticleFiles = (): string[] =>
	fs
		.readdirSync(articlesDir)
		.filter(isArticleFile)
		.sort((left, right) => left.localeCompare(right, 'ja'));

const buildArticlesRevision = (): string => {
	if (!fs.existsSync(articlesDir)) return 'missing';

	const mdFiles = listArticleFiles();

	const parts = mdFiles.map((name) => {
		const filePath = path.join(articlesDir, name);
		const stat = fs.statSync(filePath);
		return `${name}:${stat.size}:${Math.trunc(stat.mtimeMs)}`;
	});

	return parts.join('|');
};

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

const comparePreferredArticle = (left: ArticleRecord, right: ArticleRecord): number => {
	const dateDiff = right.date.localeCompare(left.date);
	if (dateDiff !== 0) return dateDiff;

	return left.fileName.localeCompare(right.fileName, 'ja');
};

const markdownProcessor = unified()
	.use(remarkParse)
	.use(remarkMath)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeKatex)
	.use(rehypeStringify, { allowDangerousHtml: true });

// unified synchronous pipeline for Markdown -> HTML with math support
const markdownToHtmlSync = (source: string): string => {
	const file = markdownProcessor.processSync(preprocessMarkdown(source));
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
		footerImage: String(data.footer_image ?? ''),
		footerImageAlt: String(data.footer_image_alt ?? ''),
		footerImageEnabled: toBoolean(data.footer_image_enabled, false),
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

const buildAllArticles = (): ArticleRecord[] => {
	if (!fs.existsSync(articlesDir)) return [];

	const parsedArticles = listArticleFiles().map((name) => parseArticleFile(path.join(articlesDir, name)));

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

const toArticleSummary = (article: ArticleRecord): ArticleSummaryRecord => ({
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
});

export const getAllArticles = (): ArticleRecord[] => {
	if (!cachedArticles) {
		cachedArticles = buildAllArticles();
		cachedArticleBySlug = new Map(cachedArticles.map((article) => [article.slug, article]));
		cachedArticleSummaries = cachedArticles.map(toArticleSummary);
		cachedArticlesRevision = isDevRuntime ? buildArticlesRevision() : 'production';
		return cachedArticles;
	}

	if (!isDevRuntime) {
		return cachedArticles;
	}

	const nextRevision = buildArticlesRevision();
	if (cachedArticlesRevision !== nextRevision) {
		cachedArticles = buildAllArticles();
		cachedArticleBySlug = new Map(cachedArticles.map((article) => [article.slug, article]));
		cachedArticleSummaries = cachedArticles.map(toArticleSummary);
		cachedArticlesRevision = nextRevision;
	}

	return cachedArticles;
};

export const getArticleBySlug = (slug: string): ArticleRecord | undefined => {
	if (!cachedArticleBySlug) {
		getAllArticles();
	}

	return cachedArticleBySlug?.get(slug);
};

export const getAllArticleSummaries = (): ArticleSummaryRecord[] => {
	if (!cachedArticles || !cachedArticleSummaries) {
		getAllArticles();
	}

	return cachedArticleSummaries ?? [];
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
