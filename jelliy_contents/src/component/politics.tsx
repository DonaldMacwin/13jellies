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
import Politics_1stView from '../assets/img/Politics_1stView01.png';
import { TopButton } from './_common_component';

// 経済研究
import Politics_economics01 from '../assets/img/Politics_economics01.jpg';
import Politics_economics02 from '../assets/img/Politics_economics02.jpg';
import Politics_economics03 from '../assets/img/Politics_economics03.png';
import Politics_economics04 from '../assets/img/Politics_economics01.jpg';
import Politics_economics05 from '../assets/img/Politics_economics02.jpg';
import Politics_economics06 from '../assets/img/Politics_economics03.png';

// 政治指導研究
import Politics_political_leadership01 from '../assets/img/Politics_political_leadership01.jpg';
import Politics_political_leadership02 from '../assets/img/Politics_political_leadership02.jpg';
import Politics_political_leadership03 from '../assets/img/Politics_political_leadership03.png';
import Politics_political_leadership04 from '../assets/img/Politics_political_leadership01.jpg';
import Politics_political_leadership05 from '../assets/img/Politics_political_leadership02.jpg';
import Politics_political_leadership06 from '../assets/img/Politics_political_leadership03.png';

// 意思決定プロセス研究
import Politics_decision_process01 from '../assets/img/Politics_decision_process01.jpg';
import Politics_decision_process02 from '../assets/img/Politics_decision_process02.jpg';
import Politics_decision_process03 from '../assets/img/Politics_decision_process03.png';
import Politics_decision_process04 from '../assets/img/Politics_decision_process01.jpg';
import Politics_decision_process05 from '../assets/img/Politics_decision_process02.jpg';
import Politics_decision_process06 from '../assets/img/Politics_decision_process03.png';

// 政治集団研究
import Politics_political_groups01 from '../assets/img/Politics_political_groups01.jpg';
import Politics_political_groups02 from '../assets/img/Politics_political_groups02.jpg';
import Politics_political_groups03 from '../assets/img/Politics_political_groups03.png';
import Politics_political_groups04 from '../assets/img/Politics_political_groups01.jpg';
import Politics_political_groups05 from '../assets/img/Politics_political_groups02.jpg';
import Politics_political_groups06 from '../assets/img/Politics_political_groups03.png';

// 制度研究
import Politics_institutional01 from '../assets/img/Politics_institutional01.jpg';
import Politics_institutional02 from '../assets/img/Politics_institutional02.jpg';
import Politics_institutional03 from '../assets/img/Politics_institutional03.png';
import Politics_institutional04 from '../assets/img/Politics_institutional01.jpg';
import Politics_institutional05 from '../assets/img/Politics_institutional02.jpg';
import Politics_institutional06 from '../assets/img/Politics_institutional03.png';

// 政治学体系研究
import Politics_political_system01 from '../assets/img/Politics_political_system01.jpg';
import Politics_political_system02 from '../assets/img/Politics_political_system02.jpg';
import Politics_political_system03 from '../assets/img/Politics_political_system03.png';
import Politics_political_system04 from '../assets/img/Politics_political_system01.jpg';
import Politics_political_system05 from '../assets/img/Politics_political_system02.jpg';
import Politics_political_system06 from '../assets/img/Politics_political_system03.png';

// 思想研究
import Politics_ideology01 from '../assets/img/Politics_ideology01.jpg';
import Politics_ideology02 from '../assets/img/Politics_ideology02.jpg';
import Politics_ideology03 from '../assets/img/Politics_ideology03.png';
import Politics_ideology04 from '../assets/img/Politics_ideology01.jpg';
import Politics_ideology05 from '../assets/img/Politics_ideology02.jpg';
import Politics_ideology06 from '../assets/img/Politics_ideology03.png';

// 国家間研究
import Politics_international01 from '../assets/img/Politics_international01.jpg';
import Politics_international02 from '../assets/img/Politics_international02.jpg';
import Politics_international03 from '../assets/img/Politics_international03.png';
import Politics_international04 from '../assets/img/Politics_international01.jpg';
import Politics_international05 from '../assets/img/Politics_international02.jpg';
import Politics_international06 from '../assets/img/Politics_international03.png';

// 施策内容研究
import Politics_policy_content01 from '../assets/img/Politics_policy_content01.jpg';
import Politics_policy_content02 from '../assets/img/Politics_policy_content02.jpg';
import Politics_policy_content03 from '../assets/img/Politics_policy_content03.png';
import Politics_policy_content04 from '../assets/img/Politics_policy_content01.jpg';
import Politics_policy_content05 from '../assets/img/Politics_policy_content02.jpg';
import Politics_policy_content06 from '../assets/img/Politics_policy_content03.png';

// 政治の実行と伝達の研究
import Politics_political_implementation01 from '../assets/img/Politics_political_implementation01.jpg';
import Politics_political_implementation02 from '../assets/img/Politics_political_implementation02.jpg';
import Politics_political_implementation03 from '../assets/img/Politics_political_implementation03.png';
import Politics_political_implementation04 from '../assets/img/Politics_political_implementation01.jpg';
import Politics_political_implementation05 from '../assets/img/Politics_political_implementation02.jpg';
import Politics_political_implementation06 from '../assets/img/Politics_political_implementation03.png';

// 大衆研究
import Politics_public_studies01 from '../assets/img/Politics_public_studies01.jpg';
import Politics_public_studies02 from '../assets/img/Politics_public_studies02.jpg';
import Politics_public_studies03 from '../assets/img/Politics_public_studies03.png';
import Politics_public_studies04 from '../assets/img/Politics_public_studies01.jpg';
import Politics_public_studies05 from '../assets/img/Politics_public_studies02.jpg';
import Politics_public_studies06 from '../assets/img/Politics_public_studies03.png';

import './_common_css.css';
import './politics.css';

function Politics() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const economicsRef = useRef<HTMLElement>(null);
  const economicsScrollRef = useRef<HTMLDivElement>(null);
  const politicalLeadershipRef = useRef<HTMLElement>(null);
  const politicalLeadershipScrollRef = useRef<HTMLDivElement>(null);
  const decisionProcessRef = useRef<HTMLElement>(null);
  const decisionProcessScrollRef = useRef<HTMLDivElement>(null);
  const politicalGroupsRef = useRef<HTMLElement>(null);
  const politicalGroupsScrollRef = useRef<HTMLDivElement>(null);
  const institutionalRef = useRef<HTMLElement>(null);
  const institutionalScrollRef = useRef<HTMLDivElement>(null);
  const politicalSystemRef = useRef<HTMLElement>(null);
  const politicalSystemScrollRef = useRef<HTMLDivElement>(null);
  const ideologyRef = useRef<HTMLElement>(null);
  const ideologyScrollRef = useRef<HTMLDivElement>(null);
  const internationalRef = useRef<HTMLElement>(null);
  const internationalScrollRef = useRef<HTMLDivElement>(null);
  const policyContentRef = useRef<HTMLElement>(null);
  const policyContentScrollRef = useRef<HTMLDivElement>(null);
  const politicalImplementationRef = useRef<HTMLElement>(null);
  const politicalImplementationScrollRef = useRef<HTMLDivElement>(null);
  const publicStudiesRef = useRef<HTMLElement>(null);
  const publicStudiesScrollRef = useRef<HTMLDivElement>(null);

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    { ref: economicsRef, scrollRef: economicsScrollRef },
    { ref: politicalLeadershipRef, scrollRef: politicalLeadershipScrollRef },
    { ref: decisionProcessRef, scrollRef: decisionProcessScrollRef },
    { ref: politicalGroupsRef, scrollRef: politicalGroupsScrollRef },
    { ref: institutionalRef, scrollRef: institutionalScrollRef },
    { ref: politicalSystemRef, scrollRef: politicalSystemScrollRef },
    { ref: ideologyRef, scrollRef: ideologyScrollRef },
    { ref: internationalRef, scrollRef: internationalScrollRef },
    { ref: policyContentRef, scrollRef: policyContentScrollRef },
    { ref: politicalImplementationRef, scrollRef: politicalImplementationScrollRef },
    { ref: publicStudiesRef, scrollRef: publicStudiesScrollRef },
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
    economics: [
      Politics_economics01, Politics_economics02, Politics_economics03,
      Politics_economics04, Politics_economics05, Politics_economics06
    ],
    politicalLeadership: [
      Politics_political_leadership01, Politics_political_leadership02, Politics_political_leadership03,
      Politics_political_leadership04, Politics_political_leadership05, Politics_political_leadership06
    ],
    decisionProcess: [
      Politics_decision_process01, Politics_decision_process02, Politics_decision_process03,
      Politics_decision_process04, Politics_decision_process05, Politics_decision_process06
    ],
    politicalGroups: [
      Politics_political_groups01, Politics_political_groups02, Politics_political_groups03,
      Politics_political_groups04, Politics_political_groups05, Politics_political_groups06
    ],
    institutional: [
      Politics_institutional01, Politics_institutional02, Politics_institutional03,
      Politics_institutional04, Politics_institutional05, Politics_institutional06
    ],
    politicalSystem: [
      Politics_political_system01, Politics_political_system02, Politics_political_system03,
      Politics_political_system04, Politics_political_system05, Politics_political_system06
    ],
    ideology: [
      Politics_ideology01, Politics_ideology02, Politics_ideology03,
      Politics_ideology04, Politics_ideology05, Politics_ideology06
    ],
    international: [
      Politics_international01, Politics_international02, Politics_international03,
      Politics_international04, Politics_international05, Politics_international06
    ],
    policyContent: [
      Politics_policy_content01, Politics_policy_content02, Politics_policy_content03,
      Politics_policy_content04, Politics_policy_content05, Politics_policy_content06
    ],
    politicalImplementation: [
      Politics_political_implementation01, Politics_political_implementation02, Politics_political_implementation03,
      Politics_political_implementation04, Politics_political_implementation05, Politics_political_implementation06
    ],
    publicStudies: [
      Politics_public_studies01, Politics_public_studies02, Politics_public_studies03,
      Politics_public_studies04, Politics_public_studies05, Politics_public_studies06
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
    'economics', 'political_leadership', 'decision_process', 'political_groups',
    'institutional', 'political_system', 'ideology', 'international',
    'policy_content', 'political_implementation', 'public_studies'
  ];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('politics', sectionNames);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // ページトップに戻る関数
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  // レンダリング用の設定
  // セクションkey設定
  const sectionConfigs = [
    { key: 'economics', name: 'economics', className: 'block_text_right', textPosition: 'right' },
    { key: 'politicalLeadership', name: 'political_leadership', className: 'block_text_left', textPosition: 'left' },
    { key: 'decisionProcess', name: 'decision_process', className: 'block_text_right', textPosition: 'right' },
    { key: 'politicalGroups', name: 'political_groups', className: 'block_text_left', textPosition: 'left' },
    { key: 'institutional', name: 'institutional', className: 'block_text_right', textPosition: 'right' },
    { key: 'politicalSystem', name: 'political_system', className: 'block_text_left', textPosition: 'left' },
    { key: 'ideology', name: 'ideology', className: 'block_text_right', textPosition: 'right' },
    { key: 'international', name: 'international', className: 'block_text_left', textPosition: 'left' },
    { key: 'policyContent', name: 'policy_content', className: 'block_text_right', textPosition: 'right' },
    { key: 'politicalImplementation', name: 'political_implementation', className: 'block_text_left', textPosition: 'left' },
    { key: 'publicStudies', name: 'public_studies', className: 'block_text_right', textPosition: 'right' }
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

      <section className='first_view politics' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='politics_h1'>政治経済</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Politics_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='economics'><a href="#economics" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 経済研究 */}
            <li className='political_leadership'><a href="#political_leadership" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 政治指導研究 */}
            <li className='decision_process'><a href="#decision_process" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 意思決定プロセス研究 */}
            <li className='political_groups'><a href="#political_groups" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 政治集団研究 */}
            <li className='institutional'><a href="#institutional" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 制度研究 */}
            <li className='political_system'><a href="#political_system" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 政治学体系研究 */}
            <li className='ideology'><a href="#ideology" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 思想研究 */}
            <li className='international'><a href="#international" onClick={(e) => { e.preventDefault(); setCurrentSection(8); }}></a></li>{/* 国家間研究 */}
            <li className='policy_content'><a href="#policy_content" onClick={(e) => { e.preventDefault(); setCurrentSection(9); }}></a></li>{/* 施策内容研究 */}
            <li className='political_implementation'><a href="#political_implementation" onClick={(e) => { e.preventDefault(); setCurrentSection(10); }}></a></li>{/* 政治の実行と伝達の研究 */}
            <li className='public_studies'><a href="#public_studies" onClick={(e) => { e.preventDefault(); setCurrentSection(11); }}></a></li>{/* 大衆研究 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <h3>人間社会の理解と変革</h3><p>政治経済は権力構造や意思決定プロセスを分析し、人間社会の理解を深める役割があります。またその分析を通じて社会の改革や変革に寄与することが期待されます。</p>
            <h3>政府機関や政治プロセスの把握</h3><p>政治学は政府機関や政治プロセスの研究を通じて、政策形成や意思決定の仕組みを理解し、政治体制の機能や不備を洞察します。</p>
            <h3>他共同体との関係理解</h3><p>政治経済は異なる国家や地域間の関係、紛争、協力に関する理解を深めます。これは国際社会において平和や安定を促進するために重要です。</p>
            <h3>人文知としての総合性</h3><p>政治経済は芸術・教育・地理・歴史・産業技術・医学など他学問と密接に関連しており、総合的アプローチを提供します。これにより、社会全体の複雑な関係をより包括的に理解できます。</p>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <h3>主観的な解釈の余地</h3><p>政治学はしばしば主観的な解釈や意見に基づいており、異なる学者やアプローチからの異なる解釈が存在することがあります。これが理論や分析の一貫性を欠く原因となります。</p>
            <h3>予測の難しさ</h3><p>政治学は未来の出来事や政治的な動向を予測することが難しく、予測が外れることがよくあります。これは権力の動きや社会の変化が複雑で予測が難しいためです。</p>
            <h3>思想バイアスがかかりがち</h3><p>政治学の研究や理論構築において、研究者学習者の思想バイアスが影響を与えることがあります。これが客観性を損なっています。</p>
            <h3>複雑な現実とのギャップ</h3><p>政治経済モデルは、現実の複雑さや変動に対応しきれないことがあります。そのため、理論と実際の現象とのギャップが生じることがあります。</p>
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

export default Politics;
