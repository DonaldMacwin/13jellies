# Spatiotemporal Scaler（バカンス時空間スケーラー）- 設計方針

このプロジェクトのいまの構成と設計方針をまとめる。2026-11-03 に、立ち上げ時（2026-09-13）の設計メモを現状に合わせて書き直した。

## 全体像

- 空間8段（s0〜s7）× 時間19段（t0〜t18）＝152座標の読み物を、2軸のスライダーで行き来するサイト。
- 1座標に1本の記事（`content/articles/sagan_sN_tM.md`）が対応する。戯曲版（サガン一座）78本と一人称版（セシルのひとりごと）74本。
- 記事の書き方の規約は `authoring/PLAYS.md`、設定と改訂履歴は `authoring/PLAYS-LOG.md` が正。

## コンテンツ（Markdown）

- 記事は `content/articles/` 直下の `sagan_*.md` だけ。投稿UIは作らず、ファイルを直接追加・編集して Git で管理する。
- 元になった学術記事 `2026-09-13-*.md`（152本）は `content/articles/元素材/` に退避してある。サイトは読まない。
- frontmatter が索引を兼ねる。主なフィールド：`title` `date` `slug` `summary` `author` `image` `image_alt` `footer_image` `footer_image_alt` `footer_image_enabled` `space_index` `space_unit` `time_index` `published` `categories` `tags`。
- 本文は Markdown。数式は KaTeX（`$…$`）、ルビは `｜語《よみ》` の記法で書く（読み込み時に `<ruby>` へ変換する）。

## 記事の読み込み（`src/lib/articles.ts`）

- Astro の content collections は使わず、Node の `fs` で `sagan_*.md` を直接読み、`gray-matter` で frontmatter を分け、`unified`（remark-parse → remark-math → remark-rehype → rehype-katex → rehype-stringify）で HTML にする。
- 座標（`space_index`・`time_index`）ごとに1本を選び、記事一覧と、近い座標を探す関数（`findNearestArticle`）を提供する。
- 開発中は、ファイルの更新（サイズと更新時刻）を見てキャッシュを作り直す。

## サイト生成（Astro）

- `astro.config.mjs` で `output: 'static'`。ビルドすると `dist/` に静的ファイル一式ができ、それを FTP で公開先へ上げる。
- 公開先：`site: https://cf268321.cloudfree.jp`、`base: /13jellies/spatiotemporal_scaler/`。
- 統合：`@astrojs/react`、`@astrojs/mdx`（remark-math / rehype-katex 付き）、`@astrojs/sitemap`。
  - `package.json` には `@astrojs/node` もあるが、設定では使っていない（静的出力のため）。
- ページ：
  - `src/pages/index.astro`：トップ。初期座標（s0・t9）に近い記事を表示する。
  - `src/pages/articles/[slug].astro`：記事ごとのページ。`getStaticPaths` で全記事分を書き出す。
  - `src/pages/api/articles/[slug].json.ts`：記事ごとの JSON（本文 HTML を含む）。ビルド時に静的ファイルとして書き出し、スライダー操作時にブラウザが取りに行く。
  - `src/pages/api/footer.ts`：共通フッターの HTML を、公開先の `13jellies/asset/html/footer.html` から取得して文字コードを UTF-8 にそろえる。静的出力なので、取得はビルド時に1回行われる。
- レイアウト：`src/layouts/BaseLayout.astro`（Google Fonts、公開先の共通 CSS と KaTeX の CSS、Google アナリティクス、ページ上部へ戻るボタン）。

## フロントエンド（React）

- `src/components/ArticleExplorer.tsx`（`client:load`）が画面の本体。記事一覧（要約）を受け取り、スライダーで座標が変わると `api/articles/{slug}.json` を取りに行って本文を差し替える。
- `src/Slider.tsx`：時間スライダー（横、19目盛り）と空間スライダー（縦、8目盛り）。目盛りの tooltip に、各段の主題と年数・距離を出す。
- `src/components/spatial/`（3本）と `src/lib/spatiotemporal.ts` は、立ち上げ時に置いた中身の空のファイルで、どこからも使っていない（2026-11-03 時点で削除候補）。
- スタイル：`src/styles/global.css`、`src/styles/Slider.css`。

## 画像

- 記事の冒頭・文末画像は `content/image/` に置き、`ArticleExplorer.tsx` が `import.meta.glob` でまとめて取り込む（ビルド時に `dist/` へ同梱される）。
- frontmatter の `image` / `footer_image` には `content/image/xxx.jpg` の形で書く。
- `content/image/` は Git の管理外。ビルドする端末に置いておく必要がある。

## 道具

- `authoring/`：記事の制作・検証用（`chk.mjs` 戯曲版の検証、`chkp.mjs` 一人称版の検証、`used.mjs` 既出素材の検索、`addbr.mjs` 段落末の `<br><br>` 付与）。プロジェクトルートから `node authoring/chk.mjs` の形で実行する。
- `tools/`：立ち上げ時に使った、仮記事の生成や frontmatter の一括整理のスクリプト。いまの運用では使わない（`generate_articles.js` は `content/articles/` に仮記事を上書きで書き出すので、実行しないこと）。

## 開発

- `npm run dev`（`astro dev`）で開発サーバー、`npm run build` で `dist/` を作る。Node は `>=22.23.4`。
- AI エージェント向けの作業メモは、プロジェクトルートの `AGENTS.md`（Astro の雛形が生成したもの）。
