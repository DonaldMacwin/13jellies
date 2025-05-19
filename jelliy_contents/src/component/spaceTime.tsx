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
import SpaceTime_1stView from '../assets/img/SpaceTime_1stView01.png';
/*import SpaceTime_dummy01 from '../assets/img/SpaceTime_dummy01.jpg';
import SpaceTime_dummy02 from '../assets/img/SpaceTime_dummy02.jpg';
import SpaceTime_dummy03 from '../assets/img/SpaceTime_dummy03.png';
import SpaceTime_dummy04 from '../assets/img/SpaceTime_dummy02.jpg';
import SpaceTime_dummy05 from '../assets/img/SpaceTime_dummy01.jpg';
import SpaceTime_dummy06 from '../assets/img/SpaceTime_dummy02.jpg';*/

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

  // 各セクションの画像アニメーションを管理するカスタムフック
  const historyImagesArray = [
    { src: SpaceTime_history01 },
    { src: SpaceTime_history02 },
    { src: SpaceTime_history03 },
    { src: SpaceTime_history04 },
    { src: SpaceTime_history05 },
    { src: SpaceTime_history06 }
  ];
  const historyImages = useSectionImageAnimations(currentSection === 1, historyImagesArray.length);
  const socialGeographyImagesArray = [
    { src: SpaceTime_social01 },
    { src: SpaceTime_social02 },
    { src: SpaceTime_social03 },
    { src: SpaceTime_social04 },
    { src: SpaceTime_social05 },
    { src: SpaceTime_social06 }
  ];
  const socialGeographyImages = useSectionImageAnimations(currentSection === 2, socialGeographyImagesArray.length);
  const earthHistoryImagesArray = [
    { src: SpaceTime_earth01 },
    { src: SpaceTime_earth02 },
    { src: SpaceTime_earth03 },
    { src: SpaceTime_earth04 },
    { src: SpaceTime_earth05 },
    { src: SpaceTime_earth06 }
  ];
  const earthHistoryImages = useSectionImageAnimations(currentSection === 3, earthHistoryImagesArray.length);
  const naturalGeographyImagesArray = [
    { src: SpaceTime_natural01 },
    { src: SpaceTime_natural02 },
    { src: SpaceTime_natural03 },
    { src: SpaceTime_natural04 },
    { src: SpaceTime_natural05 },
    { src: SpaceTime_natural06 }
  ];
  const naturalGeographyImages = useSectionImageAnimations(currentSection === 4, naturalGeographyImagesArray.length);
  const geologyImagesArray = [
    { src: SpaceTime_geology01 },
    { src: SpaceTime_geology02 },
    { src: SpaceTime_geology03 },
    { src: SpaceTime_geology04 },
    { src: SpaceTime_geology05 },
    { src: SpaceTime_geology06 }
  ];
  const geologyImages = useSectionImageAnimations(currentSection === 5, geologyImagesArray.length);
  const atmosphereImagesArray = [
    { src: SpaceTime_atmosphere01 },
    { src: SpaceTime_atmosphere02 },
    { src: SpaceTime_atmosphere03 },
    { src: SpaceTime_atmosphere04 },
    { src: SpaceTime_atmosphere05 },
    { src: SpaceTime_atmosphere06 }
  ];
  const atmosphereImages = useSectionImageAnimations(currentSection === 6, atmosphereImagesArray.length);
  const oceanographyImagesArray = [
    { src: SpaceTime_ocean01 },
    { src: SpaceTime_ocean02 },
    { src: SpaceTime_ocean03 },
    { src: SpaceTime_ocean04 },
    { src: SpaceTime_ocean05 },
    { src: SpaceTime_ocean06 }
  ];
  const oceanographyImages = useSectionImageAnimations(currentSection === 7, oceanographyImagesArray.length);
  const astronomyImagesArray = [
    { src: SpaceTime_astronomy01 },
    { src: SpaceTime_astronomy02 },
    { src: SpaceTime_astronomy03 },
    { src: SpaceTime_astronomy04 },
    { src: SpaceTime_astronomy05 },
    { src: SpaceTime_astronomy06 }
  ];
  const astronomyImages = useSectionImageAnimations(currentSection === 8, astronomyImagesArray.length);

  // --- 各セクションの外部HTMLマークアップ取得用stateとfetch処理 ---
  const [historyHtml, setHistoryHtml] = useState<string>('');
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const [socialGeographyHtml, setSocialGeographyHtml] = useState<string>('');
  const [socialGeographyLoading, setSocialGeographyLoading] = useState<boolean>(true);
  const [socialGeographyError, setSocialGeographyError] = useState<string | null>(null);

  const [earthHistoryHtml, setEarthHistoryHtml] = useState<string>('');
  const [earthHistoryLoading, setEarthHistoryLoading] = useState<boolean>(true);
  const [earthHistoryError, setEarthHistoryError] = useState<string | null>(null);

  const [naturalGeographyHtml, setNaturalGeographyHtml] = useState<string>('');
  const [naturalGeographyLoading, setNaturalGeographyLoading] = useState<boolean>(true);
  const [naturalGeographyError, setNaturalGeographyError] = useState<string | null>(null);

  const [geologyHtml, setGeologyHtml] = useState<string>('');
  const [geologyLoading, setGeologyLoading] = useState<boolean>(true);
  const [geologyError, setGeologyError] = useState<string | null>(null);

  const [atmosphereHtml, setAtmosphereHtml] = useState<string>('');
  const [atmosphereLoading, setAtmosphereLoading] = useState<boolean>(true);
  const [atmosphereError, setAtmosphereError] = useState<string | null>(null);

  const [oceanographyHtml, setOceanographyHtml] = useState<string>('');
  const [oceanographyLoading, setOceanographyLoading] = useState<boolean>(true);
  const [oceanographyError, setOceanographyError] = useState<string | null>(null);

  const [astronomyHtml, setAstronomyHtml] = useState<string>('');
  const [astronomyLoading, setAstronomyLoading] = useState<boolean>(true);
  const [astronomyError, setAstronomyError] = useState<string | null>(null);

  const basePath =
    window.location.hostname === 'localhost'
      ? '/texts/'
      : `${import.meta.env.VITE_TEXTS_BASE_URL}/13jellies/jelliy_contents/dist/texts/`;

  useEffect(() => {
    fetch(`${basePath}spaceTime_history.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setHistoryHtml(html);
        setHistoryLoading(false);
      })
      .catch((_err) => {
        setHistoryError('読み込みにエラーが発生しました。再読込してみてください。');
        setHistoryLoading(false);
      });

    fetch(`${basePath}spaceTime_social_geography.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setSocialGeographyHtml(html);
        setSocialGeographyLoading(false);
      })
      .catch((_err) => {
        setSocialGeographyError('読み込みにエラーが発生しました。再読込してみてください。');
        setSocialGeographyLoading(false);
      });

    fetch(`${basePath}spaceTime_earth_history.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setEarthHistoryHtml(html);
        setEarthHistoryLoading(false);
      })
      .catch((_err) => {
        setEarthHistoryError('読み込みにエラーが発生しました。再読込してみてください。');
        setEarthHistoryLoading(false);
      });

    fetch(`${basePath}spaceTime_natural_geography.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setNaturalGeographyHtml(html);
        setNaturalGeographyLoading(false);
      })
      .catch((_err) => {
        setNaturalGeographyError('読み込みにエラーが発生しました。再読込してみてください。');
        setNaturalGeographyLoading(false);
      });

    fetch(`${basePath}spaceTime_geology.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setGeologyHtml(html);
        setGeologyLoading(false);
      })
      .catch((_err) => {
        setGeologyError('読み込みにエラーが発生しました。再読込してみてください。');
        setGeologyLoading(false);
      });

    fetch(`${basePath}spaceTime_atmosphere.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setAtmosphereHtml(html);
        setAtmosphereLoading(false);
      })
      .catch((_err) => {
        setAtmosphereError('読み込みにエラーが発生しました。再読込してみてください。');
        setAtmosphereLoading(false);
      });

    fetch(`${basePath}spaceTime_oceanography.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setOceanographyHtml(html);
        setOceanographyLoading(false);
      })
      .catch((_err) => {
        setOceanographyError('読み込みにエラーが発生しました。再読込してみてください。');
        setOceanographyLoading(false);
      });

    fetch(`${basePath}spaceTime_astronomy.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setAstronomyHtml(html);
        setAstronomyLoading(false);
      })
      .catch((_err) => {
        setAstronomyError('読み込みにエラーが発生しました。再読込してみてください。');
        setAstronomyLoading(false);
      });
  }, []);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload([
    historyImagesArray,
    socialGeographyImagesArray,
    earthHistoryImagesArray,
    naturalGeographyImagesArray,
    geologyImagesArray,
    atmosphereImagesArray,
    oceanographyImagesArray,
    astronomyImagesArray
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

      {/* 歴史セクション */}
      <section
        className='block_text_right'
        id='history'
        ref={historyRef}
        style={sectionStyle(1)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={historyImagesArray}
            imagesState={historyImages.imagesState}
            imagesStyles={historyImages.imagesStyles}
            imageEffects={historyImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={historyScrollRef}
            style={scrollableStyle(currentSection === 1)}>
            {historyLoading && <div>読み込み中...</div>}
            {historyError && <div style={{ color: 'red' }}>{historyError}</div>}
            {!historyLoading && !historyError && (
              <div dangerouslySetInnerHTML={{ __html: historyHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 社会地理セクション */}
      <section
        className='block_text_left'
        id='social_geography'
        ref={socialGeographyRef}
        style={sectionStyle(2)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={socialGeographyScrollRef}
            style={scrollableStyle(currentSection === 2)}>
            {socialGeographyLoading && <div>読み込み中...</div>}
            {socialGeographyError && <div style={{ color: 'red' }}>{socialGeographyError}</div>}
            {!socialGeographyLoading && !socialGeographyError && (
              <div dangerouslySetInnerHTML={{ __html: socialGeographyHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={socialGeographyImagesArray}
            imagesState={socialGeographyImages.imagesState}
            imagesStyles={socialGeographyImages.imagesStyles}
            imageEffects={socialGeographyImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 地球史セクション */}
      <section
        className='block_text_right'
        id='earth_history'
        ref={earthHistoryRef}
        style={sectionStyle(3)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={earthHistoryImagesArray}
            imagesState={earthHistoryImages.imagesState}
            imagesStyles={earthHistoryImages.imagesStyles}
            imageEffects={earthHistoryImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={earthHistoryScrollRef}
            style={scrollableStyle(currentSection === 3)}>
            {earthHistoryLoading && <div>読み込み中...</div>}
            {earthHistoryError && <div style={{ color: 'red' }}>{earthHistoryError}</div>}
            {!earthHistoryLoading && !earthHistoryError && (
              <div dangerouslySetInnerHTML={{ __html: earthHistoryHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 自然地理セクション */}
      <section
        className='block_text_left'
        id='natural_geography'
        ref={naturalGeographyRef}
        style={sectionStyle(4)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={naturalGeographyScrollRef}
            style={scrollableStyle(currentSection === 4)}>
            {naturalGeographyLoading && <div>読み込み中...</div>}
            {naturalGeographyError && <div style={{ color: 'red' }}>{naturalGeographyError}</div>}
            {!naturalGeographyLoading && !naturalGeographyError && (
              <div dangerouslySetInnerHTML={{ __html: naturalGeographyHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={naturalGeographyImagesArray}
            imagesState={naturalGeographyImages.imagesState}
            imagesStyles={naturalGeographyImages.imagesStyles}
            imageEffects={naturalGeographyImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 地質研究セクション */}
      <section
        className='block_text_right'
        id='geology'
        ref={geologyRef}
        style={sectionStyle(5)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={geologyImagesArray}
            imagesState={geologyImages.imagesState}
            imagesStyles={geologyImages.imagesStyles}
            imageEffects={geologyImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={geologyScrollRef}
            style={scrollableStyle(currentSection === 5)}>
            {geologyLoading && <div>読み込み中...</div>}
            {geologyError && <div style={{ color: 'red' }}>{geologyError}</div>}
            {!geologyLoading && !geologyError && (
              <div dangerouslySetInnerHTML={{ __html: geologyHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 大気研究セクション */}
      <section
        className='block_text_left'
        id='atmosphere'
        ref={atmosphereRef}
        style={sectionStyle(6)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={atmosphereScrollRef}
            style={scrollableStyle(currentSection === 6)}>
            {atmosphereLoading && <div>読み込み中...</div>}
            {atmosphereError && <div style={{ color: 'red' }}>{atmosphereError}</div>}
            {!atmosphereLoading && !atmosphereError && (
              <div dangerouslySetInnerHTML={{ __html: atmosphereHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={atmosphereImagesArray}
            imagesState={atmosphereImages.imagesState}
            imagesStyles={atmosphereImages.imagesStyles}
            imageEffects={atmosphereImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 海洋研究セクション */}
      <section
        className='block_text_right'
        id='oceanography'
        ref={oceanographyRef}
        style={sectionStyle(7)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={oceanographyImagesArray}
            imagesState={oceanographyImages.imagesState}
            imagesStyles={oceanographyImages.imagesStyles}
            imageEffects={oceanographyImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={oceanographyScrollRef}
            style={scrollableStyle(currentSection === 7)}>
            {oceanographyLoading && <div>読み込み中...</div>}
            {oceanographyError && <div style={{ color: 'red' }}>{oceanographyError}</div>}
            {!oceanographyLoading && !oceanographyError && (
              <div dangerouslySetInnerHTML={{ __html: oceanographyHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 天文セクション */}
      <section
        className='block_text_left'
        id='astronomy'
        ref={astronomyRef}
        style={sectionStyle(8)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={astronomyScrollRef}
            style={scrollableStyle(currentSection === 8)}>
            {astronomyLoading && <div>読み込み中...</div>}
            {astronomyError && <div style={{ color: 'red' }}>{astronomyError}</div>}
            {!astronomyLoading && !astronomyError && (
              <div dangerouslySetInnerHTML={{ __html: astronomyHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={astronomyImagesArray}
            imagesState={astronomyImages.imagesState}
            imagesStyles={astronomyImages.imagesStyles}
            imageEffects={astronomyImages.imageEffects}
            blockClass="right"
          />
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

export default SpaceTime;
