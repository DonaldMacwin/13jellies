import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Slider, { type SliderChange } from '../Slider';

const baseUrl = import.meta.env.BASE_URL;

const buildArticlePath = (slug: string) => `${baseUrl}articles/${slug}/`;

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

			return right.date.localeCompare(left.date);
		})[0];
};

const ArticleExplorer: React.FC<Props> = ({ articles = [], initialSlug, updateUrl = true }) => {
	const initialArticle = useMemo(() => {
		return articles.find((article) => article.slug === initialSlug) ?? articles[0];
	}, [articles, initialSlug]);

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

		setCurrentSlug((current) => (current === nextArticle.slug ? current : nextArticle.slug));
		if (updateUrl && typeof window !== 'undefined') {
			const nextPath = buildArticlePath(nextArticle.slug);
			if (window.location.pathname !== nextPath) {
				window.history.replaceState({}, '', nextPath);
			}
		}
	}, [articles, updateUrl]);

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
				<h1 className="page-title">{currentArticle.title}</h1>
				{currentArticle.summary ? <p className="page-description">{currentArticle.summary}</p> : null}
				<p className="article-meta">
					<span>{currentArticle.author}</span>
					<span>{currentArticle.date}</span>
					<span>{currentArticle.slug}</span>
				</p>
				{!hasExactMatch ? (
					<p className="article-hint">この位置に完全一致する記事がないため、最寄りの記事を表示しています。</p>
				) : null}
				<div className="article-body" dangerouslySetInnerHTML={{ __html: currentArticle.html }} />
			</article>
		</>
	);
};

export default ArticleExplorer;