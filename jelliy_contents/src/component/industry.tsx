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
import Industry_1stView from '../assets/img/Industry_1stView01.png';
import { TopButton } from './_common_component';

// --- ここから画像importをダミー名で新設 ---
import Industry_industrial_control01 from '../assets/img/Industry_industrial_control01.jpg';
import Industry_industrial_control02 from '../assets/img/Industry_industrial_control02.jpg';
import Industry_industrial_control03 from '../assets/img/Industry_industrial_control03.png';
import Industry_industrial_control04 from '../assets/img/Industry_industrial_control01.jpg';
import Industry_industrial_control05 from '../assets/img/Industry_industrial_control02.jpg';
import Industry_industrial_control06 from '../assets/img/Industry_industrial_control03.png';

import Industry_industrial_management01 from '../assets/img/Industry_industrial_management01.jpg';
import Industry_industrial_management02 from '../assets/img/Industry_industrial_management02.jpg';
import Industry_industrial_management03 from '../assets/img/Industry_industrial_management03.png';
import Industry_industrial_management04 from '../assets/img/Industry_industrial_management01.jpg';
import Industry_industrial_management05 from '../assets/img/Industry_industrial_management02.jpg';
import Industry_industrial_management06 from '../assets/img/Industry_industrial_management03.png';

import Industry_agriculture01 from '../assets/img/Industry_agriculture01.jpg';
import Industry_agriculture02 from '../assets/img/Industry_agriculture02.jpg';
import Industry_agriculture03 from '../assets/img/Industry_agriculture03.png';
import Industry_agriculture04 from '../assets/img/Industry_agriculture01.jpg';
import Industry_agriculture05 from '../assets/img/Industry_agriculture02.jpg';
import Industry_agriculture06 from '../assets/img/Industry_agriculture03.png';

import Industry_forestry01 from '../assets/img/Industry_forestry01.jpg';
import Industry_forestry02 from '../assets/img/Industry_forestry02.jpg';
import Industry_forestry03 from '../assets/img/Industry_forestry03.png';
import Industry_forestry04 from '../assets/img/Industry_forestry01.jpg';
import Industry_forestry05 from '../assets/img/Industry_forestry02.jpg';
import Industry_forestry06 from '../assets/img/Industry_forestry03.png';

import Industry_animal_husbandry01 from '../assets/img/Industry_animal_husbandry01.jpg';
import Industry_animal_husbandry02 from '../assets/img/Industry_animal_husbandry02.jpg';
import Industry_animal_husbandry03 from '../assets/img/Industry_animal_husbandry03.png';
import Industry_animal_husbandry04 from '../assets/img/Industry_animal_husbandry01.jpg';
import Industry_animal_husbandry05 from '../assets/img/Industry_animal_husbandry02.jpg';
import Industry_animal_husbandry06 from '../assets/img/Industry_animal_husbandry03.png';

import Industry_fisheries01 from '../assets/img/Industry_fisheries01.jpg';
import Industry_fisheries02 from '../assets/img/Industry_fisheries02.jpg';
import Industry_fisheries03 from '../assets/img/Industry_fisheries03.png';
import Industry_fisheries04 from '../assets/img/Industry_fisheries01.jpg';
import Industry_fisheries05 from '../assets/img/Industry_fisheries02.jpg';
import Industry_fisheries06 from '../assets/img/Industry_fisheries03.png';

import Industry_mining01 from '../assets/img/Industry_mining01.jpg';
import Industry_mining02 from '../assets/img/Industry_mining02.jpg';
import Industry_mining03 from '../assets/img/Industry_mining03.png';
import Industry_mining04 from '../assets/img/Industry_mining01.jpg';
import Industry_mining05 from '../assets/img/Industry_mining02.jpg';
import Industry_mining06 from '../assets/img/Industry_mining03.png';

import Industry_energy_industry01 from '../assets/img/Industry_energy_industry01.jpg';
import Industry_energy_industry02 from '../assets/img/Industry_energy_industry02.jpg';
import Industry_energy_industry03 from '../assets/img/Industry_energy_industry03.png';
import Industry_energy_industry04 from '../assets/img/Industry_energy_industry01.jpg';
import Industry_energy_industry05 from '../assets/img/Industry_energy_industry02.jpg';
import Industry_energy_industry06 from '../assets/img/Industry_energy_industry03.png';

import Industry_mechanical_engineering01 from '../assets/img/Industry_mechanical_engineering01.jpg';
import Industry_mechanical_engineering02 from '../assets/img/Industry_mechanical_engineering02.jpg';
import Industry_mechanical_engineering03 from '../assets/img/Industry_mechanical_engineering03.png';
import Industry_mechanical_engineering04 from '../assets/img/Industry_mechanical_engineering01.jpg';
import Industry_mechanical_engineering05 from '../assets/img/Industry_mechanical_engineering02.jpg';
import Industry_mechanical_engineering06 from '../assets/img/Industry_mechanical_engineering03.png';

import Industry_electrical_electronic_engineering01 from '../assets/img/Industry_electrical_electronic_engineering01.jpg';
import Industry_electrical_electronic_engineering02 from '../assets/img/Industry_electrical_electronic_engineering02.jpg';
import Industry_electrical_electronic_engineering03 from '../assets/img/Industry_electrical_electronic_engineering03.png';
import Industry_electrical_electronic_engineering04 from '../assets/img/Industry_electrical_electronic_engineering01.jpg';
import Industry_electrical_electronic_engineering05 from '../assets/img/Industry_electrical_electronic_engineering02.jpg';
import Industry_electrical_electronic_engineering06 from '../assets/img/Industry_electrical_electronic_engineering03.png';

import Industry_civil_engineering01 from '../assets/img/Industry_civil_engineering01.jpg';
import Industry_civil_engineering02 from '../assets/img/Industry_civil_engineering02.jpg';
import Industry_civil_engineering03 from '../assets/img/Industry_civil_engineering03.png';
import Industry_civil_engineering04 from '../assets/img/Industry_civil_engineering01.jpg';
import Industry_civil_engineering05 from '../assets/img/Industry_civil_engineering02.jpg';
import Industry_civil_engineering06 from '../assets/img/Industry_civil_engineering03.png';

import Industry_architecture01 from '../assets/img/Industry_architecture01.jpg';
import Industry_architecture02 from '../assets/img/Industry_architecture02.jpg';
import Industry_architecture03 from '../assets/img/Industry_architecture03.png';
import Industry_architecture04 from '../assets/img/Industry_architecture01.jpg';
import Industry_architecture05 from '../assets/img/Industry_architecture02.jpg';
import Industry_architecture06 from '../assets/img/Industry_architecture03.png';

import Industry_chemical_industry01 from '../assets/img/Industry_chemical_industry01.jpg';
import Industry_chemical_industry02 from '../assets/img/Industry_chemical_industry02.jpg';
import Industry_chemical_industry03 from '../assets/img/Industry_chemical_industry03.png';
import Industry_chemical_industry04 from '../assets/img/Industry_chemical_industry01.jpg';
import Industry_chemical_industry05 from '../assets/img/Industry_chemical_industry02.jpg';
import Industry_chemical_industry06 from '../assets/img/Industry_chemical_industry03.png';

import Industry_food_industry01 from '../assets/img/Industry_food_industry01.jpg';
import Industry_food_industry02 from '../assets/img/Industry_food_industry02.jpg';
import Industry_food_industry03 from '../assets/img/Industry_food_industry03.png';
import Industry_food_industry04 from '../assets/img/Industry_food_industry01.jpg';
import Industry_food_industry05 from '../assets/img/Industry_food_industry02.jpg';
import Industry_food_industry06 from '../assets/img/Industry_food_industry03.png';

import Industry_communication_transport01 from '../assets/img/Industry_communication_transport01.jpg';
import Industry_communication_transport02 from '../assets/img/Industry_communication_transport02.jpg';
import Industry_communication_transport03 from '../assets/img/Industry_communication_transport03.png';
import Industry_communication_transport04 from '../assets/img/Industry_communication_transport01.jpg';
import Industry_communication_transport05 from '../assets/img/Industry_communication_transport02.jpg';
import Industry_communication_transport06 from '../assets/img/Industry_communication_transport03.png';

import Industry_materials_engineering01 from '../assets/img/Industry_materials_engineering01.jpg';
import Industry_materials_engineering02 from '../assets/img/Industry_materials_engineering02.jpg';
import Industry_materials_engineering03 from '../assets/img/Industry_materials_engineering03.png';
import Industry_materials_engineering04 from '../assets/img/Industry_materials_engineering01.jpg';
import Industry_materials_engineering05 from '../assets/img/Industry_materials_engineering02.jpg';
import Industry_materials_engineering06 from '../assets/img/Industry_materials_engineering03.png';

import Industry_applied_physics01 from '../assets/img/Industry_applied_physics01.jpg';
import Industry_applied_physics02 from '../assets/img/Industry_applied_physics02.jpg';
import Industry_applied_physics03 from '../assets/img/Industry_applied_physics03.png';
import Industry_applied_physics04 from '../assets/img/Industry_applied_physics01.jpg';
import Industry_applied_physics05 from '../assets/img/Industry_applied_physics02.jpg';
import Industry_applied_physics06 from '../assets/img/Industry_applied_physics03.png';

import Industry_applied_chemistry01 from '../assets/img/Industry_applied_chemistry01.jpg';
import Industry_applied_chemistry02 from '../assets/img/Industry_applied_chemistry02.jpg';
import Industry_applied_chemistry03 from '../assets/img/Industry_applied_chemistry03.png';
import Industry_applied_chemistry04 from '../assets/img/Industry_applied_chemistry01.jpg';
import Industry_applied_chemistry05 from '../assets/img/Industry_applied_chemistry02.jpg';
import Industry_applied_chemistry06 from '../assets/img/Industry_applied_chemistry03.png';

import './_common_css.css';
import './industry.css';

function Industry() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const industrialControlRef = useRef<HTMLElement>(null);
  const industrialControlScrollRef = useRef<HTMLDivElement>(null);
  const industrialManagementRef = useRef<HTMLElement>(null);
  const industrialManagementScrollRef = useRef<HTMLDivElement>(null);
  const agricultureRef = useRef<HTMLElement>(null);
  const agricultureScrollRef = useRef<HTMLDivElement>(null);
  const forestryRef = useRef<HTMLElement>(null);
  const forestryScrollRef = useRef<HTMLDivElement>(null);
  const animalHusbandryRef = useRef<HTMLElement>(null);
  const animalHusbandryScrollRef = useRef<HTMLDivElement>(null);
  const fisheriesRef = useRef<HTMLElement>(null);
  const fisheriesScrollRef = useRef<HTMLDivElement>(null);
  const miningRef = useRef<HTMLElement>(null);
  const miningScrollRef = useRef<HTMLDivElement>(null);
  const energyIndustryRef = useRef<HTMLElement>(null);
  const energyIndustryScrollRef = useRef<HTMLDivElement>(null);
  const mechanicalEngineeringRef = useRef<HTMLElement>(null);
  const mechanicalEngineeringScrollRef = useRef<HTMLDivElement>(null);
  const electricalElectronicEngineeringRef = useRef<HTMLElement>(null);
  const electricalElectronicEngineeringScrollRef = useRef<HTMLDivElement>(null);
  const civilEngineeringRef = useRef<HTMLElement>(null);
  const civilEngineeringScrollRef = useRef<HTMLDivElement>(null);
  const architectureRef = useRef<HTMLElement>(null);
  const architectureScrollRef = useRef<HTMLDivElement>(null);
  const chemicalIndustryRef = useRef<HTMLElement>(null);
  const chemicalIndustryScrollRef = useRef<HTMLDivElement>(null);
  const foodIndustryRef = useRef<HTMLElement>(null);
  const foodIndustryScrollRef = useRef<HTMLDivElement>(null);
  const communicationTransportRef = useRef<HTMLElement>(null);
  const communicationTransportScrollRef = useRef<HTMLDivElement>(null);
  const materialsEngineeringRef = useRef<HTMLElement>(null);
  const materialsEngineeringScrollRef = useRef<HTMLDivElement>(null);
  const appliedPhysicsRef = useRef<HTMLElement>(null);
  const appliedPhysicsScrollRef = useRef<HTMLDivElement>(null);
  const appliedChemistryRef = useRef<HTMLElement>(null);
  const appliedChemistryScrollRef = useRef<HTMLDivElement>(null);

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    { ref: industrialControlRef, scrollRef: industrialControlScrollRef },
    { ref: industrialManagementRef, scrollRef: industrialManagementScrollRef },
    { ref: agricultureRef, scrollRef: agricultureScrollRef },
    { ref: forestryRef, scrollRef: forestryScrollRef },
    { ref: animalHusbandryRef, scrollRef: animalHusbandryScrollRef },
    { ref: fisheriesRef, scrollRef: fisheriesScrollRef },
    { ref: miningRef, scrollRef: miningScrollRef },
    { ref: energyIndustryRef, scrollRef: energyIndustryScrollRef },
    { ref: mechanicalEngineeringRef, scrollRef: mechanicalEngineeringScrollRef },
    { ref: electricalElectronicEngineeringRef, scrollRef: electricalElectronicEngineeringScrollRef },
    { ref: civilEngineeringRef, scrollRef: civilEngineeringScrollRef },
    { ref: architectureRef, scrollRef: architectureScrollRef },
    { ref: chemicalIndustryRef, scrollRef: chemicalIndustryScrollRef },
    { ref: foodIndustryRef, scrollRef: foodIndustryScrollRef },
    { ref: communicationTransportRef, scrollRef: communicationTransportScrollRef },
    { ref: materialsEngineeringRef, scrollRef: materialsEngineeringScrollRef },
    { ref: appliedPhysicsRef, scrollRef: appliedPhysicsScrollRef },
    { ref: appliedChemistryRef, scrollRef: appliedChemistryScrollRef },
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
  // --- 外部HTMLロードを共通フックで ---
  const sectionNames = [
    'industrial_control', 'industrial_management', 'agriculture', 'forestry',
    'animal_husbandry', 'fisheries', 'mining', 'energy_industry',
    'mechanical_engineering', 'electrical_electronic_engineering', 'civil_engineering',
    'architecture', 'chemical_industry', 'food_industry', 'communication_transport',
    'materials_engineering', 'applied_physics', 'applied_chemistry'
  ];
  const { htmlContents, loadingStates, errorStates } = useSectionHtmlLoader('industry', sectionNames);
  // レンダリング用の設定
  // セクションkey設定
  const sectionConfigs = [
    { key: 'industrial_control', name: 'industrial_control', className: 'block_text_right', textPosition: 'right' },
    { key: 'industrial_management', name: 'industrial_management', className: 'block_text_left', textPosition: 'left' },
    { key: 'agriculture', name: 'agriculture', className: 'block_text_right', textPosition: 'right' },
    { key: 'forestry', name: 'forestry', className: 'block_text_left', textPosition: 'left' },
    { key: 'animal_husbandry', name: 'animal_husbandry', className: 'block_text_right', textPosition: 'right' },
    { key: 'fisheries', name: 'fisheries', className: 'block_text_left', textPosition: 'left' },
    { key: 'mining', name: 'mining', className: 'block_text_right', textPosition: 'right' },
    { key: 'energy_industry', name: 'energy_industry', className: 'block_text_left', textPosition: 'left' },
    { key: 'mechanical_engineering', name: 'mechanical_engineering', className: 'block_text_right', textPosition: 'right' },
    { key: 'electrical_electronic_engineering', name: 'electrical_electronic_engineering', className: 'block_text_left', textPosition: 'left' },
    { key: 'civil_engineering', name: 'civil_engineering', className: 'block_text_right', textPosition: 'right' },
    { key: 'architecture', name: 'architecture', className: 'block_text_left', textPosition: 'left' },
    { key: 'chemical_industry', name: 'chemical_industry', className: 'block_text_right', textPosition: 'right' },
    { key: 'food_industry', name: 'food_industry', className: 'block_text_left', textPosition: 'left' },
    { key: 'communication_transport', name: 'communication_transport', className: 'block_text_right', textPosition: 'right' },
    { key: 'materials_engineering', name: 'materials_engineering', className: 'block_text_left', textPosition: 'left' },
    { key: 'applied_physics', name: 'applied_physics', className: 'block_text_right', textPosition: 'right' },
    { key: 'applied_chemistry', name: 'applied_chemistry', className: 'block_text_left', textPosition: 'left' }
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

  // -------------- 画像アニメーションの設定
  // FirstViewアニメーション用の状態（長所短所アニメ/セリーマップアニメ）
  const { animateMerit, animateDemerit } = useFirstViewMeritDemeritAnimation(currentSection === 0);
  const { imageAnimationClass } = useFirstViewImageAnimation(currentSection === 0);
  // 画像配列生成
  const sectionImageData = {
    industrial_control: [
      Industry_industrial_control01, Industry_industrial_control02, Industry_industrial_control03,
      Industry_industrial_control04, Industry_industrial_control05, Industry_industrial_control06
    ],
    industrial_management: [
      Industry_industrial_management01, Industry_industrial_management02, Industry_industrial_management03,
      Industry_industrial_management04, Industry_industrial_management05, Industry_industrial_management06
    ],
    agriculture: [
      Industry_agriculture01, Industry_agriculture02, Industry_agriculture03,
      Industry_agriculture04, Industry_agriculture05, Industry_agriculture06
    ],
    forestry: [
      Industry_forestry01, Industry_forestry02, Industry_forestry03,
      Industry_forestry04, Industry_forestry05, Industry_forestry06
    ],
    animal_husbandry: [
      Industry_animal_husbandry01, Industry_animal_husbandry02, Industry_animal_husbandry03,
      Industry_animal_husbandry04, Industry_animal_husbandry05, Industry_animal_husbandry06
    ],
    fisheries: [
      Industry_fisheries01, Industry_fisheries02, Industry_fisheries03,
      Industry_fisheries04, Industry_fisheries05, Industry_fisheries06
    ],
    mining: [
      Industry_mining01, Industry_mining02, Industry_mining03,
      Industry_mining04, Industry_mining05, Industry_mining06
    ],
    energy_industry: [
      Industry_energy_industry01, Industry_energy_industry02, Industry_energy_industry03,
      Industry_energy_industry04, Industry_energy_industry05, Industry_energy_industry06
    ],
    mechanical_engineering: [
      Industry_mechanical_engineering01, Industry_mechanical_engineering02, Industry_mechanical_engineering03,
      Industry_mechanical_engineering04, Industry_mechanical_engineering05, Industry_mechanical_engineering06
    ],
    electrical_electronic_engineering: [
      Industry_electrical_electronic_engineering01, Industry_electrical_electronic_engineering02, Industry_electrical_electronic_engineering03,
      Industry_electrical_electronic_engineering04, Industry_electrical_electronic_engineering05, Industry_electrical_electronic_engineering06
    ],
    civil_engineering: [
      Industry_civil_engineering01, Industry_civil_engineering02, Industry_civil_engineering03,
      Industry_civil_engineering04, Industry_civil_engineering05, Industry_civil_engineering06
    ],
    architecture: [
      Industry_architecture01, Industry_architecture02, Industry_architecture03,
      Industry_architecture04, Industry_architecture05, Industry_architecture06
    ],
    chemical_industry: [
      Industry_chemical_industry01, Industry_chemical_industry02, Industry_chemical_industry03,
      Industry_chemical_industry04, Industry_chemical_industry05, Industry_chemical_industry06
    ],
    food_industry: [
      Industry_food_industry01, Industry_food_industry02, Industry_food_industry03,
      Industry_food_industry04, Industry_food_industry05, Industry_food_industry06
    ],
    communication_transport: [
      Industry_communication_transport01, Industry_communication_transport02, Industry_communication_transport03,
      Industry_communication_transport04, Industry_communication_transport05, Industry_communication_transport06
    ],
    materials_engineering: [
      Industry_materials_engineering01, Industry_materials_engineering02, Industry_materials_engineering03,
      Industry_materials_engineering04, Industry_materials_engineering05, Industry_materials_engineering06
    ],
    applied_physics: [
      Industry_applied_physics01, Industry_applied_physics02, Industry_applied_physics03,
      Industry_applied_physics04, Industry_applied_physics05, Industry_applied_physics06
    ],
    applied_chemistry: [
      Industry_applied_chemistry01, Industry_applied_chemistry02, Industry_applied_chemistry03,
      Industry_applied_chemistry04, Industry_applied_chemistry05, Industry_applied_chemistry06
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
  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload(
    Object.values(imageArrays)
  );

  // ページトップに戻る関数
  const scrollToTop = useTopScroll(setCurrentSection, setScrollLocked, scrollLocked);

  return (
    <div className="component_container">
      <SharedImageFilters />

      <section className='first_view industry' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='industry_h1'>産業<br />技術</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={Industry_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='industrial_control'><a href="#industrial_control" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 産業制御 */}
            <li className='industrial_management'><a href="#industrial_management" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 産業マネジメント */}
            <li className='agriculture'><a href="#agriculture" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 農業 */}
            <li className='forestry'><a href="#forestry" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 林業 */}
            <li className='animal_husbandry'><a href="#animal_husbandry" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 畜産業 */}
            <li className='fisheries'><a href="#fisheries" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 水産業 */}
            <li className='mining'><a href="#mining" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 鉱業 */}
            <li className='energy_industry'><a href="#energy_industry" onClick={(e) => { e.preventDefault(); setCurrentSection(8); }}></a></li>{/* エネルギー業 */}
            <li className='mechanical_engineering'><a href="#mechanical_engineering" onClick={(e) => { e.preventDefault(); setCurrentSection(9); }}></a></li>{/* 機械工学 */}
            <li className='electrical_electronic_engineering'><a href="#electrical_electronic_engineering" onClick={(e) => { e.preventDefault(); setCurrentSection(10); }}></a></li>{/* 電気電子工学 */}
            <li className='civil_engineering'><a href="#civil_engineering" onClick={(e) => { e.preventDefault(); setCurrentSection(11); }}></a></li>{/* 土木工学 */}
            <li className='architecture'><a href="#architecture" onClick={(e) => { e.preventDefault(); setCurrentSection(12); }}></a></li>{/* 建築学 */}
            <li className='chemical_industry'><a href="#chemical_industry" onClick={(e) => { e.preventDefault(); setCurrentSection(13); }}></a></li>{/* 化学工業 */}
            <li className='food_industry'><a href="#food_industry" onClick={(e) => { e.preventDefault(); setCurrentSection(14); }}></a></li>{/* 食品工業 */}
            <li className='communication_transport'><a href="#communication_transport" onClick={(e) => { e.preventDefault(); setCurrentSection(15); }}></a></li>{/* 通信運輸交通 */}
            <li className='materials_engineering'><a href="#materials_engineering" onClick={(e) => { e.preventDefault(); setCurrentSection(16); }}></a></li>{/* 材料工学 */}
            <li className='applied_physics'><a href="#applied_physics" onClick={(e) => { e.preventDefault(); setCurrentSection(17); }}></a></li>{/* 応用物理 */}
            <li className='applied_chemistry'><a href="#applied_chemistry" onClick={(e) => { e.preventDefault(); setCurrentSection(18); }}></a></li>{/* 応用化学 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <div className="h3-float-wrap">
            <h3 className="h3-float">効率向上と生産性の向上</h3><p>産業技術は生産プロセスを自動化し、作業の効率向上に寄与しています。これにより、製品やサービスの生産性が向上し、企業は競争力を維持できます。</p></div>
            <div className="h3-float-wrap">
            <h3 className="h3-float">新しい製品とサービスの開発</h3><p>産業技術は革新的な製品やサービスの創造を可能にします。新しい技術の導入により、市場において新たな需要が生まれ、企業は競争の中で差別化を図ることができます。</p></div>
            <div className="h3-float-wrap">
            <h3 className="h3-float">グローバルな連携と情報共有</h3><p>産業技術は世界中の企業や研究機関との連携を促進し、情報の迅速な共有が可能となります。国際的なイノベーションが進み、異なる地域や国々が共同で問題解決に取り組むことができます。</p></div>
            <div className="h3-float-wrap">
            <h3 className="h3-float">人間の労働負担の軽減</h3><p>自動化やロボット技術の進歩により、危険な作業や単調な業務を機械が担当することが可能となり、人間の労働負担が軽減されます。労働者はより高度なスキルを身につける機会が増えます</p></div>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <div className="h3-float-wrap">
            <h3 className="h3-float">雇用の不安定性と職業の転換</h3><p>自動化やロボット化が進む中、一部の労働者は仕事を失う可能性があります。新たな技術の導入により、一部の職種が減少する一方で、新しい職種が生まれるため、雇用の不安定性が生じることがあります。</p></div>
            <div className="h3-float-wrap">
            <h3 className="h3-float">技術格差とデジタルディバイド</h3><p>産業技術の導入には高度な技術スキルが必要となりますが、これが十分に身についていない人々にとっては技術格差が広がる可能性があります。また、デジタルデバイドにより、一部の地域や社会階層が情報へのアクセスに差が生まれることも懸念されます。</p></div>
            <div className="h3-float-wrap">
            <h3 className="h3-float">プライバシーの懸念とデータセキュリティ</h3><p>産業技術の発展に伴い、大量のデータが生成されます。これにより、個人のプライバシーが侵害される懸念が生まれる一方で、データのセキュリティが脅かされる可能性もあります。企業や組織はこれらの課題に対処するために十分な対策を講じる必要があります。</p></div>
            <div className="h3-float-wrap">
            <h3 className="h3-float">環境への影響と資源の枯渇</h3><p>一部の産業技術は資源の大量消費を伴い、それが環境への悪影響をもたらすことがあります。レアアースなどの希少資源の採掘や使用には環境への負荷が高まり、持続可能な開発の観点から検討が必要です。</p></div>
            <div className="h3-float-wrap">
            <h3 className="h3-float">倫理的な問題と法規制の課題</h3><p>産業技術の進化には倫理的な問題が絡むことがあります。例えば、人工知能や生命工学などの分野では、個人や社会全体に対する影響が深刻であり、それに対する適切な法規制や倫理規範が必要です。</p></div>
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

export default Industry;
