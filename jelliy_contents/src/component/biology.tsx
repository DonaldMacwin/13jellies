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
  TopButton,
  useTopScroll
} from './_common_component';
import Biology_1stView from '../assets/img/Biology_1stView01.png';

// 農研究
import Biology_agricultural_research01 from '../assets/img/Biology_agricultural_research01.jpg';
import Biology_agricultural_research02 from '../assets/img/Biology_agricultural_research02.jpg';
import Biology_agricultural_research03 from '../assets/img/Biology_agricultural_research03.png';
import Biology_agricultural_research04 from '../assets/img/Biology_agricultural_research01.jpg';
import Biology_agricultural_research05 from '../assets/img/Biology_agricultural_research02.jpg';
import Biology_agricultural_research06 from '../assets/img/Biology_agricultural_research03.png';

// 植物研究
import Biology_plant_research01 from '../assets/img/Biology_plant_research01.jpg';
import Biology_plant_research02 from '../assets/img/Biology_plant_research02.jpg';
import Biology_plant_research03 from '../assets/img/Biology_plant_research03.png';
import Biology_plant_research04 from '../assets/img/Biology_plant_research01.jpg';
import Biology_plant_research05 from '../assets/img/Biology_plant_research02.jpg';
import Biology_plant_research06 from '../assets/img/Biology_plant_research03.png';

// 生物分類
import Biology_biological_classification01 from '../assets/img/Biology_biological_classification01.jpg';
import Biology_biological_classification02 from '../assets/img/Biology_biological_classification02.jpg';
import Biology_biological_classification03 from '../assets/img/Biology_biological_classification03.png';
import Biology_biological_classification04 from '../assets/img/Biology_biological_classification01.jpg';
import Biology_biological_classification05 from '../assets/img/Biology_biological_classification02.jpg';
import Biology_biological_classification06 from '../assets/img/Biology_biological_classification03.png';

// 生態研究
import Biology_ecological_research01 from '../assets/img/Biology_ecological_research01.jpg';
import Biology_ecological_research02 from '../assets/img/Biology_ecological_research02.jpg';
import Biology_ecological_research03 from '../assets/img/Biology_ecological_research03.png';
import Biology_ecological_research04 from '../assets/img/Biology_ecological_research01.jpg';
import Biology_ecological_research05 from '../assets/img/Biology_ecological_research02.jpg';
import Biology_ecological_research06 from '../assets/img/Biology_ecological_research03.png';

// 動物研究
import Biology_animal_research01 from '../assets/img/Biology_animal_research01.jpg';
import Biology_animal_research02 from '../assets/img/Biology_animal_research02.jpg';
import Biology_animal_research03 from '../assets/img/Biology_animal_research03.png';
import Biology_animal_research04 from '../assets/img/Biology_animal_research01.jpg';
import Biology_animal_research05 from '../assets/img/Biology_animal_research02.jpg';
import Biology_animal_research06 from '../assets/img/Biology_animal_research03.png';

// 進化研究
import Biology_evolutionary_research01 from '../assets/img/Biology_evolutionary_research01.jpg';
import Biology_evolutionary_research02 from '../assets/img/Biology_evolutionary_research02.jpg';
import Biology_evolutionary_research03 from '../assets/img/Biology_evolutionary_research03.png';
import Biology_evolutionary_research04 from '../assets/img/Biology_evolutionary_research01.jpg';
import Biology_evolutionary_research05 from '../assets/img/Biology_evolutionary_research02.jpg';
import Biology_evolutionary_research06 from '../assets/img/Biology_evolutionary_research03.png';

// 地球外生物研究
import Biology_extraterrestrial_life01 from '../assets/img/Biology_extraterrestrial_life01.jpg';
import Biology_extraterrestrial_life02 from '../assets/img/Biology_extraterrestrial_life02.jpg';
import Biology_extraterrestrial_life03 from '../assets/img/Biology_extraterrestrial_life03.png';
import Biology_extraterrestrial_life04 from '../assets/img/Biology_extraterrestrial_life01.jpg';
import Biology_extraterrestrial_life05 from '../assets/img/Biology_extraterrestrial_life02.jpg';
import Biology_extraterrestrial_life06 from '../assets/img/Biology_extraterrestrial_life03.png';

// 人類研究
import Biology_human_studies01 from '../assets/img/Biology_human_studies01.jpg';
import Biology_human_studies02 from '../assets/img/Biology_human_studies02.jpg';
import Biology_human_studies03 from '../assets/img/Biology_human_studies03.png';
import Biology_human_studies04 from '../assets/img/Biology_human_studies01.jpg';
import Biology_human_studies05 from '../assets/img/Biology_human_studies02.jpg';
import Biology_human_studies06 from '../assets/img/Biology_human_studies03.png';

// 生物形態研究
{/*import Biology_biomorphology01 from '../assets/img/Biology_biomorphology01.jpg';
import Biology_biomorphology02 from '../assets/img/Biology_biomorphology02.jpg';
import Biology_biomorphology03 from '../assets/img/Biology_biomorphology03.png';
import Biology_biomorphology04 from '../assets/img/Biology_biomorphology01.jpg';
import Biology_biomorphology05 from '../assets/img/Biology_biomorphology02.jpg';
import Biology_biomorphology06 from '../assets/img/Biology_biomorphology03.png';*/}

// 脳神経科学
import Biology_neuroscience01 from '../assets/img/Biology_neuroscience01.jpg';
import Biology_neuroscience02 from '../assets/img/Biology_neuroscience02.jpg';
import Biology_neuroscience03 from '../assets/img/Biology_neuroscience03.png';
import Biology_neuroscience04 from '../assets/img/Biology_neuroscience01.jpg';
import Biology_neuroscience05 from '../assets/img/Biology_neuroscience02.jpg';
import Biology_neuroscience06 from '../assets/img/Biology_neuroscience03.png';

// 生物工学
import Biology_bioengineering01 from '../assets/img/Biology_bioengineering01.jpg';
import Biology_bioengineering02 from '../assets/img/Biology_bioengineering02.jpg';
import Biology_bioengineering03 from '../assets/img/Biology_bioengineering03.png';
import Biology_bioengineering04 from '../assets/img/Biology_bioengineering01.jpg';
import Biology_bioengineering05 from '../assets/img/Biology_bioengineering02.jpg';
import Biology_bioengineering06 from '../assets/img/Biology_bioengineering03.png';

// 生物情報研究
import Biology_bioinformatics01 from '../assets/img/Biology_bioinformatics01.jpg';
import Biology_bioinformatics02 from '../assets/img/Biology_bioinformatics02.jpg';
import Biology_bioinformatics03 from '../assets/img/Biology_bioinformatics03.png';
import Biology_bioinformatics04 from '../assets/img/Biology_bioinformatics01.jpg';
import Biology_bioinformatics05 from '../assets/img/Biology_bioinformatics02.jpg';
import Biology_bioinformatics06 from '../assets/img/Biology_bioinformatics03.png';

// 遺伝発生研究
import Biology_genetic_development01 from '../assets/img/Biology_genetic_development01.jpg';
import Biology_genetic_development02 from '../assets/img/Biology_genetic_development02.jpg';
import Biology_genetic_development03 from '../assets/img/Biology_genetic_development03.png';
import Biology_genetic_development04 from '../assets/img/Biology_genetic_development01.jpg';
import Biology_genetic_development05 from '../assets/img/Biology_genetic_development02.jpg';
import Biology_genetic_development06 from '../assets/img/Biology_genetic_development03.png';

// 細胞研究
import Biology_cell01 from '../assets/img/Biology_cell01.jpg';
import Biology_cell02 from '../assets/img/Biology_cell02.jpg';
import Biology_cell03 from '../assets/img/Biology_cell03.png';
import Biology_cell04 from '../assets/img/Biology_cell01.jpg';
import Biology_cell05 from '../assets/img/Biology_cell02.jpg';
import Biology_cell06 from '../assets/img/Biology_cell03.png';

// 生物物理
import Biology_biophysics01 from '../assets/img/Biology_biophysics01.jpg';
import Biology_biophysics02 from '../assets/img/Biology_biophysics02.jpg';
import Biology_biophysics03 from '../assets/img/Biology_biophysics03.png';
import Biology_biophysics04 from '../assets/img/Biology_biophysics01.jpg';
import Biology_biophysics05 from '../assets/img/Biology_biophysics02.jpg';
import Biology_biophysics06 from '../assets/img/Biology_biophysics03.png';

// 生化学研究
import Biology_biochemistry01 from '../assets/img/Biology_biochemistry01.jpg';
import Biology_biochemistry02 from '../assets/img/Biology_biochemistry02.jpg';
import Biology_biochemistry03 from '../assets/img/Biology_biochemistry03.png';
import Biology_biochemistry04 from '../assets/img/Biology_biochemistry01.jpg';
import Biology_biochemistry05 from '../assets/img/Biology_biochemistry02.jpg';
import Biology_biochemistry06 from '../assets/img/Biology_biochemistry03.png';

import './_common_css.css';
import './biology.css';

function Biology() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const agriculturalResearchRef = useRef<HTMLElement>(null);
  const agriculturalResearchScrollRef = useRef<HTMLDivElement>(null);
  const plantResearchRef = useRef<HTMLElement>(null);
  const plantResearchScrollRef = useRef<HTMLDivElement>(null);
  const biologicalClassificationRef = useRef<HTMLElement>(null);
  const biologicalClassificationScrollRef = useRef<HTMLDivElement>(null);
  const ecologicalResearchRef = useRef<HTMLElement>(null);
  const ecologicalResearchScrollRef = useRef<HTMLDivElement>(null);
  const animalResearchRef = useRef<HTMLElement>(null);
  const animalResearchScrollRef = useRef<HTMLDivElement>(null);
  const evolutionaryResearchRef = useRef<HTMLElement>(null);
  const evolutionaryResearchScrollRef = useRef<HTMLDivElement>(null);
  const extraterrestrialLifeRef = useRef<HTMLElement>(null);
  const extraterrestrialLifeScrollRef = useRef<HTMLDivElement>(null);
  const humanStudiesRef = useRef<HTMLElement>(null);
  const humanStudiesScrollRef = useRef<HTMLDivElement>(null);
  const neuroscienceRef = useRef<HTMLElement>(null);
  const neuroscienceScrollRef = useRef<HTMLDivElement>(null);
  const bioengineeringRef = useRef<HTMLElement>(null);
  const bioengineeringScrollRef = useRef<HTMLDivElement>(null);
  const bioinformaticsRef = useRef<HTMLElement>(null);
  const bioinformaticsScrollRef = useRef<HTMLDivElement>(null);
  const geneticDevelopmentRef = useRef<HTMLElement>(null);
  const geneticDevelopmentScrollRef = useRef<HTMLDivElement>(null);
  const cellRef = useRef<HTMLElement>(null);
  const cellScrollRef = useRef<HTMLDivElement>(null);
  const biophysicsRef = useRef<HTMLElement>(null);
  const biophysicsScrollRef = useRef<HTMLDivElement>(null);
  const biochemistryRef = useRef<HTMLElement>(null);
  const biochemistryScrollRef = useRef<HTMLDivElement>(null);

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    { ref: agriculturalResearchRef, scrollRef: agriculturalResearchScrollRef },
    { ref: plantResearchRef, scrollRef: plantResearchScrollRef },
    { ref: biologicalClassificationRef, scrollRef: biologicalClassificationScrollRef },
    { ref: ecologicalResearchRef, scrollRef: ecologicalResearchScrollRef },
    { ref: animalResearchRef, scrollRef: animalResearchScrollRef },
    { ref: evolutionaryResearchRef, scrollRef: evolutionaryResearchScrollRef },
    { ref: extraterrestrialLifeRef, scrollRef: extraterrestrialLifeScrollRef },
    { ref: humanStudiesRef, scrollRef: humanStudiesScrollRef },
    { ref: neuroscienceRef, scrollRef: neuroscienceScrollRef },
    { ref: bioengineeringRef, scrollRef: bioengineeringScrollRef },
    { ref: bioinformaticsRef, scrollRef: bioinformaticsScrollRef },
    { ref: geneticDevelopmentRef, scrollRef: geneticDevelopmentScrollRef },
    { ref: cellRef, scrollRef: cellScrollRef },
    { ref: biophysicsRef, scrollRef: biophysicsScrollRef },
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

  // 各セクションの画像を配列で定義
  const sectionImageData = {
    agriculturalResearch: [
      Biology_agricultural_research01, Biology_agricultural_research02, Biology_agricultural_research03,
      Biology_agricultural_research04, Biology_agricultural_research05, Biology_agricultural_research06
    ],
    plantResearch: [
      Biology_plant_research01, Biology_plant_research02, Biology_plant_research03,
      Biology_plant_research04, Biology_plant_research05, Biology_plant_research06
    ],
    biologicalClassification: [
      Biology_biological_classification01, Biology_biological_classification02, Biology_biological_classification03,
      Biology_biological_classification04, Biology_biological_classification05, Biology_biological_classification06
    ],
    ecologicalResearch: [
      Biology_ecological_research01, Biology_ecological_research02, Biology_ecological_research03,
      Biology_ecological_research04, Biology_ecological_research05, Biology_ecological_research06
    ],
    animalResearch: [
      Biology_animal_research01, Biology_animal_research02, Biology_animal_research03,
      Biology_animal_research04, Biology_animal_research05, Biology_animal_research06
    ],
    evolutionaryResearch: [
      Biology_evolutionary_research01, Biology_evolutionary_research02, Biology_evolutionary_research03,
      Biology_evolutionary_research04, Biology_evolutionary_research05, Biology_evolutionary_research06
    ],
    extraterrestrialLife: [
      Biology_extraterrestrial_life01, Biology_extraterrestrial_life02, Biology_extraterrestrial_life03,
      Biology_extraterrestrial_life04, Biology_extraterrestrial_life05, Biology_extraterrestrial_life06
    ],
    humanStudies: [
      Biology_human_studies01, Biology_human_studies02, Biology_human_studies03,
      Biology_human_studies04, Biology_human_studies05, Biology_human_studies06
    ],
    neuroscience: [
      Biology_neuroscience01, Biology_neuroscience02, Biology_neuroscience03,
      Biology_neuroscience04, Biology_neuroscience05, Biology_neuroscience06
    ],
    bioengineering: [
      Biology_bioengineering01, Biology_bioengineering02, Biology_bioengineering03,
      Biology_bioengineering04, Biology_bioengineering05, Biology_bioengineering06
    ],
    bioinformatics: [
      Biology_bioinformatics01, Biology_bioinformatics02, Biology_bioinformatics03,
      Biology_bioinformatics04, Biology_bioinformatics05, Biology_bioinformatics06
    ],
    geneticDevelopment: [
      Biology_genetic_development01, Biology_genetic_development02, Biology_genetic_development03,
      Biology_genetic_development04, Biology_genetic_development05, Biology_genetic_development06
    ],
    cell: [
      Biology_cell01, Biology_cell02, Biology_cell03,
      Biology_cell04, Biology_cell05, Biology_cell06
    ],
    biophysics: [
      Biology_biophysics01, Biology_biophysics02, Biology_biophysics03,
      Biology_biophysics04, Biology_biophysics05, Biology_biophysics06
    ],
    biochemistry: [
      Biology_biochemistry01, Biology_biochemistry02, Biology_biochemistry03,
      Biology_biochemistry04, Biology_biochemistry05, Biology_biochemistry06
    ]
  };
  const imageArrays = createImageArrays(sectionImageData);

  // セクション名の配列
  const sectionKeys = Object.keys(sectionImageData);
  // 各セクションのアニメーション（画像枚数は自動で取得）
  const sectionAnimations = sectionKeys.map((key, index) => 
    useSectionImageAnimations(
      currentSection === index + 1, 
      sectionImageData[key as keyof typeof sectionImageData].length
    )
  );

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // ページトップに戻る関数
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  // レンダリング用の設定
  // セクションkey設定
  const sectionConfigs = [
    { key: 'agriculturalResearch', name: 'agricultural_research', className: 'block_text_right', textPosition: 'right' },
    { key: 'plantResearch', name: 'plant_research', className: 'block_text_left', textPosition: 'left' },
    { key: 'biologicalClassification', name: 'biological_classification', className: 'block_text_right', textPosition: 'right' },
    { key: 'ecologicalResearch', name: 'ecological_research', className: 'block_text_left', textPosition: 'left' },
    { key: 'animalResearch', name: 'animal_research', className: 'block_text_right', textPosition: 'right' },
    { key: 'evolutionaryResearch', name: 'evolutionary_research', className: 'block_text_left', textPosition: 'left' },
    { key: 'extraterrestrialLife', name: 'extraterrestrial_life', className: 'block_text_right', textPosition: 'right' },
    { key: 'humanStudies', name: 'human_studies', className: 'block_text_left', textPosition: 'left' },
    { key: 'neuroscience', name: 'neuroscience', className: 'block_text_right', textPosition: 'right' },
    { key: 'bioengineering', name: 'bioengineering', className: 'block_text_left', textPosition: 'left' },
    { key: 'bioinformatics', name: 'bioinformatics', className: 'block_text_right', textPosition: 'right' },
    { key: 'geneticDevelopment', name: 'genetic_development', className: 'block_text_left', textPosition: 'left' },
    { key: 'cell', name: 'cell', className: 'block_text_right', textPosition: 'right' },
    { key: 'biophysics', name: 'biophysics', className: 'block_text_left', textPosition: 'left' },
    { key: 'biochemistry', name: 'biochemistry', className: 'block_text_right', textPosition: 'right' }
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

  // --- 各セクションの外部HTMLマークアップ取得用stateとfetch処理 ---
  // HTMLコンテンツ状態の共通化
  const sectionNames = [
    'agricultural_research', 'plant_research', 'biological_classification', 'ecological_research',
    'animal_research', 'evolutionary_research', 'extraterrestrial_life', 'human_studies',
    'neuroscience', 'bioengineering', 'bioinformatics', 'genetic_development',
    'cell', 'biophysics', 'biochemistry'
  ];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('biology', sectionNames);

  return (
    <div className="component_container">
      <SharedImageFilters />

      <section className='first_view' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='biology_h1'>生物</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Biology_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='agricultural_research'><a href="#agricultural_research" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 農研究 */}
            <li className='plant_research'><a href="#plant_research" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 植物研究 */}
            <li className='biological_classification'><a href="#biological_classification" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 生物分類（形態含める） */}
            <li className='ecological_research'><a href="#ecological_research" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 生態研究 */}
            <li className='animal_research'><a href="#animal_research" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 動物研究 */}
            <li className='evolutionary_research'><a href="#evolutionary_research" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 進化研究 */}
            <li className='extraterrestrial_life'><a href="#extraterrestrial_life" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 地球外生物研究 */}
            <li className='human_studies'><a href="#human_studies" onClick={(e) => { e.preventDefault(); setCurrentSection(8); }}></a></li>{/* 人類研究 */}
            <li className='neuroscience'><a href="#neuroscience" onClick={(e) => { e.preventDefault(); setCurrentSection(9); }}></a></li>{/* 脳神経科学 */}
            <li className='bioengineering'><a href="#bioengineering" onClick={(e) => { e.preventDefault(); setCurrentSection(10); }}></a></li>{/* 生物工学 */}
            <li className='bioinformatics'><a href="#bioinformatics" onClick={(e) => { e.preventDefault(); setCurrentSection(11); }}></a></li>{/* 生物情報研究 */}
            <li className='genetic_development'><a href="#genetic_development" onClick={(e) => { e.preventDefault(); setCurrentSection(12); }}></a></li>{/* 遺伝発生研究 */}
            <li className='cell'><a href="#cell" onClick={(e) => { e.preventDefault(); setCurrentSection(13); }}></a></li>{/* 細胞研究 */}
            <li className='biophysics'><a href="#biophysics" onClick={(e) => { e.preventDefault(); setCurrentSection(14); }}></a></li>{/* 生物物理 */}
            <li className='biochemistry'><a href="#biochemistry" onClick={(e) => { e.preventDefault(); setCurrentSection(15); }}></a></li>{/* 生化学研究 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <h3>多岐にわたる研究対象</h3><p>生物学は生物の多様性に焦点を当てており、微生物から巨大な動植物まで、広範で多様な生命体にわたる研究が行われています。これにより、生物学者は様々な生態系や進化のプロセスに関する知識を深めることができます。</p>
            <h3>実用応用の幅広さ</h3><p>生物学の知識は医学、農学、環境分析、食品工学などの様々な分野に応用されています。例えば、新しい医薬品の開発や疾病の理解、農業の生産性向上など、社会全体に貢献しています。</p>
            <h3>技術の進化と統合</h3><p>分子生物学や遺伝学の進歩により、生物学は他の科学分野とも密接に結びついています。バイオテクノロジーの発展や遺伝子編集技術など、生物学の発展が医学や産業技術に大きな影響を与えています。</p>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <h3>複雑性と理解の難しさ</h3><p>生物学は非常に広範かつ複雑な分野であり、生命体の相互作用や生態系のダイナミクスを理解することは容易ではありません。そのため、研究には高度な専門知識が求められ、初心者にとっては理解が難しいことがあります</p>
            <h3>倫理的な課題</h3><p>生物学の進歩には倫理的な問題も伴います。例えば、遺伝子編集技術が進む中、個体の遺伝子を改変することが可能になり、その倫理的な側面が複雑になっています。人間の倫理観と科学の進歩のバランスを取ることが重要です。</p>
            <h3>実験の複雑性</h3><p>生物学の研究はしばしば生きた組織や生命体を対象とするため、実験の複雑性が高いです。これには適切な倫理規定や安全対策が必要であり、研究者にとっては技術的な挑戦も伴います。</p>
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

export default Biology;
