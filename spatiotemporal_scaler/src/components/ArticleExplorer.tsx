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

const splitLeadingHeading = (html: string) => {
	const headingMatch = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
	if (!headingMatch) {
		return { headingHtml: '', contentHtml: html };
	}

	return {
		headingHtml: headingMatch[1].trim(),
		contentHtml: html.replace(headingMatch[0], '').trimStart(),
	};
};

const siteInfoDummyParagraphs: React.ReactNode[] = [
	<>
		登場人物
	</>,
	<>
		<strong>モード：　</strong>48歳。別荘の女主人。美人。<br />
		<strong>アンリ：　</strong>49歳。哲学者の逸話に詳しい皮肉屋。<br />
		<strong>ルイ：　</strong>50歳。地質と気象に通じた元環境活動家。<br />
		<strong>イザベル：　</strong>45歳。愛想のいいパリジェンヌ。<br />
		<strong>エドモン：　</strong>46歳。天文学者。<br />
		<strong>ジャン：　</strong>皆と知り合いの男性。<br />
		<strong>シルヴィアーヌ：　</strong>ジャンの妻。<br /><br />
		<strong>セシル：　</strong>32歳。翻訳と書評の下請けで食べている。<br />
		<strong>マルト：　</strong>セシルの姉。<br />
		<strong>ドミニク：　</strong>セシルの友人。研究所の広報スタッフ。<br />
		<strong>ローラン：　</strong>セシルと5年前に別れた相手。<br />
		<strong>ペラン：　</strong>翻訳書籍の編集者。<br />
		<strong>ブリュネ夫人：　</strong>セシルのバカンス先隣家に毎夏来る老夫人。<br /><br /><br />
	</>,
	<>
		バカンス時空間スケーラーは、人智の及ぶ時空論の範囲を手軽に理解・把握できるよう設営されたサイトです。<br />
		地理・歴史・気象・地学・天文の学術基礎知識をベースに、あなたがより直感的に時空論を理解できるよう、できるかぎり学術説明へ寄らないようにわかりやすい文芸体裁で記述されています。<br />
		画面の時空スライダーを操作し、空間は最小半径5km～最大10^12光年以上まで、時間は最小5年～最大500億年の過去未来まで、時空間のおおまかな視座変化を把握することができます。
	</>,
	<>
		筆者としては人類の視野の狭さ・ちっぽけさ・無力さ・夜郎自大ぶりを感じてもらえればと思っています。しかし地球や宇宙の広がりを、むしろあなたが感じとってしまっていただいても構いません。
	</>,
	/*<>
		この段落にはリンク例を入れています。詳しい導線を置く場合は
		{' '}
		<a href="https://example.com/about" target="_blank" rel="noreferrer">
			サイト紹介ページ
		</a>
		{' '}
		のように記述できます。テキスト本体は後で自由に差し替えてください。
	</>,*/
];

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
	const [isSiteInfoOpen, setIsSiteInfoOpen] = useState(false);

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
	const { headingHtml, contentHtml } = useMemo(() => {
		return splitLeadingHeading(articleHtmlWithResolvedImages);
	}, [articleHtmlWithResolvedImages]);
	const logoImageSrc = useMemo(() => {
		return resolveArticleImagePath('content/image/logo_A.jpg');
	}, []);

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

	useEffect(() => {
		if (!isSiteInfoOpen || typeof window === 'undefined') {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsSiteInfoOpen(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isSiteInfoOpen]);

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
				<div className="article-title-row">
					{headingHtml ? (
						<h1 className="article-main-title" dangerouslySetInnerHTML={{ __html: headingHtml }} />
					) : (
						<h1 className="article-main-title">{currentArticle.title}</h1>
					)}
					{logoImageSrc ? (
						<button
							type="button"
							className="site-info-logo-button"
							onClick={() => setIsSiteInfoOpen(true)}
							aria-label="このサイトについて"
						>
							<img className="site-info-logo-image" src={logoImageSrc} alt="このサイトについて" />
						</button>
					) : null}
				</div>
				<div
					className="article-body"
					dangerouslySetInnerHTML={{ __html: contentHtml || articleHtmlWithResolvedImages }}
				/>
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
			{isSiteInfoOpen ? (
				<div className="site-info-dialog-backdrop" onClick={() => setIsSiteInfoOpen(false)}>
					<section
						className="site-info-dialog"
						role="dialog"
						aria-modal="true"
						aria-labelledby="site-info-dialog-title"
						onClick={(event) => event.stopPropagation()}
					>
						<div className="site-info-dialog-header">
							<h2 id="site-info-dialog-title">バカンス時空間スケーラー</h2>
							<button
								type="button"
								className="site-info-dialog-close"
								onClick={() => setIsSiteInfoOpen(false)}
								aria-label="閉じる"
							>
								×
							</button>
						</div>
						<div className="site-info-dialog-content">
							{siteInfoDummyParagraphs.map((paragraph, index) => (
								<p key={`site-info-paragraph-${index}`}>{paragraph}</p>
							))}
						</div>
					</section>
				</div>
			) : null}
		</>
	);
};

export default ArticleExplorer;