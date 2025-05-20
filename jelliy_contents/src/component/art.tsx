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
import Art_1stView from '../assets/img/Art_1stView01.png';
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

  // 各セクションの画像アニメーションを管理するカスタムフック
  const planarModelingImagesArray = [
    { src: SpaceTime_history01 },
    { src: SpaceTime_history02 },
    { src: SpaceTime_history03 },
    { src: SpaceTime_history04 },
    { src: SpaceTime_history05 },
    { src: SpaceTime_history06 }
  ];
  const planarModelingImages = useSectionImageAnimations(currentSection === 1, planarModelingImagesArray.length);
  const threeDModelingImagesArray = [
    { src: SpaceTime_social01 },
    { src: SpaceTime_social02 },
    { src: SpaceTime_social03 },
    { src: SpaceTime_social04 },
    { src: SpaceTime_social05 },
    { src: SpaceTime_social06 }
  ];
  const threeDModelingImages = useSectionImageAnimations(currentSection === 2, threeDModelingImagesArray.length);
  const literatureImagesArray = [
    { src: SpaceTime_earth01 },
    { src: SpaceTime_earth02 },
    { src: SpaceTime_earth03 },
    { src: SpaceTime_earth04 },
    { src: SpaceTime_earth05 },
    { src: SpaceTime_earth06 }
  ];
  const literatureImages = useSectionImageAnimations(currentSection === 3, literatureImagesArray.length);
  const communicationTechniqueImagesArray = [
    { src: SpaceTime_natural01 },
    { src: SpaceTime_natural02 },
    { src: SpaceTime_natural03 },
    { src: SpaceTime_natural04 },
    { src: SpaceTime_natural05 },
    { src: SpaceTime_natural06 }
  ];
  const communicationTechniqueImages = useSectionImageAnimations(currentSection === 4, communicationTechniqueImagesArray.length);
  const musicImagesArray = [
    { src: SpaceTime_geology01 },
    { src: SpaceTime_geology02 },
    { src: SpaceTime_geology03 },
    { src: SpaceTime_geology04 },
    { src: SpaceTime_geology05 },
    { src: SpaceTime_geology06 }
  ];
  const musicImages = useSectionImageAnimations(currentSection === 5, musicImagesArray.length);
  const cookingImagesArray = [
    { src: SpaceTime_atmosphere01 },
    { src: SpaceTime_atmosphere02 },
    { src: SpaceTime_atmosphere03 },
    { src: SpaceTime_atmosphere04 },
    { src: SpaceTime_atmosphere05 },
    { src: SpaceTime_atmosphere06 }
  ];
  const cookingImages = useSectionImageAnimations(currentSection === 6, cookingImagesArray.length);
  const performingImagesArray = [
    { src: SpaceTime_ocean01 },
    { src: SpaceTime_ocean02 },
    { src: SpaceTime_ocean03 },
    { src: SpaceTime_ocean04 },
    { src: SpaceTime_ocean05 },
    { src: SpaceTime_ocean06 }
  ];
  const performingImages = useSectionImageAnimations(currentSection === 7, performingImagesArray.length);

  // --- 各セクションの外部HTMLマークアップ取得用stateとfetch処理 ---
  const [planarModelingHtml, setPlanarModelingHtml] = useState<string>('');
  const [planarModelingLoading, setPlanarModelingLoading] = useState<boolean>(true);
  const [planarModelingError, setPlanarModelingError] = useState<string | null>(null);

  const [threeDModelingHtml, setThreeDModelingHtml] = useState<string>('');
  const [threeDModelingLoading, setThreeDModelingLoading] = useState<boolean>(true);
  const [threeDModelingError, setThreeDModelingError] = useState<string | null>(null);

  const [literatureHtml, setLiteratureHtml] = useState<string>('');
  const [literatureLoading, setLiteratureLoading] = useState<boolean>(true);
  const [literatureError, setLiteratureError] = useState<string | null>(null);

  const [communicationTechniqueHtml, setCommunicationTechniqueHtml] = useState<string>('');
  const [communicationTechniqueLoading, setCommunicationTechniqueLoading] = useState<boolean>(true);
  const [communicationTechniqueError, setCommunicationTechniqueError] = useState<string | null>(null);

  const [musicHtml, setMusicHtml] = useState<string>('');
  const [musicLoading, setMusicLoading] = useState<boolean>(true);
  const [musicError, setMusicError] = useState<string | null>(null);

  const [cookingHtml, setCookingHtml] = useState<string>('');
  const [cookingLoading, setCookingLoading] = useState<boolean>(true);
  const [cookingError, setCookingError] = useState<string | null>(null);

  const [performingHtml, setPerformingHtml] = useState<string>('');
  const [performingLoading, setPerformingLoading] = useState<boolean>(true);
  const [performingError, setPerformingError] = useState<string | null>(null);

  const basePath =
    window.location.hostname === 'localhost'
      ? '/texts/'
      : `${import.meta.env.VITE_TEXTS_BASE_URL}/13jellies/jelliy_contents/dist/texts/`;

  useEffect(() => {
    fetch(`${basePath}art_planar_modeling.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setPlanarModelingHtml(html);
        setPlanarModelingLoading(false);
      })
      .catch((_err) => {
        setPlanarModelingError('読み込みにエラーが発生しました。再読込してみてください。');
        setPlanarModelingLoading(false);
      });

    fetch(`${basePath}art_three_D_modeling.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setThreeDModelingHtml(html);
        setThreeDModelingLoading(false);
      })
      .catch((_err) => {
        setThreeDModelingError('読み込みにエラーが発生しました。再読込してみてください。');
        setThreeDModelingLoading(false);
      });

    fetch(`${basePath}art_literature.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setLiteratureHtml(html);
        setLiteratureLoading(false);
      })
      .catch((_err) => {
        setLiteratureError('読み込みにエラーが発生しました。再読込してみてください。');
        setLiteratureLoading(false);
      });

    fetch(`${basePath}art_communication_technique.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setCommunicationTechniqueHtml(html);
        setCommunicationTechniqueLoading(false);
      })
      .catch((_err) => {
        setCommunicationTechniqueError('読み込みにエラーが発生しました。再読込してみてください。');
        setCommunicationTechniqueLoading(false);
      });

    fetch(`${basePath}art_music.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setMusicHtml(html);
        setMusicLoading(false);
      })
      .catch((_err) => {
        setMusicError('読み込みにエラーが発生しました。再読込してみてください。');
        setMusicLoading(false);
      });

    fetch(`${basePath}art_cooking.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setCookingHtml(html);
        setCookingLoading(false);
      })
      .catch((_err) => {
        setCookingError('読み込みにエラーが発生しました。再読込してみてください。');
        setCookingLoading(false);
      });

    fetch(`${basePath}art_performing.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setPerformingHtml(html);
        setPerformingLoading(false);
      })
      .catch((_err) => {
        setPerformingError('読み込みにエラーが発生しました。再読込してみてください。');
        setPerformingLoading(false);
      });
  }, []);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload([
    planarModelingImagesArray,
    threeDModelingImagesArray,
    literatureImagesArray,
    communicationTechniqueImagesArray,
    musicImagesArray,
    cookingImagesArray,
    performingImagesArray
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

      {/* 平面造形セクション */}
      <section
        className='block_text_right'
        id='planar_modeling'
        ref={planarModelingRef}
        style={sectionStyle(1)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={planarModelingImagesArray}
            imagesState={planarModelingImages.imagesState}
            imagesStyles={planarModelingImages.imagesStyles}
            imageEffects={planarModelingImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={planarModelingScrollRef}
            style={scrollableStyle(currentSection === 1)}>
            {planarModelingLoading && <div>読み込み中...</div>}
            {planarModelingError && <div style={{ color: 'red' }}>{planarModelingError}</div>}
            {!planarModelingLoading && !planarModelingError && (
              <div dangerouslySetInnerHTML={{ __html: planarModelingHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 立体造形セクション */}
      <section
        className='block_text_left'
        id='three_D_modeling'
        ref={threeDModelingRef}
        style={sectionStyle(2)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={threeDModelingScrollRef}
            style={scrollableStyle(currentSection === 2)}>
            {threeDModelingLoading && <div>読み込み中...</div>}
            {threeDModelingError && <div style={{ color: 'red' }}>{threeDModelingError}</div>}
            {!threeDModelingLoading && !threeDModelingError && (
              <div dangerouslySetInnerHTML={{ __html: threeDModelingHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={threeDModelingImagesArray}
            imagesState={threeDModelingImages.imagesState}
            imagesStyles={threeDModelingImages.imagesStyles}
            imageEffects={threeDModelingImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 文学セクション */}
      <section
        className='block_text_right'
        id='literature'
        ref={literatureRef}
        style={sectionStyle(3)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={literatureImagesArray}
            imagesState={literatureImages.imagesState}
            imagesStyles={literatureImages.imagesStyles}
            imageEffects={literatureImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={literatureScrollRef}
            style={scrollableStyle(currentSection === 3)}>
            {literatureLoading && <div>読み込み中...</div>}
            {literatureError && <div style={{ color: 'red' }}>{literatureError}</div>}
            {!literatureLoading && !literatureError && (
              <div dangerouslySetInnerHTML={{ __html: literatureHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 伝達技法研究セクション */}
      <section
        className='block_text_left'
        id='communication_technique'
        ref={communicationTechniqueRef}
        style={sectionStyle(4)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={communicationTechniqueScrollRef}
            style={scrollableStyle(currentSection === 4)}>
            {communicationTechniqueLoading && <div>読み込み中...</div>}
            {communicationTechniqueError && <div style={{ color: 'red' }}>{communicationTechniqueError}</div>}
            {!communicationTechniqueLoading && !communicationTechniqueError && (
              <div dangerouslySetInnerHTML={{ __html: communicationTechniqueHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={communicationTechniqueImagesArray}
            imagesState={communicationTechniqueImages.imagesState}
            imagesStyles={communicationTechniqueImages.imagesStyles}
            imageEffects={communicationTechniqueImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 音楽セクション */}
      <section
        className='block_text_right'
        id='music'
        ref={musicRef}
        style={sectionStyle(5)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={musicImagesArray}
            imagesState={musicImages.imagesState}
            imagesStyles={musicImages.imagesStyles}
            imageEffects={musicImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={musicScrollRef}
            style={scrollableStyle(currentSection === 5)}>
            {musicLoading && <div>読み込み中...</div>}
            {musicError && <div style={{ color: 'red' }}>{musicError}</div>}
            {!musicLoading && !musicError && (
              <div dangerouslySetInnerHTML={{ __html: musicHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 料理セクション */}
      <section
        className='block_text_left'
        id='cooking'
        ref={cookingRef}
        style={sectionStyle(6)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={cookingScrollRef}
            style={scrollableStyle(currentSection === 6)}>
            {cookingLoading && <div>読み込み中...</div>}
            {cookingError && <div style={{ color: 'red' }}>{cookingError}</div>}
            {!cookingLoading && !cookingError && (
              <div dangerouslySetInnerHTML={{ __html: cookingHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={cookingImagesArray}
            imagesState={cookingImages.imagesState}
            imagesStyles={cookingImages.imagesStyles}
            imageEffects={cookingImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 舞台芸術セクション */}
      <section
        className='block_text_right'
        id='performing'
        ref={performingRef}
        style={sectionStyle(7)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={performingImagesArray}
            imagesState={performingImages.imagesState}
            imagesStyles={performingImages.imagesStyles}
            imageEffects={performingImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={performingScrollRef}
            style={scrollableStyle(currentSection === 7)}>
            {performingLoading && <div>読み込み中...</div>}
            {performingError && <div style={{ color: 'red' }}>{performingError}</div>}
            {!performingLoading && !performingError && (
              <div dangerouslySetInnerHTML={{ __html: performingHtml }} />
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

export default Art;
