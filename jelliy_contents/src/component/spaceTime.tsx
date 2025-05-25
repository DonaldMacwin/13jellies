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
  useTopScroll,
  TopButton
} from './_common_component';
import SpaceTime_1stView from '../assets/img/SpaceTime_1stView01.png';

// history
import SpaceTime_history01 from '../assets/img/SpaceTime_history01.jpg';
import SpaceTime_history02 from '../assets/img/SpaceTime_history02.jpg';
import SpaceTime_history03 from '../assets/img/SpaceTime_history03.png';
import SpaceTime_history04 from '../assets/img/SpaceTime_history01.jpg';
import SpaceTime_history05 from '../assets/img/SpaceTime_history02.jpg';
import SpaceTime_history06 from '../assets/img/SpaceTime_history03.png';

// socialGeography
import SpaceTime_social01 from '../assets/img/SpaceTime_social01.jpg';
import SpaceTime_social02 from '../assets/img/SpaceTime_social02.jpg';
import SpaceTime_social03 from '../assets/img/SpaceTime_social03.png';
import SpaceTime_social04 from '../assets/img/SpaceTime_social01.jpg';
import SpaceTime_social05 from '../assets/img/SpaceTime_social02.jpg';
import SpaceTime_social06 from '../assets/img/SpaceTime_social03.png';

// earthHistory
import SpaceTime_earth01 from '../assets/img/SpaceTime_earth01.jpg';
import SpaceTime_earth02 from '../assets/img/SpaceTime_earth02.jpg';
import SpaceTime_earth03 from '../assets/img/SpaceTime_earth03.png';
import SpaceTime_earth04 from '../assets/img/SpaceTime_earth01.jpg';
import SpaceTime_earth05 from '../assets/img/SpaceTime_earth02.jpg';
import SpaceTime_earth06 from '../assets/img/SpaceTime_earth03.png';

// naturalGeography
import SpaceTime_natural01 from '../assets/img/SpaceTime_natural01.jpg';
import SpaceTime_natural02 from '../assets/img/SpaceTime_natural02.jpg';
import SpaceTime_natural03 from '../assets/img/SpaceTime_natural03.png';
import SpaceTime_natural04 from '../assets/img/SpaceTime_natural01.jpg';
import SpaceTime_natural05 from '../assets/img/SpaceTime_natural02.jpg';
import SpaceTime_natural06 from '../assets/img/SpaceTime_natural03.png';

// geology
import SpaceTime_geology01 from '../assets/img/SpaceTime_geology01.jpg';
import SpaceTime_geology02 from '../assets/img/SpaceTime_geology02.jpg';
import SpaceTime_geology03 from '../assets/img/SpaceTime_geology03.png';
import SpaceTime_geology04 from '../assets/img/SpaceTime_geology01.jpg';
import SpaceTime_geology05 from '../assets/img/SpaceTime_geology02.jpg';
import SpaceTime_geology06 from '../assets/img/SpaceTime_geology03.png';

// atmosphere
import SpaceTime_atmosphere01 from '../assets/img/SpaceTime_atmosphere01.jpg';
import SpaceTime_atmosphere02 from '../assets/img/SpaceTime_atmosphere02.jpg';
import SpaceTime_atmosphere03 from '../assets/img/SpaceTime_atmosphere03.png';
import SpaceTime_atmosphere04 from '../assets/img/SpaceTime_atmosphere01.jpg';
import SpaceTime_atmosphere05 from '../assets/img/SpaceTime_atmosphere02.jpg';
import SpaceTime_atmosphere06 from '../assets/img/SpaceTime_atmosphere03.png';

// oceanography
import SpaceTime_ocean01 from '../assets/img/SpaceTime_ocean01.jpg';
import SpaceTime_ocean02 from '../assets/img/SpaceTime_ocean02.jpg';
import SpaceTime_ocean03 from '../assets/img/SpaceTime_ocean03.png';
import SpaceTime_ocean04 from '../assets/img/SpaceTime_ocean01.jpg';
import SpaceTime_ocean05 from '../assets/img/SpaceTime_ocean02.jpg';
import SpaceTime_ocean06 from '../assets/img/SpaceTime_ocean03.png';

// astronomy
import SpaceTime_astronomy01 from '../assets/img/SpaceTime_astronomy01.jpg';
import SpaceTime_astronomy02 from '../assets/img/SpaceTime_astronomy02.jpg';
import SpaceTime_astronomy03 from '../assets/img/SpaceTime_astronomy03.png';
import SpaceTime_astronomy04 from '../assets/img/SpaceTime_astronomy01.jpg';
import SpaceTime_astronomy05 from '../assets/img/SpaceTime_astronomy02.jpg';
import SpaceTime_astronomy06 from '../assets/img/SpaceTime_astronomy03.png';

import './_common_css.css';
import './spaceTime.css';

function SpaceTime() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const historyRef = useRef<HTMLElement>(null);
  const historyScrollRef = useRef<HTMLDivElement>(null);
  const socialGeographyRef = useRef<HTMLElement>(null);
  const socialGeographyScrollRef = useRef<HTMLDivElement>(null);
  const earthHistoryRef = useRef<HTMLElement>(null);
  const earthHistoryScrollRef = useRef<HTMLDivElement>(null);
  const naturalGeographyRef = useRef<HTMLElement>(null);
  const naturalGeographyScrollRef = useRef<HTMLDivElement>(null);
  const geologyRef = useRef<HTMLElement>(null);
  const geologyScrollRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLElement>(null);
  const atmosphereScrollRef = useRef<HTMLDivElement>(null);
  const oceanographyRef = useRef<HTMLElement>(null);
  const oceanographyScrollRef = useRef<HTMLDivElement>(null);
  const astronomyRef = useRef<HTMLElement>(null);
  const astronomyScrollRef = useRef<HTMLDivElement>(null);

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    { ref: historyRef, scrollRef: historyScrollRef },
    { ref: socialGeographyRef, scrollRef: socialGeographyScrollRef },
    { ref: earthHistoryRef, scrollRef: earthHistoryScrollRef },
    { ref: naturalGeographyRef, scrollRef: naturalGeographyScrollRef },
    { ref: geologyRef, scrollRef: geologyScrollRef },
    { ref: atmosphereRef, scrollRef: atmosphereScrollRef },
    { ref: oceanographyRef, scrollRef: oceanographyScrollRef },
    { ref: astronomyRef, scrollRef: astronomyScrollRef },
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
    history: [
      SpaceTime_history01, SpaceTime_history02, SpaceTime_history03,
      SpaceTime_history04, SpaceTime_history05, SpaceTime_history06
    ],
    socialGeography: [
      SpaceTime_social01, SpaceTime_social02, SpaceTime_social03,
      SpaceTime_social04, SpaceTime_social05, SpaceTime_social06
    ],
    earthHistory: [
      SpaceTime_earth01, SpaceTime_earth02, SpaceTime_earth03,
      SpaceTime_earth04, SpaceTime_earth05, SpaceTime_earth06
    ],
    naturalGeography: [
      SpaceTime_natural01, SpaceTime_natural02, SpaceTime_natural03,
      SpaceTime_natural04, SpaceTime_natural05, SpaceTime_natural06
    ],
    geology: [
      SpaceTime_geology01, SpaceTime_geology02, SpaceTime_geology03,
      SpaceTime_geology04, SpaceTime_geology05, SpaceTime_geology06
    ],
    atmosphere: [
      SpaceTime_atmosphere01, SpaceTime_atmosphere02, SpaceTime_atmosphere03,
      SpaceTime_atmosphere04, SpaceTime_atmosphere05, SpaceTime_atmosphere06
    ],
    oceanography: [
      SpaceTime_ocean01, SpaceTime_ocean02, SpaceTime_ocean03,
      SpaceTime_ocean04, SpaceTime_ocean05, SpaceTime_ocean06
    ],
    astronomy: [
      SpaceTime_astronomy01, SpaceTime_astronomy02, SpaceTime_astronomy03,
      SpaceTime_astronomy04, SpaceTime_astronomy05, SpaceTime_astronomy06
    ]
  };
  const imageArrays = createImageArrays(sectionImageData);

  // 各セクションの画像アニメーションを管理するカスタムフック（共通化）
  const sectionKeys = Object.keys(sectionImageData);
  const sectionAnimations = sectionKeys.map((key, index) =>
    useSectionImageAnimations(
      currentSection === index + 1,
      sectionImageData[key as keyof typeof sectionImageData].length
    )
  );

  // --- 外部HTMLロードを共通フックで ---
  const sectionNames = [
    'history', 'social_geography', 'earth_history', 'natural_geography',
    'geology', 'atmosphere', 'oceanography', 'astronomy'
  ];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('spaceTime', sectionNames);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // ページトップに戻る関数（共通フック利用）
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  // --- レンダリング用の設定（共通化） ---
  const sectionConfigs = [
    { key: 'history', name: 'history', className: 'block_text_right', textPosition: 'right' },
    { key: 'socialGeography', name: 'social_geography', className: 'block_text_left', textPosition: 'left' },
    { key: 'earthHistory', name: 'earth_history', className: 'block_text_right', textPosition: 'right' },
    { key: 'naturalGeography', name: 'natural_geography', className: 'block_text_left', textPosition: 'left' },
    { key: 'geology', name: 'geology', className: 'block_text_right', textPosition: 'right' },
    { key: 'atmosphere', name: 'atmosphere', className: 'block_text_left', textPosition: 'left' },
    { key: 'oceanography', name: 'oceanography', className: 'block_text_right', textPosition: 'right' },
    { key: 'astronomy', name: 'astronomy', className: 'block_text_left', textPosition: 'left' }
  ];

  // テキストブロックレンダリング用関数（共通化）
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

  // セクションレンダリング用関数（共通化）
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

      <section className='first_view' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='space_time_h1'>時空間</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={SpaceTime_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='history'><a href="#history" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 歴史 */}
            <li className='social_geography'><a href="#social_geography" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 社会地理 */}
            <li className='earth_history'><a href="#earth_history" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 地球史 */}
            <li className='natural_geography'><a href="#natural_geography" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 自然地理 */}
            <li className='geology'><a href="#geology" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 地質研究 */}
            <li className='atmosphere'><a href="#atmosphere" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 大気研究 */}
            <li className='oceanography'><a href="#oceanography" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 海洋研究 */}
            <li className='astronomy'><a href="#astronomy" onClick={(e) => { e.preventDefault(); setCurrentSection(8); }}></a></li>{/* 天文 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <h3>時間の尺度の幅の広さ</h3><p>地史は非常に広範であり、過去10年から数100億年にわたるさまざまな出来事を扱います。地球の形成から現代までの進化や変遷を理解することができます。</p>
            <h3>異なる学問の融合</h3><p>地史は地質学、古生物学、気象学、天文学など複数の学問を結びつける分野であるため、多様な視点から地球の歴史を理解することが求められます。これにより、総合的な知識の構築が可能となります</p>
            <h3>化石の証拠/文献の証拠</h3><p>地史は化石などの堆積物を通じて地球の進化を探るため、生命の進化や絶滅事象に関する貴重な情報が得られます。化石は過去の生態系や気候、地形の変遷を解明する手がかりとなります。</p>
            <h3>気候変動の理解</h3><p>地史の研究によって、地球の気候変動に関する理解が進みつつあります。氷期と間氷期のサイクルや、温暖期における生態系の変遷や人類の生活様式の変化など、現代の気候変動に関する洞察が得られます。</p>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <h3>情報の不完全性</h3><p>地史の研究においては、過去の出来事を正確に把握するための情報が限られています。化石や岩石や史料の保存状態によっては、完全なデータを得ることが難しい場合があります。</p>
            <h3>解釈の主観性</h3><p>地史のデータを解釈する際、研究者の主観的な見解や仮説が影響を与えることがあります。異なる研究者や学派によって異なる解釈がなされることがあり、これが正確な理解を妨げる要因となります。</p>
            <h3>時間スケールの難解さ</h3><p>非常に広範な時間を対象としているため、そのスケールの理解が難しいことがあります。数千年・数百万年・数億年といった単位は、人の日常的な時間感覚とはかけ離れています。</p>
            <h3>未解明の謎がまだ多い</h3><p>地史には未だ解明されていない謎や疑問が多く存在します。過去の地球の出来事や進化の過程に関して、研究が進んでいるものの完全な解明には至っていない点があります。</p>
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

export default SpaceTime;
