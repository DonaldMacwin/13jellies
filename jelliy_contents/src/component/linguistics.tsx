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
import Linguistics_1stView from '../assets/img/Linguistics_1stView01.png';
import { TopButton } from './_common_component';

// 談話分析
import Linguistics_discourse01 from '../assets/img/Linguistics_discourse01.jpg';
import Linguistics_discourse02 from '../assets/img/Linguistics_discourse02.jpg';
import Linguistics_discourse03 from '../assets/img/Linguistics_discourse03.png';
import Linguistics_discourse04 from '../assets/img/Linguistics_discourse01.jpg';
import Linguistics_discourse05 from '../assets/img/Linguistics_discourse02.jpg';
import Linguistics_discourse06 from '../assets/img/Linguistics_discourse03.png';
// 言語獲得
import Linguistics_acquisition01 from '../assets/img/Linguistics_acquisition01.jpg';
import Linguistics_acquisition02 from '../assets/img/Linguistics_acquisition02.jpg';
import Linguistics_acquisition03 from '../assets/img/Linguistics_acquisition03.png';
import Linguistics_acquisition04 from '../assets/img/Linguistics_acquisition01.jpg';
import Linguistics_acquisition05 from '../assets/img/Linguistics_acquisition02.jpg';
import Linguistics_acquisition06 from '../assets/img/Linguistics_acquisition03.png';
// 文法研究
import Linguistics_grammar01 from '../assets/img/Linguistics_grammar01.jpg';
import Linguistics_grammar02 from '../assets/img/Linguistics_grammar02.jpg';
import Linguistics_grammar03 from '../assets/img/Linguistics_grammar03.png';
import Linguistics_grammar04 from '../assets/img/Linguistics_grammar01.jpg';
import Linguistics_grammar05 from '../assets/img/Linguistics_grammar02.jpg';
import Linguistics_grammar06 from '../assets/img/Linguistics_grammar03.png';
// コーパス言語分析
import Linguistics_corpus01 from '../assets/img/Linguistics_corpus01.jpg';
import Linguistics_corpus02 from '../assets/img/Linguistics_corpus02.jpg';
import Linguistics_corpus03 from '../assets/img/Linguistics_corpus03.png';
import Linguistics_corpus04 from '../assets/img/Linguistics_corpus01.jpg';
import Linguistics_corpus05 from '../assets/img/Linguistics_corpus02.jpg';
import Linguistics_corpus06 from '../assets/img/Linguistics_corpus03.png';
// 言語哲学
import Linguistics_philosophy01 from '../assets/img/Linguistics_philosophy01.jpg';
import Linguistics_philosophy02 from '../assets/img/Linguistics_philosophy02.jpg';
import Linguistics_philosophy03 from '../assets/img/Linguistics_philosophy03.png';
import Linguistics_philosophy04 from '../assets/img/Linguistics_philosophy01.jpg';
import Linguistics_philosophy05 from '../assets/img/Linguistics_philosophy02.jpg';
import Linguistics_philosophy06 from '../assets/img/Linguistics_philosophy03.png';
// 個別の言語研究
import Linguistics_individual01 from '../assets/img/Linguistics_individual01.jpg';
import Linguistics_individual02 from '../assets/img/Linguistics_individual02.jpg';
import Linguistics_individual03 from '../assets/img/Linguistics_individual03.png';
import Linguistics_individual04 from '../assets/img/Linguistics_individual01.jpg';
import Linguistics_individual05 from '../assets/img/Linguistics_individual02.jpg';
import Linguistics_individual06 from '../assets/img/Linguistics_individual03.png';
// 文字論
import Linguistics_writing01 from '../assets/img/Linguistics_writing01.jpg';
import Linguistics_writing02 from '../assets/img/Linguistics_writing02.jpg';
import Linguistics_writing03 from '../assets/img/Linguistics_writing03.png';
import Linguistics_writing04 from '../assets/img/Linguistics_writing01.jpg';
import Linguistics_writing05 from '../assets/img/Linguistics_writing02.jpg';
import Linguistics_writing06 from '../assets/img/Linguistics_writing03.png';
// 手話
import Linguistics_sign01 from '../assets/img/Linguistics_sign01.jpg';
import Linguistics_sign02 from '../assets/img/Linguistics_sign02.jpg';
import Linguistics_sign03 from '../assets/img/Linguistics_sign03.png';
import Linguistics_sign04 from '../assets/img/Linguistics_sign01.jpg';
import Linguistics_sign05 from '../assets/img/Linguistics_sign02.jpg';
import Linguistics_sign06 from '../assets/img/Linguistics_sign03.png';
// 身体言語論
import Linguistics_body01 from '../assets/img/Linguistics_body01.jpg';
import Linguistics_body02 from '../assets/img/Linguistics_body02.jpg';
import Linguistics_body03 from '../assets/img/Linguistics_body03.png';
import Linguistics_body04 from '../assets/img/Linguistics_body01.jpg';
import Linguistics_body05 from '../assets/img/Linguistics_body02.jpg';
import Linguistics_body06 from '../assets/img/Linguistics_body03.png';
// 語用論
import Linguistics_pragmatics01 from '../assets/img/Linguistics_pragmatics01.jpg';
import Linguistics_pragmatics02 from '../assets/img/Linguistics_pragmatics02.jpg';
import Linguistics_pragmatics03 from '../assets/img/Linguistics_pragmatics03.png';
import Linguistics_pragmatics04 from '../assets/img/Linguistics_pragmatics01.jpg';
import Linguistics_pragmatics05 from '../assets/img/Linguistics_pragmatics02.jpg';
import Linguistics_pragmatics06 from '../assets/img/Linguistics_pragmatics03.png';
// 統語論
import Linguistics_syntax01 from '../assets/img/Linguistics_syntax01.jpg';
import Linguistics_syntax02 from '../assets/img/Linguistics_syntax02.jpg';
import Linguistics_syntax03 from '../assets/img/Linguistics_syntax03.png';
import Linguistics_syntax04 from '../assets/img/Linguistics_syntax01.jpg';
import Linguistics_syntax05 from '../assets/img/Linguistics_syntax02.jpg';
import Linguistics_syntax06 from '../assets/img/Linguistics_syntax03.png';
// 音声論
import Linguistics_phonetics01 from '../assets/img/Linguistics_phonetics01.jpg';
import Linguistics_phonetics02 from '../assets/img/Linguistics_phonetics02.jpg';
import Linguistics_phonetics03 from '../assets/img/Linguistics_phonetics03.png';
import Linguistics_phonetics04 from '../assets/img/Linguistics_phonetics01.jpg';
import Linguistics_phonetics05 from '../assets/img/Linguistics_phonetics02.jpg';
import Linguistics_phonetics06 from '../assets/img/Linguistics_phonetics03.png';
// 音韻論
import Linguistics_phonology01 from '../assets/img/Linguistics_phonology01.jpg';
import Linguistics_phonology02 from '../assets/img/Linguistics_phonology02.jpg';
import Linguistics_phonology03 from '../assets/img/Linguistics_phonology03.png';
import Linguistics_phonology04 from '../assets/img/Linguistics_phonology01.jpg';
import Linguistics_phonology05 from '../assets/img/Linguistics_phonology02.jpg';
import Linguistics_phonology06 from '../assets/img/Linguistics_phonology03.png';
// 語彙意味論
import Linguistics_lexical01 from '../assets/img/Linguistics_lexical01.jpg';
import Linguistics_lexical02 from '../assets/img/Linguistics_lexical02.jpg';
import Linguistics_lexical03 from '../assets/img/Linguistics_lexical03.png';
import Linguistics_lexical04 from '../assets/img/Linguistics_lexical01.jpg';
import Linguistics_lexical05 from '../assets/img/Linguistics_lexical02.jpg';
import Linguistics_lexical06 from '../assets/img/Linguistics_lexical03.png';
// 形態論
import Linguistics_morphology01 from '../assets/img/Linguistics_morphology01.jpg';
import Linguistics_morphology02 from '../assets/img/Linguistics_morphology02.jpg';
import Linguistics_morphology03 from '../assets/img/Linguistics_morphology03.png';
import Linguistics_morphology04 from '../assets/img/Linguistics_morphology01.jpg';
import Linguistics_morphology05 from '../assets/img/Linguistics_morphology02.jpg';
import Linguistics_morphology06 from '../assets/img/Linguistics_morphology03.png';

import './_common_css.css';
import './linguistics.css';

function Linguistics() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const sectionRefs = Array.from({ length: 15 }, () => useRef<HTMLElement>(null));
  const sectionScrollRefs = Array.from({ length: 15 }, () => useRef<HTMLDivElement>(null));

  // セクションの定義
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

  // --- セクション名リスト（first_viewアンカー順） ---
  const sectionNames = [
    'discourse',    // 談話分析
    'acquisition',  // 言語獲得
    'grammar',      // 文法研究
    'corpus',       // コーパス言語分析
    'philosophy',   // 言語哲学
    'individual',   // 個別の言語研究
    'writing',      // 文字論
    'sign',         // 手話
    'body',         // 身体言語論
    'pragmatics',   // 語用論
    'syntax',       // 統語論
    'phonetics',    // 音声論
    'phonology',    // 音韻論
    'lexical',      // 語彙意味論
    'morphology'    // 形態論
  ];

  type SectionName = typeof sectionNames[number];

  const sectionImageData: Record<SectionName, string[]> = {
    discourse: [
      Linguistics_discourse01, Linguistics_discourse02, Linguistics_discourse03,
      Linguistics_discourse04, Linguistics_discourse05, Linguistics_discourse06
    ],
    acquisition: [
      Linguistics_acquisition01, Linguistics_acquisition02, Linguistics_acquisition03,
      Linguistics_acquisition04, Linguistics_acquisition05, Linguistics_acquisition06
    ],
    grammar: [
      Linguistics_grammar01, Linguistics_grammar02, Linguistics_grammar03,
      Linguistics_grammar04, Linguistics_grammar05, Linguistics_grammar06
    ],
    corpus: [
      Linguistics_corpus01, Linguistics_corpus02, Linguistics_corpus03,
      Linguistics_corpus04, Linguistics_corpus05, Linguistics_corpus06
    ],
    philosophy: [
      Linguistics_philosophy01, Linguistics_philosophy02, Linguistics_philosophy03,
      Linguistics_philosophy04, Linguistics_philosophy05, Linguistics_philosophy06
    ],
    individual: [
      Linguistics_individual01, Linguistics_individual02, Linguistics_individual03,
      Linguistics_individual04, Linguistics_individual05, Linguistics_individual06
    ],
    writing: [
      Linguistics_writing01, Linguistics_writing02, Linguistics_writing03,
      Linguistics_writing04, Linguistics_writing05, Linguistics_writing06
    ],
    sign: [
      Linguistics_sign01, Linguistics_sign02, Linguistics_sign03,
      Linguistics_sign04, Linguistics_sign05, Linguistics_sign06
    ],
    body: [
      Linguistics_body01, Linguistics_body02, Linguistics_body03,
      Linguistics_body04, Linguistics_body05, Linguistics_body06
    ],
    pragmatics: [
      Linguistics_pragmatics01, Linguistics_pragmatics02, Linguistics_pragmatics03,
      Linguistics_pragmatics04, Linguistics_pragmatics05, Linguistics_pragmatics06
    ],
    syntax: [
      Linguistics_syntax01, Linguistics_syntax02, Linguistics_syntax03,
      Linguistics_syntax04, Linguistics_syntax05, Linguistics_syntax06
    ],
    phonetics: [
      Linguistics_phonetics01, Linguistics_phonetics02, Linguistics_phonetics03,
      Linguistics_phonetics04, Linguistics_phonetics05, Linguistics_phonetics06
    ],
    phonology: [
      Linguistics_phonology01, Linguistics_phonology02, Linguistics_phonology03,
      Linguistics_phonology04, Linguistics_phonology05, Linguistics_phonology06
    ],
    lexical: [
      Linguistics_lexical01, Linguistics_lexical02, Linguistics_lexical03,
      Linguistics_lexical04, Linguistics_lexical05, Linguistics_lexical06
    ],
    morphology: [
      Linguistics_morphology01, Linguistics_morphology02, Linguistics_morphology03,
      Linguistics_morphology04, Linguistics_morphology05, Linguistics_morphology06
    ]
  };
  const imageArrays = createImageArrays(sectionImageData);

  // 各セクションのアニメーション
  const sectionAnimations = sectionNames.map((key, index) =>
    useSectionImageAnimations(
      currentSection === index + 1,
      sectionImageData[key].length
    )
  );

  // --- 外部HTMLロードを共通フックで ---
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('linguistics', sectionNames);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // ページトップに戻る関数
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  // レンダリング用の設定
  // セクションkey設定
  const sectionConfigs = [
    { key: 'discourse',    name: 'discourse',    className: 'block_text_right', textPosition: 'right' },   // 談話分析
    { key: 'acquisition',  name: 'acquisition',  className: 'block_text_left',  textPosition: 'left'  },   // 言語獲得
    { key: 'grammar',      name: 'grammar',      className: 'block_text_right', textPosition: 'right' },   // 文法研究
    { key: 'corpus',       name: 'corpus',       className: 'block_text_left',  textPosition: 'left'  },   // コーパス言語分析
    { key: 'philosophy',   name: 'philosophy',   className: 'block_text_right', textPosition: 'right' },   // 言語哲学
    { key: 'individual',   name: 'individual',   className: 'block_text_left',  textPosition: 'left'  },   // 個別の言語研究
    { key: 'writing',      name: 'writing',      className: 'block_text_right', textPosition: 'right' },   // 文字論
    { key: 'sign',         name: 'sign',         className: 'block_text_left',  textPosition: 'left'  },   // 手話
    { key: 'body',         name: 'body',         className: 'block_text_right', textPosition: 'right' },   // 身体言語論
    { key: 'pragmatics',   name: 'pragmatics',   className: 'block_text_left',  textPosition: 'left'  },   // 語用論
    { key: 'syntax',       name: 'syntax',       className: 'block_text_right', textPosition: 'right' },   // 統語論
    { key: 'phonetics',    name: 'phonetics',    className: 'block_text_left',  textPosition: 'left'  },   // 音声論
    { key: 'phonology',    name: 'phonology',    className: 'block_text_right', textPosition: 'right' },   // 音韻論
    { key: 'lexical',      name: 'lexical',      className: 'block_text_left',  textPosition: 'left'  },   // 語彙意味論
    { key: 'morphology',   name: 'morphology',   className: 'block_text_right', textPosition: 'right' }    // 形態論
  ];
  // テキストブロックレンダリング用関数
  const renderTextBlock = (sectionName: string, sectionIndex: number) => (
    <div
      className='text_scroll_block scroller_decoration'
      ref={sections[sectionIndex + 1].scrollRef}
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
      ref={sections[index + 1].ref}
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

      <section className='first_view linguistics' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='linguistics_h1'>言語</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Linguistics_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='discourse'><a href="#discourse" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 談話分析 */}
            <li className='acquisition'><a href="#acquisition" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 言語獲得 */}
            <li className='grammar'><a href="#grammar" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 文法研究 */}
            <li className='corpus'><a href="#corpus" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* コーパス言語分析 */}
            <li className='philosophy'><a href="#philosophy" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 言語哲学 */}
            <li className='individual'><a href="#individual" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 個別の言語研究 */}
            <li className='writing'><a href="#writing" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 文字論 */}
            <li className='sign'><a href="#sign" onClick={(e) => { e.preventDefault(); setCurrentSection(8); }}></a></li>{/* 手話 */}
            <li className='body'><a href="#body" onClick={(e) => { e.preventDefault(); setCurrentSection(9); }}></a></li>{/* 身体言語論 */}
            <li className='pragmatics'><a href="#pragmatics" onClick={(e) => { e.preventDefault(); setCurrentSection(10); }}></a></li>{/* 語用論 */}
            <li className='syntax'><a href="#syntax" onClick={(e) => { e.preventDefault(); setCurrentSection(11); }}></a></li> {/* 統語論 */}
            <li className='phonetics'><a href="#phonetics" onClick={(e) => { e.preventDefault(); setCurrentSection(12); }}></a></li>{/* 音声論 */}
            <li className='phonology'><a href="#phonology" onClick={(e) => { e.preventDefault(); setCurrentSection(13); }}></a></li> {/* 音韻論 */}
            <li className='lexical'><a href="#lexical" onClick={(e) => { e.preventDefault(); setCurrentSection(14); }}></a></li>{/* 語彙意味論 */}
            <li className='morphology'><a href="#morphology" onClick={(e) => { e.preventDefault(); setCurrentSection(15); }}></a></li>{/* 形態論 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <h3>多様性と複雑性</h3><p>言語学は、世界中の異なる言語を研究する学問であり、その多様性が魅力の一因です。異なる文化や歴史的背景を反映した言語の複雑な構造や変遷を追求することが可能です。</p>
            <h3>相互関係の理解</h3><p>言語学は、言語と文化、社会構造との深い関わりを理解しようとする。言語の使用は人々の意識や行動に影響を与え、これを研究することで社会的な相互作用を把握できます。</p>
            <h3>応用分野への寄与</h3><p>言語学の知見は様々な分野に応用されており、翻訳、言語教育、人工知能の自然言語処理などにおいて重要な役割を果たしています。</p>
            <h3>進化する理論と手法</h3><p>言語学は進化し続けており、新たな理論や分析手法が次第に導入されています。これにより、言語の本質や変化に対する理解が深まっています。</p>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <h3>主観性と個別性</h3><p>言語は主観的であり、また個々の言語は独自のルールや特性を持っているため、一般的な法則を見出すことが難しいことがあります。</p>
            <h3>実証性の難しさ</h3><p>言語学は実験的なデータを取得することが難しく、観察や文献研究が主な手法となります。これが、一般的な科学的実証性への課題となっています。</p>
            <h3>言語変化の速さ</h3><p>言語は絶えず変化しており、その変化の速さが研究者にとって追いつきにくい一因となっています。古典的な研究が現代の言語に十分に適用できない場合があります。</p>
            <h3>異なるアプローチの複雑性</h3><p>現状の言語学には物理・化学・数学のように国際的に明確に取り決めた統一基軸が未だ策定されていません。このため様々なアプローチがあり、それぞれが異なる枠組みや用語を使用しています。これが学際的な協力を難しくし、コミュニケーションの障害となることがあります。</p>
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

export default Linguistics;
