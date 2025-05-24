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

  // 各セクションごとに画像配列を命名ルールに合わせて定義
  const medicalLawImagesArray = [
    { src: Medicine_medicalLaw01 },
    { src: Medicine_medicalLaw02 },
    { src: Medicine_medicalLaw03 },
    { src: Medicine_medicalLaw04 },
    { src: Medicine_medicalLaw05 },
    { src: Medicine_medicalLaw06 }
  ];
  const medicalLawImages = useSectionImageAnimations(currentSection === 1, medicalLawImagesArray.length);

  const publicHealthImagesArray = [
    { src: Medicine_publicHealth01 },
    { src: Medicine_publicHealth02 },
    { src: Medicine_publicHealth03 },
    { src: Medicine_publicHealth04 },
    { src: Medicine_publicHealth05 },
    { src: Medicine_publicHealth06 }
  ];
  const publicHealthImages = useSectionImageAnimations(currentSection === 2, publicHealthImagesArray.length);

  const anatomyImagesArray = [
    { src: Medicine_anatomy01 },
    { src: Medicine_anatomy02 },
    { src: Medicine_anatomy03 },
    { src: Medicine_anatomy04 },
    { src: Medicine_anatomy05 },
    { src: Medicine_anatomy06 }
  ];
  const anatomyImages = useSectionImageAnimations(currentSection === 3, anatomyImagesArray.length);

  const clinicalImagesArray = [
    { src: Medicine_clinical01 },
    { src: Medicine_clinical02 },
    { src: Medicine_clinical03 },
    { src: Medicine_clinical04 },
    { src: Medicine_clinical05 },
    { src: Medicine_clinical06 }
  ];
  const clinicalImages = useSectionImageAnimations(currentSection === 4, clinicalImagesArray.length);

  const pathologyImagesArray = [
    { src: Medicine_pathology01 },
    { src: Medicine_pathology02 },
    { src: Medicine_pathology03 },
    { src: Medicine_pathology04 },
    { src: Medicine_pathology05 },
    { src: Medicine_pathology06 }
  ];
  const pathologyImages = useSectionImageAnimations(currentSection === 5, pathologyImagesArray.length);

  const physiologyImagesArray = [
    { src: Medicine_physiology01 },
    { src: Medicine_physiology02 },
    { src: Medicine_physiology03 },
    { src: Medicine_physiology04 },
    { src: Medicine_physiology05 },
    { src: Medicine_physiology06 }
  ];
  const physiologyImages = useSectionImageAnimations(currentSection === 6, physiologyImagesArray.length);

  const pharmacologyImagesArray = [
    { src: Medicine_pharmacology01 },
    { src: Medicine_pharmacology02 },
    { src: Medicine_pharmacology03 },
    { src: Medicine_pharmacology04 },
    { src: Medicine_pharmacology05 },
    { src: Medicine_pharmacology06 }
  ];
  const pharmacologyImages = useSectionImageAnimations(currentSection === 7, pharmacologyImagesArray.length);

  const microbiologyImagesArray = [
    { src: Medicine_microbiology01 },
    { src: Medicine_microbiology02 },
    { src: Medicine_microbiology03 },
    { src: Medicine_microbiology04 },
    { src: Medicine_microbiology05 },
    { src: Medicine_microbiology06 }
  ];
  const microbiologyImages = useSectionImageAnimations(currentSection === 8, microbiologyImagesArray.length);

  const biochemistryImagesArray = [
    { src: Medicine_biochemistry01 },
    { src: Medicine_biochemistry02 },
    { src: Medicine_biochemistry03 },
    { src: Medicine_biochemistry04 },
    { src: Medicine_biochemistry05 },
    { src: Medicine_biochemistry06 }
  ];
  const biochemistryImages = useSectionImageAnimations(currentSection === 9, biochemistryImagesArray.length);

  // --- 段階的に画像をプリロードさせ、loading表示の待機時間を減らす ---
  useStepImagePreload([
    medicalLawImagesArray,
    publicHealthImagesArray,
    anatomyImagesArray,
    clinicalImagesArray,
    pathologyImagesArray,
    physiologyImagesArray,
    pharmacologyImagesArray,
    microbiologyImagesArray,
    biochemistryImagesArray
  ]);

  // --- 各セクションの外部HTMLマークアップ取得用stateとfetch処理 ---
  // 各セクションごとにstateを用意
  const [medicalLawHtml, setMedicalLawHtml] = useState<string>('');
  const [medicalLawLoading, setMedicalLawLoading] = useState<boolean>(true);
  const [medicalLawError, setMedicalLawError] = useState<string | null>(null);

  const [publicHealthHtml, setPublicHealthHtml] = useState<string>('');
  const [publicHealthLoading, setPublicHealthLoading] = useState<boolean>(true);
  const [publicHealthError, setPublicHealthError] = useState<string | null>(null);

  const [anatomyHtml, setAnatomyHtml] = useState<string>('');
  const [anatomyLoading, setAnatomyLoading] = useState<boolean>(true);
  const [anatomyError, setAnatomyError] = useState<string | null>(null);

  const [clinicalHtml, setClinicalHtml] = useState<string>('');
  const [clinicalLoading, setClinicalLoading] = useState<boolean>(true);
  const [clinicalError, setClinicalError] = useState<string | null>(null);

  const [pathologyHtml, setPathologyHtml] = useState<string>('');
  const [pathologyLoading, setPathologyLoading] = useState<boolean>(true);
  const [pathologyError, setPathologyError] = useState<string | null>(null);

  const [physiologyHtml, setPhysiologyHtml] = useState<string>('');
  const [physiologyLoading, setPhysiologyLoading] = useState<boolean>(true);
  const [physiologyError, setPhysiologyError] = useState<string | null>(null);

  const [pharmacologyHtml, setPharmacologyHtml] = useState<string>('');
  const [pharmacologyLoading, setPharmacologyLoading] = useState<boolean>(true);
  const [pharmacologyError, setPharmacologyError] = useState<string | null>(null);

  const [microbiologyHtml, setMicrobiologyHtml] = useState<string>('');
  const [microbiologyLoading, setMicrobiologyLoading] = useState<boolean>(true);
  const [microbiologyError, setMicrobiologyError] = useState<string | null>(null);

  const [biochemistryHtml, setBiochemistryHtml] = useState<string>('');
  const [biochemistryLoading, setBiochemistryLoading] = useState<boolean>(true);
  const [biochemistryError, setBiochemistryError] = useState<string | null>(null);

  const basePath =
    window.location.hostname === 'localhost'
      ? '/texts/'
      : `${import.meta.env.VITE_TEXTS_BASE_URL}/13jellies/jelliy_contents/dist/texts/`;

  useEffect(() => {
    // 各セクションごとにfetch
    fetch(`${basePath}medicine_medical_law.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setMedicalLawHtml(html);
        setMedicalLawLoading(false);
      })
      .catch((_err) => {
        setMedicalLawError('読み込みにエラーが発生しました。再読込してみてください。');
        setMedicalLawLoading(false);
      });

    fetch(`${basePath}medicine_public_health.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setPublicHealthHtml(html);
        setPublicHealthLoading(false);
      })
      .catch((_err) => {
        setPublicHealthError('読み込みにエラーが発生しました。再読込してみてください。');
        setPublicHealthLoading(false);
      });

    fetch(`${basePath}medicine_anatomy.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setAnatomyHtml(html);
        setAnatomyLoading(false);
      })
      .catch((_err) => {
        setAnatomyError('読み込みにエラーが発生しました。再読込してみてください。');
        setAnatomyLoading(false);
      });

    fetch(`${basePath}medicine_clinical.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setClinicalHtml(html);
        setClinicalLoading(false);
      })
      .catch((_err) => {
        setClinicalError('読み込みにエラーが発生しました。再読込してみてください。');
        setClinicalLoading(false);
      });

    fetch(`${basePath}medicine_pathology.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setPathologyHtml(html);
        setPathologyLoading(false);
      })
      .catch((_err) => {
        setPathologyError('読み込みにエラーが発生しました。再読込してみてください。');
        setPathologyLoading(false);
      });

    fetch(`${basePath}medicine_physiology.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setPhysiologyHtml(html);
        setPhysiologyLoading(false);
      })
      .catch((_err) => {
        setPhysiologyError('読み込みにエラーが発生しました。再読込してみてください。');
        setPhysiologyLoading(false);
      });

    fetch(`${basePath}medicine_pharmacology.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setPharmacologyHtml(html);
        setPharmacologyLoading(false);
      })
      .catch((_err) => {
        setPharmacologyError('読み込みにエラーが発生しました。再読込してみてください。');
        setPharmacologyLoading(false);
      });

    fetch(`${basePath}medicine_microbiology.html`)
      .then((res) => {
        if (!res.ok) throw new Error('ファイル取得エラー');
        return res.text();
      })
      .then((html) => {
        setMicrobiologyHtml(html);
        setMicrobiologyLoading(false);
      })
      .catch((_err) => {
        setMicrobiologyError('読み込みにエラーが発生しました。再読込してみてください。');
        setMicrobiologyLoading(false);
      });

    fetch(`${basePath}medicine_biochemistry.html`)
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
    medicalLawImagesArray,
    publicHealthImagesArray,
    anatomyImagesArray,
    clinicalImagesArray,
    pathologyImagesArray,
    physiologyImagesArray,
    pharmacologyImagesArray,
    microbiologyImagesArray,
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
            <li className='medical_law'><a href="#medical_law" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 医法 */}
            <li className='public_health'><a href="#public_health" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 公衆衛生学 */}
            <li className='anatomy'><a href="#anatomy" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 解剖学 */}
            <li className='clinical'><a href="#clinical" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 臨床 */}
            <li className='pathology'><a href="#pathology" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 病理学 */}
            <li className='physiology'><a href="#physiology" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 生理学 */}
            <li className='pharmacology'><a href="#pharmacology" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 薬理学 */}
            <li className='microbiology'><a href="#microbiology" onClick={(e) => { e.preventDefault(); setCurrentSection(8); }}></a></li>{/* 微生物学 */}
            <li className='biochemistry'><a href="#biochemistry" onClick={(e) => { e.preventDefault(); setCurrentSection(9); }}></a></li>{/* 生化学 */}
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

      {/* 医法セクション */}
      <section
        className='block_text_right'
        id='medical_law'
        ref={medicalLawRef}
        style={sectionStyle(1)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={medicalLawImagesArray}
            imagesState={medicalLawImages.imagesState}
            imagesStyles={medicalLawImages.imagesStyles}
            imageEffects={medicalLawImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={medicalLawScrollRef}
            style={scrollableStyle(currentSection === 1)}>
            {medicalLawLoading && <div>読み込み中...</div>}
            {medicalLawError && <div style={{ color: 'red' }}>{medicalLawError}</div>}
            {!medicalLawLoading && !medicalLawError && (
              <div dangerouslySetInnerHTML={{ __html: medicalLawHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 公衆衛生学セクション */}
      <section
        className='block_text_left'
        id='public_health'
        ref={publicHealthRef}
        style={sectionStyle(2)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={publicHealthScrollRef}
            style={scrollableStyle(currentSection === 2)}>
            {publicHealthLoading && <div>読み込み中...</div>}
            {publicHealthError && <div style={{ color: 'red' }}>{publicHealthError}</div>}
            {!publicHealthLoading && !publicHealthError && (
              <div dangerouslySetInnerHTML={{ __html: publicHealthHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={publicHealthImagesArray}
            imagesState={publicHealthImages.imagesState}
            imagesStyles={publicHealthImages.imagesStyles}
            imageEffects={publicHealthImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 解剖学セクション */}
      <section
        className='block_text_right'
        id='anatomy'
        ref={anatomyRef}
        style={sectionStyle(3)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={anatomyImagesArray}
            imagesState={anatomyImages.imagesState}
            imagesStyles={anatomyImages.imagesStyles}
            imageEffects={anatomyImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={anatomyScrollRef}
            style={scrollableStyle(currentSection === 3)}>
            {anatomyLoading && <div>読み込み中...</div>}
            {anatomyError && <div style={{ color: 'red' }}>{anatomyError}</div>}
            {!anatomyLoading && !anatomyError && (
              <div dangerouslySetInnerHTML={{ __html: anatomyHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 臨床セクション */}
      <section
        className='block_text_left'
        id='clinical'
        ref={clinicalRef}
        style={sectionStyle(4)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={clinicalScrollRef}
            style={scrollableStyle(currentSection === 4)}>
            {clinicalLoading && <div>読み込み中...</div>}
            {clinicalError && <div style={{ color: 'red' }}>{clinicalError}</div>}
            {!clinicalLoading && !clinicalError && (
              <div dangerouslySetInnerHTML={{ __html: clinicalHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={clinicalImagesArray}
            imagesState={clinicalImages.imagesState}
            imagesStyles={clinicalImages.imagesStyles}
            imageEffects={clinicalImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 病理学セクション */}
      <section
        className='block_text_right'
        id='pathology'
        ref={pathologyRef}
        style={sectionStyle(5)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={pathologyImagesArray}
            imagesState={pathologyImages.imagesState}
            imagesStyles={pathologyImages.imagesStyles}
            imageEffects={pathologyImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={pathologyScrollRef}
            style={scrollableStyle(currentSection === 5)}>
            {pathologyLoading && <div>読み込み中...</div>}
            {pathologyError && <div style={{ color: 'red' }}>{pathologyError}</div>}
            {!pathologyLoading && !pathologyError && (
              <div dangerouslySetInnerHTML={{ __html: pathologyHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 生理学セクション */}
      <section
        className='block_text_left'
        id='physiology'
        ref={physiologyRef}
        style={sectionStyle(6)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={physiologyScrollRef}
            style={scrollableStyle(currentSection === 6)}>
            {physiologyLoading && <div>読み込み中...</div>}
            {physiologyError && <div style={{ color: 'red' }}>{physiologyError}</div>}
            {!physiologyLoading && !physiologyError && (
              <div dangerouslySetInnerHTML={{ __html: physiologyHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={physiologyImagesArray}
            imagesState={physiologyImages.imagesState}
            imagesStyles={physiologyImages.imagesStyles}
            imageEffects={physiologyImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 薬理学セクション */}
      <section
        className='block_text_right'
        id='pharmacology'
        ref={pharmacologyRef}
        style={sectionStyle(7)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={pharmacologyImagesArray}
            imagesState={pharmacologyImages.imagesState}
            imagesStyles={pharmacologyImages.imagesStyles}
            imageEffects={pharmacologyImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={pharmacologyScrollRef}
            style={scrollableStyle(currentSection === 7)}>
            {pharmacologyLoading && <div>読み込み中...</div>}
            {pharmacologyError && <div style={{ color: 'red' }}>{pharmacologyError}</div>}
            {!pharmacologyLoading && !pharmacologyError && (
              <div dangerouslySetInnerHTML={{ __html: pharmacologyHtml }} />
            )}
          </div>
        </div>
      </section>

      {/* 微生物学セクション */}
      <section
        className='block_text_left'
        id='microbiology'
        ref={microbiologyRef}
        style={sectionStyle(8)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={microbiologyScrollRef}
            style={scrollableStyle(currentSection === 8)}>
            {microbiologyLoading && <div>読み込み中...</div>}
            {microbiologyError && <div style={{ color: 'red' }}>{microbiologyError}</div>}
            {!microbiologyLoading && !microbiologyError && (
              <div dangerouslySetInnerHTML={{ __html: microbiologyHtml }} />
            )}
          </div>
          <AnimatedFigureBlock
            images={microbiologyImagesArray}
            imagesState={microbiologyImages.imagesState}
            imagesStyles={microbiologyImages.imagesStyles}
            imageEffects={microbiologyImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 生化学セクション */}
      <section
        className='block_text_right'
        id='biochemistry'
        ref={biochemistryRef}
        style={sectionStyle(9)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={biochemistryImagesArray}
            imagesState={biochemistryImages.imagesState}
            imagesStyles={biochemistryImages.imagesStyles}
            imageEffects={biochemistryImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={biochemistryScrollRef}
            style={scrollableStyle(currentSection === 9)}>
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

export default Medicine;
