<?php
$baseUrl = 'https://cf268321.cloudfree.jp/13jellies/';
$ignore = ['.', '..', '.gitignore', 'sitemap.xml', 'generate_sitemap.php', 'README.md', 'memo.txt', 'google79e3c54ced2a70e2.html'];
$distTextsDir = __DIR__ . '/jelliy_contents/dist/texts';
$spatiotemporalDistDir = __DIR__ . '/spatiotemporal_scaler/dist';

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

$hashMap = [
    'spaceTime' => 'SpaceTime'
];

if (is_dir($distTextsDir)) {
    $genres = [];
    foreach (scandir($distTextsDir) as $file) {
        if (!is_file($distTextsDir . '/' . $file)) continue;
        if (pathinfo($file, PATHINFO_EXTENSION) !== 'html') continue;
        if (strpos($file, '_') === false) continue;

        [$genre] = explode('_', $file, 2);
        $genres[$genre] = true;
    }

    ksort($genres);

    foreach (array_keys($genres) as $genre) {
        $hash = $hashMap[$genre] ?? $genre;
        $urls[] = $baseUrl . '13jellies.php#' . $hash;
    }
}

if (is_dir($spatiotemporalDistDir)) {
    foreach (scandir($spatiotemporalDistDir) as $file) {
        if (!preg_match('/^sitemap-\d+\.xml$/', $file)) continue;

        $sitemapPath = $spatiotemporalDistDir . '/' . $file;
        $sitemapXml = simplexml_load_file($sitemapPath);
        if ($sitemapXml === false) continue;

        $sitemapXml->registerXPathNamespace('sm', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        $locNodes = $sitemapXml->xpath('//sm:url/sm:loc');
        if ($locNodes === false) continue;

        foreach ($locNodes as $loc) {
            $urls[] = (string) $loc;
        }
    }
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