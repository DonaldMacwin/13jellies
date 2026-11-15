---

本番サイトURL:　https://cf268321.cloudfree.jp/13jellies/

搭載FTP：　sv16.cloudfree.ne.jp

---

nodeJS: nvm use  20.11.0

「13jellies_map」と「jelliy_contents」の2つのReactソースを別々に記述してあります。

マージ後はnpm install をそれぞれ別に行ってください。

sitemap更新: `php generate_sitemap.php`（`jelliy_contents/dist/texts/*.html` のジャンルURLと `spatiotemporal_scaler/dist/sitemap-*.xml` のページURLをまとめて `sitemap.xml` へ毎回上書き）
`jelliy_contents` と `spatiotemporal_scaler` は `npm run build` 後に `postbuild` で自動的に上記処理を実行。

