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
import Mathematics_1stView from '../assets/img/Mathematics_1stView01.png';
import { TopButton } from './_common_component';
// 表現論
import Mathematics_representation01 from '../assets/img/Mathematics_representation01.png';
import Mathematics_representation02 from '../assets/img/Mathematics_representation02.png';
import Mathematics_representation03 from '../assets/img/Mathematics_representation03.png';
import Mathematics_representation04 from '../assets/img/Mathematics_representation04.jpg';
import Mathematics_representation05 from '../assets/img/Mathematics_representation05.jpg';
import Mathematics_representation06 from '../assets/img/Mathematics_representation06.jpg';
// 複素解析
import Mathematics_complexAnalysis01 from '../assets/img/Mathematics_complexAnalysis01.png';
import Mathematics_complexAnalysis02 from '../assets/img/Mathematics_complexAnalysis02.png';
import Mathematics_complexAnalysis03 from '../assets/img/Mathematics_complexAnalysis03.png';
import Mathematics_complexAnalysis04 from '../assets/img/Mathematics_complexAnalysis04.jpg';
import Mathematics_complexAnalysis05 from '../assets/img/Mathematics_complexAnalysis05.jpg';
import Mathematics_complexAnalysis06 from '../assets/img/Mathematics_complexAnalysis06.jpg';
// 代数解析
import Mathematics_algebraicAnalysis01 from '../assets/img/Mathematics_algebraicAnalysis01.png';
import Mathematics_algebraicAnalysis02 from '../assets/img/Mathematics_algebraicAnalysis02.png';
import Mathematics_algebraicAnalysis03 from '../assets/img/Mathematics_algebraicAnalysis03.jpg';
import Mathematics_algebraicAnalysis04 from '../assets/img/Mathematics_algebraicAnalysis04.jpg';
import Mathematics_algebraicAnalysis05 from '../assets/img/Mathematics_algebraicAnalysis05.jpg';
import Mathematics_algebraicAnalysis06 from '../assets/img/Mathematics_algebraicAnalysis06.jpg';
// 整数論
import Mathematics_numberTheory01 from '../assets/img/Mathematics_numberTheory01.png';
import Mathematics_numberTheory02 from '../assets/img/Mathematics_numberTheory02.png';
import Mathematics_numberTheory03 from '../assets/img/Mathematics_numberTheory03.png';
import Mathematics_numberTheory04 from '../assets/img/Mathematics_numberTheory04.jpg';
import Mathematics_numberTheory05 from '../assets/img/Mathematics_numberTheory05.jpg';
import Mathematics_numberTheory06 from '../assets/img/Mathematics_numberTheory06.png';
// 実用応用数学
import Mathematics_appliedMathematics01 from '../assets/img/Mathematics_appliedMathematics01.png';
import Mathematics_appliedMathematics02 from '../assets/img/Mathematics_appliedMathematics02.png';
import Mathematics_appliedMathematics03 from '../assets/img/Mathematics_appliedMathematics03.png';
import Mathematics_appliedMathematics04 from '../assets/img/Mathematics_appliedMathematics04.jpg';
import Mathematics_appliedMathematics05 from '../assets/img/Mathematics_appliedMathematics05.jpg';
import Mathematics_appliedMathematics06 from '../assets/img/Mathematics_appliedMathematics06.jpg';
// 代数幾何
import Mathematics_algebraicGeometry01 from '../assets/img/Mathematics_algebraicGeometry01.png';
import Mathematics_algebraicGeometry02 from '../assets/img/Mathematics_algebraicGeometry02.png';
import Mathematics_algebraicGeometry03 from '../assets/img/Mathematics_algebraicGeometry03.png';
import Mathematics_algebraicGeometry04 from '../assets/img/Mathematics_algebraicGeometry04.jpg';
import Mathematics_algebraicGeometry05 from '../assets/img/Mathematics_algebraicGeometry05.png';
import Mathematics_algebraicGeometry06 from '../assets/img/Mathematics_algebraicGeometry06.png';
// 微分幾何
import Mathematics_differentialGeometry01 from '../assets/img/Mathematics_differentialGeometry01.png';
import Mathematics_differentialGeometry02 from '../assets/img/Mathematics_differentialGeometry02.png';
import Mathematics_differentialGeometry03 from '../assets/img/Mathematics_differentialGeometry03.png';
import Mathematics_differentialGeometry04 from '../assets/img/Mathematics_differentialGeometry04.jpg';
import Mathematics_differentialGeometry05 from '../assets/img/Mathematics_differentialGeometry05.jpg';
import Mathematics_differentialGeometry06 from '../assets/img/Mathematics_differentialGeometry06.jpg';
// 代数
import Mathematics_algebra01 from '../assets/img/Mathematics_algebra01.png';
import Mathematics_algebra02 from '../assets/img/Mathematics_algebra02.jpg';
import Mathematics_algebra03 from '../assets/img/Mathematics_algebra03.png';
import Mathematics_algebra04 from '../assets/img/Mathematics_algebra04.png';
import Mathematics_algebra05 from '../assets/img/Mathematics_algebra05.png';
import Mathematics_algebra06 from '../assets/img/Mathematics_algebra06.jpg';
// 解析
import Mathematics_analysis01 from '../assets/img/Mathematics_analysis01.png';
import Mathematics_analysis02 from '../assets/img/Mathematics_analysis02.png';
import Mathematics_analysis03 from '../assets/img/Mathematics_analysis03.jpg';
import Mathematics_analysis04 from '../assets/img/Mathematics_analysis04.png';
import Mathematics_analysis05 from '../assets/img/Mathematics_analysis05.png';
import Mathematics_analysis06 from '../assets/img/Mathematics_analysis06.jpg';
// 幾何
import Mathematics_geometry01 from '../assets/img/Mathematics_geometry01.png';
import Mathematics_geometry02 from '../assets/img/Mathematics_geometry02.png';
import Mathematics_geometry03 from '../assets/img/Mathematics_geometry03.jpg';
import Mathematics_geometry04 from '../assets/img/Mathematics_geometry04.jpg';
import Mathematics_geometry05 from '../assets/img/Mathematics_geometry05.jpg';
import Mathematics_geometry06 from '../assets/img/Mathematics_geometry06.jpg';
// 基礎論
import Mathematics_foundations01 from '../assets/img/Mathematics_foundations01.png';
import Mathematics_foundations02 from '../assets/img/Mathematics_foundations02.png';
import Mathematics_foundations03 from '../assets/img/Mathematics_foundations03.png';
import Mathematics_foundations04 from '../assets/img/Mathematics_foundations04.png';
import Mathematics_foundations05 from '../assets/img/Mathematics_foundations05.jpg';
import Mathematics_foundations06 from '../assets/img/Mathematics_foundations06.jpg';

import './_common_css.css';
import './mathematics.css';

function Mathematics() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  // 数学用セクション参照を11個用意
  const sectionRefs = Array.from({ length: 11 }, () => useRef<HTMLElement>(null));
  const sectionScrollRefs = Array.from({ length: 11 }, () => useRef<HTMLDivElement>(null));

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    ...sectionRefs.map((ref, i) => ({ ref, scrollRef: sectionScrollRefs[i] }))
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
    representation: [
      Mathematics_representation01, Mathematics_representation02, Mathematics_representation03,
      Mathematics_representation04, Mathematics_representation05, Mathematics_representation06
    ],
    complexAnalysis: [
      Mathematics_complexAnalysis01, Mathematics_complexAnalysis02, Mathematics_complexAnalysis03,
      Mathematics_complexAnalysis04, Mathematics_complexAnalysis05, Mathematics_complexAnalysis06
    ],
    algebraicAnalysis: [
      Mathematics_algebraicAnalysis01, Mathematics_algebraicAnalysis02, Mathematics_algebraicAnalysis03,
      Mathematics_algebraicAnalysis04, Mathematics_algebraicAnalysis05, Mathematics_algebraicAnalysis06
    ],
    numberTheory: [
      Mathematics_numberTheory01, Mathematics_numberTheory02, Mathematics_numberTheory03,
      Mathematics_numberTheory04, Mathematics_numberTheory05, Mathematics_numberTheory06
    ],
    appliedMathematics: [
      Mathematics_appliedMathematics01, Mathematics_appliedMathematics02, Mathematics_appliedMathematics03,
      Mathematics_appliedMathematics04, Mathematics_appliedMathematics05, Mathematics_appliedMathematics06
    ],
    algebraicGeometry: [
      Mathematics_algebraicGeometry01, Mathematics_algebraicGeometry02, Mathematics_algebraicGeometry03,
      Mathematics_algebraicGeometry04, Mathematics_algebraicGeometry05, Mathematics_algebraicGeometry06
    ],
    differentialGeometry: [
      Mathematics_differentialGeometry01, Mathematics_differentialGeometry02, Mathematics_differentialGeometry03,
      Mathematics_differentialGeometry04, Mathematics_differentialGeometry05, Mathematics_differentialGeometry06
    ],
    algebra: [
      Mathematics_algebra01, Mathematics_algebra02, Mathematics_algebra03,
      Mathematics_algebra04, Mathematics_algebra05, Mathematics_algebra06
    ],
    analysis: [
      Mathematics_analysis01, Mathematics_analysis02, Mathematics_analysis03,
      Mathematics_analysis04, Mathematics_analysis05, Mathematics_analysis06
    ],
    geometry: [
      Mathematics_geometry01, Mathematics_geometry02, Mathematics_geometry03,
      Mathematics_geometry04, Mathematics_geometry05, Mathematics_geometry06
    ],
    foundations: [
      Mathematics_foundations01, Mathematics_foundations02, Mathematics_foundations03,
      Mathematics_foundations04, Mathematics_foundations05, Mathematics_foundations06
    ]
  };
  const imageArrays = createImageArrays(sectionImageData);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // セクション名の配列
  const sectionKeys = Object.keys(sectionImageData);
  // 各セクションのアニメーション
  const sectionAnimations = sectionKeys.map((key, index) =>
    useSectionImageAnimations(
      currentSection === index + 1,
      sectionImageData[key as keyof typeof sectionImageData].length
    )
  );

  // --- 外部HTMLロード ---
  const sectionNames = [
    'representation',
    'complexAnalysis',
    'algebraicAnalysis',
    'numberTheory',
    'appliedMathematics',
    'algebraicGeometry',
    'differentialGeometry',
    'algebra',
    'analysis',
    'geometry',
    'foundations'
  ];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('mathematics', sectionNames);

  // ページトップに戻る関数
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  // レンダリング用の設定
  // セクションkey設定
  const sectionConfigs = [
    { key: 'representation', name: 'representation', className: 'block_text_right', textPosition: 'right' }, // 表現論
    { key: 'complexAnalysis', name: 'complexAnalysis', className: 'block_text_left', textPosition: 'left' }, // 複素解析
    { key: 'algebraicAnalysis', name: 'algebraicAnalysis', className: 'block_text_right', textPosition: 'right' }, // 代数解析
    { key: 'numberTheory', name: 'numberTheory', className: 'block_text_left', textPosition: 'left' }, // 整数論
    { key: 'appliedMathematics', name: 'appliedMathematics', className: 'block_text_right', textPosition: 'right' }, // 実用応用数学
    { key: 'algebraicGeometry', name: 'algebraicGeometry', className: 'block_text_left', textPosition: 'left' }, // 代数幾何
    { key: 'differentialGeometry', name: 'differentialGeometry', className: 'block_text_right', textPosition: 'right' }, // 微分幾何
    { key: 'algebra', name: 'algebra', className: 'block_text_left', textPosition: 'left' }, // 代数
    { key: 'analysis', name: 'analysis', className: 'block_text_right', textPosition: 'right' }, // 解析
    { key: 'geometry', name: 'geometry', className: 'block_text_left', textPosition: 'left' }, // 幾何
    { key: 'foundations', name: 'foundations', className: 'block_text_right', textPosition: 'right' } // 基礎論
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

      <section className='first_view mathematics' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='mathematics_h1'>数学</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Mathematics_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='representation'><a href="#representation" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 表現論 */}
            <li className='complex-analysis'><a href="#complex-analysis" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 複素解析 */}
            <li className='algebraic-analysis'><a href="#algebraic-analysis" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 代数解析 */}
            <li className='number-theory'><a href="#number-theory" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 整数論 */}
            <li className='applied-mathematics'><a href="#applied-mathematics" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 実用応用数学 */}
            <li className='algebraic-geometry'><a href="#algebraic-geometry" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 代数幾何 */}
            <li className='differential-geometry'><a href="#differential-geometry" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 微分幾何 */}
            <li className='algebra'><a href="#algebra" onClick={(e) => { e.preventDefault(); setCurrentSection(8); }}></a></li> {/* 代数 */}
            <li className='analysis'><a href="#analysis" onClick={(e) => { e.preventDefault(); setCurrentSection(9); }}></a></li>{/* 解析 */}
            <li className='geometry'><a href="#geometry" onClick={(e) => { e.preventDefault(); setCurrentSection(10); }}></a></li>{/* 幾何 */}
            <li className='foundations'><a href="#foundations" onClick={(e) => { e.preventDefault(); setCurrentSection(11); }}></a></li> {/* 基礎論 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <div className="h3-float-wrap">
              <h3 className="h3-float">普遍的な言語としての数学</h3>
              <p>数学は自然科学から社会科学、工学まで広範な分野で使用される普遍的な言語です。異なる文化や言語圏でも通用し、国際的なコミュニケーションツールの役割があります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">論理的思考の鍛練</h3>
              <p>数学は論理的思考を養うための優れた手段であり、問題解決能力や抽象的思考を発展させます。論理的な展開と厳密な証明が求められるため、思考力や論理的な洞察が向上します。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">科学との深い結びつき</h3>
              <p>数学は自然科学と深い関わりがあり、物理学や統計学、工学などで必須のツールです。物理法則やデータ解析など、科学的な研究において不可欠な役割を果たします。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">予測とモデリングの能力</h3>
              <p>数学は未来の事象や複雑な現象をモデル化し、予測するための有力な手段です。金融、気象学、経済学などでの予測モデルの構築において、数学は高い精度での予測を可能にします。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">抽象性と美</h3>
              <p>数学は抽象的な概念を扱い、その中に美を見出すことができます。数学的な構造やパターンには美学的な要素が含まれ、数学そのものが芸術のような側面を持っています。</p>
            </div>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <div className="h3-float-wrap">
              <h3 className="h3-float">難解な表現と理解のハードル</h3>
              <p>数学は抽象的で複雑な概念を多く含むため、初学者にとっては理解が難しいことがあります。専門用語や数学的な記号体系は敷居を高くし、学習のハードルとなることがあります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">計算の煩雑さ</h3>
              <p>数学には複雑な計算が伴うことがあり、手計算が非常に煩雑になる場合があります。特に高度な数学の分野では計算の複雑性が増すため、計算機やコンピュータの利用が不可欠となります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">抽象性による遠さ</h3>
              <p>数学の抽象性は美しい一方で、一般の人々には遠い存在ともなりえます。実用的な問題との結びつきが不透明で一般の人が数学を身近に感じることが難しいという側面があります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">学習の時間と忍耐が必要</h3>
              <p>数学の学習には時間と忍耐が必要であり、即座に成果を得ることが難しいことがあります。継続的な取り組みが求められ、一度離れると復帰が難しいこともあります。</p>
            </div>
            <div className="h3-float-wrap">
              <h3 className="h3-float">創造性とのバランス</h3>
              <p>数学は厳密性と論理性が重視される一方で、創造的な側面も求められます。しかしそのバランスが難しく、創造性を発揮するための余地が限られていると感じる人もいます。</p>
            </div>
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

export default Mathematics;
