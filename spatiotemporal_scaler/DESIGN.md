# Spatiotemporal Scaler - 設計方針

このプロジェクトの基本ルールと設計方針をまとめます。

## コンテンツ（Markdown）
- 記事本文、タイトル、概要、著者、画像情報などはすべてMarkdownファイルとして管理する。
- Markdownはリポジトリで編集・追加し、投稿UIは作らない（Gitで管理）。

## インデックス（ローカル）
- 記事探索用のインデックスはMarkdownのFrontMatterで持つ。
- 主なフィールド例: `slug`, `space_index`, `space_unit`, `time_index`, `categories`, `tags`, `image`。
- 記事一覧はビルド時にMarkdownを走査して生成する。

## フロントエンド（React）
- 2軸（時間軸・空間軸）スライダーを実装し、ローカルのMarkdownインデックスから記事を選択するUIを作る。
- React部分はコンポーネント化して、Astroや他のホスティングに組み込み可能にする。

## サイト生成（Astro）
- Astroを使ってMarkdownから静的ページを生成する。
- SEO向けメタやOGPはAstroテンプレートで出力する。

## 画像
- 画像は外部ホスティングを利用する。基本候補URLベース:
  `https://cf268321.cloudfree.jp/public_html/13jellies/spatiotemporal_scaler/`
- Markdownの`image`にはこのベースに続く相対パスまたは絶対URLを保持する。

## 記事投稿ワークフロー
- 記事はMarkdownファイルを直接リポジトリへ追加・更新することで行う。
- 追加後はAstroのビルドで記事一覧と各記事ページを静的生成する。

## 開発ノート
- 初期実装ではサンプルMarkdownとReactの最小コンポーネントを作成する。
- 仕様変更や実運用の要件に応じてFrontMatter設計を見直す。

