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
  useTopScroll,
  TopButton
} from './_common_component';
import Society_1stView from '../assets/img/Chemistry_1stView01.png';
// 高分子化学
import Chemistry_polymer01 from '../assets/img/Chemistry_polymer01.jpg';
import Chemistry_polymer02 from '../assets/img/Chemistry_polymer02.jpg';
import Chemistry_polymer03 from '../assets/img/Chemistry_polymer03.png';
import Chemistry_polymer04 from '../assets/img/Chemistry_polymer01.jpg';
import Chemistry_polymer05 from '../assets/img/Chemistry_polymer02.jpg';
import Chemistry_polymer06 from '../assets/img/Chemistry_polymer03.png';
// 実用研究
import Chemistry_applied01 from '../assets/img/Chemistry_applied01.jpg';
import Chemistry_applied02 from '../assets/img/Chemistry_applied02.jpg';
import Chemistry_applied03 from '../assets/img/Chemistry_applied03.png';
import Chemistry_applied04 from '../assets/img/Chemistry_applied01.jpg';
import Chemistry_applied05 from '../assets/img/Chemistry_applied02.jpg';
import Chemistry_applied06 from '../assets/img/Chemistry_applied03.png';
// 分析化学
import Chemistry_analytical01 from '../assets/img/Chemistry_analytical01.jpg';
import Chemistry_analytical02 from '../assets/img/Chemistry_analytical02.jpg';
import Chemistry_analytical03 from '../assets/img/Chemistry_analytical03.png';
import Chemistry_analytical04 from '../assets/img/Chemistry_analytical01.jpg';
import Chemistry_analytical05 from '../assets/img/Chemistry_analytical02.jpg';
import Chemistry_analytical06 from '../assets/img/Chemistry_analytical03.png';
// 化学理論
import Chemistry_theoretical01 from '../assets/img/Chemistry_theoretical01.jpg';
import Chemistry_theoretical02 from '../assets/img/Chemistry_theoretical02.jpg';
import Chemistry_theoretical03 from '../assets/img/Chemistry_theoretical03.png';
import Chemistry_theoretical04 from '../assets/img/Chemistry_theoretical01.jpg';
import Chemistry_theoretical05 from '../assets/img/Chemistry_theoretical02.jpg';
import Chemistry_theoretical06 from '../assets/img/Chemistry_theoretical03.png';
// 無機化学
import Chemistry_inorganic01 from '../assets/img/Chemistry_inorganic01.jpg';
import Chemistry_inorganic02 from '../assets/img/Chemistry_inorganic02.jpg';
import Chemistry_inorganic03 from '../assets/img/Chemistry_inorganic03.png';
import Chemistry_inorganic04 from '../assets/img/Chemistry_inorganic01.jpg';
import Chemistry_inorganic05 from '../assets/img/Chemistry_inorganic02.jpg';
import Chemistry_inorganic06 from '../assets/img/Chemistry_inorganic03.png';
// 有機化学
import Chemistry_organic01 from '../assets/img/Chemistry_organic01.jpg';
import Chemistry_organic02 from '../assets/img/Chemistry_organic02.jpg';
import Chemistry_organic03 from '../assets/img/Chemistry_organic03.png';
import Chemistry_organic04 from '../assets/img/Chemistry_organic01.jpg';
import Chemistry_organic05 from '../assets/img/Chemistry_organic02.jpg';
import Chemistry_organic06 from '../assets/img/Chemistry_organic03.png';
// 生化学
import Chemistry_biochemistry01 from '../assets/img/Chemistry_biochemistry01.jpg';
import Chemistry_biochemistry02 from '../assets/img/Chemistry_biochemistry02.jpg';
import Chemistry_biochemistry03 from '../assets/img/Chemistry_biochemistry03.png';
import Chemistry_biochemistry04 from '../assets/img/Chemistry_biochemistry01.jpg';
import Chemistry_biochemistry05 from '../assets/img/Chemistry_biochemistry02.jpg';
import Chemistry_biochemistry06 from '../assets/img/Chemistry_biochemistry03.png';

import './_common_css.css';
import './chemistry.css';

function Chemistry() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const polymerRef = useRef<HTMLElement>(null);
  const polymerScrollRef = useRef<HTMLDivElement>(null);
  const appliedRef = useRef<HTMLElement>(null);
  const appliedScrollRef = useRef<HTMLDivElement>(null);
  const analyticalRef = useRef<HTMLElement>(null);
  const analyticalScrollRef = useRef<HTMLDivElement>(null);
  const theoreticalRef = useRef<HTMLElement>(null);
  const theoreticalScrollRef = useRef<HTMLDivElement>(null);
  const inorganicRef = useRef<HTMLElement>(null);
  const inorganicScrollRef = useRef<HTMLDivElement>(null);
  const organicRef = useRef<HTMLElement>(null);
  const organicScrollRef = useRef<HTMLDivElement>(null);
  const biochemistryRef = useRef<HTMLElement>(null);
  const biochemistryScrollRef = useRef<HTMLDivElement>(null);

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    { ref: polymerRef, scrollRef: polymerScrollRef },
    { ref: appliedRef, scrollRef: appliedScrollRef },
    { ref: analyticalRef, scrollRef: analyticalScrollRef },
    { ref: theoreticalRef, scrollRef: theoreticalScrollRef },
    { ref: inorganicRef, scrollRef: inorganicScrollRef },
    { ref: organicRef, scrollRef: organicScrollRef },
    { ref: biochemistryRef, scrollRef: biochemistryScrollRef },
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
    polymer: [
      Chemistry_polymer01, Chemistry_polymer02, Chemistry_polymer03,
      Chemistry_polymer04, Chemistry_polymer05, Chemistry_polymer06
    ],
    applied: [
      Chemistry_applied01, Chemistry_applied02, Chemistry_applied03,
      Chemistry_applied04, Chemistry_applied05, Chemistry_applied06
    ],
    analytical: [
      Chemistry_analytical01, Chemistry_analytical02, Chemistry_analytical03,
      Chemistry_analytical04, Chemistry_analytical05, Chemistry_analytical06
    ],
    theoretical: [
      Chemistry_theoretical01, Chemistry_theoretical02, Chemistry_theoretical03,
      Chemistry_theoretical04, Chemistry_theoretical05, Chemistry_theoretical06
    ],
    inorganic: [
      Chemistry_inorganic01, Chemistry_inorganic02, Chemistry_inorganic03,
      Chemistry_inorganic04, Chemistry_inorganic05, Chemistry_inorganic06
    ],
    organic: [
      Chemistry_organic01, Chemistry_organic02, Chemistry_organic03,
      Chemistry_organic04, Chemistry_organic05, Chemistry_organic06
    ],
    biochemistry: [
      Chemistry_biochemistry01, Chemistry_biochemistry02, Chemistry_biochemistry03,
      Chemistry_biochemistry04, Chemistry_biochemistry05, Chemistry_biochemistry06
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
  const sectionNames = [
    'polymer', 'applied', 'analytical', 'theoretical', 'inorganic', 'organic', 'biochemistry'
  ];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('chemistry', sectionNames);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // ページトップに戻る関数
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  // レンダリング用の設定
  // セクションkey設定
  const sectionConfigs = [
    { key: 'polymer', name: 'polymer', className: 'block_text_right', textPosition: 'right', refIndex: 1 },
    { key: 'applied', name: 'applied', className: 'block_text_left', textPosition: 'left', refIndex: 2 },
    { key: 'analytical', name: 'analytical', className: 'block_text_right', textPosition: 'right', refIndex: 3 },
    { key: 'theoretical', name: 'theoretical', className: 'block_text_left', textPosition: 'left', refIndex: 4 },
    { key: 'inorganic', name: 'inorganic', className: 'block_text_right', textPosition: 'right', refIndex: 5 },
    { key: 'organic', name: 'organic', className: 'block_text_left', textPosition: 'left', refIndex: 6 },
    { key: 'biochemistry', name: 'biochemistry', className: 'block_text_right', textPosition: 'right', refIndex: 7 }
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
      ref={sections[config.refIndex].ref}
      style={sectionStyle(config.refIndex)}
      key={config.name}
    >
      <div className='flex_setting'>
        {config.textPosition === 'left' && renderTextBlock(config.name, config.refIndex)}
        <AnimatedFigureBlock
          images={imageArrays[config.key]}
          imagesState={sectionAnimations[index].imagesState}
          imagesStyles={sectionAnimations[index].imagesStyles}
          imageEffects={sectionAnimations[index].imageEffects}
          blockClass={config.textPosition === 'left' ? 'right' : 'left'}
        />
        {config.textPosition === 'right' && renderTextBlock(config.name, config.refIndex)}
      </div>
    </section>
  );

  return (
    <div className="component_container">
      <SharedImageFilters />

      <section className='first_view chemistry' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='art_h1'>化学</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Society_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='polymer'><a href="#polymer" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 高分子化学 */}
            <li className='applied'><a href="#applied" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 実用研究 */}
            <li className='analytical'><a href="#analytical" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 分析化学 */}
            <li className='theoretical'><a href="#theoretical" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 化学理論 */}
            <li className='inorganic'><a href="#inorganic" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 無機化学 */}
            <li className='organic'><a href="#organic" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 有機化学 */}
            <li className='biochemistry'><a href="#biochemistry" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 生化学 */}
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

export default Chemistry;
