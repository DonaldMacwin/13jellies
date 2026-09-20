# 記事ファイルの書き方

このフォルダでは、1記事につき1つの Markdown ファイルを置きます。

## 保存場所

- `content/articles/*.md`

## ファイル名ルール

- 推奨: `YYYY-MM-DD-slug.md`
- 例: `2026-09-12-spatiotemporal-sample.md`

ファイル名は管理用です。ページ URL と記事識別には frontmatter の `slug` が使われます。

## URL ルール

- `slug: "spatiotemporal-sample"` と書くと、URL は `/articles/spatiotemporal-sample` になります。

## スライダー連動ルール

記事選択は frontmatter の `space_index` と `time_index` を使います。

- `space_index`: 空間スライダー位置
- `time_index`: 時間スライダー位置

トップページ `/` の初期表示は、現在 `space_index: 0` と `time_index: 10` を基準にしています。

完全一致する記事があれば、その記事が表示されます。
完全一致がなければ、現在は「距離が最も近い記事」が表示されます。

そのため、189 本すべてを必ず用意する必要はありません。
ただし、全スライダー位置ごとに固有の記事を必ず出したいなら、9 × 21 = 189 本が必要です。

### `space_index` の対応

- `0`: `5×10^0 km`
- `1`: `5×10^1 km`
- `2`: `5×10^2 km`
- `3`: `5×10^3 km`
- `4`: `5×10^5 km`
- `5`: `5×10^10 km`
- `6`: `10^0 ly`
- `7`: `10^1 ly`
- `8`: `10^10 ly`

### `time_index` の対応

- `0`: `5×10^12年前`
- `1`: `5×10^10年前`
- `2`: `5×10^8年前`
- `3`: `5×10^6年前`
- `4`: `5×10^5年前`
- `5`: `5×10^4年前`
- `6`: `5×10^3年前`
- `7`: `5×10^2年前`
- `8`: `5×10^1年前`
- `9`: `5×10^0年前`
- `10`: `今`
- `11`: `5×10^0年後`
- `12`: `5×10^1年後`
- `13`: `5×10^2年後`
- `14`: `5×10^3年後`
- `15`: `5×10^4年後`
- `16`: `5×10^5年後`
- `17`: `5×10^6年後`
- `18`: `5×10^8年後`
- `19`: `5×10^10年後`
- `20`: `5×10^12年後`

## frontmatter の必須項目

最低限、次を入れてください。

```yaml
---
title: "記事タイトル"
date: "2026-09-12T15:30:00Z"
slug: "spatiotemporal-sample"
summary: "記事の短い概要"
author: "著者名"
space_index: 2
space_unit: "km"
time_index: 10
published: true
---
```

## frontmatter の任意項目

- `id`: 内部識別用の固定 ID。未指定なら `slug` を使います。
- `image`: 画像 URL。
- `image_alt`: 画像の代替テキスト。
- `categories`: カテゴリ配列。
- `tags`: タグ配列。

## 本文ルール

- frontmatter の下に通常の Markdown を書きます。
- 見出し、箇条書き、コードブロックはそのまま使えます。

## サンプル

```md
---
title: "Spatiotemporal Scaler サンプル記事"
date: "2026-09-12T15:30:00Z"
slug: "spatiotemporal-sample"
summary: "スライダー表示と記事レイアウトをローカル確認するためのサンプル記事。"
author: "テスト著者"
space_index: 2
space_unit: "km"
time_index: 10
published: true
---

# 見出し

本文を書きます。
```