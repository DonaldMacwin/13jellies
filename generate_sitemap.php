<?php
$baseUrl = 'https://cf268321.cloudfree.jp/13jellies/';
$ignore = ['.', '..', '.gitignore', 'sitemap.xml', 'generate_sitemap.php', 'README.md', 'memo.txt', 'google79e3c54ced2a70e2.html'];

$urls = [
    $baseUrl . 'index.php',
    $baseUrl . '13jellies.php'
];

// 第1階層のファイル・ディレクトリを取得
foreach (scandir(__DIR__) as $item) {
    if (in_array($item, $ignore)) continue;
    if (is_file(__DIR__ . '/' . $item)) {
        // .phpファイルのみを対象にする場合
        if (pathinfo($item, PATHINFO_EXTENSION) === 'php') {
            $urls[] = $baseUrl . $item;
        }
    }
    // ディレクトリの場合は必要に応じてURLを追加
    // 例: $urls[] = $baseUrl . $item . '/';
}

$urls = array_unique($urls);

$xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><urlset></urlset>');
$xml->addAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
$xml->addAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');

foreach ($urls as $url) {
    $urlElement = $xml->addChild('url');
    $urlElement->addChild('loc', $url);
    $urlElement->addChild('priority', '1.0');
}

$xml->asXML(__DIR__ . '/sitemap.xml');
echo "sitemap.xmlを更新しました";
?>