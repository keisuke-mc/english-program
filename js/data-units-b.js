/* =====================================================
   Grammar as Code — ユニットデータ（Unit 8〜14）
   ===================================================== */
window.GAC = window.GAC || {};
GAC.units = GAC.units || [];

GAC.units.push(
  /* ------------------------------------------------
     Unit 8
  ------------------------------------------------ */
  {
    id: "unit-8",
    title: "進行形＝実行中プロセス",
    sub: "be + ~ing は「今まさに動いている」状態",
    lv: "中級",
    sections: [
      { t: "intro", html: "<b>be + ~ing</b> の進行形は、「今まさに実行中」の<b>プロセス</b>を表します。タスクのステータスが <code>RUNNING</code> になっている状態です。習慣の現在形とはまったく別物なので、両方を並べて違いを見てみましょう。" },
      {
        t: "code",
        title: "進行形のコード変換",
        code: "i.task = \"playing tennis\";   // I am playing tennis. (status: RUNNING)\nshe.task = \"studying\";       // She is studying.     (status: RUNNING)"
      },
      { t: "h", text: "3つの状態を並べて比較" },
      {
        t: "pair",
        rows: [
          ["<span class='pos-sub'>I</span> <span class='pos-verb'>play</span> tennis.", "定期実行ジョブ（習慣）", "毎回決まって実行される処理。cron で毎晩走るバッチ処理"],
          ["<span class='pos-sub'>I</span> <span class='pos-verb'>am playing</span> tennis.", "実行中プロセス", "いまこの瞬間に動いている。status: RUNNING"],
          ["<span class='pos-sub'>I</span> <span class='pos-verb'>played</span> tennis.", "完了ログ", "過去に実行済み。履歴として確定している"]
        ]
      },
      { t: "h", text: "過去進行形" },
      { t: "intro", html: "<code>was / were + ~ing</code> の過去進行形は、「<b>過去のある時点で</b>動いていたプロセス」です。その時点の実行状態をログから確認するイメージです。" },
      {
        t: "code",
        title: "過去時点の実行状態",
        code: "log(at_8pm, you.task = \"sleeping\");   // You were sleeping at eight."
      },
      {
        t: "note", kind: "tip", title: "進行形のサイン",
        body: "now（今）/ Look!（見て！）/ Listen!（聞いて！）が文にあれば進行形の可能性が高いです。逆に every day や always があれば習慣＝現在形（定期実行ジョブ）です。"
      },
      {
        t: "terms",
        items: [
          ["プロセス", "実行中の処理のこと。進行形のイメージ"],
          ["RUNNING", "「実行中」を表すステータス"],
          ["定期実行 (cron)", "決まった間隔で繰り返し走る処理。習慣の現在形のイメージ"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "Look! The bus (　). の（　）に入るのは？", opts: ["is coming", "comes", "came", "come"], a: 0, exp: "Look! は「今まさに見ている」サイン。今実行中のプロセスなので進行形 is coming です。" },
      { type: "choice", q: "「今、彼は本を読んでいます」の正しい英文は？", opts: ["He is reading a book now.", "He reads a book now.", "He read a book now.", "He will read a book now."], a: 0, exp: "now ＋ 実行中の動作なので進行形。be動詞 is ＋ reading です。" },
      { type: "choice", q: "習慣を表す現在形は、プログラムでいうどんな処理？", opts: ["定期実行されるジョブ", "実行中のプロセス", "完了したログ", "エラー"], a: 0, exp: "I play tennis.（習慣）は「決まって繰り返し実行される処理」＝定期実行ジョブのイメージです。" },
      { type: "order", q: "単語を並べ替えて「私は本を読んでいるところです」の英文を作ろう", words: ["I", "am", "reading", "a", "book"], exp: "主語 I ＋ am ＋ reading（~ing）。実行中プロセスの状態を表します。" }
    ]
  },

  /* ------------------------------------------------
     Unit 9
  ------------------------------------------------ */
  {
    id: "unit-9",
    title: "助動詞＝権限システム",
    sub: "can / must / should / may で実行権限を制御",
    lv: "中級",
    sections: [
      { t: "intro", html: "<b>can / must / should / may</b> などの助動詞は、処理の「実行権限」や「優先度」を設定する<b>権限システム</b>です。動詞の前に置いて使い、後ろの動詞は<b>必ず原形</b>になります。それぞれの助動詞を、システムの設定値として読み替えてみましょう。" },
      {
        t: "pair",
        rows: [
          ["can（〜できる）", "実行権限あり", "<code>permission(i, swim) = true;</code>"],
          ["cannot（〜できない）", "権限なし・拒否", "<code>permission(he, drive) = false;</code>"],
          ["must（〜しなければならない）", "必須実行", "<code>required(you, homework) = true;</code>"],
          ["should（〜すべき）", "推奨（警告）", "<code>recommend(you, sleep);</code> // warning"],
          ["may（〜してもよい）", "許可・任意", "<code>request_permission(i, enter) ?</code>"]
        ]
      },
      {
        t: "code",
        title: "助動詞エンジンのイメージ",
        code: "permission(i, swim) = true;      // I can swim.\npermission(he, drive) = false;   // He cannot drive.\nrequired(you, homework) = true;  // You must do your homework.\nrecommend(you, sleep);           // You should sleep more."
      },
      { t: "intro", html: "<code>must</code> は「必須バリデーション」——満たさないとシステムが先に進めない強制ルールです。<code>should</code> は「推奨設定」——守らなくても動くけど警告が出る、という感じ。この差を意識すると、助動詞の強さの順番（must ＞ should ＞ may）が体感できます。" },
      {
        t: "note", kind: "warn", title: "助動詞の後ろは必ず原形",
        body: "He can <b>swims</b> ✕ → He can <b>swim</b> ○。権限システムが設定を代行するので、動詞自体は変換されません。must と have to はどちらも「必須」ですが、must はシステム側の必須設定、have to は外部ルールによる必須、というニュアンスの違いがあります。"
      },
      {
        t: "terms",
        items: [
          ["権限 (permission)", "処理を実行してよいかの許可。can / cannot のイメージ"],
          ["バリデーション", "入力や状態の必須チェック。must のイメージ"],
          ["warning", "警告。守らなくても動くが推奨される。should のイメージ"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "「私は泳げます」の正しい英文は？", opts: ["I can swim.", "I must swim.", "I may swim.", "I am swim."], a: 0, exp: "「〜できる」＝実行権限ありなので can。can の後ろは原形 swim です。" },
      { type: "choice", q: "「〜しなければならない（必須）」を表す助動詞は？", opts: ["must", "may", "can", "will"], a: 0, exp: "must は必須バリデーション。required: true のイメージです。" },
      { type: "choice", q: "You should sleep more. の should のイメージは？", opts: ["推奨（警告は出るが強制されない）", "完全に禁止", "過去の記録", "疑問を表す"], a: 0, exp: "should は推奨設定。システムで言う warning で、守らなくても動くが、したほうがよいという意味です。" },
      { type: "order", q: "単語を並べ替えて「彼は車を運転できません」の英文を作ろう", words: ["He", "cannot", "drive", "a", "car"], exp: "cannot ＝ 実行権限なし。助動詞の後ろは原形 drive です。" }
    ]
  },

  /* ------------------------------------------------
     Unit 10
  ------------------------------------------------ */
  {
    id: "unit-10",
    title: "不定詞・動名詞＝関数を渡す",
    sub: "to + 原形 と ~ing は、関数を部品として扱う記法",
    lv: "中級",
    sections: [
      { t: "intro", html: "動詞の原形は「関数」です。英語では、その関数を<b>データとして別の処理に渡す</b>ことができます。<b>to + 原形（不定詞）</b>と <b>~ing（動名詞）</b>は、関数を「部品」として扱うための2つの記法です。プログラミングの「関数を引数に渡す」発想とまったく同じです。" },
      { t: "h", text: "不定詞の3つの働き" },
      {
        t: "code",
        title: "to + 原形 の使いどころ",
        code: "i.like(to_play(games));                  // 名詞的用法: I like to play games.\ni.go(station, purpose: to_buy(ticket));  // 副詞的用法: I went to the station to buy a ticket.\ni.homework.push(to_do);                  // 形容詞的用法: I have a lot of homework to do.",
        desc: "名詞的＝処理そのものを対象にする / 副詞的＝目的（なぜ実行するか）を渡す / 形容詞的＝名詞を後ろから修飾する"
      },
      { t: "h", text: "動名詞 ~ing ＝ 処理をデータ化" },
      {
        t: "code",
        title: "~ing を引数として渡す",
        code: "i.enjoy(playing_games);      // I enjoy playing games.\ni.finish(doing_homework);    // I finished doing my homework."
      },
      {
        t: "note", kind: "warn", title: "stop to do と stop doing は別物！",
        body: "<code>stop to eat</code> ＝ 実行中の処理を一時停止して、eat を開始する <code>pause(current); start(eat);</code><br>（食べるためにやめる）<br><code>stop eating</code> ＝ eat プロセスを終了する <code>kill(eat);</code><br>（食べるのをやめる）<br>同じ stop でも、渡す関数の使い方が違うと処理の流れが変わります。"
      },
      { t: "intro", html: "<code>like to do</code> は「これから実行する処理」を対象にし、<code>like doing</code> は「処理そのもの」を対象にします。このあたりはプログラムでも「今実行する関数」と「関数そのものを変数に保持する」違いに似ています。まずは enjoy ＋ ~ing、finish ＋ ~ing、want ＋ to do など、セットで登録するのがおすすめです。" },
      {
        t: "terms",
        items: [
          ["コールバック関数", "引数として渡される関数。不定詞・動名詞のイメージ"],
          ["不定詞 (to + 原形)", "関数を名詞・副詞・形容詞として使う記法"],
          ["動名詞 (~ing)", "処理をそのまま名詞（データ）として使う記法"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "I enjoy (　) books. の（　）に入るのは？", opts: ["reading", "read", "to read", "reads"], a: 0, exp: "enjoy は「処理そのもの」を対象にするので動名詞 reading を使います。enjoy ＋ ~ing のセットです。" },
      { type: "choice", q: "「私は切符を買うために駅に行きました」の to buy は何の用法？", opts: ["副詞的用法（目的）", "名詞的用法", "形容詞的用法", "受動態"], a: 0, exp: "「なぜ駅に行ったか」という目的を渡しているので副詞的用法。purpose パラメータのイメージです。" },
      { type: "choice", q: "stop to eat のコード的イメージはどれ？", opts: ["<code>pause(now); start(eat);</code>", "<code>kill(eat);</code>", "<code>eat = null;</code>", "<code>eat.status = DONE;</code>"], a: 0, exp: "stop to eat は「やめて（一時停止して）食べる」。実行中の処理を置き換えて eat を開始するイメージです。" },
      { type: "order", q: "単語を並べ替えて「私はゲームで遊ぶのが好きです」の英文を作ろう", words: ["I", "like", "to", "play", "games"], exp: "like ＋ to + 原形。「これから play するという処理」を like の対象として渡しています。" }
    ]
  },

  /* ------------------------------------------------
     Unit 11
  ------------------------------------------------ */
  {
    id: "unit-11",
    title: "受動態＝実行される側",
    sub: "be + 過去分詞。自分のメソッドが外部から呼ばれる",
    lv: "中級",
    sections: [
      { t: "intro", html: "<b>be + 過去分詞</b>の受動態は、主語が「処理を<b>実行する</b>側」ではなく「実行<b>される</b>側」になる形です。プログラムで言えば、english オブジェクトのメソッドが、<b>外部の誰かから呼び出されている</b>状態です。" },
      {
        t: "code",
        title: "受動態のコード変換",
        code: "english.is_spoken(by = many_people);   // English is spoken by many people.\nbook.was_written(by = him);            // This book was written by him.",
        desc: "by は「実行元（呼び出し元）」の指定です。実行者が不明・自明・重要でないときは by を省略します。"
      },
      { t: "h", text: "なぜ受動態を使うのか" },
      { t: "intro", html: "「この窓は昨日壊されました」——<b>誰が壊したか分からない</b>（重要でない）とき、主語を窓にして受動態にします。実行者を匿名にする、という発想です。プログラムでも「誰が実行したかより、何が起きたかが大事」という場面がありますよね。" },
      {
        t: "code",
        title: "実行者不明のログ",
        code: "window.was_broken(yesterday);   // The window was broken yesterday. (実行者: 不明)"
      },
      {
        t: "pair",
        rows: [
          ["能動態: Many people <span class='pos-verb'>speak</span> English.", "<span class='tk-var'>many_people</span>.<span class='tk-fn'>speak</span>(<span class='tk-var'>english</span>);", "実行する側が主語"],
          ["受動態: English <span class='pos-verb'>is spoken</span> ...", "<span class='tk-var'>english</span>.<span class='tk-fn'>is_spoken</span>(...);", "実行される側が主語"]
        ]
      },
      {
        t: "note", kind: "tip", title: "過去分詞って何？",
        body: "動詞の3つ目のかたち（play → played / write → written / speak → spoken）。不規則なものは Unit 6 の例外テーブルの仲間です。受動態では be動詞 ＋ この過去分詞のセットで「〜される」を作ります。"
      },
      {
        t: "terms",
        items: [
          ["過去分詞", "動詞の3番目のかたち。受動態で使う"],
          ["by", "実行者（呼び出し元）を指定する語"],
          ["匿名実行", "実行者が誰かを明示しないこと。by 省略のイメージ"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "This song is loved by many people. の by many people はどんな役割？", opts: ["実行者（呼び出し元）の指定", "引数（渡すデータ）", "コメント", "変数名"], a: 0, exp: "by は「だれによって〜されるか」の実行者指定です。love という処理を many people が実行しています。" },
      { type: "choice", q: "「この窓は昨日壊されました」の正しい英文は？", opts: ["The window was broken yesterday.", "The window is breaking yesterday.", "The window breaks yesterday.", "The window was breaking yesterday."], a: 0, exp: "窓は壊す処理の「実行される側」。過去の話なので was broken（受動態の過去）です。" },
      { type: "choice", q: "受動態を使いやすい場面はどれ？", opts: ["実行者が不明・重要でないとき", "実行者を強調したいとき", "命令したいとき", "未来の予定を言うとき"], a: 0, exp: "実行者が不明・自明・重要でないときに受動態は活躍します。実行者を匿名にするテクニックです。" },
      { type: "order", q: "単語を並べ替えて「英語は日本で話されています」の英文を作ろう", words: ["English", "is", "spoken", "in", "Japan"], exp: "be動詞 is ＋ 過去分詞 spoken。English が実行される側の主語です。" }
    ]
  },

  /* ------------------------------------------------
     Unit 12
  ------------------------------------------------ */
  {
    id: "unit-12",
    title: "現在完了＝完了フラグと稼働時間",
    sub: "have + 過去分詞。過去の実行が「今」に接続する",
    lv: "応用",
    sections: [
      { t: "intro", html: "<b>have + 過去分詞</b>の現在完了は、「過去に実行して、その<b>結果が今も続いている</b>」を表します。過去のある時点のログを見るだけの過去形と違い、「<b>現在の状態</b>に接続している」のがポイントです。完了・経験・継続の3つの使い方があります。" },
      { t: "h", text: "3つの意味 ＝ 3つの使い方" },
      {
        t: "pair",
        rows: [
          ["完了", "完了フラグ", "<code>i.task.done = true;</code> — もう終わっていて結果が残っている"],
          ["経験", "実行履歴の有無", "<code>hasEver(you, visit(kyoto)) ?</code> — 今までに実行したことがあるか"],
          ["継続", "稼働時間 (uptime)", "<code>uptime(i.live(here)) = \"5 years\";</code> — まだ動き続けている"]
        ]
      },
      {
        t: "code",
        title: "現在完了のコード変換",
        code: "i.task(\"homework\").done = true;    // I have finished my homework.\nhasEver(you, visit(kyoto)) ?       // Have you ever been to Kyoto?\nuptime(i.live(here)) = \"5 years\";  // I have lived here for five years."
      },
      { t: "h", text: "just / already / yet" },
      {
        t: "pair",
        rows: [
          ["just", "たった今完了", "<code>I have just finished it.</code>"],
          ["already", "すでに完了", "<code>I have already finished it.</code>"],
          ["yet", "まだ（未完了）", "<code>I haven't finished it yet.</code>"]
        ]
      },
      {
        t: "note", kind: "warn", title: "過去形との住み分け",
        body: "yesterday など明確な過去の時点と現在完了は基本いっしょに使いません。過去の時点＝過去形（その時点のログ）、現在との接続＝現在完了（今に有効な状態）です。ファイルの更新日時を見るか、稼働状況を見るか、の違いです。"
      },
      {
        t: "terms",
        items: [
          ["完了フラグ (done)", "処理が終わったことを示す真偽値。完了のイメージ"],
          ["稼働時間 (uptime)", "システムが動き続けている時間。継続のイメージ"],
          ["実行履歴", "過去に実行した記録の有無。経験のイメージ"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "「私はちょうど宿題を終えたところです」の正しい英文は？", opts: ["I have just finished my homework.", "I just finish my homework.", "I am just finished my homework.", "I will just finish my homework."], a: 0, exp: "just（たった今）＋ 完了フラグなので現在完了。have just finished です。" },
      { type: "choice", q: "継続（uptime）のイメージが合う文はどれ？", opts: ["I have lived here for five years.", "I lived here five years ago.", "I will live here.", "I am living here yesterday."], a: 0, exp: "for five years（5年間ずっと・まだ稼働中）は現在完了の継続です。uptime が今も増え続けています。" },
      { type: "choice", q: "Have you ever been to Kyoto? への肯定の答えは？", opts: ["Yes, I have.（実行履歴あり）", "Yes, I did.", "Yes, I am.", "Yes, I do."], a: 0, exp: "現在完了の疑問には have で答えます。Yes, I have. ＝ 履歴あり（true）です。" },
      { type: "order", q: "単語を並べ替えて「私は宿題を終えました（完了）」の英文を作ろう", words: ["I", "have", "finished", "my", "homework"], exp: "have ＋ 過去分詞 finished。完了フラグが立っている状態を表します。" }
    ]
  },

  /* ------------------------------------------------
     Unit 13
  ------------------------------------------------ */
  {
    id: "unit-13",
    title: "接続詞とif文＝条件分岐",
    sub: "and は &&、or は ||、if はそのまま if 文",
    lv: "応用",
    sections: [
      { t: "intro", html: "接続詞は処理と処理をつなぐ「構文」です。<b>and</b> と <b>or</b> はそのまま論理演算子、そして <b>if</b> はなんとプログラミングの <b>if 文そのもの</b>。英文を読みながら、そのまま制御構造が頭に浮かぶようになります。" },
      {
        t: "pair",
        rows: [
          ["and", "&&（両方）", "bread and rice → <code>bread && rice</code>"],
          ["or", "||（どちらか）", "tea or coffee → <code>tea || coffee</code>"],
          ["but", "切替・例外", "前の処理を打ち切って次の処理へ"],
          ["because", "理由のコメント", "<code>// because ...</code>（なぜなら）"],
          ["when", "イベントトリガー", "<code>on(イベント, 処理)</code>"]
        ]
      },
      {
        t: "code",
        title: "if 文はそのまま if 文",
        code: "if (rains(tomorrow)) {\n  schedule(i.stay(home));\n}\n// If it rains tomorrow, I will stay home."
      },
      {
        t: "code",
        title: "when はイベントトリガー",
        code: "on(rain, stay_home);\n// When it rains, I stay home.（雨のときは家にいます）"
      },
      { t: "h", text: "think は「文を引数に取る関数」" },
      { t: "intro", html: "<code>I think (that) he is honest.</code> のように、think の後ろに文を丸ごと入れることができます。これは「think という関数に、もう1つの文（処理）を引数として渡している」イメージです。that は引数の開始を示す目印で、省略できることもあります。" },
      {
        t: "code",
        title: "文を引数として渡す",
        code: "i.think(he.status == \"honest\");\n// I think (that) he is honest."
      },
      {
        t: "note", kind: "tip", title: "論理演算子の読み方",
        body: "<code>bread && rice</code> は「パンと米の両方」、<code>tea || coffee</code> は「お茶かコーヒーのどちらか」。&&（AND）/ ||（OR）はプログラミングで最もよく使う演算子なので、英文法と一緒に覚えてしまいましょう。"
      },
      {
        t: "terms",
        items: [
          ["if 文", "条件が真のときだけ処理を実行する構文"],
          ["論理演算子 (&& ||)", "条件を組み合わせる演算。and / or のイメージ"],
          ["イベント", "「〜したとき」に発火する処理。when のイメージ"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "If it rains, I will stay home. の if の働きは？", opts: ["条件分岐（〜なら〜する）", "理由の説明", "比較", "受動態"], a: 0, exp: "if は条件分岐そのもの。「雨が降る（条件が true）なら、家にいる（処理を実行する）」です。" },
      { type: "choice", q: "「お茶かコーヒーのどちらか」をコードで書くと？", opts: ["<code>tea || coffee</code>", "<code>tea && coffee</code>", "<code>tea == coffee</code>", "<code>!tea</code>"], a: 0, exp: "or ＝ ||（どちらか一方でも真なら真）。and（両方）なら && になります。" },
      { type: "choice", q: "I think that he is honest. のコード表現として合うものは？", opts: ["<code>i.think(he == honest);</code>", "<code>think.i(honest);</code>", "<code>he.think(i);</code>", "<code>honest(i, think);</code>"], a: 0, exp: "think は「文を引数に取る関数」です。i が think を実行し、引数として「he is honest」を渡しています。" },
      { type: "order", q: "単語を並べ替えて「雨が降ったら、私は家にいます」の英文を作ろう", words: ["If", "it", "rains", "I", "will", "stay", "home"], exp: "If + 条件文 ＋ 主結果文。if 文とまったく同じ構造です。" }
    ]
  },

  /* ------------------------------------------------
     Unit 14
  ------------------------------------------------ */
  {
    id: "unit-14",
    title: "関係代名詞＝参照つき修飾",
    sub: "who / which / that で名詞を「説明つき」にする",
    lv: "応用",
    sections: [
      { t: "intro", html: "<b>who / which / that</b> の関係代名詞は、前の名詞を「後ろの説明で上書き修飾」する仕組みです。関係代名詞は前の名詞への<b>参照（リンク）</b>を持ちながら、後ろの節の中で主語や目的語として働きます。「2つの文を1本のコードに結合する」イメージです。" },
      {
        t: "code",
        title: "who は friend への参照",
        code: "friend = new Person();\nfriend.livesIn(tokyo);\n// I have a friend who lives in Tokyo.（東京に住んでいる友達）",
        desc: "who ＝ friend への参照です。後ろの節の中で、friend が主語として振る舞っています。"
      },
      {
        t: "pair",
        rows: [
          ["who", "人への参照", "a friend <b>who</b> lives in Tokyo"],
          ["which", "物・動物への参照", "a dog <b>which</b> runs fast"],
          ["that", "人にも物にも使える", "the book <b>that</b> I read"]
        ]
      },
      { t: "h", text: "目的格：節の中で目的語になる場合" },
      { t: "intro", html: "後ろの節の中で、関係代名詞が<b>目的語</b>になる場合もあります。<code>the book (that) I read</code>（私が読んだ本）では、that が read の目的語です。そしてここで面白いルール——目的格の that は<b>省略できる</b>のです。「ルール上は存在するが、書かなくてよい変数」ということです。" },
      {
        t: "code",
        title: "目的格のイメージ",
        code: "book = read(i);   // the book (that) I read → i.read(book)"
      },
      {
        t: "note", kind: "tip", title: "人か、物か、それだけ",
        body: "まず「修飾したい名詞は人か？物か？」だけを見て who / which / that を選べば大丈夫です。節の中で主語か目的語かは、その次のステップ。参照先が決まれば、あとは普通の文として読めます。"
      },
      {
        t: "terms",
        items: [
          ["参照 (reference)", "別の場所にあるデータを指し示すこと。関係代名詞のイメージ"],
          ["主格", "節の中で主語になる用法（who lives...）"],
          ["目的格", "節の中で目的語になる用法（that I read...）"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "人を修飾する関係代名詞はどれ？", opts: ["who", "which", "where", "what"], a: 0, exp: "who は人への参照です。物・動物なら which、両方に使えるのが that です。" },
      { type: "choice", q: "「東京に住んでいる友達」の正しい英文は？", opts: ["a friend who lives in Tokyo", "a friend which lives in Tokyo", "a friend lives in Tokyo", "a friend whom live in Tokyo"], a: 0, exp: "friend は人なので who。節の中で主語だから lives（三単現の s 付き）が続きます。" },
      { type: "choice", q: "I have a dog which runs fast. の which が指すものは？", opts: ["a dog", "fast", "I", "runs"], a: 0, exp: "which は a dog への参照です。後ろの節（runs fast）の中で a dog が主語として働いています。" },
      { type: "order", q: "単語を並べ替えて「東京に住んでいる友達がいます」の英文を作ろう", words: ["I", "have", "a", "friend", "who", "lives", "in", "Tokyo"], exp: "have ＋ a friend ＋ who（=friend の参照）＋ lives in Tokyo。2つの情報が1文にまとまっています。" }
    ]
  }
);
