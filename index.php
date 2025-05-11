<!doctype html>
<html lang="ja">

<head>
    <?php 
    include "./asset/html/meta.html"; 
    ?>
    <link rel="stylesheet" href="./asset/css/top.css" />
    <title>13個のゼリー</title>
</head>

<body>
    <?php 
    // include "./asset/html/header.html"; 
    ?>

    <main class="inner top_page">
        <section class="top_1st_view">
            <div class="relative_position">
            <h1>ここに13個のゼリーがある</h1>
            <figure><img src="./asset/img/13jellies_A.png"></figure>
            </div>
            <p class="text">ゼリーと呼ぶには柔らかすぎるかもしれない。<br />
                触るとぐにゃぐにゃし、豆腐のような触れごこちの13の柔らかい塊を、ここに用意した。<br /><br />
                13個のゼリーの両端に座標を与え、13個のゼリーそれぞれへ名前をつけてみた。<br />
                すると、13個のゼリーは、13個の学問ジャンルを表せる。<br />
            </p>
        </section>
        <section class="top_2nd_view">
            <figure><img src="./asset/img/13jellies_B.png"></figure>
            <p class="text">じつは。<br />
                この13個のゼリーの中身を知ると、世の中の学術の80～90%を系統網羅できる。<br />
                より詳細な成分も、記載してみよう。<br />
            </p>
        </section>
        <section class="jellies_map" id="jellies_map">
            <!--
            <script type="module" crossorigin src="https://cf268321.cloudfree.jp/13jellies/13jellies_map/dist/13jellies_map.js"></script>
            <link rel="stylesheet" href="https://cf268321.cloudfree.jp/13jellies/13jellies_map/dist/assets/index.css">
            <div id="root"></div>
            -->
            <iframe src="https://cf268321.cloudfree.jp/13jellies/13jellies_map/dist/index.html" scrolling="no"></iframe>
                <p class="text">これらの記述内容を、あなたはすべて説明できるだろうか？<br />
                説明できる博識なかたならば、なにも問題はない。<br />
                今すぐこのページを閉じ、早くこなさなければいけないあなたの次の仕事に取り掛かってほしい。<br />
                大して理解してはいないがもし興味関心のあるジャンルがあれば、ゼリーをクリックしてほしい。<br /><br />
                このサイトは、全ての学術ジャンルを手軽に把握できる導入ページとして用意されている。<br />
                つまり「手軽な学問の世界地図」というわけだ。<br />
            </p>
        </section>
    </main>
    
    <?php 
    // include "./asset/html/footer.html"; 
    ?>
    <script src="./asset/js/common.js"></script>

</body>

</html>