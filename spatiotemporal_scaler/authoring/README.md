# authoring/

sagan_ シリーズ（`content/articles/sagan_*.md`）の制作・検証用のファイルをまとめた場所です。サイトのビルドには使いません。

| ファイル | 中身 |
|---|---|
| `DESIGN.md` | サイトの構成と設計方針（2026-11-03 にルートから移し、現状に合わせて改稿） |
| `PLAYS.md` | 制作仕様の正本（書式・表記・作劇ルール・音のト書きなど） |
| `PLAYS-LOG.md` | 設計メモと改訂履歴、一人称版の設定台帳（§E） |
| `SCALE-REVIEW.md` | 2026-10-16 の「スケール」表記統一の該当箇所一覧（記録として保存） |
| `chk.mjs` | 戯曲版の検証器 |
| `chkp.mjs` | 一人称版の検証器 |
| `used.mjs` | 既出素材（人名・西暦など）の検索器 |
| `addbr.mjs` | 一人称版の段落末に `<br><br>` を付ける道具（先に `--dry-run`） |

スクリプトはどれも `content/articles/` をカレントディレクトリからの相対で探すので、**プロジェクトルートから** 実行します。

```
node authoring/chk.mjs t14
node authoring/chkp.mjs s6
node authoring/used.mjs ペンジアス 1965
node authoring/addbr.mjs --dry-run content/articles/sagan_s6_t3.md
```

2026-11-03 にプロジェクトルート直下からここへ移しました。
