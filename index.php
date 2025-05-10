<!doctype html>
<html lang="ja">

<head>
    <?php include "./asset/html/meta.html"; ?>
    <link rel="stylesheet" href="./assets/css/top.css" />
    <title>13個のゼリー</title>
</head>

<body>
    <?php 
    // include "./asset/html/header.html"; 
    ?>

    <main class="inner">
        <section class="top_first_view">
            <h1>ここに13個のゼリーがある</h1>
            <figure><img src="./asset/img/13jellies_A.png"></figure>
            <p>13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans </p>
        </section>
        <section>
            <figure><img src="./asset/img/13jellies_B.png"></figure>
            <p>13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans 13 jelly beans </p>
        </section>
        <section>
            <!--
            <script type="module" crossorigin src="https://cf268321.cloudfree.jp/13jellies/13jellies_map/dist/13jellies_map.js"></script>
            <link rel="stylesheet" href="https://cf268321.cloudfree.jp/13jellies/13jellies_map/dist/assets/index.css">
            <div id="root"></div>
            -->
            <iframe src="https://cf268321.cloudfree.jp/13jellies/13jellies_map/dist/index.html" style="width: 100%; height: 100vh; border: none;"></iframe>
        </section>
    </main>
    
    <?php 
    // include "./asset/html/footer.html"; 
    ?>
    <script src="./asset/js/common.js"></script>

</body>

</html>