import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Slider, { type SliderChange } from '../Slider';

const baseUrl = import.meta.env.BASE_URL;
type BundledImageModule = string | { src?: string };
const bundledArticleImages = import.meta.glob('../../content/image/*.{avif,gif,jpeg,jpg,png,webp}', {
	eager: true,
	import: 'default',
}) as Record<string, BundledImageModule>;

const toImageSrc = (module: BundledImageModule | undefined): string => {
	if (!module) {
		return '';
	}

	if (typeof module === 'string') {
		return module;
	}

	return typeof module.src === 'string' ? module.src : '';
};

const defaultArticleImage = toImageSrc(bundledArticleImages['../../content/image/libretto01.jpg']);

const buildArticlePath = (slug: string) => `${baseUrl}articles/${slug}/`;

const resolveArticleImagePath = (imagePath: string): string => {
	const normalizedPath = imagePath.trim().replace(/\\/g, '/');
	if (!normalizedPath) {
		return '';
	}

	if (/^(?:https?:)?\/\//.test(normalizedPath) || normalizedPath.startsWith('data:')) {
		return normalizedPath;
	}

	const trimmedPath = normalizedPath.replace(/^\/+/, '');
	if (trimmedPath.startsWith('content/image/')) {
		return toImageSrc(bundledArticleImages[`../../${trimmedPath}`]);
	}

	if (trimmedPath.startsWith('public/')) {
		return `${baseUrl}${trimmedPath.slice('public/'.length)}`;
	}

	if (normalizedPath.startsWith('/')) {
		return normalizedPath;
	}

	return `${baseUrl}${trimmedPath}`;
};

const normalizeInlineImagePath = (src: string): string => {
	const normalized = src.trim().replace(/\\/g, '/');
	if (!normalized) {
		return normalized;
	}

	const marker = 'content/image/';
	const markerIndex = normalized.indexOf(marker);
	if (markerIndex >= 0) {
		return normalized.slice(markerIndex);
	}

	return normalized;
};

const rewriteInlineImageSources = (html: string): string => {
	return html.replace(/<img([^>]*?)src=(['"])([^'"]+)\2([^>]*)>/gi, (_match, pre, quote, src, post) => {
		const candidate = normalizeInlineImagePath(String(src));
		const resolved = resolveArticleImagePath(candidate) || resolveArticleImagePath(String(src));
		const nextSrc = resolved || String(src);
		return `<img${pre}src=${quote}${nextSrc}${quote}${post}>`;
	});
};

const getScrollableElement = (): HTMLElement | null => {
	if (typeof document === 'undefined') {
		return null;
	}

	const page = document.querySelector<HTMLElement>('.scaling-page.active, .scaling-page');
	if (page) {
		const overflowY = window.getComputedStyle(page).overflowY;
		if ((overflowY === 'auto' || overflowY === 'scroll') && page.scrollHeight > page.clientHeight) {
			return page;
		}
	}

	return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
};

const readScrollTop = () => {
	const element = getScrollableElement();
	return element?.scrollTop ?? 0;
};

const restoreScrollTop = (top: number) => {
	const element = getScrollableElement();
	if (!element) {
		return;
	}

	element.scrollTop = top;
	if (typeof window !== 'undefined' && element === document.scrollingElement) {
		window.scrollTo({ top, behavior: 'auto' });
	}
};

export type ArticleSummary = {
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
	html: string;
};

type Props = {
	articles: ArticleSummary[];
	initialSlug?: string;
	updateUrl?: boolean;
};

const nearestArticle = (articles: ArticleSummary[], spaceIndex: number, timeIndex: number) => {
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

const ArticleExplorer: React.FC<Props> = ({ articles = [], initialSlug, updateUrl = true }) => {
	const initialArticle = useMemo(() => {
		return articles.find((article) => article.slug === initialSlug) ?? articles[0];
	}, [articles, initialSlug]);
	const scrollPositionsRef = useRef<Record<string, number>>({});

	const [currentSlug, setCurrentSlug] = useState(initialArticle?.slug ?? '');
	const [selection, setSelection] = useState({
		spaceIndex: initialArticle?.spaceIndex ?? 0,
		timeIndex: initialArticle?.timeIndex ?? 9,
	});

	useEffect(() => {
		if (!initialArticle) {
			return;
		}

		setCurrentSlug((current) => (current === initialArticle.slug ? current : initialArticle.slug));
		setSelection((current) => {
			if (
				current.spaceIndex === initialArticle.spaceIndex &&
				current.timeIndex === initialArticle.timeIndex
			) {
				return current;
			}

			return {
				spaceIndex: initialArticle.spaceIndex,
				timeIndex: initialArticle.timeIndex,
			};
		});
	}, [initialArticle]);

	const currentArticle = useMemo(() => {
		return articles.find((article) => article.slug === currentSlug) ?? initialArticle;
	}, [articles, currentSlug, initialArticle]);

	const heroImageSrc = useMemo(() => {
		if (!currentArticle) {
			return defaultArticleImage;
		}

		return resolveArticleImagePath(currentArticle.image) || defaultArticleImage;
	}, [currentArticle]);

	const footerImageSrc = useMemo(() => {
		if (!currentArticle) {
			return defaultArticleImage;
		}

		return resolveArticleImagePath(currentArticle.footerImage) || defaultArticleImage;
	}, [currentArticle]);

	const articleHtmlWithResolvedImages = useMemo(() => {
		if (!currentArticle) {
			return '';
		}

		return rewriteInlineImageSources(currentArticle.html);
	}, [currentArticle]);

	useEffect(() => {
		if (typeof document === 'undefined') {
			return;
		}

		document.title = currentArticle?.title ?? 'Spatiotemporal Scaler';
	}, [currentArticle]);

	useEffect(() => {
		if (!currentArticle || typeof window === 'undefined') {
			return;
		}

		const nextScrollTop = scrollPositionsRef.current[currentArticle.slug] ?? 0;
		const restore = () => {
			restoreScrollTop(nextScrollTop);
		};

		restore();
		window.requestAnimationFrame(restore);
		const timeoutIds = [window.setTimeout(restore, 120), window.setTimeout(restore, 300)];

		return () => {
			for (const timeoutId of timeoutIds) {
				window.clearTimeout(timeoutId);
			}
		};
	}, [currentArticle]);

	const hasExactMatch = useMemo(() => {
		return articles.some(
			(article) => article.spaceIndex === selection.spaceIndex && article.timeIndex === selection.timeIndex,
		);
	}, [articles, selection]);

	const handleSliderChange = useCallback((value: SliderChange) => {
		const nextSelection = { spaceIndex: value.spaceIndex, timeIndex: value.timeIndex };
		setSelection((current) => {
			if (current.spaceIndex === nextSelection.spaceIndex && current.timeIndex === nextSelection.timeIndex) {
				return current;
			}

			return nextSelection;
		});

		const nextArticle = nearestArticle(articles, nextSelection.spaceIndex, nextSelection.timeIndex);
		if (!nextArticle) {
			return;
		}

		if (currentSlug && currentSlug !== nextArticle.slug) {
			scrollPositionsRef.current[currentSlug] = readScrollTop();
			restoreScrollTop(scrollPositionsRef.current[nextArticle.slug] ?? 0);
		}

		setCurrentSlug((current) => (current === nextArticle.slug ? current : nextArticle.slug));
		if (updateUrl && typeof window !== 'undefined') {
			const nextPath = buildArticlePath(nextArticle.slug);
			if (window.location.pathname !== nextPath) {
				window.history.replaceState({}, '', nextPath);
			}
		}
	}, [articles, currentSlug, updateUrl]);

	if (!currentArticle) {
		return <article className="article-preview"><p>記事がありません。</p></article>;
	}

	return (
		<>
			<div id="slider-root">
				<Slider
					onChange={handleSliderChange}
					spaceIndex={selection.spaceIndex}
					timeIndex={selection.timeIndex}
				/>
			</div>

			<article className="dummy-article article-preview">
				{!hasExactMatch ? (
					<p className="article-hint">この位置に完全一致する記事がないため、最寄りの記事を表示しています。</p>
				) : null}
				{heroImageSrc ? (
					<figure className="article-figure article-figure-top">
						<img
							className="article-image"
							src={heroImageSrc}
							alt={currentArticle.imageAlt || `${currentArticle.title} の扉画像`}
						/>
					</figure>
				) : null}
				<div className="article-body" dangerouslySetInnerHTML={{ __html: articleHtmlWithResolvedImages }} />
				{footerImageSrc ? (
					<figure className="article-figure article-figure-bottom">
						<img
							className="article-image"
							src={footerImageSrc}
							alt={currentArticle.footerImageAlt || `${currentArticle.title} の末尾画像`}
						/>
					</figure>
				) : null}
			</article>
		</>
	);
};

export default ArticleExplorer;