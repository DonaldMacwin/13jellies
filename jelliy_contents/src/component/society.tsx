import { useRef, useState, useEffect } from 'react';
import {
  useSectionScroll,
  SharedImageFilters,
  useSectionImageAnimations,
  useFirstViewMeritDemeritAnimation,
  useFirstViewImageAnimation,
  AnimatedFigureBlock,
  topButtonStyle,
  useStepImagePreload
} from './_common_component';
import Society_1stView from '../assets/img/Society_1stView01.png';

// 構成系
import Society_composition01 from '../assets/img/Society_composition01.jpg';
import Society_composition02 from '../assets/img/Society_composition02.jpg';
import Society_composition03 from '../assets/img/Society_composition03.png';
import Society_composition04 from '../assets/img/Society_composition01.jpg';
import Society_composition05 from '../assets/img/Society_composition02.jpg';
import Society_composition06 from '../assets/img/Society_composition03.png';

// 位置決め系
import Society_positioning01 from '../assets/img/Society_positioning01.jpg';
import Society_positioning02 from '../assets/img/Society_positioning02.jpg';
import Society_positioning03 from '../assets/img/Society_positioning03.png';
import Society_positioning04 from '../assets/img/Society_positioning01.jpg';
import Society_positioning05 from '../assets/img/Society_positioning02.jpg';
import Society_positioning06 from '../assets/img/Society_positioning03.png';

// 制度系
import Society_institution01 from '../assets/img/Society_institution01.jpg';
import Society_institution02 from '../assets/img/Society_institution02.jpg';
import Society_institution03 from '../assets/img/Society_institution03.png';
import Society_institution04 from '../assets/img/Society_institution01.jpg';
import Society_institution05 from '../assets/img/Society_institution02.jpg';
import Society_institution06 from '../assets/img/Society_institution03.png';

import './_common_css.css';
import './society.css';

function Society() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const compositionRef = useRef<HTMLElement>(null);
  const compositionScrollRef = useRef<HTMLDivElement>(null);
  const positioningRef = useRef<HTMLElement>(null);
  const positioningScrollRef = useRef<HTMLDivElement>(null);
  const institutionRef = useRef<HTMLElement>(null);
  const institutionScrollRef = useRef<HTMLDivElement>(null);

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    { ref: compositionRef, scrollRef: compositionScrollRef },
    { ref: positioningRef, scrollRef: positioningScrollRef },
    { ref: institutionRef, scrollRef: institutionScrollRef },
  ];
  const dummyRef = useRef<HTMLDivElement>(null);
  const {
    currentSection,
    setCurrentSection,
    scrollLocked,
    setScrollLocked,
    sectionStyle,
    scrollableStyle
  } = useSectionScroll(
    sections.length,
    sections.map(s => s.scrollRef ?? dummyRef)
  );

  // -------------- 画像アニメーションの設定
  // FirstViewアニメーション用の状態（長所短所アニメ/セリーマップアニメ）
  const { animateMerit, animateDemerit } = useFirstViewMeritDemeritAnimation(currentSection === 0);
  const { imageAnimationClass } = useFirstViewImageAnimation(currentSection === 0);

  const compositionImagesArray = [
    { src: Society_composition01 },
    { src: Society_composition02 },
    { src: Society_composition03 },
    { src: Society_composition04 },
    { src: Society_composition05 },
    { src: Society_composition06 }
  ];
  const compositionImages = useSectionImageAnimations(currentSection === 1, compositionImagesArray.length);

  const positioningImagesArray = [
    { src: Society_positioning01 },
    { src: Society_positioning02 },
    { src: Society_positioning03 },
    { src: Society_positioning04 },
    { src: Society_positioning05 },
    { src: Society_positioning06 }
  ];
  const positioningImages = useSectionImageAnimations(currentSection === 2, positioningImagesArray.length);

  const institutionImagesArray = [
    { src: Society_institution01 },
    { src: Society_institution02 },
    { src: Society_institution03 },
    { src: Society_institution04 },
    { src: Society_institution05 },
    { src: Society_institution06 }
  ];
  const institutionImages = useSectionImageAnimations(currentSection === 3, institutionImagesArray.length);

  // --- 各セクションの外部HTMLマークアップ取得用stateとfetch処理 ---
  const [compositionHtml, setCompositionHtml] = useState<string>('');
  const [compositionLoading, setCompositionLoading] = useState<boolean>(true);
  const [compositionError, setCompositionError] = useState<string | null>(null);

  const [positioningHtml, setPositioningHtml] = useState<string>('');
  const [positioningLoading, setPositioningLoading] = useState<boolean>(true);
  const [positioningError, setPositioningError] = useState<string | null>(null);

  const [institutionHtml, setInstitutionHtml] = useState<string>('');
  const [institutionLoading, setInstitutionLoading] = useState<boolean>(true);
  const [institutionError, setInstitutionError] = useState<string | null>(null);

  const basePath =
    window.location.hostname === 'localhost'
      ? '/texts/'
      : `${import.meta.env.VITE_TEXTS_BASE_URL}/13jellies/jelliy_contents/dist/texts/`;

  useEffect(() => {
    fetch(`${basePath}society_composition.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setCompositionHtml(html);
        setCompositionLoading(false);
      })
      .catch((_err) => {
        setCompositionError('読み込みにエラーが発生しました。再読込してみてください。');
        setCompositionLoading(false);
      });

    fetch(`${basePath}society_positioning.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setPositioningHtml(html);
        setPositioningLoading(false);
      })
      .catch((_err) => {
        setPositioningError('読み込みにエラーが発生しました。再読込してみてください。');
        setPositioningLoading(false);
      });

    fetch(`${basePath}society_institution.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setInstitutionHtml(html);
        setInstitutionLoading(false);
      })
      .catch((_err) => {
        setInstitutionError('読み込みにエラーが発生しました。再読込してみてください。');
        setInstitutionLoading(false);
      });
  }, []);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload([
    compositionImagesArray,
    positioningImagesArray,
    institutionImagesArray
  ]);

  // ページトップに戻る関数
  const scrollToTop = () => {
    if (!scrollLocked) {
      setScrollLocked(true);
      setCurrentSection(0);
      setTimeout(() => setScrollLocked(false), 600);
    }
  };

  return (
    <div className="component_container">
      <SharedImageFilters />

      <section className='first_view' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='art_h1'>社会</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Society_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='composition'><a href="#composition" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 構成系 */}
            <li className='positioning'><a href="#positioning" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 位置決め系 */}
            <li className='institution'><a href="#institution" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 制度系 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
          </article>
        </div>
        <div className='back_to_map'>
          <a href="https://cf268321.cloudfree.jp/13jellies/#jellies_map">
            <figure className='back_to_map_figure'><img src='https://cf268321.cloudfree.jp/13jellies/asset/img/13jellies_A.png' /></figure>
            <p className='back_to_map_text'>13個のゼリー</p></a>
        </div>
      </section>

      {/* 構成系セクション */}
      <section
        className='block_text_right'
        id='composition'
        ref={compositionRef}
        style={sectionStyle(1)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={compositionImagesArray}
            imagesState={compositionImages.imagesState}
            imagesStyles={compositionImages.imagesStyles}
            imageEffects={compositionImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={compositionScrollRef}
            style={scrollableStyle(currentSection === 1)}>
            {compositionLoading && <div>読み込み中...</div>}
            {compositionError && <div style={{ color: 'red' }}>{compositionError}</div>}
            {!compositionLoading && !compositionError && (
              <div dangerouslySetInnerHTML={{ __html: compositionHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 位置決め系セクション */}
      <section
        className='block_text_left'
        id='positioning'
        ref={positioningRef}
        style={sectionStyle(2)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={positioningScrollRef}
            style={scrollableStyle(currentSection === 2)}>
            {positioningLoading && <div>読み込み中...</div>}
            {positioningError && <div style={{ color: 'red' }}>{positioningError}</div>}
            {!positioningLoading && !positioningError && (
              <div dangerouslySetInnerHTML={{ __html: positioningHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={positioningImagesArray}
            imagesState={positioningImages.imagesState}
            imagesStyles={positioningImages.imagesStyles}
            imageEffects={positioningImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 制度系セクション */}
      <section
        className='block_text_right'
        id='institution'
        ref={institutionRef}
        style={sectionStyle(3)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={institutionImagesArray}
            imagesState={institutionImages.imagesState}
            imagesStyles={institutionImages.imagesStyles}
            imageEffects={institutionImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={institutionScrollRef}
            style={scrollableStyle(currentSection === 3)}>
            {institutionLoading && <div>読み込み中...</div>}
            {institutionError && <div style={{ color: 'red' }}>{institutionError}</div>}
            {!institutionLoading && !institutionError && (
              <div dangerouslySetInnerHTML={{ __html: institutionHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* トップへ戻るボタン */}
      {currentSection > 0 && (
        <button
          onClick={scrollToTop}
          style={topButtonStyle}
          className='topButtonStyle'
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
          }}
        >
          このページのTopへ戻る
        </button>
      )}
    </div>
  )
}

export default Society;
