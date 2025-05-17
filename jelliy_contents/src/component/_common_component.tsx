import React from 'react';
import { useState, useEffect, useRef } from 'react';
import type { CSSProperties, RefObject } from 'react';

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
export function useSectionImageAnimations(active: boolean) {
    // 画像アニメーション用の状態（表示、非表示、入場、退場）
    const [imagesState, setImagesState] = useState<string[]>(Array(6).fill('image-hidden'));
    const [imagesStyles, setImagesStyles] = useState<CSSProperties[]>(Array(6).fill({}));
    const [imageEffects, setImageEffects] = useState<string[]>(Array(6).fill(''));
    const [imageVisibility, setImageVisibility] = useState<boolean[]>(Array(6).fill(false));
    const animationTimerRefs = useRef<(number | null)[]>([]);
    const effectTimerRefs = useRef<(number | null)[]>([]);

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
            setImagesState(Array(6).fill('image-hidden'));
            setImageEffects(Array(6).fill(''));
            return;
        }
        // 表示状態の初期化 - 初回表示時の問題を解決するために最初にすべてfalseに設定
        setImageVisibility(Array(6).fill(false));
        for (let i = 0; i < 6; i++) {
            setImagesState(prev => { const n = [...prev]; n[i] = 'image-hidden'; return n; });
            setImageEffects(prev => { const n = [...prev]; n[i] = ''; return n; });
            const startDisplayDelay = Math.random() * 5000; // 各画像の表示開始をランダムに遅延（0〜5秒）
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
                // 2. 入場アニメーション開始
                setImagesState(prev => { const n = [...prev]; n[i] = 'image-entering'; return n; });
                // 3. 入場アニメーション完了後の処理
                const visibleTimer = setTimeout(() => {
                    setImagesState(prev => { const n = [...prev]; n[i] = 'image-visible'; return n; }); // 画像を表示状態に
                    setImageVisibility(prev => { const n = [...prev]; n[i] = true; return n; }); // エフェクト用の表示フラグをON
                    // 4. 特殊効果のアニメーション処理を別の関数として実装
                    const startRandomEffects = () => {
                        const effectDelay = Math.random() * 1500 + 500; // エフェクト開始までのランダム遅延時間を短縮（0.5〜2秒）
                        const effectTimer = setTimeout(() => {
                            // 特殊効果適用
                            setImageEffects(prev => { const n = [...prev]; n[i] = 'shibuya-effect'; return n; });
                            const effectEndTimer = setTimeout(() => {
                                setImageEffects(prev => { const n = [...prev]; n[i] = ''; return n; });
                                const nextEffectDelay = Math.random() * 1000 + 500; // 次のエフェクトまでの間隔（0.5〜1.5秒）
                                // 次のエフェクトをスケジュール
                                const nextEffectTimer = setTimeout(() => {
                                    if (imageVisibility[i]) startRandomEffects();
                                }, nextEffectDelay);
                                effectTimerRefs.current.push(nextEffectTimer);
                            }, 1000);
                            effectTimerRefs.current.push(effectEndTimer);
                        }, effectDelay);
                        effectTimerRefs.current.push(effectTimer);
                    };
                    setTimeout(() => { startRandomEffects(); }, 100); // 特殊効果開始
                     // 5. 表示時間をランダムに設定（5〜15秒）
                    const displayDuration = Math.random() * 10000 + 5000;
                    // 6. 表示終了後の処理
                    const exitTimer = setTimeout(() => {
                        setImageVisibility(prev => { const n = [...prev]; n[i] = false; return n; });
                        // 退場アニメーション開始
                        setImagesState(prev => { const n = [...prev]; n[i] = 'image-leaving'; return n; });
                        // 7. 退場アニメーション完了後の処理
                        const hideTimer = setTimeout(() => {
                            setImagesState(prev => { const n = [...prev]; n[i] = 'image-hidden'; return n; });
                            const nextCycleDelay = Math.random() * 6000 + 2000;// 次の表示サイクルまでのランダム遅延（2〜8秒）
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
    }, [active]);
    return { imagesState, imagesStyles, imageEffects };
}

// -----------------各セクションの画像アニメーション設定
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

// 画面セクション移動・スクロール制御用カスタムフック
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

