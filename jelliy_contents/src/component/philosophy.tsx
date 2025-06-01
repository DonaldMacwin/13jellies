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
import Politics_1stView from '../assets/img/Philosophy_1stView01.png';
import { TopButton } from './_common_component';

import Philosophy_art_studies01 from '../assets/img/Philosophy_art_studies01.jpg';
import Philosophy_art_studies02 from '../assets/img/Philosophy_art_studies02.jpg';
import Philosophy_art_studies03 from '../assets/img/Philosophy_art_studies03.png';
import Philosophy_art_studies04 from '../assets/img/Philosophy_art_studies01.jpg';
import Philosophy_art_studies05 from '../assets/img/Philosophy_art_studies02.jpg';
import Philosophy_art_studies06 from '../assets/img/Philosophy_art_studies03.png';

import Philosophy_philosophy_history01 from '../assets/img/Philosophy_philosophy_history01.jpg';
import Philosophy_philosophy_history02 from '../assets/img/Philosophy_philosophy_history02.jpg';
import Philosophy_philosophy_history03 from '../assets/img/Philosophy_philosophy_history03.png';
import Philosophy_philosophy_history04 from '../assets/img/Philosophy_philosophy_history01.jpg';
import Philosophy_philosophy_history05 from '../assets/img/Philosophy_philosophy_history02.jpg';
import Philosophy_philosophy_history06 from '../assets/img/Philosophy_philosophy_history03.png';

import Philosophy_religious_studies01 from '../assets/img/Philosophy_religious_studies01.jpg';
import Philosophy_religious_studies02 from '../assets/img/Philosophy_religious_studies02.jpg';
import Philosophy_religious_studies03 from '../assets/img/Philosophy_religious_studies03.png';
import Philosophy_religious_studies04 from '../assets/img/Philosophy_religious_studies01.jpg';
import Philosophy_religious_studies05 from '../assets/img/Philosophy_religious_studies02.jpg';
import Philosophy_religious_studies06 from '../assets/img/Philosophy_religious_studies03.png';

import Philosophy_philosophy_of_science01 from '../assets/img/Philosophy_philosophy_of_science01.jpg';
import Philosophy_philosophy_of_science02 from '../assets/img/Philosophy_philosophy_of_science02.jpg';
import Philosophy_philosophy_of_science03 from '../assets/img/Philosophy_philosophy_of_science03.png';
import Philosophy_philosophy_of_science04 from '../assets/img/Philosophy_philosophy_of_science01.jpg';
import Philosophy_philosophy_of_science05 from '../assets/img/Philosophy_philosophy_of_science02.jpg';
import Philosophy_philosophy_of_science06 from '../assets/img/Philosophy_philosophy_of_science03.png';

import Philosophy_ethics01 from '../assets/img/Philosophy_ethics01.jpg';
import Philosophy_ethics02 from '../assets/img/Philosophy_ethics02.jpg';
import Philosophy_ethics03 from '../assets/img/Philosophy_ethics03.png';
import Philosophy_ethics04 from '../assets/img/Philosophy_ethics01.jpg';
import Philosophy_ethics05 from '../assets/img/Philosophy_ethics02.jpg';
import Philosophy_ethics06 from '../assets/img/Philosophy_ethics03.png';

import Philosophy_logic01 from '../assets/img/Philosophy_logic01.jpg';
import Philosophy_logic02 from '../assets/img/Philosophy_logic02.jpg';
import Philosophy_logic03 from '../assets/img/Philosophy_logic03.png';
import Philosophy_logic04 from '../assets/img/Philosophy_logic01.jpg';
import Philosophy_logic05 from '../assets/img/Philosophy_logic02.jpg';
import Philosophy_logic06 from '../assets/img/Philosophy_logic03.png';

import './_common_css.css';
import './philosophy.css';

function Philosophy() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const artStudiesRef = useRef<HTMLElement>(null);
  const artStudiesScrollRef = useRef<HTMLDivElement>(null);
  const philosophyHistoryRef = useRef<HTMLElement>(null);
  const philosophyHistoryScrollRef = useRef<HTMLDivElement>(null);
  const religiousStudiesRef = useRef<HTMLElement>(null);
  const religiousStudiesScrollRef = useRef<HTMLDivElement>(null);
  const philosophyOfScienceRef = useRef<HTMLElement>(null);
  const philosophyOfScienceScrollRef = useRef<HTMLDivElement>(null);
  const ethicsRef = useRef<HTMLElement>(null);
  const ethicsScrollRef = useRef<HTMLDivElement>(null);
  const logicRef = useRef<HTMLElement>(null);
  const logicScrollRef = useRef<HTMLDivElement>(null);

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    { ref: artStudiesRef, scrollRef: artStudiesScrollRef },
    { ref: philosophyHistoryRef, scrollRef: philosophyHistoryScrollRef },
    { ref: religiousStudiesRef, scrollRef: religiousStudiesScrollRef },
    { ref: philosophyOfScienceRef, scrollRef: philosophyOfScienceScrollRef },
    { ref: ethicsRef, scrollRef: ethicsScrollRef },
    { ref: logicRef, scrollRef: logicScrollRef },
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
    art_studies: [
      Philosophy_art_studies01, Philosophy_art_studies02, Philosophy_art_studies03,
      Philosophy_art_studies04, Philosophy_art_studies05, Philosophy_art_studies06
    ],
    philosophy_history: [
      Philosophy_philosophy_history01, Philosophy_philosophy_history02, Philosophy_philosophy_history03,
      Philosophy_philosophy_history04, Philosophy_philosophy_history05, Philosophy_philosophy_history06
    ],
    religious_studies: [
      Philosophy_religious_studies01, Philosophy_religious_studies02, Philosophy_religious_studies03,
      Philosophy_religious_studies04, Philosophy_religious_studies05, Philosophy_religious_studies06
    ],
    philosophy_of_science: [
      Philosophy_philosophy_of_science01, Philosophy_philosophy_of_science02, Philosophy_philosophy_of_science03,
      Philosophy_philosophy_of_science04, Philosophy_philosophy_of_science05, Philosophy_philosophy_of_science06
    ],
    ethics: [
      Philosophy_ethics01, Philosophy_ethics02, Philosophy_ethics03,
      Philosophy_ethics04, Philosophy_ethics05, Philosophy_ethics06
    ],
    logic: [
      Philosophy_logic01, Philosophy_logic02, Philosophy_logic03,
      Philosophy_logic04, Philosophy_logic05, Philosophy_logic06
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
    'art_studies', 'philosophy_history', 'religious_studies',
    'philosophy_of_science', 'ethics', 'logic'
  ];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('philosophy', sectionNames);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // ページトップに戻る関数
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  // レンダリング用の設定
  // セクションkey設定
  const sectionConfigs = [
    { key: 'art_studies', name: 'art_studies', className: 'block_text_right', textPosition: 'right' },
    { key: 'philosophy_history', name: 'philosophy_history', className: 'block_text_left', textPosition: 'left' },
    { key: 'religious_studies', name: 'religious_studies', className: 'block_text_right', textPosition: 'right' },
    { key: 'philosophy_of_science', name: 'philosophy_of_science', className: 'block_text_left', textPosition: 'left' },
    { key: 'ethics', name: 'ethics', className: 'block_text_right', textPosition: 'right' },
    { key: 'logic', name: 'logic', className: 'block_text_left', textPosition: 'left' }
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
      ref={sections[index + 1].ref} // ← ここはそのままでOK（+1でfirstViewRefの次から）
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

      <section className='first_view philosophy' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='philosophy_h1'>哲学<br />宗教</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Politics_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='art_studies'><a href="#art_studies" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 芸術研究 */}
            <li className='philosophy_history'><a href="#philosophy_history" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 哲学史研究 */}
            <li className='religious_studies'><a href="#religious_studies" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 宗教研究 */}
            <li className='philosophy_of_science'><a href="#philosophy_of_science" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 科学哲学研究 */}
            <li className='ethics'><a href="#ethics" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 倫理研究 */}
            <li className='logic'><a href="#logic" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 論理研究 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <div className="h3-float-wrap">
              <h3 className="h3-float">思考の深化と問いの提起</h3>
              <p>哲学宗教は深い思索を通じて、存在、知識、道徳などに関する根本的な問いを提起します。哲学的なアプローチは問題の本質に迫り、より深い理解をもたらすことがあります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">論理的思考と議論の発展</h3>
              <p>哲学宗教は論理的な思考を養い、複雑なアイディアを論理的に整理し、表現する能力を向上させます。これは他の分野でも通用するスキルであり、問題解決力や批判的思考を発展させます。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">異なる視点への理解と尊重</h3>
              <p>哲学宗教は異なる哲学者や学派を通じて、異なる文化や時代の視点を理解し尊重する手段を提供します。これが異なる観点を認識し、対話的で包括的な思考を促進します。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">霊的な満足感と結びつき</h3>
              <p>哲学宗教は信仰と結びつき、個人に霊的な満足感を提供します。信仰を通じて、人々は意味や目的を見出し、共同体感を強化することがあります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">倫理的な指針と行動規範</h3>
              <p>哲学宗教はしばしば倫理的な指針や行動規範を提供し、個人や共同体が善と悪、正義と不正義を判断するための基準を提供します。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">社会的な結束力</h3>
              <p>哲学宗教は共同体や文化の中で社会的な結束力を生み出すことがあります。共通の信仰体験や儀式は、人々を団結させる効果があります。</p>
            </div>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <div className="h3-float-wrap">
              <h3 className="h3-float">実用性の不足</h3>
              <p>哲学宗教のアプローチはしばしば抽象的であり、実用性が不透明な場合があります。一部の人は、哲学宗教が具体的な問題に対処するのに直接的ではないと感じることがあります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">合意の難しさ</h3>
              <p>哲学宗教は時に異なる識者や学派の間で合意を形成するのが難しい分野です。異なる立場が存在するため、統一的な見解を得ることが挑戦的であることがあります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">時間のかかるアプローチ</h3>
              <p>問題の根本的な理解を求める哲学宗教的なアプローチは時間を要することがあり、現実的な問題に対する即座の解決を難しくすることがあります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">対立と偏見</h3>
              <p>哲学宗教はしばしば異なる信仰や信念の対立を引き起こし、偏見や対立を生む要因となることがあります。これが哲学宗教間の摩擦や対立を引き起こすことがあります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">科学的な進歩への制約</h3>
              <p>一部の哲学宗教信念は、科学的な進歩や発展と対立することがあります。これが教義と現代科学の矛盾を引き起こすことがあります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">過度な統制と拘束</h3>
              <p>一部の哲学宗教体系は、個人の自由や表現の自由を制限し、厳格な規律を要求することがあります。これが個人の発展や多様性を妨げることがあります。</p>
            </div>
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

export default Philosophy;
