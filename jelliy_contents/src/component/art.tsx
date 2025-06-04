import { useRef } from 'react';
import {
  useSectionScroll,
  SharedImageFilters,
  useSectionImageAnimations,
  useFirstViewMeritDemeritAnimation,
  useFirstViewImageAnimation,
  AnimatedFigureBlock,
  useStepImagePreload,
  createImageArrays,
  useSectionHtmlLoader,
  TopButton,
  useTopScroll // ← 追加
} from './_common_component';
import Art_1stView from '../assets/img/Art_1stView01.png';

// 平面造形
import Art_planar_modeling01 from '../assets/img/Art_planar_modeling01.jpg';
import Art_planar_modeling02 from '../assets/img/Art_planar_modeling02.jpg';
import Art_planar_modeling03 from '../assets/img/Art_planar_modeling03.png';
import Art_planar_modeling04 from '../assets/img/Art_planar_modeling01.jpg';
import Art_planar_modeling05 from '../assets/img/Art_planar_modeling02.jpg';
import Art_planar_modeling06 from '../assets/img/Art_planar_modeling03.png';

// 立体造形
import Art_three_D_modeling01 from '../assets/img/Art_three_D_modeling01.jpg';
import Art_three_D_modeling02 from '../assets/img/Art_three_D_modeling02.jpg';
import Art_three_D_modeling03 from '../assets/img/Art_three_D_modeling03.png';
import Art_three_D_modeling04 from '../assets/img/Art_three_D_modeling01.jpg';
import Art_three_D_modeling05 from '../assets/img/Art_three_D_modeling02.jpg';
import Art_three_D_modeling06 from '../assets/img/Art_three_D_modeling03.png';

// 文学
import Art_literature01 from '../assets/img/Art_literature01.jpg';
import Art_literature02 from '../assets/img/Art_literature02.jpg';
import Art_literature03 from '../assets/img/Art_literature03.png';
import Art_literature04 from '../assets/img/Art_literature01.jpg';
import Art_literature05 from '../assets/img/Art_literature02.jpg';
import Art_literature06 from '../assets/img/Art_literature03.png';

// 伝達技法研究
import Art_communication_technique01 from '../assets/img/Art_communication_technique01.jpg';
import Art_communication_technique02 from '../assets/img/Art_communication_technique02.jpg';
import Art_communication_technique03 from '../assets/img/Art_communication_technique03.png';
import Art_communication_technique04 from '../assets/img/Art_communication_technique01.jpg';
import Art_communication_technique05 from '../assets/img/Art_communication_technique02.jpg';
import Art_communication_technique06 from '../assets/img/Art_communication_technique03.png';

// 音楽
import Art_music01 from '../assets/img/Art_music01.jpg';
import Art_music02 from '../assets/img/Art_music02.jpg';
import Art_music03 from '../assets/img/Art_music03.png';
import Art_music04 from '../assets/img/Art_music01.jpg';
import Art_music05 from '../assets/img/Art_music02.jpg';
import Art_music06 from '../assets/img/Art_music03.png';

// 料理
import Art_cooking01 from '../assets/img/Art_cooking01.jpg';
import Art_cooking02 from '../assets/img/Art_cooking02.jpg';
import Art_cooking03 from '../assets/img/Art_cooking03.png';
import Art_cooking04 from '../assets/img/Art_cooking01.jpg';
import Art_cooking05 from '../assets/img/Art_cooking02.jpg';
import Art_cooking06 from '../assets/img/Art_cooking03.png';

// 舞台芸術
import Art_performing01 from '../assets/img/Art_performing01.jpg';
import Art_performing02 from '../assets/img/Art_performing02.jpg';
import Art_performing03 from '../assets/img/Art_performing03.png';
import Art_performing04 from '../assets/img/Art_performing01.jpg';
import Art_performing05 from '../assets/img/Art_performing02.jpg';
import Art_performing06 from '../assets/img/Art_performing03.png';

import './_common_css.css';
import './art.css';

function Art() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const planarModelingRef = useRef<HTMLElement>(null);
  const planarModelingScrollRef = useRef<HTMLDivElement>(null);
  const threeDModelingRef = useRef<HTMLElement>(null);
  const threeDModelingScrollRef = useRef<HTMLDivElement>(null);
  const literatureRef = useRef<HTMLElement>(null);
  const literatureScrollRef = useRef<HTMLDivElement>(null);
  const communicationTechniqueRef = useRef<HTMLElement>(null);
  const communicationTechniqueScrollRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLElement>(null);
  const musicScrollRef = useRef<HTMLDivElement>(null);
  const cookingRef = useRef<HTMLElement>(null);
  const cookingScrollRef = useRef<HTMLDivElement>(null);
  const performingRef = useRef<HTMLElement>(null);
  const performingScrollRef = useRef<HTMLDivElement>(null);

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    { ref: planarModelingRef, scrollRef: planarModelingScrollRef },
    { ref: threeDModelingRef, scrollRef: threeDModelingScrollRef },
    { ref: literatureRef, scrollRef: literatureScrollRef },
    { ref: communicationTechniqueRef, scrollRef: communicationTechniqueScrollRef },
    { ref: musicRef, scrollRef: musicScrollRef },
    { ref: cookingRef, scrollRef: cookingScrollRef },
    { ref: performingRef, scrollRef: performingScrollRef },
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

  // --- 画像配列生成（共通関数で） ---
  const sectionImageData = {
    planarModeling: [
      Art_planar_modeling01, Art_planar_modeling02, Art_planar_modeling03,
      Art_planar_modeling04, Art_planar_modeling05, Art_planar_modeling06
    ],
    threeDModeling: [
      Art_three_D_modeling01, Art_three_D_modeling02, Art_three_D_modeling03,
      Art_three_D_modeling04, Art_three_D_modeling05, Art_three_D_modeling06
    ],
    literature: [
      Art_literature01, Art_literature02, Art_literature03,
      Art_literature04, Art_literature05, Art_literature06
    ],
    communicationTechnique: [
      Art_communication_technique01, Art_communication_technique02, Art_communication_technique03,
      Art_communication_technique04, Art_communication_technique05, Art_communication_technique06
    ],
    music: [
      Art_music01, Art_music02, Art_music03,
      Art_music04, Art_music05, Art_music06
    ],
    cooking: [
      Art_cooking01, Art_cooking02, Art_cooking03,
      Art_cooking04, Art_cooking05, Art_cooking06
    ],
    performing: [
      Art_performing01, Art_performing02, Art_performing03,
      Art_performing04, Art_performing05, Art_performing06
    ]
  };
  const imageArrays = createImageArrays(sectionImageData);

  // 各セクションのアニメーション
  const sectionKeys = Object.keys(sectionImageData);
  const sectionAnimations = sectionKeys.map((key, index) =>
    useSectionImageAnimations(
      currentSection === index + 1,
      sectionImageData[key as keyof typeof sectionImageData].length
    )
  );

  // --- 外部HTMLロードを共通フックで ---
  const sectionNames = [
    'planar_modeling',
    'three_D_modeling',
    'literature',
    'communication_technique',
    'music',
    'cooking',
    'performing'
  ];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('art', sectionNames);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // --- ページトップに戻る関数（共通フックで） ---
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  // --- レンダリング用の設定 ---
  const sectionConfigs = [
    { key: 'planarModeling', name: 'planar_modeling', className: 'block_text_right', textPosition: 'right' },
    { key: 'threeDModeling', name: 'three_D_modeling', className: 'block_text_left', textPosition: 'left' },
    { key: 'literature', name: 'literature', className: 'block_text_right', textPosition: 'right' },
    { key: 'communicationTechnique', name: 'communication_technique', className: 'block_text_left', textPosition: 'left' },
    { key: 'music', name: 'music', className: 'block_text_right', textPosition: 'right' },
    { key: 'cooking', name: 'cooking', className: 'block_text_left', textPosition: 'left' },
    { key: 'performing', name: 'performing', className: 'block_text_right', textPosition: 'right' }
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

      <section className='first_view art' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='art_h1'>芸術</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Art_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='planar_modeling'><a href="#planar_modeling" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 平面造形 */}
            <li className='three_D_modeling'><a href="#three_D_modeling" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 立体造形 */}
            <li className='literature'><a href="#literature" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 文学 */}
            <li className='communication_technique'><a href="#communication_technique" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 伝達技法研究 */}
            <li className='music'><a href="#music" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 音楽 */}
            <li className='cooking'><a href="#cooking" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 料理 */}
            <li className='performing'><a href="#performing" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 舞台芸術 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <h3>感情喚起</h3><p>芸術は私たちの心に深い感情を呼び起こします。絵画、音楽、演劇などが独自の手法で感動や驚き、喜びなどを引き起こし、観る者を感情の旅に誘います。</p>
            <h3>異なる文化との交流</h3><p>芸術は異なる文化や歴史に触れ、理解を深める手助けをします。美術館や劇場で異なる文化の作品を見ることで、広い視野を持つことができます。</p>
            <h3>共感の想起</h3><p>芸術を通じ発信者は自分の感情や考えを表現します。受信者（受け手）はその表現に共感し、自らの感情や経験と照らし合わせることができます。</p>
            <h3>人間関係の構築</h3><p>芸術は人々を結びつけ、共通の興味や感動を通じ新しい人間関係を築く手助けをします。共有された芸術体験は、人々を統合し、交流を深めます。</p>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <h3>個々の解釈の主観性</h3><p>芸術は主観的であり、同じ作品でも受信者個々によって異なる解釈がされることがあります。これが誤解や混乱を生む可能性があります。</p>
            <h3>感情の不安定さ</h3><p>芸術は時に深い感情を呼び起こすが影響は予測困難であり、作品によっては不安定な感情を引き起こすこともあります。</p>
            <h3>価値観の変動に対する適応</h3><p>芸術の価値観は社会の変動に影響されるため、一つの時期に愛された作品が別の時期には理解されなくなることがあります。これは感性の変化に対する適応が求められます。</p>
            <h3>狭い意図の範囲</h3><p>発信者が作品に込めた意図がひとりよがりだったり狭い範囲でしか通じない文脈であるために、受信者へ意図が伝わらないことがあります。</p>
          </article>
        </div>
        <div className='back_to_map'>
          <a href="https://cf268321.cloudfree.jp/13jellies/#jellies_map">
            <figure className='back_to_map_figure'><img src='https://cf268321.cloudfree.jp/13jellies/asset/img/13jellies_A.png' /></figure>
            <p className='back_to_map_text'>13個のゼリー</p></a>
        </div>
      </section>

      {/* 各セクションをレンダリング */}
      {sectionConfigs.map((config, index) => renderSection(config, index))}

      {/* トップへ戻るボタン */}
      <TopButton show={currentSection > 0} onClick={scrollToTop} />
    </div>
  )
}

export default Art;
