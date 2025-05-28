import { useRef } from 'react';
import {
  useSectionScroll,
  SharedImageFilters,
  useSectionImageAnimations,
  useFirstViewMeritDemeritAnimation,
  useFirstViewImageAnimation,
  AnimatedFigureBlock,
  useStepImagePreload,
  useSectionHtmlLoader,
  createImageArrays,
  useTopScroll
} from './_common_component';
import Society_1stView from '../assets/img/Physics_1stView01.png';
import { TopButton } from './_common_component';

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

function Physics() {
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

  // 画像配列生成（共通関数で）
  const sectionImageData = {
    composition: [
      Society_composition01, Society_composition02, Society_composition03,
      Society_composition04, Society_composition05, Society_composition06
    ],
    positioning: [
      Society_positioning01, Society_positioning02, Society_positioning03,
      Society_positioning04, Society_positioning05, Society_positioning06
    ],
    institution: [
      Society_institution01, Society_institution02, Society_institution03,
      Society_institution04, Society_institution05, Society_institution06
    ]
  };
  const imageArrays = createImageArrays(sectionImageData);

  // セクション名の配列
  const sectionKeys = Object.keys(sectionImageData);
  // 各セクションのアニメーション
  const sectionAnimations = sectionKeys.map((key, index) =>
    useSectionImageAnimations(
      currentSection === index + 1,
      sectionImageData[key as keyof typeof sectionImageData].length
    )
  );

  // --- 外部HTMLロードを共通フックで ---
  const sectionNames = ['composition', 'positioning', 'institution'];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('society', sectionNames);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // ページトップに戻る関数
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  // レンダリング用の設定
  // セクションkey設定
  const sectionConfigs = [
    { key: 'composition', name: 'composition', className: 'block_text_right', textPosition: 'right' },
    { key: 'positioning', name: 'positioning', className: 'block_text_left', textPosition: 'left' },
    { key: 'institution', name: 'institution', className: 'block_text_right', textPosition: 'right' }
  ];
  // テキストブロックレンダリング用関数
  const renderTextBlock = (sectionName: string, sectionIndex: number) => (
    <div
      className='text_scroll_block scroller_decoration'
      ref={sections[sectionIndex].scrollRef}
      style={scrollableStyle(currentSection === sectionIndex)}
    >
      {loadingStates[sectionName] && <div>読み込み中...</div>}
      {errorStates[sectionName] && <div style={{ color: 'red' }}>{errorStates[sectionName]}</div>}
      {!loadingStates[sectionName] && !errorStates[sectionName] && (
        <div dangerouslySetInnerHTML={{ __html: htmlContents[sectionName] || '' }} />
      )}
    </div>
  );
  // セクションレンダリング用関数
  const renderSection = (config: typeof sectionConfigs[0], index: number) => (
    <section
      className={config.className}
      id={config.name}
      ref={sections[index + 1].ref}
      style={sectionStyle(index + 1)}
      key={config.name}
    >
      <div className='flex_setting'>
        {config.textPosition === 'left' && renderTextBlock(config.name, index + 1)}
        <AnimatedFigureBlock
          images={imageArrays[config.key]}
          imagesState={sectionAnimations[index].imagesState}
          imagesStyles={sectionAnimations[index].imagesStyles}
          imageEffects={sectionAnimations[index].imageEffects}
          blockClass={config.textPosition === 'left' ? 'right' : 'left'}
        />
        {config.textPosition === 'right' && renderTextBlock(config.name, index + 1)}
      </div>
    </section>
  );

  return (
    <div className="component_container">
      <SharedImageFilters />

      <section className='first_view society' ref={firstViewRef} style={sectionStyle(0)}>
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

      {/* 共通化したセクションをレンダリング */}
      {sectionConfigs.map((config, index) => renderSection(config, index))}

      {/* トップへ戻るボタン */}
      <TopButton show={currentSection > 0} onClick={scrollToTop} />
    </div>
  )
}

export default Physics;
