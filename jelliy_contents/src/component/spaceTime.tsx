import { useRef } from 'react';
import {
  useSectionScroll,
  useSectionImageAnimations,
  useFirstViewMeritDemeritAnimation,
  useFirstViewImageAnimation,
  AnimatedFigureBlock,
  topButtonStyle
} from './_common_component';
import SpaceTime_1stView from '../assets/SpaceTime_1stView01.png';
import SpaceTime_dummy01 from '../assets/SpaceTime_dummy01.jpg';
import SpaceTime_dummy02 from '../assets/SpaceTime_dummy02.jpg';
import SpaceTime_dummy03 from '../assets/SpaceTime_dummy03.png';
import SpaceTime_dummy04 from '../assets/SpaceTime_dummy02.jpg';
import SpaceTime_dummy05 from '../assets/SpaceTime_dummy01.jpg';
import SpaceTime_dummy06 from '../assets/SpaceTime_dummy02.jpg';

import './_common_css.css';
import './spaceTime.css';

function SpaceTime() {
  // セクションの参照
  const firstViewRef = useRef<HTMLElement>(null);
  const historyRef = useRef<HTMLElement>(null);
  const historyScrollRef = useRef<HTMLDivElement>(null);
  const socialGeographyRef = useRef<HTMLElement>(null);
  const socialGeographyScrollRef = useRef<HTMLDivElement>(null);
  const earthHistoryRef = useRef<HTMLElement>(null);
  const earthHistoryScrollRef = useRef<HTMLDivElement>(null);
  const naturalGeographyRef = useRef<HTMLElement>(null);
  const naturalGeographyScrollRef = useRef<HTMLDivElement>(null);
  const geologyRef = useRef<HTMLElement>(null);
  const geologyScrollRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLElement>(null);
  const atmosphereScrollRef = useRef<HTMLDivElement>(null);
  const oceanographyRef = useRef<HTMLElement>(null);
  const oceanographyScrollRef = useRef<HTMLDivElement>(null);
  const astronomyRef = useRef<HTMLElement>(null);
  const astronomyScrollRef = useRef<HTMLDivElement>(null);

  // セクションの定義 - 配列の順序と実際のセクション数を合わせる
  const sections = [
    { ref: firstViewRef, scrollRef: null },
    { ref: historyRef, scrollRef: historyScrollRef },
    { ref: socialGeographyRef, scrollRef: socialGeographyScrollRef },
    { ref: earthHistoryRef, scrollRef: earthHistoryScrollRef },
    { ref: naturalGeographyRef, scrollRef: naturalGeographyScrollRef },
    { ref: geologyRef, scrollRef: geologyScrollRef },
    { ref: atmosphereRef, scrollRef: atmosphereScrollRef },
    { ref: oceanographyRef, scrollRef: oceanographyScrollRef },
    { ref: astronomyRef, scrollRef: astronomyScrollRef },
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

  // セクションの画像アニメーションを管理するカスタムフック
  const historyImages = useSectionImageAnimations(currentSection === 1);
  const socialGeographyImages = useSectionImageAnimations(currentSection === 2);
  const earthHistoryImages = useSectionImageAnimations(currentSection === 3);
  const naturalGeographyImages = useSectionImageAnimations(currentSection === 4);
  const geologyImages = useSectionImageAnimations(currentSection === 5);
  const atmosphereImages = useSectionImageAnimations(currentSection === 6);
  const oceanographyImages = useSectionImageAnimations(currentSection === 7);
  const astronomyImages = useSectionImageAnimations(currentSection === 8);

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
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          {/* 画像アニメーションのフィルター群 */}
          {/* ピクセル化フィルター */}
          <filter id="pixelate_x4">
            <feFlood x="4" y="4" height="8" width="8" />
            <feComposite width="8" height="8" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="1" />
          </filter>

          <filter id="pixelate_x2">
            <feFlood x="4" y="4" height="2" width="2" />
            <feComposite width="8" height="8" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="1" />
          </filter>

          {/* ノイズフィルター */}
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 0.5 0" />
            <feComposite operator="in" in2="SourceGraphic" />
            <feBlend mode="multiply" in2="SourceGraphic" result="noisy" />
          </filter>
        </defs>
      </svg>

      <section className='first_view' ref={firstViewRef} style={sectionStyle(0)}>
        <h1 className='space_time_h1'>時空</h1>
        <div className='position_relative'>
          <figure className='jelly_map'>
            <img
              src={SpaceTime_1stView}
              alt=""
              className={imageAnimationClass}
            />
          </figure>
          <ul className='page_anchor_list'>
            <li className='history'><a href="#history" onClick={(e) => { e.preventDefault(); setCurrentSection(1); }}></a></li>{/* 歴史 */}
            <li className='social_geography'><a href="#social_geography" onClick={(e) => { e.preventDefault(); setCurrentSection(2); }}></a></li>{/* 社会地理 */}
            <li className='earth_history'><a href="#earth_history" onClick={(e) => { e.preventDefault(); setCurrentSection(3); }}></a></li>{/* 地球史 */}
            <li className='natural_geography'><a href="#natural_geography" onClick={(e) => { e.preventDefault(); setCurrentSection(4); }}></a></li>{/* 自然地理 */}
            <li className='geology'><a href="#geology" onClick={(e) => { e.preventDefault(); setCurrentSection(5); }}></a></li>{/* 地質研究 */}
            <li className='atmosphere'><a href="#atmosphere" onClick={(e) => { e.preventDefault(); setCurrentSection(6); }}></a></li>{/* 大気研究 */}
            <li className='oceanography'><a href="#oceanography" onClick={(e) => { e.preventDefault(); setCurrentSection(7); }}></a></li>{/* 海洋研究 */}
            <li className='astronomy'><a href="#astronomy" onClick={(e) => { e.preventDefault(); setCurrentSection(8); }}></a></li>{/* 天文 */}
          </ul>
        </div>
        <div className='merit_and_demerit_block scroller_decoration'>
          <article className={`merit ${animateMerit ? 'animate' : ''}`}>
            <h2>特長</h2>
            <h3>時間の尺度の幅の広さ</h3><p>地史は非常に広範であり、過去10年から数100億年にわたるさまざまな出来事を扱います。地球の形成から現代までの進化や変遷を理解することができます。</p>
            <h3>異なる学問の融合</h3><p>地史は地質学、古生物学、気象学、天文学など複数の学問を結びつける分野であるため、多様な視点から地球の歴史を理解することが求められます。これにより、総合的な知識の構築が可能となります</p>
            <h3>化石の証拠/文献の証拠</h3><p>地史は化石などの堆積物を通じて地球の進化を探るため、生命の進化や絶滅事象に関する貴重な情報が得られます。化石は過去の生態系や気候、地形の変遷を解明する手がかりとなります。</p>
            <h3>気候変動の理解</h3><p>地史の研究によって、地球の気候変動に関する理解が進みつつあります。氷期と間氷期のサイクルや、温暖期における生態系の変遷や人類の生活様式の変化など、現代の気候変動に関する洞察が得られます。</p>
          </article>
          <article className={`demerit ${animateDemerit ? 'animate' : ''}`}>
            <h2>難点</h2>
            <h3>情報の不完全性</h3><p>地史の研究においては、過去の出来事を正確に把握するための情報が限られています。化石や岩石や史料の保存状態によっては、完全なデータを得ることが難しい場合があります。</p>
            <h3>解釈の主観性</h3><p>地史のデータを解釈する際、研究者の主観的な見解や仮説が影響を与えることがあります。異なる研究者や学派によって異なる解釈がなされることがあり、これが正確な理解を妨げる要因となります。</p>
            <h3>時間スケールの難解さ</h3><p>非常に広範な時間を対象としているため、そのスケールの理解が難しいことがあります。数千年・数百万年・数億年といった単位は、人の日常的な時間感覚とはかけ離れています。</p>
            <h3>未解明の謎がまだ多い</h3><p>地史には未だ解明されていない謎や疑問が多く存在します。過去の地球の出来事や進化の過程に関して、研究が進んでいるものの完全な解明には至っていない点があります。</p>
          </article>
        </div>
        <div className='back_to_map'>
          <a href="https://cf268321.cloudfree.jp/13jellies/#jellies_map">
            <figure className='back_to_map_figure'><img src='https://cf268321.cloudfree.jp/13jellies/asset/img/13jellies_A.png' /></figure>
            <p className='back_to_map_text'>13個のゼリー</p></a>
        </div>
      </section>

      <section
        className='block_text_right'
        id='history'
        ref={historyRef}
        style={sectionStyle(1)}>
        <div className='flex_setting'>
          {/*<div className='figure_block'>
            <figure className='block_figure_left_01 position_absolute'>
              <img src={SpaceTime_dummy01} alt=""
                className={`${historyImages.imagesState[0]} ${historyImages.imageEffects[0]}`}
                style={historyImages.imagesStyles[0]}
              />
            </figure>
            <figure className='block_figure_left_02 position_absolute'>
              <img src={SpaceTime_dummy02} alt=""
                className={`${historyImages.imagesState[1]} ${historyImages.imageEffects[1]}`}
                style={historyImages.imagesStyles[1]}
              />
            </figure>
            <figure className='block_figure_left_03 position_absolute'>
              <img src={SpaceTime_dummy03} alt=""
                className={`${historyImages.imagesState[2]} ${historyImages.imageEffects[2]}`}
                style={historyImages.imagesStyles[2]}
              />
            </figure>
            <figure className='block_figure_left_04 position_absolute'>
              <img src={SpaceTime_dummy04} alt=""
                className={`${historyImages.imagesState[3]} ${historyImages.imageEffects[3]}`}
                style={historyImages.imagesStyles[3]}
              />
            </figure>
            <figure className='block_figure_left_05 position_absolute'>
              <img src={SpaceTime_dummy05} alt=""
                className={`${historyImages.imagesState[4]} ${historyImages.imageEffects[4]}`}
                style={historyImages.imagesStyles[4]}
              />
            </figure>
            <figure className='block_figure_left_06 position_absolute'>
              <img src={SpaceTime_dummy06} alt=""
                className={`${historyImages.imagesState[5]} ${historyImages.imageEffects[5]}`}
                style={historyImages.imagesStyles[5]}
              />
            </figure>
            
          </div>*/}
          <AnimatedFigureBlock
            images={[
              { src: SpaceTime_dummy01 },
              { src: SpaceTime_dummy02 },
              { src: SpaceTime_dummy03 },
              { src: SpaceTime_dummy04 },
              { src: SpaceTime_dummy05 },
              { src: SpaceTime_dummy06 }
            ]}
            imagesState={historyImages.imagesState}
            imagesStyles={historyImages.imagesStyles}
            imageEffects={historyImages.imageEffects}
            blockClass="left" // または "right"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={historyScrollRef}
            style={scrollableStyle(currentSection === 1)}>
            <h2>歴史（人類史・史学）</h2>
            <p>
              人類が歩んだ道のりを記録したものを「歴史」という命名で特別視し大きな学問ジャンルを築いています。<br />
              人類の数だけ歴史は存在しますが、倶楽部1300では9区分、すなわち政治史、経済史、社会史、文化史、宗教史、思想史、地域史、民俗学、考古学を暫定的な区分として仕分けておきます。<br />
              これらの歴史の側面は常に相互に影響し合い、一つが変われば他の側面にも影響を与える複雑な社会交流ネットワークを形成します。<br /><br />

              <span className="big_font">政治史</span>は、人々が組織された形で権力を行使し、社会を統治する過程を記録しています。古代ローマ帝国の興亡や中国の春秋戦国時代の諸侯の争い、フランス革命など、様々な政治的転換が歴史を彩ってきました。これらの出来事は政治の構造や権威権力の移り変わりを示しています。政治体制は時代とともに多様な形態をとりました。政治的な変革や戦争、指導者の興亡は、国家や地域の歴史に深い影響を与えました。例えば、フランス革命やアメリカ独立戦争などの出来事は、政治史において重要な節目となっています。<br /><br />

              <span className="big_font">経済史</span>は、人々が資源を生産、分配、交換する経済的な活動を記録したものです。農業の発展、商業の興隆、産業革命などが、経済システムの変遷を示しています。通貨の発展や貿易の拡大は、異なる文化や国々を結びつけ、経済的な交流を促進しました。産業革命による機械化の進展や、オランダの黄金時代、アメリカの大恐慌などが経済の変遷を表しています。特に19世紀ヨーロッパでは、産業の発展が社会構造を大きく変え、労働者階級の台頭や都市の拡大が経済的な影響をもたらしました。これは資本主義経済の成熟とともに経済構造の変化を促しました。近代のグローバリゼーションも、経済史の中で重要な転換点となりました。<br /><br />

              <span className="big_font">社会史</span>は、人々がどのように暮らし、交流し、文化を形成してきたかを記録したものです。宗教、教育、家族、労働などが社会の基盤を構築し、様々な社会集団が形成されました。また、社会構造や価値観は時代とともに変遷し、異なる文化や地域で異なる形を取りました。宗教改革や啓蒙時代、アフリカやアジアの独立運動が社会の価値観や構造に影響を与えました。例えば、フランスの啓蒙思想家たちの影響でフランス革命が勃発し、封建制度が崩壊しました。同様に、マハトマ・ガンディーの非暴力抵抗運動は、社会の枠組みにおいて差別の撤廃をもたらしました。女性の権利運動や人権の拡大など、社会史においては平等や公正に関する運動も重要な位置を占めています。<br /><br />

              <span className="big_font">文化史</span>は人間の知恵や芸術、習慣、技術の発展を通じて表現される歴史です。言葉、文学、美術、音楽などが独自の形を生み出し、異なる文化が世界中で栄えました。これらの文化は、人々のアイデンティティを形成し、伝統を守る一方で、新しいアイデアや視点を受け入れて変容してきました。古代ギリシャの哲学や芸術、ルネサンス期のイタリアの文化復興など、特定の時代や地域で生まれた文化が世界に影響を与えました。文化はしばしば他の文化と交わり、融合し、新しい発展を遂げています。例えば、シルクロードのような交易路が東西の文化を結びつけ、新しいアイデアや技術が広まったのもその一例です。<br /><br />

              <span className="big_font">宗教史</span>は人々の信仰と精神的な探求を通じて、彼らの生活に深い影響を与えてきました。異なる宗教は、神聖な教義や儀式を通じて、個人や共同体の道徳的な枠組みを提供してきました。宗教はまた、社会の結束を強化し、慰めや希望を提供する役割を果たしてきました。キリスト教、イスラム教、ヒンドゥー教など、異なる宗教が世界各地で栄え、文化や社会に大きな影響を与えました。しかし、同時に宗教は対立や紛争の原因ともなり、歴史の中で様々な形を取って現れています。たとえば、十字軍や宗教改革などが、宗教的な対立が歴史の中でどれほど深い影響を与えたかを示しています。宗教は人々の信仰と道徳的な価値観が歴史に深く組み込まれています。宗教史を理解することは、人類の信仰の多様性と、その信仰が歴史をどのように形成してきたかを知る上で不可欠です。<br /><br />

              <span className="big_font">思想史</span>は人間の知的な探求とアイデアの進化をたどる歴史です。哲学、科学、政治思想などが、人類の進歩に深い影響を与えてきました。異なる時代や地域で生まれた思想家たちは、彼ら独自の視点から世界を見つめ、新たな知識や価値観を提供してきました。古代ギリシャの哲学者たちや啓蒙時代の啓発思想家たちが、人類の知的な発展に大きな寄与をしました。科学革命や産業革命なども、思想史の重要な局面であり、新たな世界観や価値観が形成されました。これらの思想は社会構造や政治体制にも影響を及ぼし、歴史を塗り替える力を持っていました。思想史は、人類がどのようにして知恵を蓄積し、それが社会や文化にどのように影響を与えてきたかを解明します。<br /><br />

              <span className="big_font">地域史</span>は特定の地域に焦点を当て、そこで繰り広げられた歴史的な出来事や文化の変遷を追究します。例えば、アンデス山脈周辺の古代文明であるインカ帝国は、地域史の視点から見ると、独自の農業技術や石造建築、社会組織が結びついて繁栄していたことが理解されます。<br /><br />

              <span className="big_font">民俗学</span>は、一般の人々の生活様式や習慣、信仰、言語などを通じて文化を理解しようとする学問です。このアプローチは、歴史の中で人々がどのように生活し、相互に影響を与え合ってきたかを探求します。中世ヨーロッパにおける騎士道精神や村の祭り、それに伴う伝説や言い伝えは、民俗学の手法を通じて歴史の中で生きた人々の日常や信念を垣間見ることができます。民俗学の手法を用いることで、歴史のなかで重要な役割を果たした一般の人々の視点や生活の様相が浮かび上がります。<br /><br />

              <span className="big_font">考古学</span>は物質的な証拠を通じて過去の文明や文化を解明します。埋もれた遺跡や遺物から得られる情報は、文字に記されていない時代の事実を紐解く手がかりとなります。考古学は地球史のパズルの一部を担い、時には失われた文明の発見や理解をもたらします。
              考古学は地域史や民俗学の調査を支える重要な手段であり、発掘された遺物や遺跡が提供する情報は、地域史の中で起きた事象や文化の変遷を裏付けるものとなります。時には、古代の都市の遺跡や埋蔵された宝物が、失われた文明の復元に寄与することがあります。エジプトのピラミッドやメソポタミアの遺跡は、考古学の手法を駆使して、古代文明がいかにして発展し、滅びたのかを解き明かしています。これにより、文字に記されていない時代の事実や文化の変遷を復元することが可能となります。<br />
              地域史が異なる地域を取り上げつつその交わり合いを探求し、民俗学が人々の営みの詳細を再現し、考古学が物的な証拠を提供することで史実が明らかになるケースがあります。
            </p>
          </div>
        </div>
      </section>

      <section
        className='block_text_left'
        id='social_geography'
        ref={socialGeographyRef}
        style={sectionStyle(2)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={socialGeographyScrollRef}
            style={scrollableStyle(currentSection === 2)}>
            <h2>社会地理</h2>
            <p>
              社会地理は、地表空間上の人類の棲息パターンや相互作用を研究精緻化する学問です。<br />
              人類の棲息パターンにのみ「地理（社会地理）」という学術分野があります。「熊の地理」「ミミズの地理」「ソテツの地理」といった学術分野はありません。<br />
              地形図の数だけ地理研究はありますが、倶楽部1300ではその中で広く流通定着している13区分、すなわち政治地理、行政地理、人口地理、交通地理、農業地理、工業地理、商業地理、都市地理、歴史地理、文化地理、行動地理、開発地理、災害地理と暫定的にカテゴライズしておきます。これらの地理概念を通じ我々は変遷や行動に焦点を当て、地表での社会構造や関係や地理的な要因が社会に与える影響を把握できます。地図は地理概念ひいては区切られた空間把握を短時間でこなせる道具として、古来より愛用されてきました。<br />
              食糧の確保、産業の発展、商品の交換などは、地理的な条件と気候の影響を受けながら人類史として日々アーカイブし続けています。<br /><br />

              <span className="big_font">政治地理</span>では、国家や政治組織の地理的な影響を解明します。メソポタミアやナイルの都市国家から、ローマ帝国の拡大と崩壊、そして20世紀の冷戦時代まで、地理条件が権力のバランスや国境の変遷にどのように影響するかを考察します。国境の形成や変化、帝国の興亡などが政治地理の重要なテーマとなります。たとえば、古代ローマ帝国の拡大と崩壊は、地中海周辺の地理要因と政治的な意思決定の結果として理解されています。<br /><br />

              <span className="big_font">行政地理</span>は、地域や国の行政単位に焦点を当て、行政構造や地方自治体の形成を探求します。行政地理の視点から国内の政治的な組織や権力の分布が明らかになり、地域社会の発展における行政的な影響が浮かび上がります。都市の成長や地方自治体の運用が、行政地理の観点から重要な出来事となります。<br />現行の世界中の行政区分地図の解析はもちろん、たとえば日本の戦国時代の諸侯の統治構造や、19世紀のドイツ統一における諸邦の統合プロセスなども、行政地理の視点から興味深い事例となります。<br /><br />

              <span className="big_font">人口地理</span>は、人間の分布や移動、人口統計などを通じ共同体構造を理解する分野です。人口の増減や移動が地理的要因と結びついて、国家や地域やあらゆる共同体の発展衰退に影響を与えます。都市化や人口の集中、移民の波などが、人口地理学者が注目する重要なトピックです。18世紀ヨーロッパ産業革命に伴う都市化と人口の爆発、アメリカ合衆国における西部開拓時代の移民の動きなども、人口地理でよく扱われる研究題材です。<br /><br />

              <span className="big_font">交通地理</span>は、地理的な空間における輸送手段のネットワークやインフラへ焦点を当てます。陸上交通や海上交通の発展は文明や国家推移と密接に結びついています。例えば古代シルクロードの形成や、産業革命に伴う鉄道網の整備、19世紀アメリカ大陸横断鉄道の建設などが、交通地理の重要な出来事として挙げられます。<br /><br />

              <span className="big_font">農業地理</span>は食糧の生産と分配を理解する上で欠かせません。農業の発展は、狩猟採集生活から定住農耕社会への移行をもたらし、地域ごとの気候や土地条件が農業の発展に大きな影響を与えています。ジャポニカ米の栽培が盛んな東アジア地域や、小麦の主要な生産地である中東地域など、気候や土地の条件によって異なる農業文化が形成されました。<br /><br />

              <span className="big_font">工業地理</span>は産業の発展と地理的な結びつきを調査し理解します。資源の分布や技術の進歩の結びつきを重視した研究分野です。産業革命の時代から現代まで、工業地理は経済変遷と共に進みました。<br />
              石炭や鉄鉱石の産出地が工業の中心地となり、製造業の発展が地域の発展を促進します。18世紀産業革命ではイギリスの中心地であるマンチェスターが綿糸産業の中心地となり、繊維工業が発展しました。20世紀アメリカ合衆国ではデトロイトが自動車産業の中心地として栄え、これが地域全体の繁栄をもたらしました。今日では技術の進歩に伴い、情報技術やバイオテクノロジーなどの新たな産業が地理的に分散する傾向も見られます。<br /><br />

              <span className="big_font">商業地理</span>は商品やサービスの流通と交換に焦点を当て、地域間の経済的なつながりを探求し、異なる文化や国々を結ぶ架け橋と研究解析します。古代のシルクロードから、海上交通の発展によるグローバルな貿易まで、商業地理は異なる文化や国々を結ぶ要素です。現代では国際的な供給チェーンや電子商取引が拡大し、地球規模での商業活動が複雑なネットワークを形成している状態と認識されています。<br /><br />

              <span className="big_font">都市地理</span>は、古代から現代にかけて人間が集まり、文明が花開く場所である都市を研究します。古代ギリシャのアテネやローマ帝国のローマ、中世ヨーロッパの都市国家など、歴史的都市が政治、経済、文化の中心地として発展してきました。例えばローマが地中海に面した戦略的な位置にあり、膨大な帝国を統治する拠点として機能したことは顕著です。都市地理は、これらの都市がどのように形成され発展していったのかを解析し、都市が社会構造に与える影響を明らかにします。<br /><br />

              <span className="big_font">歴史地理</span>は、時間の経過とともに地理的な変化を追跡し、歴史の流れと地理的な要因の関連性を分析します。古代エジプトのナイル川流域がその豊かな農業地帯から生まれた高度な文明は、地理的条件が文化や経済の発展に果たす役割の一例です。シルクロードもまた、東西の文明が交わり、異なる文化が交流する場として歴史に名を刻んでいます。歴史地理は、地理的背景が歴史の進展にどのように影響したかを明らかにし、地域ごとの独自の歴史的軌跡を理解します。<br /><br />

              <span className="big_font">文化地理</span>は、異なる文化や文明が地理的な環境と相互作用する様子を研究します。言語、宗教、習慣、伝統などが地理的環境によって形成され、変容していくプロセスを理解します。たとえば、ヨーロッパの国々が異なる言語や宗教を有するのは、山脈や海洋などの地理的な障壁が異なる文化の形成に影響を与えた結果です。日本の食文化や方言などの文化地理もまた、四季の変化や地域ごとの伝統が地理的な条件に根ざしています。文化地理は、地理が文化の発展に与える影響や異なる文化が共存する構造を解明します。<br /><br />

              <span className="big_font">行動地理</span>は、個々の人々や集団が空間をどのように利用し、移動し、行動するかを研究します。交通や都市計画が人間の移動にどのように影響するか、地理的距離やアクセス性が社会的な相互作用や経済的な意思決定に及ぼす影響を考察します。例えば、日本の超高層ビルが都市空間における利便性を向上させ、経済活動に大きな影響を与えています。行動地理は、交通、都市計画、人間の移動パターンなどを通じ、人の行動が地理的背景にどのように根差しているかを理解します。<br /><br />

              <span className="big_font">開発地理</span>は、経済の進展や社会の変容に焦点を当て、国々や地域の発展の過程を調査します。この概念は、農業、工業、技術の進歩など、様々な側面から経済成長を分析し、それが地理的な要因や環境にどのように影響を与えるかを考察します。産業の集中が都市の形成を促すことで、都市部と農村部といった地域間の格差が生まれ、経済的な不平等が拡大することがあります。たとえば、日本の戦後復興やアジアの急速な経済成長など、経済的な成功の裏には地理的な要因が影響しています。中国の経済特区の成功やアフリカの資源開発の挑戦など、開発地理は地域ごとに異なる展開を示します。<br />
              一方で<span className="big_font">災害地理</span>は、地球上で発生する自然災害や人為的な災害に焦点を当てます。地球の歴史を振り返ると、地震、洪水、台風などの自然災害は人類に大きな影響を与えてきました。日本の地震や津波、アメリカのハリケーン被害など、地理的条件が災害の発生や影響を大きく左右します。これらの災害は、地域の地形や気候といった自然の要因だけでなく、人間の活動による環境の変化も影響しています。都市化の進展や土地利用の変化が、災害の発生頻度や影響の程度に影響を与えることがあります。都市の適切な計画や緊急事態への備えが災害の影響を軽減する要因となります。<br />

              開発地理と災害地理を結びつけると、経済の発展が地域社会に与える影響や変化が、その地域が災害に対処する能力にも影響を与えることが分かります。経済発展が進む中で都市化が進み大規模な都市が形成されると、災害が発生した際の被害が大きくなる可能性があります。中世ヨーロッパでの都市の発展と同時に、天災や疫病が社会に深刻な打撃を与えた歴史があります。<br />
              同時に、経済力のある地域は、災害への対応や復旧のためのリソースをより効果的に動員できる傾向があります。例えば、東南アジアの急速な都市化が進む中で、地域の都市が急速に拡大し、同時に自然災害に対する脆弱性も高まっていますが、逆に、スカンジナビア諸国のように災害に対する予防措置が整備された地域は、経済的な成功とともに災害に対する強固な防御機構を築いています。オランダの防潮堤防や日本の地震対策など、地域ごとに異なるアプローチが取られています。<br />
              開発地理と災害地理を統合的に考えることで、地上の社会的な不平等や災害リスクを最小限に抑えるための知識を提供します。
            </p>
          </div>
          <AnimatedFigureBlock
            images={[
              { src: SpaceTime_dummy01 },
              { src: SpaceTime_dummy02 },
              { src: SpaceTime_dummy03 },
              { src: SpaceTime_dummy04 },
              { src: SpaceTime_dummy05 },
              { src: SpaceTime_dummy06 }
            ]}
            imagesState={socialGeographyImages.imagesState}
            imagesStyles={socialGeographyImages.imagesStyles}
            imageEffects={socialGeographyImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 地球史セクション */}
      <section
        className='block_text_right'
        id='earth_history'
        ref={earthHistoryRef}
        style={sectionStyle(3)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={[
              { src: SpaceTime_dummy01 },
              { src: SpaceTime_dummy02 },
              { src: SpaceTime_dummy03 },
              { src: SpaceTime_dummy04 },
              { src: SpaceTime_dummy05 },
              { src: SpaceTime_dummy06 }
            ]}
            imagesState={earthHistoryImages.imagesState}
            imagesStyles={earthHistoryImages.imagesStyles}
            imageEffects={earthHistoryImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={earthHistoryScrollRef}
            style={scrollableStyle(currentSection === 3)}>
            <h2>地球史</h2>
            <p>
              地球史の内容がここに入ります。地球の誕生から現在に至るまでの壮大な歴史について説明します。
              先カンブリア時代、古生代、中生代、新生代など、地球の各時代について詳細な情報が記載されます。
              生命の誕生や進化、大量絶滅や気候変動など、地球の歴史における重要なイベントについても触れます。

              ここにはダミーテキストが入ります。後で実際のコンテンツに置き換えられます。
              地球史に関する詳細な内容がここに記載されます。地質学的な時間スケールや、生命の発展過程、
              大陸の移動や気候変動など、地球の歴史に関わる様々なトピックが含まれます。
            </p>
          </div>
        </div>
      </section>

      {/* 自然地理セクション */}
      <section
        className='block_text_left'
        id='natural_geography'
        ref={naturalGeographyRef}
        style={sectionStyle(4)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={naturalGeographyScrollRef}
            style={scrollableStyle(currentSection === 4)}>
            <h2>自然地理</h2>
            <p>
              自然地理の内容がここに入ります。地球の自然環境や地形、気候などについて説明します。
              山岳、平原、海洋、河川など、様々な地形の形成過程や特徴について詳しく記述されます。
              気候帯や生態系など、自然地理学の重要なトピックについても触れます。

              ここにはダミーテキストが入ります。後で実際のコンテンツに置き換えられます。
              自然地理に関する詳細な内容がここに記載されます。地形学、気候学、水文学など
              自然地理学の様々な側面について説明されます。生物地理学的な内容や、
              人間活動が自然環境に与える影響についても触れられるでしょう。
            </p>
          </div>
          <AnimatedFigureBlock
            images={[
              { src: SpaceTime_dummy01 },
              { src: SpaceTime_dummy02 },
              { src: SpaceTime_dummy03 },
              { src: SpaceTime_dummy04 },
              { src: SpaceTime_dummy05 },
              { src: SpaceTime_dummy06 }
            ]}
            imagesState={naturalGeographyImages.imagesState}
            imagesStyles={naturalGeographyImages.imagesStyles}
            imageEffects={naturalGeographyImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 地質研究セクション */}
      <section
        className='block_text_right'
        id='geology'
        ref={geologyRef}
        style={sectionStyle(5)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={[
              { src: SpaceTime_dummy01 },
              { src: SpaceTime_dummy02 },
              { src: SpaceTime_dummy03 },
              { src: SpaceTime_dummy04 },
              { src: SpaceTime_dummy05 },
              { src: SpaceTime_dummy06 }
            ]}
            imagesState={geologyImages.imagesState}
            imagesStyles={geologyImages.imagesStyles}
            imageEffects={geologyImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={geologyScrollRef}
            style={scrollableStyle(currentSection === 5)}>
            <h2>地質研究</h2>
            <p>
              地質研究の内容がここに入ります。地球の構造や岩石、鉱物、地殻変動などについて説明します。
              プレートテクトニクス理論や火山活動、地震のメカニズムなど、地質学の重要なトピックについても触れます。
              地質年代や地層の形成過程、化石の研究などについても詳しく記述されます。

              ここにはダミーテキストが入ります。後で実際のコンテンツに置き換えられます。
              地質学に関する詳細な内容がここに記載されます。岩石学、鉱物学、構造地質学など、
              地質学の様々な分野についての説明が含まれます。また、地質調査の方法や技術、
              最新の研究成果についても触れられるでしょう。
            </p>
          </div>
        </div>
      </section>

      {/* 大気研究セクション */}
      <section
        className='block_text_left'
        id='atmosphere'
        ref={atmosphereRef}
        style={sectionStyle(6)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={atmosphereScrollRef}
            style={scrollableStyle(currentSection === 6)}>
            <h2>大気研究</h2>
            <p>
              大気研究の内容がここに入ります。地球の大気の構造や成分、気象現象などについて説明します。
              気圧配置や前線の動き、気象予報の方法など、気象学の重要なトピックについても触れます。
              気候変動や大気汚染など、現代の大気に関する課題についても詳しく記述されます。

              ここにはダミーテキストが入ります。後で実際のコンテンツに置き換えられます。
              気象学や大気科学に関する詳細な内容がここに記載されます。大気の層構造や循環システム、
              様々な気象現象のメカニズムについての説明が含まれます。また、気象観測の歴史や方法、
              最新の研究課題についても触れられるでしょう。
            </p>
          </div>
          <AnimatedFigureBlock
            images={[
              { src: SpaceTime_dummy01 },
              { src: SpaceTime_dummy02 },
              { src: SpaceTime_dummy03 },
              { src: SpaceTime_dummy04 },
              { src: SpaceTime_dummy05 },
              { src: SpaceTime_dummy06 }
            ]}
            imagesState={atmosphereImages.imagesState}
            imagesStyles={atmosphereImages.imagesStyles}
            imageEffects={atmosphereImages.imageEffects}
            blockClass="right"
          />
        </div>
      </section>

      {/* 海洋研究セクション */}
      <section
        className='block_text_right'
        id='oceanography'
        ref={oceanographyRef}
        style={sectionStyle(7)}>
        <div className='flex_setting'>
          <AnimatedFigureBlock
            images={[
              { src: SpaceTime_dummy01 },
              { src: SpaceTime_dummy02 },
              { src: SpaceTime_dummy03 },
              { src: SpaceTime_dummy04 },
              { src: SpaceTime_dummy05 },
              { src: SpaceTime_dummy06 }
            ]}
            imagesState={oceanographyImages.imagesState}
            imagesStyles={oceanographyImages.imagesStyles}
            imageEffects={oceanographyImages.imageEffects}
            blockClass="left"
          />
          <div
            className='text_scroll_block scroller_decoration'
            ref={oceanographyScrollRef}
            style={scrollableStyle(currentSection === 7)}>
            <h2>海洋研究</h2>
            <p>
              海洋研究の内容がここに入ります。地球の海洋の構造や海流、海底地形などについて説明します。
              潮汐や波浪のメカニズム、海洋生態系など、海洋学の重要なトピックについても触れます。
              深海探査や海洋資源、海洋汚染など、海洋に関する現代的な課題についても詳しく記述されます。

              ここにはダミーテキストが入ります。後で実際のコンテンツに置き換えられます。

              海洋学に関する詳細な内容がここに記載されます。海洋の物理的特性、化学的組成、
              海洋循環システムについての説明が含まれます。また、海洋生物学や海洋地質学、
              海洋探査の歴史と最新技術についても触れられるでしょう。
            </p>
          </div>
        </div>
      </section>

      {/* 天文セクション */}
      <section
        className='block_text_left'
        id='astronomy'
        ref={astronomyRef}
        style={sectionStyle(8)}>
        <div className='flex_setting'>
          <div
            className='text_scroll_block scroller_decoration'
            ref={astronomyScrollRef}
            style={scrollableStyle(currentSection === 8)}>
            <h2>天文</h2>
            <p>
              天文の内容がここに入ります。宇宙の構造や天体、宇宙の歴史などについて説明します。
              太陽系の惑星や恒星、銀河系など、天文学の重要なトピックについても触れます。
              宇宙探査や天体観測の方法、最新の天文学的発見についても詳しく記述されます。

              ここにはダミーテキストが入ります。後で実際のコンテンツに置き換えられます。
              天文学に関する詳細な内容がここに記載されます。宇宙の起源と進化、星の一生、
              銀河の構造と種類についての説明が含まれます。また、天文観測の歴史と方法、
              最新の宇宙論や天体物理学の課題についても触れられるでしょう。
            </p>
          </div>
          <AnimatedFigureBlock
            images={[
              { src: SpaceTime_dummy01 },
              { src: SpaceTime_dummy02 },
              { src: SpaceTime_dummy03 },
              { src: SpaceTime_dummy04 },
              { src: SpaceTime_dummy05 },
              { src: SpaceTime_dummy06 }
            ]}
            imagesState={astronomyImages.imagesState}
            imagesStyles={astronomyImages.imagesStyles}
            imageEffects={astronomyImages.imageEffects}
            blockClass="right"
          />
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

export default SpaceTime;
