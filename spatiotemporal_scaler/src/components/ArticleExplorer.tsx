import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Slider, { type SliderChange } from '../Slider';

const baseUrl = import.meta.env.BASE_URL;

const buildArticlePath = (slug: string) => `${baseUrl}articles/${slug}/`;

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

			if (left.slug.startsWith('sagan_') !== right.slug.startsWith('sagan_')) {
				return left.slug.startsWith('sagan_') ? -1 : 1;
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
				<div className="article-body" dangerouslySetInnerHTML={{ __html: currentArticle.html }} />
			</article>
		</>
	);
};

export default ArticleExplorer;