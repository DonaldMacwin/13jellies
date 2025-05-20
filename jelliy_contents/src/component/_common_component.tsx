import React from 'react';
import { useState, useEffect, useRef } from 'react';
import type { CSSProperties, RefObject } from 'react';

// -----------------アニメーション制御
// 画像アニメエフェクト用SVGフィルター定義（全体で一度だけ配置）
export const SharedImageFilters: React.FC = () => (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
            {/* 画像アニメーションのフィルター群 */}
            {/* ピクセル化フィルター */}
            <filter id="pixelate_x16">
                <feFlood x="0" y="0" height="16" width="16" />
                <feComposite width="32" height="32" />
                <feTile result="a" />
                <feComposite in="SourceGraphic" in2="a" operator="in" />
                <feMorphology operator="dilate" radius="1" />
            </filter>
            <filter id="pixelate_x4">
                <feFlood x="4" y="4" height="8" width="8" />
                <feComposite width="16" height="16" />
                <feTile result="a" />
                <feComposite in="SourceGraphic" in2="a" operator="in" />
                <feMorphology operator="dilate" radius="1" />
            </filter>
            <filter id="pixelate_x2">
                <feFlood x="4" y="4" height="2" width="2" />
                <feComposite width="8" height="8" />
                <feTile result="a" />
                <feComposite in="SourceGraphic" in2="a" operator="in" />
                <feMorphology operator="dilate" radius="1" />
            </filter>
            {/* ノイズフィルター */}
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 0.5 0" />
                <feComposite operator="in" in2="SourceGraphic" />
                <feBlend mode="multiply" in2="SourceGraphic" result="noisy" />
            </filter>
        </defs>
    </svg>
);

/**
 * FirstView画像以外を段階的にプリロードする共通フック
 * @param imageGroups 画像配列の配列（FirstView以外）
 * @param delay 最初の遅延ms
 * @param interval 各グループ間の遅延ms
 */
export function useStepImagePreload(
    imageGroups: { src: string }[][],
    delay: number = 1000, // FirstView表示後1秒待って開始
    interval: number = 500 // 0.5秒ごとに次のグループ
) {
    useEffect(() => {
        let idx = 0;
        function preloadNextGroup() {
            if (idx >= imageGroups.length) return;
            imageGroups[idx].forEach(imgObj => {
                const img = new window.Image();
                img.src = imgObj.src;
            });
            idx++;
            setTimeout(preloadNextGroup, interval);
        }
        const timer = setTimeout(preloadNextGroup, delay);
        return () => clearTimeout(timer);
    }, [imageGroups, delay, interval]);
}

export function useFirstViewMeritDemeritAnimation(active: boolean) {
    // FirstView長所短所アニメーション用の状態
    const [animateMerit, setAnimateMerit] = useState(false);
    const [animateDemerit, setAnimateDemerit] = useState(false);

    // 画像が表示されるたびにアニメーションを開始
    useEffect(() => {
        if (active) {
            setAnimateMerit(false);
            setAnimateDemerit(false);
            const timer = setTimeout(() => {
                setAnimateMerit(true);
                setAnimateDemerit(true);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setAnimateMerit(false);
            setAnimateDemerit(false);
        }
    }, [active]);

    return { animateMerit, animateDemerit };
}

export function useFirstViewImageAnimation(active: boolean) {
    // FirstViewゼリーマップアニメーション用の状態
    const [imageAnimationClass, setImageAnimationClass] = useState('');
    const [animationTimerId, setAnimationTimerId] = useState<number | null>(null);

    useEffect(() => {
        if (active) {
            setImageAnimationClass('');
            if (animationTimerId) clearTimeout(animationTimerId);

            const initialTimer = setTimeout(() => {
                setImageAnimationClass('shibuya-effect');
                setTimeout(() => {
                    setImageAnimationClass('');
                    // ランダム間隔でエフェクト繰り返し
                    const startRandomAnimation = () => {
                        const randomInterval = Math.floor(Math.random() * 10000) + 5000;
                        const timerId = setTimeout(() => {
                            setImageAnimationClass('shibuya-effect');
                            setTimeout(() => {
                                setImageAnimationClass('');
                                startRandomAnimation();
                            }, 3500);
                        }, randomInterval);
                        setAnimationTimerId(timerId);
                    };
                    startRandomAnimation();
                }, 3500);
            }, 2000);

            return () => {
                clearTimeout(initialTimer);
                if (animationTimerId) clearTimeout(animationTimerId);
            };
        } else {
            // 他のセクションに移動したらアニメーション停止
            if (animationTimerId) clearTimeout(animationTimerId);
            setAnimationTimerId(null);
            setImageAnimationClass('');
        }
    }, [active]);

    return { imageAnimationClass };
}

// セクション内画像アニメーション用カスタムフック
export function useSectionImageAnimations(active: boolean, imageCount: number) {
    // 画像アニメーション用の状態（表示、非表示、入場、退場）
    const [imagesState, setImagesState] = useState<(
        "image-hidden" | "image-leaving" | "image-visible" | "image-entering"
    )[]>(Array(imageCount).fill("image-hidden"));
    const [imagesStyles, setImagesStyles] = useState<CSSProperties[]>(Array(imageCount).fill({}));
    const [imageEffects, setImageEffects] = useState<string[]>(Array(imageCount).fill(''));
    const [imageVisibility, setImageVisibility] = useState<boolean[]>(Array(imageCount).fill(false));
    const animationTimerRefs = useRef<(number | null)[]>([]);
    const effectTimerRefs = useRef<(number | null)[]>([]);

    // 状態配列のリサイズ
    useEffect(() => {
        setImagesState(prev => prev.length === imageCount ? prev : Array(imageCount).fill("image-hidden"));
        setImagesStyles(prev => prev.length === imageCount ? prev : Array(imageCount).fill({}));
        setImageEffects(prev => prev.length === imageCount ? prev : Array(imageCount).fill(''));
        setImageVisibility(prev => prev.length === imageCount ? prev : Array(imageCount).fill(false));
    }, [imageCount]);

    // 範囲外の位置を生成
    const generateOutsidePosition = () => {
        const directions = ['top', 'right', 'bottom', 'left'];
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const distance = Math.floor(Math.random() * 500) + 300;
        switch (direction) {
            case 'top': return { x: Math.floor(Math.random() * 400) - 200, y: -distance };
            case 'right': return { x: distance, y: Math.floor(Math.random() * 400) - 200 };
            case 'bottom': return { x: Math.floor(Math.random() * 400) - 200, y: distance };
            case 'left': return { x: -distance, y: Math.floor(Math.random() * 400) - 200 };
            default: return { x: 0, y: 0 };
        }
    };

    // セクションのアニメーション制御
    useEffect(() => {
        if (!active) {
            animationTimerRefs.current.forEach(timer => { if (timer) clearTimeout(timer); });
            effectTimerRefs.current.forEach(timer => { if (timer) clearTimeout(timer); });
            setImagesState(Array(imageCount).fill('image-hidden'));
            setImageEffects(Array(imageCount).fill(''));
            return;
        }
        // 表示状態の初期化 - 初回表示時にアニメ動作が発火しない問題を解決するために最初にすべてfalseに設定
        setImageVisibility(Array(imageCount).fill(false));
        for (let i = 0; i < imageCount; i++) {
            setImagesState(prev => { const n = [...prev]; n[i] = 'image-hidden'; return n; });
            setImageEffects(prev => { const n = [...prev]; n[i] = ''; return n; });
            const startDisplayDelay = Math.random() * 5000; // 0〜5秒のランダム遅延時間
            const startImageCycle = () => {
                // 1. 入場アニメーションの準備とスタイル設定
                const startPos = generateOutsidePosition();
                const endPos = generateOutsidePosition();
                setImagesStyles(prev => {
                    const updated = [...prev];
                    updated[i] = {
                        '--start-x': `${startPos.x}px`,
                        '--start-y': `${startPos.y}px`,
                        '--end-x': `${endPos.x}px`,
                        '--end-y': `${endPos.y}px`,
                    } as CSSProperties;
                    return updated;
                });
                // 2. 入場アニメーションの開始
                setImagesState(prev => { const n = [...prev]; n[i] = 'image-entering'; return n; });
                // 3. 入場アニメーション完了後の処理
                const visibleTimer = setTimeout(() => {
                    setImagesState(prev => { const n = [...prev]; n[i] = 'image-visible'; return n; });
                    setImageVisibility(prev => { const n = [...prev]; n[i] = true; return n; });
                    // 4. ランダムエフェクトの開始
                    // 各画像ごとに effectTimer を1つだけ持つ
                    const startRandomEffects = () => {
                        // 既存のタイマーをクリア
                        if (effectTimerRefs.current[i]) clearTimeout(effectTimerRefs.current[i]!);
                        const effectDelay = Math.random() * 3500 + 500; //エフェクト開始までのランダム遅延時間を短縮（0.5〜4秒）
                        effectTimerRefs.current[i] = setTimeout(() => {
                            setImageEffects(prev => { const n = [...prev]; n[i] = 'shibuya-effect'; return n; });
                            // エフェクト終了後
                            effectTimerRefs.current[i] = setTimeout(() => {
                                setImageEffects(prev => { const n = [...prev]; n[i] = ''; return n; });
                                // 次のエフェクト
                                if (imageVisibility[i]) startRandomEffects();
                            }, 1000);
                        }, effectDelay);
                    };
                    setTimeout(() => { startRandomEffects(); }, 100);

                    // 5. 表示時間をランダムに設定（5〜15秒
                    const displayDuration = Math.random() * 10000 + 5000;
                    // 6. 退場アニメーションの開始
                    const exitTimer = setTimeout(() => {
                        setImageVisibility(prev => { const n = [...prev]; n[i] = false; return n; });
                        setImagesState(prev => { const n = [...prev]; n[i] = 'image-leaving'; return n; });
                        // 7. 退場アニメーション完了後の処理
                        const hideTimer = setTimeout(() => {
                            setImagesState(prev => { const n = [...prev]; n[i] = 'image-hidden'; return n; });
                            const nextCycleDelay = Math.random() * 6000 + 2000;
                            const nextCycleTimer = setTimeout(() => { startImageCycle(); }, nextCycleDelay);
                            animationTimerRefs.current.push(nextCycleTimer);
                        }, 2000);
                        animationTimerRefs.current.push(hideTimer);
                    }, displayDuration);
                    animationTimerRefs.current.push(exitTimer);
                }, 2000);
                animationTimerRefs.current.push(visibleTimer);
            };
            const initialTimer = setTimeout(() => { startImageCycle(); }, startDisplayDelay);
            animationTimerRefs.current.push(initialTimer);
        }
        return () => {
            animationTimerRefs.current.forEach(timer => { if (timer) clearTimeout(timer); });
            effectTimerRefs.current.forEach(timer => { if (timer) clearTimeout(timer); });
        };
        // eslint-disable-next-line
    }, [active, imageCount]);

    // 長時間表示のときのちらつき防止のために、最低1枚は常時表示
    useEffect(() => {
        if (!active) return;
        const checkAndForceVisible = () => {
            setImagesState(prev => {
                const allHiddenOrLeaving = prev.every(s => s === 'image-hidden' || s === 'image-leaving');
                if (allHiddenOrLeaving && prev.length > 0) {
                    const idx = Math.floor(Math.random() * prev.length);
                    const newStates = [...prev] as (
                        "image-hidden" | "image-leaving" | "image-visible" | "image-entering"
                    )[];
                    newStates[idx] = 'image-visible';
                    setImageVisibility(v => {
                        const nv = [...v];
                        nv[idx] = true;
                        return nv;
                    });
                    return newStates;
                }
                return prev;
            });
        };
        const id = setInterval(checkAndForceVisible, 500);
        return () => clearInterval(id);
    }, [active, imageCount]);

    return { imagesState, imagesStyles, imageEffects };
}

// -----------------各セクションの画像配置の設定
type AnimatedFigureBlockProps = {
    images: { src: string; alt?: string }[];
    imagesState: string[];
    imagesStyles: React.CSSProperties[];
    imageEffects: string[];
    blockClass?: string; // 'left' or 'right' など
};

export const AnimatedFigureBlock: React.FC<AnimatedFigureBlockProps> = ({
    images,
    imagesState,
    imagesStyles,
    imageEffects,
    blockClass = 'left'
}) => {
    // クラス名のprefixを切り替え
    const prefix = blockClass === 'right' ? 'block_figure_right_' : 'block_figure_left_';

    return (
        <div className="figure_block">
            {images.map((img, i) => (
                <figure
                    key={i}
                    className={`${prefix}${String(i + 1).padStart(2, '0')} position_absolute`}
                >
                    <img
                        src={img.src}
                        alt={img.alt ?? ''}
                        className={`${imagesState[i]} ${imageEffects[i]}`}
                        style={imagesStyles[i]}
                    />
                </figure>
            ))}
        </div>
    );
};

// -----------------画面セクション移動・スクロール制御用カスタムフック
export function useSectionScroll(
    sectionCount: number,
    scrollRefs: Array<RefObject<HTMLDivElement | null>>
) {
    // 現在のセクションとスクロール状態
    const [currentSection, setCurrentSection] = useState<number>(0);
    const [scrolling, setScrolling] = useState<boolean>(false);
    const [scrollLocked, setScrollLocked] = useState<boolean>(false);

    // 各セクションにスタイルを適用
    const sectionStyle = (index: number): CSSProperties => ({
        position: 'fixed',
        top: currentSection === index ? '0' : (index < currentSection ? '-100vh' : '100vh'),
        left: '50%',
        transform: 'translateX(-50%)',
        width: '96%',
        height: '100vh',
        maxWidth: '1440px',
        overflow: 'hidden',
        transition: 'top 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
        zIndex: currentSection === index ? 2 : 1,
        visibility: Math.abs(currentSection - index) <= 1 ? 'visible' : 'hidden'
    });

    // スクロール可能な要素のスタイル関数を追加
    const scrollableStyle = (isActive: boolean): CSSProperties => ({
        overflowY: isActive ? 'auto' : 'hidden',
        maxHeight: '96vh',
        transition: 'all 0.3s ease'
    });

    // 標準スクロール無効化
    useEffect(() => {
        const preventDefaultScroll = (e: Event) => {
            e.preventDefault();
        };
        window.addEventListener('wheel', preventDefaultScroll, { passive: false });
        window.addEventListener('touchmove', preventDefaultScroll, { passive: false });
        return () => {
            window.removeEventListener('wheel', preventDefaultScroll);
            window.removeEventListener('touchmove', preventDefaultScroll);
        };
    }, []);

    // カスタムスクロール処理
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (scrollLocked || scrolling) return;

            const direction = e.deltaY > 0 ? 1 : -1;
            const currentScrollRef = scrollRefs[currentSection]?.current;

            // テキストスクロール
            if (currentScrollRef) {
                const { scrollTop, scrollHeight, clientHeight } = currentScrollRef;
                const textScrollMultiplier = 3.0;
                const baseScrollAmount = Math.min(Math.max(Math.abs(e.deltaY), 100), 600);
                const textScrollAmount = baseScrollAmount * textScrollMultiplier * (direction > 0 ? 1 : -1);

                if (direction > 0) {
                    const isAtBottom = Math.abs(scrollTop + clientHeight - scrollHeight) < 2;
                    if (!isAtBottom) {
                        currentScrollRef.scrollBy({ top: Math.abs(textScrollAmount), behavior: 'smooth' });
                        setTimeout(() => setScrolling(false), 150);
                        return;
                    }
                } else {
                    const isAtTop = scrollTop === 0;
                    if (!isAtTop) {
                        currentScrollRef.scrollBy({ top: textScrollAmount, behavior: 'smooth' });
                        setTimeout(() => setScrolling(false), 150);
                        return;
                    }
                }
            }

            // セクション移動
            const nextSection = currentSection + direction;
            if (nextSection >= 0 && nextSection < sectionCount) {
                setScrollLocked(true);
                setCurrentSection(nextSection);

                // 上方向の移動時、スクロール位置を調整
                if (direction < 0 && scrollRefs[nextSection]?.current) {
                    const nextScrollRef = scrollRefs[nextSection]?.current;
                    setTimeout(() => {
                        if (nextScrollRef)
                            nextScrollRef.scrollTop = nextScrollRef.scrollHeight - nextScrollRef.clientHeight;
                    }, 100);
                }

                setTimeout(() => {
                    setScrollLocked(false);
                    setScrolling(false);
                }, 600);
            } else {
                setScrolling(false);
            }
        };
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentSection, scrolling, scrollLocked]);
    return { currentSection, setCurrentSection, scrollLocked, setScrollLocked, sectionStyle, scrollableStyle };
}

// -----------------ページトップへ戻るボタン制御
// ページトップへ戻るボタンのスタイル
export const topButtonStyle: CSSProperties = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    padding: '10px 15px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 100,
    fontSize: '14px',
    transition: 'all 0.3s ease'
};
