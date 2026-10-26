/* =====================================================
   Grammar as Code — 対応表・デモ・ヒーローデータ
   ===================================================== */
window.GAC = window.GAC || {};

/* ---------- ヒーローのタイピングデモ ---------- */
GAC.hero = [
  { en: "I play tennis.", code: "i.play(tennis);" },
  { en: "He is kind.", code: "he.status = \"kind\";" },
  { en: "Can you swim?", code: "can(you, swim) ?   // 実行権限の確認" },
  { en: "She was reading.", code: "she.task = \"reading\"; // RUNNING" },
  { en: "I have finished it.", code: "i.task.done = true;   // 完了フラグ" }
];

/* ---------- ホームのインタラクティブデモ ---------- */
GAC.demo = {
  en: [
    { t: "I", cls: "pos-sub", role: "主語 = <b>変数</b>", note: "動作を実行するオブジェクト（i という変数）" },
    { t: "play", cls: "pos-verb", role: "動詞 = <b>メソッド</b>", note: "実行される処理（play というメソッド呼び出し）" },
    { t: "tennis", cls: "pos-obj", role: "目的語 = <b>引数</b>", note: "処理に渡すデータ（tennis という引数）" },
    { t: "every Sunday", cls: "pos-mod", role: "修飾語 = <b>コメント</b>", note: "補足情報。いつ実行するかの指定" }
  ],
  code: [
    { t: "i", cls: "tk-var", pair: 0 },
    { t: ".", cls: "", pair: -1 },
    { t: "play", cls: "tk-fn", pair: 1 },
    { t: "(", cls: "", pair: -1 },
    { t: "tennis", cls: "tk-num", pair: 2 },
    { t: ");", cls: "", pair: -1 },
    { t: "  // every Sunday", cls: "tk-cm", pair: 3 }
  ]
};

/* ---------- 対応表（チートシート） ---------- */
GAC.map = [
  {
    cat: "基礎の対応",
    rows: [
      { en: "主語 (Subject)", code: "i  （変数・オブジェクト）", note: "処理を実行する「だれ・なに」" },
      { en: "動詞 (Verb)", code: ".play()  （メソッド）", note: "実行される処理の中身" },
      { en: "目的語 (Object)", code: "tennis  （引数）", note: "処理に渡すデータ" },
      { en: "補語 (Complement)", code: "he.status = \"kind\";", note: "主語の状態・正体を設定" },
      { en: "修飾語 (Modifier)", code: "// yesterday  （コメント）", note: "いつ・どこで・どのように" },
      { en: "語順", code: "構文 (syntax)", note: "順番が意味を決める。プログラムも同じ" },
      { en: "代名詞 (it, they...)", code: "変数の再利用", note: "一度出てきたものを参照する" }
    ]
  },
  {
    cat: "be動詞と動詞",
    rows: [
      { en: "be動詞 (am / is / are)", code: "=  （代入演算子）", note: "i = student; 状態や正体の設定" },
      { en: "一般動詞", code: "メソッド呼び出し", note: "i.play(tennis); 処理の実行" },
      { en: "三単現の s", code: "自動変換ルール", note: "if (3人称単数 && 現在形) verb += \"s\";" },
      { en: "do / does", code: "ヘルパー関数", note: "否定・疑問を助ける補助役" }
    ]
  },
  {
    cat: "否定・疑問",
    rows: [
      { en: "not", code: "!  （NOT演算子）", note: "真偽の反転。I am not... = i != ..." },
      { en: "疑問文", code: "確認クエリ ( ? )", note: "you == student ? のように比較で確認" },
      { en: "Yes / No", code: "true / false", note: "答えはブール値。return true;" }
    ]
  },
  {
    cat: "時制（時間のバージョン管理）",
    rows: [
      { en: "現在形（習慣）", code: "定期実行ジョブ (cron)", note: "決まって繰り返される処理" },
      { en: "過去形", code: "実行ログ (git log)", note: "log(yesterday, i.play()); 過去の履歴" },
      { en: "未来形 will", code: "予約実行 (schedule)", note: "schedule(i.go(), tomorrow); その場で決めた予定" },
      { en: "be going to", code: "計画済みタスク (plan)", note: "前もって計画された未来の処理" },
      { en: "進行形 (be ~ing)", code: "実行中プロセス", note: "i.task = \"playing\"; status: RUNNING" },
      { en: "現在完了 (have p.p.)", code: "完了フラグ・稼働時間", note: "i.task.done = true; uptime = 5 years" }
    ]
  },
  {
    cat: "助動詞（権限システム）",
    rows: [
      { en: "can", code: "実行権限あり", note: "permission = true" },
      { en: "cannot", code: "権限なし", note: "permission denied" },
      { en: "must", code: "必須バリデーション", note: "required: true を満たすまで進めない" },
      { en: "should", code: "推奨設定", note: "warning。強制はされないが推奨" },
      { en: "may", code: "任意・許可", note: "optional。してもよい" }
    ]
  },
  {
    cat: "準動詞と比較",
    rows: [
      { en: "不定詞 (to + 原形)", code: "関数をデータとして渡す", note: "i.like(to_read(books));" },
      { en: "動名詞 (~ing)", code: "処理をデータ化", note: "i.enjoy(reading);" },
      { en: "受動態 (be p.p.)", code: "外部から呼ばれる処理", note: "english.is_spoken(by = people);" },
      { en: "比較級 (~er than)", code: "比較演算子 ( > )", note: "my.height > your.height" },
      { en: "最上級 (the ~est)", code: "max() / min()", note: "全体の中で一番。最大値を取る" },
      { en: "as ~ as", code: "等価演算子 ( == )", note: "height(x) == height(y) 同じ値か確認" }
    ]
  },
  {
    cat: "節と接続（制御構造）",
    rows: [
      { en: "and", code: "&&", note: "bread && rice 両方の条件" },
      { en: "or", code: "||", note: "tea || coffee どちらか" },
      { en: "if", code: "if 文", note: "if (rains) { stay(home); } 条件分岐そのもの" },
      { en: "when", code: "イベントトリガー", note: "on(rain, stay_home) 〜したときに発火" },
      { en: "because", code: "理由のコメント", note: "// because it rained なぜなら" },
      { en: "関係代名詞 who / which", code: "参照つき修飾", note: "friend.who.livesIn(tokyo) 参照先を説明で上書き" }
    ]
  },
  {
    cat: "名詞のしかた",
    rows: [
      { en: "a / an", code: "新規宣言 (var)", note: "初登場のオブジェクトを作る" },
      { en: "the", code: "既存オブジェクトの参照", note: "もう話題に出た、あのオブジェクト" },
      { en: "複数形 (-s)", code: "配列", note: "books = [book, book, book]" }
    ]
  }
];
