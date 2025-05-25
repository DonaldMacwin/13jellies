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
import Medicine_1stView from '../assets/img/Medicine_1stView01.png';

// 医法
import Medicine_medicalLaw01 from '../assets/img/Medicine_medicalLaw01.jpg';
import Medicine_medicalLaw02 from '../assets/img/Medicine_medicalLaw02.jpg';
import Medicine_medicalLaw03 from '../assets/img/Medicine_medicalLaw03.png';
import Medicine_medicalLaw04 from '../assets/img/Medicine_medicalLaw01.jpg';
import Medicine_medicalLaw05 from '../assets/img/Medicine_medicalLaw02.jpg';
import Medicine_medicalLaw06 from '../assets/img/Medicine_medicalLaw03.png';

// 公衆衛生学
import Medicine_publicHealth01 from '../assets/img/Medicine_publicHealth01.jpg';
import Medicine_publicHealth02 from '../assets/img/Medicine_publicHealth02.jpg';
import Medicine_publicHealth03 from '../assets/img/Medicine_publicHealth03.png';
import Medicine_publicHealth04 from '../assets/img/Medicine_publicHealth01.jpg';
import Medicine_publicHealth05 from '../assets/img/Medicine_publicHealth02.jpg';
import Medicine_publicHealth06 from '../assets/img/Medicine_publicHealth03.png';

// 解剖学
import Medicine_anatomy01 from '../assets/img/Medicine_anatomy01.jpg';
import Medicine_anatomy02 from '../assets/img/Medicine_anatomy02.jpg';
import Medicine_anatomy03 from '../assets/img/Medicine_anatomy03.png';
import Medicine_anatomy04 from '../assets/img/Medicine_anatomy01.jpg';
import Medicine_anatomy05 from '../assets/img/Medicine_anatomy02.jpg';
import Medicine_anatomy06 from '../assets/img/Medicine_anatomy03.png';

// 臨床
import Medicine_clinical01 from '../assets/img/Medicine_clinical01.jpg';
import Medicine_clinical02 from '../assets/img/Medicine_clinical02.jpg';
import Medicine_clinical03 from '../assets/img/Medicine_clinical03.png';
import Medicine_clinical04 from '../assets/img/Medicine_clinical01.jpg';
import Medicine_clinical05 from '../assets/img/Medicine_clinical02.jpg';
import Medicine_clinical06 from '../assets/img/Medicine_clinical03.png';

// 病理学
import Medicine_pathology01 from '../assets/img/Medicine_pathology01.jpg';
import Medicine_pathology02 from '../assets/img/Medicine_pathology02.jpg';
import Medicine_pathology03 from '../assets/img/Medicine_pathology03.png';
import Medicine_pathology04 from '../assets/img/Medicine_pathology01.jpg';
import Medicine_pathology05 from '../assets/img/Medicine_pathology02.jpg';
import Medicine_pathology06 from '../assets/img/Medicine_pathology03.png';

// 生理学
import Medicine_physiology01 from '../assets/img/Medicine_physiology01.jpg';
import Medicine_physiology02 from '../assets/img/Medicine_physiology02.jpg';
import Medicine_physiology03 from '../assets/img/Medicine_physiology03.png';
import Medicine_physiology04 from '../assets/img/Medicine_physiology01.jpg';
import Medicine_physiology05 from '../assets/img/Medicine_physiology02.jpg';
import Medicine_physiology06 from '../assets/img/Medicine_physiology03.png';

// 薬理学
import Medicine_pharmacology01 from '../assets/img/Medicine_pharmacology01.jpg';
import Medicine_pharmacology02 from '../assets/img/Medicine_pharmacology02.jpg';
import Medicine_pharmacology03 from '../assets/img/Medicine_pharmacology03.png';
import Medicine_pharmacology04 from '../assets/img/Medicine_pharmacology01.jpg';
import Medicine_pharmacology05 from '../assets/img/Medicine_pharmacology02.jpg';
import Medicine_pharmacology06 from '../assets/img/Medicine_pharmacology03.png';

// 微生物学
import Medicine_microbiology01 from '../assets/img/Medicine_microbiology01.jpg';
import Medicine_microbiology02 from '../assets/img/Medicine_microbiology02.jpg';
import Medicine_microbiology03 from '../assets/img/Medicine_microbiology03.png';
import Medicine_microbiology04 from '../assets/img/Medicine_microbiology01.jpg';
import Medicine_microbiology05 from '../assets/img/Medicine_microbiology02.jpg';
import Medicine_microbiology06 from '../assets/img/Medicine_microbiology03.png';

// 生化学
import Medicine_biochemistry01 from '../assets/img/Medicine_biochemistry01.jpg';
import Medicine_biochemistry02 from '../assets/img/Medicine_biochemistry02.jpg';
import Medicine_biochemistry03 from '../assets/img/Medicine_biochemistry03.png';
import Medicine_biochemistry04 from '../assets/img/Medicine_biochemistry01.jpg';
import Medicine_biochemistry05 from '../assets/img/Medicine_biochemistry02.jpg';
import Medicine_biochemistry06 from '../assets/img/Medicine_biochemistry03.png';

import './_common_css.css';
import './medicine.css';

// --- 画像配列を共通化 ---
const sectionImageData = {
  medicalLaw: [
    Medicine_medicalLaw01, Medicine_medicalLaw02, Medicine_medicalLaw03,
    Medicine_medicalLaw04, Medicine_medicalLaw05, Medicine_medicalLaw06
  ],
  publicHealth: [
    Medicine_publicHealth01, Medicine_publicHealth02, Medicine_publicHealth03,
    Medicine_publicHealth04, Medicine_publicHealth05, Medicine_publicHealth06
  ],
  anatomy: [
    Medicine_anatomy01, Medicine_anatomy02, Medicine_anatomy03,
    Medicine_anatomy04, Medicine_anatomy05, Medicine_anatomy06
  ],
  clinical: [
    Medicine_clinical01, Medicine_clinical02, Medicine_clinical03,
    Medicine_clinical04, Medicine_clinical05, Medicine_clinical06
  ],
  pathology: [
    Medicine_pathology01, Medicine_pathology02, Medicine_pathology03,
    Medicine_pathology04, Medicine_pathology05, Medicine_pathology06
  ],
  physiology: [
    Medicine_physiology01, Medicine_physiology02, Medicine_physiology03,
    Medicine_physiology04, Medicine_physiology05, Medicine_physiology06
  ],
  pharmacology: [
    Medicine_pharmacology01, Medicine_pharmacology02, Medicine_pharmacology03,
    Medicine_pharmacology04, Medicine_pharmacology05, Medicine_pharmacology06
  ],
  microbiology: [
    Medicine_microbiology01, Medicine_microbiology02, Medicine_microbiology03,
    Medicine_microbiology04, Medicine_microbiology05, Medicine_microbiology06
  ],
  biochemistry: [
    Medicine_biochemistry01, Medicine_biochemistry02, Medicine_biochemistry03,
    Medicine_biochemistry04, Medicine_biochemistry05, Medicine_biochemistry06
  ]
};
const imageArrays = createImageArrays(sectionImageData);

function Medicine() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const medicalLawRef = useRef<HTMLElement>(null);
  const medicalLawScrollRef = useRef<HTMLDivElement>(null);
  const publicHealthRef = useRef<HTMLElement>(null);
  const publicHealthScrollRef = useRef<HTMLDivElement>(null);
  const anatomyRef = useRef<HTMLElement>(null);
  const anatomyScrollRef = useRef<HTMLDivElement>(null);
  const clinicalRef = useRef<HTMLElement>(null);
  const clinicalScrollRef = useRef<HTMLDivElement>(null);
  const pathologyRef = useRef<HTMLElement>(null);
  const pathologyScrollRef = useRef<HTMLDivElement>(null);
  const physiologyRef = useRef<HTMLElement>(null);
  const physiologyScrollRef = useRef<HTMLDivElement>(null);
  const pharmacologyRef = useRef<HTMLElement>(null);
  const pharmacologyScrollRef = useRef<HTMLDivElement>(null);
  const microbiologyRef = useRef<HTMLElement>(null);
  const microbiologyScrollRef = useRef<HTMLDivElement>(null);
  const biochemistryRef = useRef<HTMLElement>(null);
  const biochemistryScrollRef = useRef<HTMLDivElement>(null);

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    { ref: medicalLawRef, scrollRef: medicalLawScrollRef },
    { ref: publicHealthRef, scrollRef: publicHealthScrollRef },
    { ref: anatomyRef, scrollRef: anatomyScrollRef },
    { ref: clinicalRef, scrollRef: clinicalScrollRef },
    { ref: pathologyRef, scrollRef: pathologyScrollRef },
    { ref: physiologyRef, scrollRef: physiologyScrollRef },
    { ref: pharmacologyRef, scrollRef: pharmacologyScrollRef },
    { ref: microbiologyRef, scrollRef: microbiologyScrollRef },
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

  // --- 各セクションのアニメーション ---
  const sectionKeys = Object.keys(sectionImageData);
  const sectionAnimations = sectionKeys.map((key, index) =>
    useSectionImageAnimations(
      currentSection === index + 1,
      sectionImageData[key as keyof typeof sectionImageData].length
    )
  );

  // --- 段階的プリロード ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // --- 各セクションの外部HTMLロードを共通フックで ---
  const sectionNames = [
    'medical_law', 'public_health', 'anatomy', 'clinical',
    'pathology', 'physiology', 'pharmacology', 'microbiology', 'biochemistry'
  ];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('medicine', sectionNames);

  // --- セクションレンダリング ---
  const sectionConfigs = [
    { key: 'medicalLaw', name: 'medical_law', className: 'block_text_right', textPosition: 'right' },
    { key: 'publicHealth', name: 'public_health', className: 'block_text_left', textPosition: 'left' },
    { key: 'anatomy', name: 'anatomy', className: 'block_text_right', textPosition: 'right' },
    { key: 'clinical', name: 'clinical', className: 'block_text_left', textPosition: 'left' },
    { key: 'pathology', name: 'pathology', className: 'block_text_right', textPosition: 'right' },
    { key: 'physiology', name: 'physiology', className: 'block_text_left', textPosition: 'left' },
    { key: 'pharmacology', name: 'pharmacology', className: 'block_text_right', textPosition: 'right' },
    { key: 'microbiology', name: 'microbiology', className: 'block_text_left', textPosition: 'left' },
    { key: 'biochemistry', name: 'biochemistry', className: 'block_text_right', textPosition: 'right' }
  ];

  // --- テキストブロックレンダリング用関数 ---
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

  // --- セクションレンダリング用関数 ---
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

  // ページトップに戻る関数
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  return (
    <div className="component_container">
      <SharedImageFilters />

      <section className='first_view' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='medicine_h1'>医学</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Medicine_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='medical_law'><a href="#medical_law" onClick={e => { e.preventDefault(); setCurrentSection(1); }}></a></li>{ /* 医法 */ }
            <li className='public_health'><a href="#public_health" onClick={e => { e.preventDefault(); setCurrentSection(2); }}></a></li>{ /* 公衆衛生学 */ }
            <li className='anatomy'><a href="#anatomy" onClick={e => { e.preventDefault(); setCurrentSection(3); }}></a></li>{ /* 解剖学 */ }
            <li className='clinical'><a href="#clinical" onClick={e => { e.preventDefault(); setCurrentSection(4); }}></a></li>{ /* 臨床 */ }
            <li className='pathology'><a href="#pathology" onClick={e => { e.preventDefault(); setCurrentSection(5); }}></a></li>{ /* 病理学 */ }
            <li className='physiology'><a href="#physiology" onClick={e => { e.preventDefault(); setCurrentSection(6); }}></a></li>{ /* 生理学 */ }
            <li className='pharmacology'><a href="#pharmacology" onClick={e => { e.preventDefault(); setCurrentSection(7); }}></a></li>{ /* 薬理学 */ }
            <li className='microbiology'><a href="#microbiology" onClick={e => { e.preventDefault(); setCurrentSection(8); }}></a></li>{ /* 微生物学 */ }
            <li className='biochemistry'><a href="#biochemistry" onClick={e => { e.preventDefault(); setCurrentSection(9); }}></a></li>{ /* 生化学 */ }
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <h3>人間の健康向上への貢献</h3><p>医学は人々の健康向上に寄与し、疾病の予防や治療法の開発を通じて、寿命の延伸を促進しています。</p>
            <h3>多岐にわたる専門分野</h3><p>医学はさまざまな専門分野から成り立っており、内科、外科、小児科、精神医学など、幅広い分野で専門家が活躍しています。</p>
            <h3>技術と科学の進歩</h3><p>医学は急速な技術と科学の進歩を牽引しており、画像診断、遺伝子治療、ロボティクスなどの新しい治療法や診断法が生まれています。</p>
            <h3>人道的な側面</h3><p>医学は人間の生命を尊重し、患者に対して優れたケアを提供することが求められています。医療従事者は患者の健康と福祉を最優先に考え、患者中心のアプローチを採用しています。</p>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <h3>経済的負担</h3><p>医学の進歩は高度な技術や複雑な治療法を必要とし、これには高いコストが伴います。これが医療費の上昇や医療格差の拡大といった問題を引き起こすことがあります。</p>
            <h3>倫理的ジレンマ</h3><p>医学の発展には倫理的な問題も伴います。例えば、遺伝子編集や人工生殖技術などの進歩には、倫理的なジレンマが絡むことがあります。</p>
            <h3>専門化と情報過多</h3><p>医学の分野はますます専門化が進んでおり、患者や一般の人々にとって理解が難しいほどの複雑な情報が存在します。これが医療情報の誤解や混乱を招く可能性があります。</p>
            <h3>労働環境の厳しさ</h3><p>医学の現場では長時間労働やストレスが慢性的に発生することがあり、これが医療従事者の健康やワークライフバランスに悪影響を与えることがあります。</p>
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

export default Medicine;
