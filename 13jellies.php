<!doctype html>
<html lang="ja">

<head>
    <?php
    // ハッシュがない場合はリダイレクト
    if (!isset($_SERVER['QUERY_STRING']) || strpos($_SERVER['REQUEST_URI'], '#') === false) {
        echo '<script>if(location.hash===""){location.replace("https://cf268321.cloudfree.jp/13jellies/");}</script>';
    }
    ?>
    <?php include "./asset/html/meta.html"; ?>
    <link rel="stylesheet" href="./asset/css/top.css" />
    <title>13個のゼリー</title>
</head>

<body class="grid-paper">
    <main class="inner">
        <div id="root"></div>
        <script type="module" crossorigin src="./jelliy_contents/dist/jelliy_contents.js"></script>
        <link rel="stylesheet" crossorigin href="./jelliy_contents/dist/assets/index.css">
    </main>

    <?php 
    include "./asset/html/footer.html"; 
    ?>
    <script src="./asset/js/common.js"></script>
</body>

</html>