# Grammar as Code — 英文法をプログラムで学ぶ

中学英語の文法（be動詞〜関係代名詞の14ユニット）を、**プログラミングのコードに置き換えて**学ぶ静的サイトです。

- ビルド不要・依存パッケージなしのピュア HTML / CSS / JavaScript
- GitHub Pages にそのままデプロイ可能
- 学習の進捗はブラウザの localStorage に自動保存（サーバー不要）
- スマートフォン対応のレスポンシブデザイン

## 学習コンテンツ

| ユニット | 文法項目 | プログラムへの置き換え |
|---|---|---|
| Unit 1 | 文の基本（S+V / S+V+O） | オブジェクト.メソッド(引数) |
| Unit 2 | be動詞 | 代入演算子（=） |
| Unit 3 | 一般動詞 | メソッド実行 |
| Unit 4 | 三単現の s | 条件を満たすと発動する自動変換（if文） |
| Unit 5 | 否定文・疑問文 | NOT 演算子（!）と確認クエリ（true/false） |
| Unit 6 | 過去形 | 実行ログ |
| Unit 7 | 未来形（will / be going to） | 予約実行（schedule） |
| Unit 8 | 進行形 | 実行中プロセス（RUNNING） |
| Unit 9 | 助動詞（can / must / should / may） | 権限システム（permission） |
| Unit 10 | 不定詞・動名詞 | 関数を引数として渡す |
| Unit 11 | 受動態 | 実行される側（外部から呼ばれる処理） |
| Unit 12 | 現在完了 | 完了フラグ（done = true）と稼働時間（uptime） |
| Unit 13 | 接続詞・if 節 | 論理演算子（&& / \|\|）と if 文 |
| Unit 14 | 関係代名詞 | 参照（reference）つき修飾 |

各ユニットに「チェックテスト」（選択式 + 語順並べ替え、計56問）が付いています。

## ファイル構成

```
english-grammar-as-code/
├── index.html          … エントリーポイント
├── css/style.css       … スタイル（GitHub Dark風テーマ）
├── js/data-units-a.js  … ユニット1〜7の内容
├── js/data-units-b.js  … ユニット8〜14の内容
├── js/data-misc.js     … 対応表・デモデータ
├── js/app.js           … ルーティング・クイズエンジン
├── .nojekyll           … GitHub Pages のJekyll処理を無効化
└── README.md           … このファイル
```

## ローカルで確認する

`index.html` をダブルクリックしてブラウザで開くだけでも動作します。より確実に確認したい場合は、フォルダで簡単なサーバーを起動します。

```bash
cd english-grammar-as-code
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

## GitHub Pages で公開する手順

1. **GitHub でリポジトリを作成**
   - GitHub にログインし、右上の「＋」→「New repository」
   - リポジトリ名（例： `grammar-as-code`）を入力して Public で作成

2. **ファイルをアップロード**
   - 作成したリポジトリのページで「uploading an existing file」をクリック
   - このフォルダの中身（`index.html` / `css/` / `js/` / `.nojekyll` など）を**ドラッグ＆ドロップ**
   - `.nojekyll` は隠しファイルなので、OSの設定で隠しファイルを表示してからドロップしてください
   - 「Commit changes」をクリック

3. **Pages を有効化**
   - リポジトリの「Settings」→ 左メニュー「Pages」
   - 「Source」で **Deploy from a branch** を選択
   - Branch で **main** ／ フォルダで **/(root)** を選んで「Save」

4. **公開完了**
   - 1〜2分待つと `https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます

### git コマンドで公開する場合

```bash
cd english-grammar-as-code
git init
git add .
git commit -m "Grammar as Code"
git branch -M main
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git push -u origin main
```

その後、上記の手順3で Pages を有効化してください。

## カスタマイズする

- **ユニットを追加・編集する**: `js/data-units-a.js` / `js/data-units-b.js` にデータを追加してください。既存ユニットをコピーすると簡単です。
- **対応表を編集する**: `js/data-misc.js` の `GAC.map` を編集します。
- **色やデザインを変える**: `css/style.css` の `:root` 内の変数（`--bg` `--blue` など）を変更します。
- **サイト名を変える**: `index.html` の `<title>` とヘッダーのロゴ部分を編集します。
