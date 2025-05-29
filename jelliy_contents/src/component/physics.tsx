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
// 素粒子・宇宙論
import Physics_elementary01 from '../assets/img/Physics_elementary01.jpg';
import Physics_elementary02 from '../assets/img/Physics_elementary02.jpg';
import Physics_elementary03 from '../assets/img/Physics_elementary03.png';
import Physics_elementary04 from '../assets/img/Physics_elementary01.jpg';
import Physics_elementary05 from '../assets/img/Physics_elementary02.jpg';
import Physics_elementary06 from '../assets/img/Physics_elementary03.png';
// 物性物理
import Physics_condensed01 from '../assets/img/Physics_condensed01.jpg';
import Physics_condensed02 from '../assets/img/Physics_condensed02.jpg';
import Physics_condensed03 from '../assets/img/Physics_condensed03.png';
import Physics_condensed04 from '../assets/img/Physics_condensed01.jpg';
import Physics_condensed05 from '../assets/img/Physics_condensed02.jpg';
import Physics_condensed06 from '../assets/img/Physics_condensed03.png';
// 物理数学
import Physics_math01 from '../assets/img/Physics_math01.jpg';
import Physics_math02 from '../assets/img/Physics_math02.jpg';
import Physics_math03 from '../assets/img/Physics_math03.png';
import Physics_math04 from '../assets/img/Physics_math01.jpg';
import Physics_math05 from '../assets/img/Physics_math02.jpg';
import Physics_math06 from '../assets/img/Physics_math03.png';
// 熱力学
import Physics_thermo01 from '../assets/img/Physics_thermo01.jpg';
import Physics_thermo02 from '../assets/img/Physics_thermo02.jpg';
import Physics_thermo03 from '../assets/img/Physics_thermo03.png';
import Physics_thermo04 from '../assets/img/Physics_thermo01.jpg';
import Physics_thermo05 from '../assets/img/Physics_thermo02.jpg';
import Physics_thermo06 from '../assets/img/Physics_thermo03.png';
// 連続体力学・流体力学
import Physics_fluid01 from '../assets/img/Physics_fluid01.jpg';
import Physics_fluid02 from '../assets/img/Physics_fluid02.jpg';
import Physics_fluid03 from '../assets/img/Physics_fluid03.png';
import Physics_fluid04 from '../assets/img/Physics_fluid01.jpg';
import Physics_fluid05 from '../assets/img/Physics_fluid02.jpg';
import Physics_fluid06 from '../assets/img/Physics_fluid03.png';
// 相対性理論・量子力学
import Physics_relativity01 from '../assets/img/Physics_relativity01.jpg';
import Physics_relativity02 from '../assets/img/Physics_relativity02.jpg';
import Physics_relativity03 from '../assets/img/Physics_relativity03.png';
import Physics_relativity04 from '../assets/img/Physics_relativity01.jpg';
import Physics_relativity05 from '../assets/img/Physics_relativity02.jpg';
import Physics_relativity06 from '../assets/img/Physics_relativity03.png';
// 電磁気学
import Physics_em01 from '../assets/img/Physics_em01.jpg';
import Physics_em02 from '../assets/img/Physics_em02.jpg';
import Physics_em03 from '../assets/img/Physics_em03.png';
import Physics_em04 from '../assets/img/Physics_em01.jpg';
import Physics_em05 from '../assets/img/Physics_em02.jpg';
import Physics_em06 from '../assets/img/Physics_em03.png';
// 古典力学
import Physics_classical01 from '../assets/img/Physics_classical01.jpg';
import Physics_classical02 from '../assets/img/Physics_classical02.jpg';
import Physics_classical03 from '../assets/img/Physics_classical03.png';
import Physics_classical04 from '../assets/img/Physics_classical01.jpg';
import Physics_classical05 from '../assets/img/Physics_classical02.jpg';
import Physics_classical06 from '../assets/img/Physics_classical03.png';

import './_common_css.css';
import './physics.css';

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

  // 画像配列生成（共通関数で）
  const sectionImageData = {
    elementary: [
      Physics_elementary01, Physics_elementary02, Physics_elementary03,
      Physics_elementary04, Physics_elementary05, Physics_elementary06
    ],
    condensed: [
      Physics_condensed01, Physics_condensed02, Physics_condensed03,
      Physics_condensed04, Physics_condensed05, Physics_condensed06
    ],
    math: [
      Physics_math01, Physics_math02, Physics_math03,
      Physics_math04, Physics_math05, Physics_math06
    ],
    thermo: [
      Physics_thermo01, Physics_thermo02, Physics_thermo03,
      Physics_thermo04, Physics_thermo05, Physics_thermo06
    ],
    fluid: [
      Physics_fluid01, Physics_fluid02, Physics_fluid03,
      Physics_fluid04, Physics_fluid05, Physics_fluid06
    ],
    relativity: [
      Physics_relativity01, Physics_relativity02, Physics_relativity03,
      Physics_relativity04, Physics_relativity05, Physics_relativity06
    ],
    em: [
      Physics_em01, Physics_em02, Physics_em03,
      Physics_em04, Physics_em05, Physics_em06
    ],
    classical: [
      Physics_classical01, Physics_classical02, Physics_classical03,
      Physics_classical04, Physics_classical05, Physics_classical06
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
    'elementary',    // 素粒子・宇宙論
    'condensed',     // 物性物理
    'math',          // 物理数学
    'thermo',        // 熱力学
    'fluid',         // 連続体力学・流体力学
    'relativity',    // 相対性理論・量子力学
    'em',            // 電磁気学
    'classical'      // 古典力学
  ];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('physics', sectionNames);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // ページトップに戻る関数
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  // レンダリング用の設定
  // セクションkey設定
  const sectionConfigs = [
    { key: 'elementary', name: 'elementary', className: 'block_text_right', textPosition: 'right', displayName: '素粒子・宇宙論' },
    { key: 'condensed', name: 'condensed', className: 'block_text_left', textPosition: 'left', displayName: '物性物理' },
    { key: 'math', name: 'math', className: 'block_text_right', textPosition: 'right', displayName: '物理数学' },
    { key: 'thermo', name: 'thermo', className: 'block_text_left', textPosition: 'left', displayName: '熱力学' },
    { key: 'fluid', name: 'fluid', className: 'block_text_right', textPosition: 'right', displayName: '連続体力学・流体力学' },
    { key: 'relativity', name: 'relativity', className: 'block_text_left', textPosition: 'left', displayName: '相対性理論・量子力学' },
    { key: 'em', name: 'em', className: 'block_text_right', textPosition: 'right', displayName: '電磁気学' },
    { key: 'classical', name: 'classical', className: 'block_text_left', textPosition: 'left', displayName: '古典力学' }
  ];

  // テキストブロックレンダリング用関数
  const renderTextBlock = (sectionName: string, sectionIndex: number) => (
    <div
      className='text_scroll_block scroller_decoration'
      ref={sections[sectionIndex + 1]?.scrollRef}
      style={scrollableStyle(currentSection === sectionIndex + 1)}
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
      ref={sections[index + 1]?.ref}
      style={sectionStyle(index + 1)}
      key={config.name}
    >
      <div className='flex_setting'>
        {config.textPosition === 'left' && renderTextBlock(config.name, index)}
        <AnimatedFigureBlock
          images={imageArrays[config.key]}
          imagesState={sectionAnimations[index].imagesState}
          imagesStyles={sectionAnimations[index].imagesStyles}
          imageEffects={sectionAnimations[index].imageEffects}
          blockClass={config.textPosition === 'left' ? 'right' : 'left'}
        />
        {config.textPosition === 'right' && renderTextBlock(config.name, index)}
      </div>
    </section>
  );

  return (
    <div className="component_container">
      <SharedImageFilters />

      <section className='first_view physics' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='art_h1'>物理</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Society_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='elementary'><a href="#elementary" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 素粒子/宇宙論 */}
            <li className='condensed'><a href="#condensed" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 物性物理 */}
            <li className='math'><a href="#math" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 物理数学 */}
            <li className='thermo'><a href="#thermo" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 熱力学 */}
            <li className='fluid'><a href="#fluid" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 連続力学/流体力学 */}
            <li className='relativity'><a href="#relativity" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 相対性理論/量子力学 */}
            <li className='em'><a href="#em" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 電磁気学 */}
            <li className='classical'><a href="#classical" onClick={(e) => { e.preventDefault(); setCurrentSection(8); }}></a></li>{/* 古典力学 */}
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

export default Society;
