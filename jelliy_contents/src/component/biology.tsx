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
import Biology_biomorphology01 from '../assets/img/Biology_biomorphology01.jpg';
import Biology_biomorphology02 from '../assets/img/Biology_biomorphology02.jpg';
import Biology_biomorphology03 from '../assets/img/Biology_biomorphology03.png';
import Biology_biomorphology04 from '../assets/img/Biology_biomorphology01.jpg';
import Biology_biomorphology05 from '../assets/img/Biology_biomorphology02.jpg';
import Biology_biomorphology06 from '../assets/img/Biology_biomorphology03.png';

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
  const biomorphologyRef = useRef<HTMLElement>(null);
  const biomorphologyScrollRef = useRef<HTMLDivElement>(null);
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
    { ref: biomorphologyRef, scrollRef: biomorphologyScrollRef },
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

  const agriculturalResearchImagesArray = [
    { src: Biology_agricultural_research01 },
    { src: Biology_agricultural_research02 },
    { src: Biology_agricultural_research03 },
    { src: Biology_agricultural_research04 },
    { src: Biology_agricultural_research05 },
    { src: Biology_agricultural_research06 }
  ];
  const agriculturalResearchImages = useSectionImageAnimations(currentSection === 1, agriculturalResearchImagesArray.length);

  const plantResearchImagesArray = [
    { src: Biology_plant_research01 },
    { src: Biology_plant_research02 },
    { src: Biology_plant_research03 },
    { src: Biology_plant_research04 },
    { src: Biology_plant_research05 },
    { src: Biology_plant_research06 }
  ];
  const plantResearchImages = useSectionImageAnimations(currentSection === 2, plantResearchImagesArray.length);

  const biologicalClassificationImagesArray = [
    { src: Biology_biological_classification01 },
    { src: Biology_biological_classification02 },
    { src: Biology_biological_classification03 },
    { src: Biology_biological_classification04 },
    { src: Biology_biological_classification05 },
    { src: Biology_biological_classification06 }
  ];
  const biologicalClassificationImages = useSectionImageAnimations(currentSection === 3, biologicalClassificationImagesArray.length);

  const ecologicalResearchImagesArray = [
    { src: Biology_ecological_research01 },
    { src: Biology_ecological_research02 },
    { src: Biology_ecological_research03 },
    { src: Biology_ecological_research04 },
    { src: Biology_ecological_research05 },
    { src: Biology_ecological_research06 }
  ];
  const ecologicalResearchImages = useSectionImageAnimations(currentSection === 4, ecologicalResearchImagesArray.length);

  const animalResearchImagesArray = [
    { src: Biology_animal_research01 },
    { src: Biology_animal_research02 },
    { src: Biology_animal_research03 },
    { src: Biology_animal_research04 },
    { src: Biology_animal_research05 },
    { src: Biology_animal_research06 }
  ];
  const animalResearchImages = useSectionImageAnimations(currentSection === 5, animalResearchImagesArray.length);

  const evolutionaryResearchImagesArray = [
    { src: Biology_evolutionary_research01 },
    { src: Biology_evolutionary_research02 },
    { src: Biology_evolutionary_research03 },
    { src: Biology_evolutionary_research04 },
    { src: Biology_evolutionary_research05 },
    { src: Biology_evolutionary_research06 }
  ];
  const evolutionaryResearchImages = useSectionImageAnimations(currentSection === 6, evolutionaryResearchImagesArray.length);

  const extraterrestrialLifeImagesArray = [
    { src: Biology_extraterrestrial_life01 },
    { src: Biology_extraterrestrial_life02 },
    { src: Biology_extraterrestrial_life03 },
    { src: Biology_extraterrestrial_life04 },
    { src: Biology_extraterrestrial_life05 },
    { src: Biology_extraterrestrial_life06 }
  ];
  const extraterrestrialLifeImages = useSectionImageAnimations(currentSection === 7, extraterrestrialLifeImagesArray.length);

  const humanStudiesImagesArray = [
    { src: Biology_human_studies01 },
    { src: Biology_human_studies02 },
    { src: Biology_human_studies03 },
    { src: Biology_human_studies04 },
    { src: Biology_human_studies05 },
    { src: Biology_human_studies06 }
  ];
  const humanStudiesImages = useSectionImageAnimations(currentSection === 8, humanStudiesImagesArray.length);

  const biomorphologyImagesArray = [
    { src: Biology_biomorphology01 },
    { src: Biology_biomorphology02 },
    { src: Biology_biomorphology03 },
    { src: Biology_biomorphology04 },
    { src: Biology_biomorphology05 },
    { src: Biology_biomorphology06 }
  ];
  const biomorphologyImages = useSectionImageAnimations(currentSection === 9, biomorphologyImagesArray.length);

  const neuroscienceImagesArray = [
    { src: Biology_neuroscience01 },
    { src: Biology_neuroscience02 },
    { src: Biology_neuroscience03 },
    { src: Biology_neuroscience04 },
    { src: Biology_neuroscience05 },
    { src: Biology_neuroscience06 }
  ];
  const neuroscienceImages = useSectionImageAnimations(currentSection === 10, neuroscienceImagesArray.length);

  const bioengineeringImagesArray = [
    { src: Biology_bioengineering01 },
    { src: Biology_bioengineering02 },
    { src: Biology_bioengineering03 },
    { src: Biology_bioengineering04 },
    { src: Biology_bioengineering05 },
    { src: Biology_bioengineering06 }
  ];
  const bioengineeringImages = useSectionImageAnimations(currentSection === 11, bioengineeringImagesArray.length);

  const bioinformaticsImagesArray = [
    { src: Biology_bioinformatics01 },
    { src: Biology_bioinformatics02 },
    { src: Biology_bioinformatics03 },
    { src: Biology_bioinformatics04 },
    { src: Biology_bioinformatics05 },
    { src: Biology_bioinformatics06 }
  ];
  const bioinformaticsImages = useSectionImageAnimations(currentSection === 12, bioinformaticsImagesArray.length);

  const geneticDevelopmentImagesArray = [
    { src: Biology_genetic_development01 },
    { src: Biology_genetic_development02 },
    { src: Biology_genetic_development03 },
    { src: Biology_genetic_development04 },
    { src: Biology_genetic_development05 },
    { src: Biology_genetic_development06 }
  ];
  const geneticDevelopmentImages = useSectionImageAnimations(currentSection === 13, geneticDevelopmentImagesArray.length);

  const cellImagesArray = [
    { src: Biology_cell01 },
    { src: Biology_cell02 },
    { src: Biology_cell03 },
    { src: Biology_cell04 },
    { src: Biology_cell05 },
    { src: Biology_cell06 }
  ];
  const cellImages = useSectionImageAnimations(currentSection === 14, cellImagesArray.length);

  const biophysicsImagesArray = [
    { src: Biology_biophysics01 },
    { src: Biology_biophysics02 },
    { src: Biology_biophysics03 },
    { src: Biology_biophysics04 },
    { src: Biology_biophysics05 },
    { src: Biology_biophysics06 }
  ];
  const biophysicsImages = useSectionImageAnimations(currentSection === 15, biophysicsImagesArray.length);

  const biochemistryImagesArray = [
    { src: Biology_biochemistry01 },
    { src: Biology_biochemistry02 },
    { src: Biology_biochemistry03 },
    { src: Biology_biochemistry04 },
    { src: Biology_biochemistry05 },
    { src: Biology_biochemistry06 }
  ];
  const biochemistryImages = useSectionImageAnimations(currentSection === 16, biochemistryImagesArray.length);

  // --- 各セクションの外部HTMLマークアップ取得用stateとfetch処理 ---
  const [agriculturalResearchHtml, setAgriculturalResearchHtml] = useState<string>('');
  const [agriculturalResearchLoading, setAgriculturalResearchLoading] = useState<boolean>(true);
  const [agriculturalResearchError, setAgriculturalResearchError] = useState<string | null>(null);

  const [plantResearchHtml, setPlantResearchHtml] = useState<string>('');
  const [plantResearchLoading, setPlantResearchLoading] = useState<boolean>(true);
  const [plantResearchError, setPlantResearchError] = useState<string | null>(null);

  const [biologicalClassificationHtml, setBiologicalClassificationHtml] = useState<string>('');
  const [biologicalClassificationLoading, setBiologicalClassificationLoading] = useState<boolean>(true);
  const [biologicalClassificationError, setBiologicalClassificationError] = useState<string | null>(null);

  const [ecologicalResearchHtml, setEcologicalResearchHtml] = useState<string>('');
  const [ecologicalResearchLoading, setEcologicalResearchLoading] = useState<boolean>(true);
  const [ecologicalResearchError, setEcologicalResearchError] = useState<string | null>(null);

  const [animalResearchHtml, setAnimalResearchHtml] = useState<string>('');
  const [animalResearchLoading, setAnimalResearchLoading] = useState<boolean>(true);
  const [animalResearchError, setAnimalResearchError] = useState<string | null>(null);

  const [evolutionaryResearchHtml, setEvolutionaryResearchHtml] = useState<string>('');
  const [evolutionaryResearchLoading, setEvolutionaryResearchLoading] = useState<boolean>(true);
  const [evolutionaryResearchError, setEvolutionaryResearchError] = useState<string | null>(null);

  const [extraterrestrialLifeHtml, setExtraterrestrialLifeHtml] = useState<string>('');
  const [extraterrestrialLifeLoading, setExtraterrestrialLifeLoading] = useState<boolean>(true);
  const [extraterrestrialLifeError, setExtraterrestrialLifeError] = useState<string | null>(null);

  const [humanStudiesHtml, setHumanStudiesHtml] = useState<string>('');
  const [humanStudiesLoading, setHumanStudiesLoading] = useState<boolean>(true);
  const [humanStudiesError, setHumanStudiesError] = useState<string | null>(null);

  const [biomorphologyHtml, setBiomorphologyHtml] = useState<string>('');
  const [biomorphologyLoading, setBiomorphologyLoading] = useState<boolean>(true);
  const [biomorphologyError, setBiomorphologyError] = useState<string | null>(null);

  const [neuroscienceHtml, setNeuroscienceHtml] = useState<string>('');
  const [neuroscienceLoading, setNeuroscienceLoading] = useState<boolean>(true);
  const [neuroscienceError, setNeuroscienceError] = useState<string | null>(null);

  const [bioengineeringHtml, setBioengineeringHtml] = useState<string>('');
  const [bioengineeringLoading, setBioengineeringLoading] = useState<boolean>(true);
  const [bioengineeringError, setBioengineeringError] = useState<string | null>(null);

  const [bioinformaticsHtml, setBioinformaticsHtml] = useState<string>('');
  const [bioinformaticsLoading, setBioinformaticsLoading] = useState<boolean>(true);
  const [bioinformaticsError, setBioinformaticsError] = useState<string | null>(null);

  const [geneticDevelopmentHtml, setGeneticDevelopmentHtml] = useState<string>('');
  const [geneticDevelopmentLoading, setGeneticDevelopmentLoading] = useState<boolean>(true);
  const [geneticDevelopmentError, setGeneticDevelopmentError] = useState<string | null>(null);

  const [cellHtml, setCellHtml] = useState<string>('');
  const [cellLoading, setCellLoading] = useState<boolean>(true);
  const [cellError, setCellError] = useState<string | null>(null);

  const [biophysicsHtml, setBiophysicsHtml] = useState<string>('');
  const [biophysicsLoading, setBiophysicsLoading] = useState<boolean>(true);
  const [biophysicsError, setBiophysicsError] = useState<string | null>(null);

  const [biochemistryHtml, setBiochemistryHtml] = useState<string>('');
  const [biochemistryLoading, setBiochemistryLoading] = useState<boolean>(true);
  const [biochemistryError, setBiochemistryError] = useState<string | null>(null);

  const basePath =
    window.location.hostname === 'localhost'
      ? '/texts/'
      : `${import.meta.env.VITE_TEXTS_BASE_URL}/13jellies/jelliy_contents/dist/texts/`;

  useEffect(() => {
    // 農研究
    fetch(`${basePath}biology_agricultural_research.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setAgriculturalResearchHtml(html);
        setAgriculturalResearchLoading(false);
      })
      .catch((_err) => {
        setAgriculturalResearchError('読み込みにエラーが発生しました。再読込してみてください。');
        setAgriculturalResearchLoading(false);
      });

    // 植物研究
    fetch(`${basePath}biology_plant_research.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setPlantResearchHtml(html);
        setPlantResearchLoading(false);
      })
      .catch((_err) => {
        setPlantResearchError('読み込みにエラーが発生しました。再読込してみてください。');
        setPlantResearchLoading(false);
      });

    // 生物分類
    fetch(`${basePath}biology_biological_classification.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setBiologicalClassificationHtml(html);
        setBiologicalClassificationLoading(false);
      })
      .catch((_err) => {
        setBiologicalClassificationError('読み込みにエラーが発生しました。再読込してみてください。');
        setBiologicalClassificationLoading(false);
      });

    // 生態研究
    fetch(`${basePath}biology_ecological_research.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setEcologicalResearchHtml(html);
        setEcologicalResearchLoading(false);
      })
      .catch((_err) => {
        setEcologicalResearchError('読み込みにエラーが発生しました。再読込してみてください。');
        setEcologicalResearchLoading(false);
      });

    // 動物研究
    fetch(`${basePath}biology_animal_research.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setAnimalResearchHtml(html);
        setAnimalResearchLoading(false);
      })
      .catch((_err) => {
        setAnimalResearchError('読み込みにエラーが発生しました。再読込してみてください。');
        setAnimalResearchLoading(false);
      });

    // 進化研究
    fetch(`${basePath}biology_evolutionary_research.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setEvolutionaryResearchHtml(html);
        setEvolutionaryResearchLoading(false);
      })
      .catch((_err) => {
        setEvolutionaryResearchError('読み込みにエラーが発生しました。再読込してみてください。');
        setEvolutionaryResearchLoading(false);
      });

    // 地球外生物研究
    fetch(`${basePath}biology_extraterrestrial_life.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setExtraterrestrialLifeHtml(html);
        setExtraterrestrialLifeLoading(false);
      })
      .catch((_err) => {
        setExtraterrestrialLifeError('読み込みにエラーが発生しました。再読込してみてください。');
        setExtraterrestrialLifeLoading(false);
      });

    // 人類研究
    fetch(`${basePath}biology_human_studies.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setHumanStudiesHtml(html);
        setHumanStudiesLoading(false);
      })
      .catch((_err) => {
        setHumanStudiesError('読み込みにエラーが発生しました。再読込してみてください。');
        setHumanStudiesLoading(false);
      });

    // 生物形態研究
    fetch(`${basePath}biology_biomorphology.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setBiomorphologyHtml(html);
        setBiomorphologyLoading(false);
      })
      .catch((_err) => {
        setBiomorphologyError('読み込みにエラーが発生しました。再読込してみてください。');
        setBiomorphologyLoading(false);
      });

    // 脳神経科学
    fetch(`${basePath}biology_neuroscience.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setNeuroscienceHtml(html);
        setNeuroscienceLoading(false);
      })
      .catch((_err) => {
        setNeuroscienceError('読み込みにエラーが発生しました。再読込してみてください。');
        setNeuroscienceLoading(false);
      });

    // 生物工学
    fetch(`${basePath}biology_bioengineering.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setBioengineeringHtml(html);
        setBioengineeringLoading(false);
      })
      .catch((_err) => {
        setBioengineeringError('読み込みにエラーが発生しました。再読込してみてください。');
        setBioengineeringLoading(false);
      });

    // 生物情報研究
    fetch(`${basePath}biology_bioinformatics.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setBioinformaticsHtml(html);
        setBioinformaticsLoading(false);
      })
      .catch((_err) => {
        setBioinformaticsError('読み込みにエラーが発生しました。再読込してみてください。');
        setBioinformaticsLoading(false);
      });

    // 遺伝発生研究
    fetch(`${basePath}biology_genetic_development.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setGeneticDevelopmentHtml(html);
        setGeneticDevelopmentLoading(false);
      })
      .catch((_err) => {
        setGeneticDevelopmentError('読み込みにエラーが発生しました。再読込してみてください。');
        setGeneticDevelopmentLoading(false);
      });

    // 細胞研究
    fetch(`${basePath}biology_cell.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setCellHtml(html);
        setCellLoading(false);
      })
      .catch((_err) => {
        setCellError('読み込みにエラーが発生しました。再読込してみてください。');
        setCellLoading(false);
      });

    // 生物物理
    fetch(`${basePath}biology_biophysics.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setBiophysicsHtml(html);
        setBiophysicsLoading(false);
      })
      .catch((_err) => {
        setBiophysicsError('読み込みにエラーが発生しました。再読込してみてください。');
        setBiophysicsLoading(false);
      });

    // 生化学研究
    fetch(`${basePath}biology_biochemistry.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setBiochemistryHtml(html);
        setBiochemistryLoading(false);
      })
      .catch((_err) => {
        setBiochemistryError('読み込みにエラーが発生しました。再読込してみてください。');
        setBiochemistryLoading(false);
      });
  }, []);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload([
    agriculturalResearchImagesArray,
    plantResearchImagesArray,
    biologicalClassificationImagesArray,
    ecologicalResearchImagesArray,
    animalResearchImagesArray,
    evolutionaryResearchImagesArray,
    extraterrestrialLifeImagesArray,
    humanStudiesImagesArray,
    biomorphologyImagesArray,
    neuroscienceImagesArray,
    bioengineeringImagesArray,
    bioinformaticsImagesArray,
    geneticDevelopmentImagesArray,
    cellImagesArray,
    biophysicsImagesArray,
    biochemistryImagesArray
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
            <li className='biological_classification'><a href="#biological_classification" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 生物分類 */}
            <li className='ecological_research'><a href="#ecological_research" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 生態研究 */}
            <li className='animal_research'><a href="#animal_research" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 動物研究 */}
            <li className='evolutionary_research'><a href="#evolutionary_research" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 進化研究 */}
            <li className='extraterrestrial_life'><a href="#extraterrestrial_life" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 地球外生物研究 */}
            <li className='human_studies'><a href="#human_studies" onClick={(e) => { e.preventDefault(); setCurrentSection(8); }}></a></li>{/* 人類研究 */}
            <li className='biomorphology'><a href="#biomorphology" onClick={(e) => { e.preventDefault(); setCurrentSection(9); }}></a></li>{/* 生物形態研究 */}
            <li className='neuroscience'><a href="#neuroscience" onClick={(e) => { e.preventDefault(); setCurrentSection(10); }}></a></li>{/* 脳神経科学 */}
            <li className='bioengineering'><a href="#bioengineering" onClick={(e) => { e.preventDefault(); setCurrentSection(11); }}></a></li>{/* 生物工学 */}
            <li className='bioinformatics'><a href="#bioinformatics" onClick={(e) => { e.preventDefault(); setCurrentSection(12); }}></a></li>{/* 生物情報研究 */}
            <li className='genetic_development'><a href="#genetic_development" onClick={(e) => { e.preventDefault(); setCurrentSection(13); }}></a></li>{/* 遺伝発生研究 */}
            <li className='cell'><a href="#cell" onClick={(e) => { e.preventDefault(); setCurrentSection(14); }}></a></li>{/* 細胞研究 */}
            <li className='biophysics'><a href="#biophysics" onClick={(e) => { e.preventDefault(); setCurrentSection(15); }}></a></li>{/* 生物物理 */}
            <li className='biochemistry'><a href="#biochemistry" onClick={(e) => { e.preventDefault(); setCurrentSection(16); }}></a></li>{/* 生化学研究 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
            <h3>見出し</h3><p>ガイダンスのテキスト</p>
          </article>
        </div>
        <div className='back_to_map'>
          <a href="https://cf268321.cloudfree.jp/13jellies/#jellies_map">
            <figure className='back_to_map_figure'><img src='https://cf268321.cloudfree.jp/13jellies/asset/img/13jellies_A.png' /></figure>
            <p className='back_to_map_text'>13個のゼリー</p></a>
        </div>
      </section>

      {/* 農研究セクション */}
      <section
        className='block_text_right'
        id='agricultural_research'
        ref={agriculturalResearchRef}
        style={sectionStyle(1)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={agriculturalResearchImagesArray}
            imagesState={agriculturalResearchImages.imagesState}
            imagesStyles={agriculturalResearchImages.imagesStyles}
            imageEffects={agriculturalResearchImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={agriculturalResearchScrollRef}
            style={scrollableStyle(currentSection === 1)}>
            {agriculturalResearchLoading && <div>読み込み中...</div>}
            {agriculturalResearchError && <div style={{ color: 'red' }}>{agriculturalResearchError}</div>}
            {!agriculturalResearchLoading && !agriculturalResearchError && (
              <div dangerouslySetInnerHTML={{ __html: agriculturalResearchHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 植物研究セクション */}
      <section
        className='block_text_left'
        id='plant_research'
        ref={plantResearchRef}
        style={sectionStyle(2)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={plantResearchScrollRef}
            style={scrollableStyle(currentSection === 2)}>
            {plantResearchLoading && <div>読み込み中...</div>}
            {plantResearchError && <div style={{ color: 'red' }}>{plantResearchError}</div>}
            {!plantResearchLoading && !plantResearchError && (
              <div dangerouslySetInnerHTML={{ __html: plantResearchHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={plantResearchImagesArray}
            imagesState={plantResearchImages.imagesState}
            imagesStyles={plantResearchImages.imagesStyles}
            imageEffects={plantResearchImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 生物分類セクション */}
      <section
        className='block_text_right'
        id='biological_classification'
        ref={biologicalClassificationRef}
        style={sectionStyle(3)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={biologicalClassificationImagesArray}
            imagesState={biologicalClassificationImages.imagesState}
            imagesStyles={biologicalClassificationImages.imagesStyles}
            imageEffects={biologicalClassificationImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={biologicalClassificationScrollRef}
            style={scrollableStyle(currentSection === 3)}>
            {biologicalClassificationLoading && <div>読み込み中...</div>}
            {biologicalClassificationError && <div style={{ color: 'red' }}>{biologicalClassificationError}</div>}
            {!biologicalClassificationLoading && !biologicalClassificationError && (
              <div dangerouslySetInnerHTML={{ __html: biologicalClassificationHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 生態研究セクション */}
      <section
        className='block_text_left'
        id='ecological_research'
        ref={ecologicalResearchRef}
        style={sectionStyle(4)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={ecologicalResearchScrollRef}
            style={scrollableStyle(currentSection === 4)}>
            {ecologicalResearchLoading && <div>読み込み中...</div>}
            {ecologicalResearchError && <div style={{ color: 'red' }}>{ecologicalResearchError}</div>}
            {!ecologicalResearchLoading && !ecologicalResearchError && (
              <div dangerouslySetInnerHTML={{ __html: ecologicalResearchHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={ecologicalResearchImagesArray}
            imagesState={ecologicalResearchImages.imagesState}
            imagesStyles={ecologicalResearchImages.imagesStyles}
            imageEffects={ecologicalResearchImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 動物研究セクション */}
      <section
        className='block_text_right'
        id='animal_research'
        ref={animalResearchRef}
        style={sectionStyle(5)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={animalResearchImagesArray}
            imagesState={animalResearchImages.imagesState}
            imagesStyles={animalResearchImages.imagesStyles}
            imageEffects={animalResearchImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={animalResearchScrollRef}
            style={scrollableStyle(currentSection === 5)}>
            {animalResearchLoading && <div>読み込み中...</div>}
            {animalResearchError && <div style={{ color: 'red' }}>{animalResearchError}</div>}
            {!animalResearchLoading && !animalResearchError && (
              <div dangerouslySetInnerHTML={{ __html: animalResearchHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 進化研究セクション */}
      <section
        className='block_text_left'
        id='evolutionary_research'
        ref={evolutionaryResearchRef}
        style={sectionStyle(6)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={evolutionaryResearchScrollRef}
            style={scrollableStyle(currentSection === 6)}>
            {evolutionaryResearchLoading && <div>読み込み中...</div>}
            {evolutionaryResearchError && <div style={{ color: 'red' }}>{evolutionaryResearchError}</div>}
            {!evolutionaryResearchLoading && !evolutionaryResearchError && (
              <div dangerouslySetInnerHTML={{ __html: evolutionaryResearchHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={evolutionaryResearchImagesArray}
            imagesState={evolutionaryResearchImages.imagesState}
            imagesStyles={evolutionaryResearchImages.imagesStyles}
            imageEffects={evolutionaryResearchImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 地球外生物研究セクション */}
      <section
        className='block_text_right'
        id='extraterrestrial_life'
        ref={extraterrestrialLifeRef}
        style={sectionStyle(7)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={extraterrestrialLifeImagesArray}
            imagesState={extraterrestrialLifeImages.imagesState}
            imagesStyles={extraterrestrialLifeImages.imagesStyles}
            imageEffects={extraterrestrialLifeImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={extraterrestrialLifeScrollRef}
            style={scrollableStyle(currentSection === 7)}>
            {extraterrestrialLifeLoading && <div>読み込み中...</div>}
            {extraterrestrialLifeError && <div style={{ color: 'red' }}>{extraterrestrialLifeError}</div>}
            {!extraterrestrialLifeLoading && !extraterrestrialLifeError && (
              <div dangerouslySetInnerHTML={{ __html: extraterrestrialLifeHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 人類研究セクション */}
      <section
        className='block_text_left'
        id='human_studies'
        ref={humanStudiesRef}
        style={sectionStyle(8)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={humanStudiesScrollRef}
            style={scrollableStyle(currentSection === 8)}>
            {humanStudiesLoading && <div>読み込み中...</div>}
            {humanStudiesError && <div style={{ color: 'red' }}>{humanStudiesError}</div>}
            {!humanStudiesLoading && !humanStudiesError && (
              <div dangerouslySetInnerHTML={{ __html: humanStudiesHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={humanStudiesImagesArray}
            imagesState={humanStudiesImages.imagesState}
            imagesStyles={humanStudiesImages.imagesStyles}
            imageEffects={humanStudiesImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 生物形態研究セクション */}
      <section
        className='block_text_right'
        id='biomorphology'
        ref={biomorphologyRef}
        style={sectionStyle(9)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={biomorphologyImagesArray}
            imagesState={biomorphologyImages.imagesState}
            imagesStyles={biomorphologyImages.imagesStyles}
            imageEffects={biomorphologyImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={biomorphologyScrollRef}
            style={scrollableStyle(currentSection === 9)}>
            {biomorphologyLoading && <div>読み込み中...</div>}
            {biomorphologyError && <div style={{ color: 'red' }}>{biomorphologyError}</div>}
            {!biomorphologyLoading && !biomorphologyError && (
              <div dangerouslySetInnerHTML={{ __html: biomorphologyHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 脳神経科学セクション */}
      <section
        className='block_text_left'
        id='neuroscience'
        ref={neuroscienceRef}
        style={sectionStyle(10)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={neuroscienceScrollRef}
            style={scrollableStyle(currentSection === 10)}>
            {neuroscienceLoading && <div>読み込み中...</div>}
            {neuroscienceError && <div style={{ color: 'red' }}>{neuroscienceError}</div>}
            {!neuroscienceLoading && !neuroscienceError && (
              <div dangerouslySetInnerHTML={{ __html: neuroscienceHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={neuroscienceImagesArray}
            imagesState={neuroscienceImages.imagesState}
            imagesStyles={neuroscienceImages.imagesStyles}
            imageEffects={neuroscienceImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 生物工学セクション */}
      <section
        className='block_text_right'
        id='bioengineering'
        ref={bioengineeringRef}
        style={sectionStyle(11)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={bioengineeringImagesArray}
            imagesState={bioengineeringImages.imagesState}
            imagesStyles={bioengineeringImages.imagesStyles}
            imageEffects={bioengineeringImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={bioengineeringScrollRef}
            style={scrollableStyle(currentSection === 11)}>
            {bioengineeringLoading && <div>読み込み中...</div>}
            {bioengineeringError && <div style={{ color: 'red' }}>{bioengineeringError}</div>}
            {!bioengineeringLoading && !bioengineeringError && (
              <div dangerouslySetInnerHTML={{ __html: bioengineeringHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 生物情報研究セクション */}
      <section
        className='block_text_left'
        id='bioinformatics'
        ref={bioinformaticsRef}
        style={sectionStyle(12)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={bioinformaticsScrollRef}
            style={scrollableStyle(currentSection === 12)}>
            {bioinformaticsLoading && <div>読み込み中...</div>}
            {bioinformaticsError && <div style={{ color: 'red' }}>{bioinformaticsError}</div>}
            {!bioinformaticsLoading && !bioinformaticsError && (
              <div dangerouslySetInnerHTML={{ __html: bioinformaticsHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={bioinformaticsImagesArray}
            imagesState={bioinformaticsImages.imagesState}
            imagesStyles={bioinformaticsImages.imagesStyles}
            imageEffects={bioinformaticsImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 遺伝発生研究セクション */}
      <section
        className='block_text_right'
        id='genetic_development'
        ref={geneticDevelopmentRef}
        style={sectionStyle(13)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={geneticDevelopmentImagesArray}
            imagesState={geneticDevelopmentImages.imagesState}
            imagesStyles={geneticDevelopmentImages.imagesStyles}
            imageEffects={geneticDevelopmentImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={geneticDevelopmentScrollRef}
            style={scrollableStyle(currentSection === 13)}>
            {geneticDevelopmentLoading && <div>読み込み中...</div>}
            {geneticDevelopmentError && <div style={{ color: 'red' }}>{geneticDevelopmentError}</div>}
            {!geneticDevelopmentLoading && !geneticDevelopmentError && (
              <div dangerouslySetInnerHTML={{ __html: geneticDevelopmentHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 細胞研究セクション */}
      <section
        className='block_text_left'
        id='cell'
        ref={cellRef}
        style={sectionStyle(14)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={cellScrollRef}
            style={scrollableStyle(currentSection === 14)}>
            {cellLoading && <div>読み込み中...</div>}
            {cellError && <div style={{ color: 'red' }}>{cellError}</div>}
            {!cellLoading && !cellError && (
              <div dangerouslySetInnerHTML={{ __html: cellHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={cellImagesArray}
            imagesState={cellImages.imagesState}
            imagesStyles={cellImages.imagesStyles}
            imageEffects={cellImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 生物物理セクション */}
      <section
        className='block_text_right'
        id='biophysics'
        ref={biophysicsRef}
        style={sectionStyle(15)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={biophysicsImagesArray}
            imagesState={biophysicsImages.imagesState}
            imagesStyles={biophysicsImages.imagesStyles}
            imageEffects={biophysicsImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={biophysicsScrollRef}
            style={scrollableStyle(currentSection === 15)}>
            {biophysicsLoading && <div>読み込み中...</div>}
            {biophysicsError && <div style={{ color: 'red' }}>{biophysicsError}</div>}
            {!biophysicsLoading && !biophysicsError && (
              <div dangerouslySetInnerHTML={{ __html: biophysicsHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 生化学研究セクション */}
      <section
        className='block_text_left'
        id='biochemistry'
        ref={biochemistryRef}
        style={sectionStyle(16)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={biochemistryImagesArray}
            imagesState={biochemistryImages.imagesState}
            imagesStyles={biochemistryImages.imagesStyles}
            imageEffects={biochemistryImages.imageEffects}
            blockClass="right"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={biochemistryScrollRef}
            style={scrollableStyle(currentSection === 16)}>
            {biochemistryLoading && <div>読み込み中...</div>}
            {biochemistryError && <div style={{ color: 'red' }}>{biochemistryError}</div>}
            {!biochemistryLoading && !biochemistryError && (
              <div dangerouslySetInnerHTML={{ __html: biochemistryHtml }} />
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

export default Biology;
