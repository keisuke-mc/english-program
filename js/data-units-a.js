/* =====================================================
   Grammar as Code — ユニットデータ（Unit 1〜7）
   ===================================================== */
window.GAC = window.GAC || {};
GAC.units = GAC.units || [];

GAC.units.push(
  /* ------------------------------------------------
     Unit 1
  ------------------------------------------------ */
  {
    id: "unit-1",
    title: "英文はプログラムだ",
    sub: "主語＝オブジェクト、動詞＝メソッド、目的語＝引数",
    lv: "入門",
    sections: [
      { t: "intro", html: "英文は、読み手という「コンピュータ」に何かを実行してもらうための<b>命令文</b>です。プログラムで <code>i.play(tennis);</code> と書くように、英語も「だれが（主語）・何を（動詞）・何を対象に（目的語）」という<b>順番（構文）</b>で処理を組み立てます。まずは英文のパーツが、プログラムのパーツとどう対応するのかを見ていきましょう。" },
      { t: "h", text: "英文のパーツ ＝ プログラムのパーツ" },
      {
        t: "pair",
        rows: [
          ["<span class='pos-sub'>I</span>", "<span class='tk-var'>i</span>（変数）", "動作の主体。実行するオブジェクト"],
          ["<span class='pos-verb'>play</span>", "<span class='tk-fn'>.play()</span>（メソッド）", "実行される処理の中身"],
          ["<span class='pos-obj'>tennis</span>", "<span class='tk-num'>tennis</span>（引数）", "処理の対象になるデータ"],
          ["<span class='pos-mod'>every Sunday</span>", "<span class='tk-cm'>// every Sunday</span>（コメント）", "補足情報（いつ・どこで・どのように）"]
        ]
      },
      {
        t: "code",
        title: "文は「関数の実行」である",
        code: "i.play(tennis);",
        desc: "「私はテニスをします」は、i というオブジェクトが play という処理を、tennis を引数にして実行する、という意味です。"
      },
      {
        t: "code",
        title: "いろいろな文をコードにしてみる",
        code: "we.study(english);   // We study English.（私たちは英語を勉強します）\nbirds.sing();        // Birds sing.（鳥は歌います）※引数なし＝目的語なし\nmy_mother.cooks();   // My mother cooks.（母は料理します）"
      },
      { t: "h", text: "なぜ「語順」が大事なのか" },
      { t: "intro", html: "プログラムは構文（文法）を間違えるとエラーになります。英語も同じで、<b>語順が意味を決めます</b>。日本語は「テニスを私はします」と書いても通じますが、英語とプログラムは順番が変わると意味が変わります。<code>i.play(tennis)</code> と <code>tennis.play(i)</code> は別物です。この「順番のルール」を守ることが、英文法の第一歩です。" },
      {
        t: "note", kind: "tip", title: "色分けのルール",
        body: "このサイトでは <span class='pos-sub'>主語（青）</span>・<span class='pos-verb'>動詞（紫）</span>・<span class='pos-obj'>目的語（オレンジ）</span>・<span class='pos-mod'>修飾語（グレー）</span> で色を分けています。色を意識して読むと、英文の構造が目で見えるようになります。"
      },
      {
        t: "terms",
        items: [
          ["変数 (variable)", "データを入れておく「名前のついた箱」。主語のイメージ"],
          ["メソッド (method)", "オブジェクトが持っている処理。動詞のイメージ"],
          ["引数 (argument)", "処理に渡すデータ。目的語のイメージ"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "<code>birds.sing();</code> を英文にすると？", opts: ["Birds sing.", "Birds are singing.", "The bird sings songs.", "Sing birds."], a: 0, exp: "birds（主語）が sing（動詞）を実行する S+V の文です。引数がないので目的語もありません。「Birds are singing.」は進行形（Unit 8）で学びます。" },
      { type: "choice", q: "「I study math.」をコードにすると？", opts: ["<code>i.study(math);</code>", "<code>study.i(math);</code>", "<code>math.study(i);</code>", "<code>i.math(study);</code>"], a: 0, exp: "主語 i がメソッド study を実行し、引数に math を渡します。語順（構文）を守るのがポイントです。" },
      { type: "choice", q: "英文の「目的語」にあたるプログラムの要素はどれ？", opts: ["引数（処理に渡すデータ）", "変数名", "コメント", "ファイル名"], a: 0, exp: "目的語は動詞（メソッド）の処理の対象になるデータ、つまり「引数」です。" },
      { type: "order", q: "単語を並べ替えて「私はテニスをします」の英文を作ろう", words: ["I", "play", "tennis"], exp: "主語 I ＋ 動詞 play ＋ 目的語 tennis の S+V+O 型の文です。" }
    ]
  },

  /* ------------------------------------------------
     Unit 2
  ------------------------------------------------ */
  {
    id: "unit-2",
    title: "be動詞は「=」（代入）",
    sub: "am / is / are は状態や正体を設定する代入文",
    lv: "入門",
    sections: [
      { t: "intro", html: "be動詞（am / is / are）は「〜です」と、主語の<b>状態や正体を設定する</b>言葉です。これはプログラムの<b>代入（=）</b>と同じ動きをします。I という変数に student という状態を代入している、というイメージを持ってください。" },
      {
        t: "pair",
        rows: [
          ["<span class='pos-sub'>I</span> <span class='pos-verb'>am</span> a student.", "<span class='tk-var'>i</span> = <span class='tk-var'>student</span>;", "「私は学生です」＝ i に student を代入"],
          ["<span class='pos-sub'>He</span> <span class='pos-verb'>is</span> kind.", "<span class='tk-var'>he</span>.<span class='tk-var'>status</span> = <span class='tk-str'>\"kind\"</span>;", "状態（プロパティ）への代入"],
          ["<span class='pos-sub'>I</span> <span class='pos-verb'>am</span> fifteen.", "<span class='tk-var'>i</span>.<span class='tk-var'>age</span> = <span class='tk-num'>15</span>;", "数値データの代入もできる"],
          ["<span class='pos-sub'>They</span> <span class='pos-verb'>are</span> teachers.", "<span class='tk-var'>they</span> = <span class='tk-num'>teachers</span>;", "複数の主語でも同じ代入"]
        ]
      },
      {
        t: "code",
        title: "代入のイメージをまとめて確認",
        code: "i = student;           // I am a student.\nhe.status = \"kind\";    // He is kind.\ni.age = 15;            // I am fifteen (years old).\nyou = ready;           // You are ready."
      },
      { t: "h", text: "代入だから「変化」も表せる" },
      { t: "intro", html: "プログラムの変数は後から書き換えられます。be動詞の文も同じで、<b>状態の変化</b>を表せます。<code>I am happy now.</code> は「いま happy が代入された」状態です。以前は別の値が入っていたはず——と想像できるのがプログラマーの読み方です。" },
      {
        t: "note", kind: "warn", title: "be動詞に「動作」はない",
        body: "be動詞は「〜する」という動作を表せません。be ＝ =（代入）と割り切ってください。動作を言いたいときは一般動詞（Unit 3）の出番です。"
      },
      {
        t: "terms",
        items: [
          ["代入 (=)", "変数に値を設定すること。be動詞の中身"],
          ["プロパティ", "オブジェクトが持つ状態。status や age など"],
          ["文字列 (string)", "\"kind\" のようなテキストデータ"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "<code>he.status = \"kind\";</code> を英文にすると？", opts: ["He is kind.", "He does kind.", "He kinds well.", "He is kindness."], a: 0, exp: "he というオブジェクトの status に \"kind\" を代入＝「彼は親切です」。be動詞の文は代入文として読みます。" },
      { type: "choice", q: "「私は先生です」をコードにすると？", opts: ["<code>i = teacher;</code>", "<code>i.teacher();</code>", "<code>i.teach(student);</code>", "<code>teacher.teach(i);</code>"], a: 0, exp: "be動詞は代入です。i に teacher を代入しています。<code>i.teach(student);</code> は一般動詞で「私は生徒に教えます」の意味になります。" },
      { type: "choice", q: "I am fifteen. の「fifteen」は、コードではどんなデータ？", opts: ["i の age プロパティに入る数値", "i の名前", "i のメソッド", "コメント"], a: 0, exp: "年齢という状態のデータが i に代入されているイメージです。" },
      { type: "order", q: "単語を並べ替えて「あなたは親切です」の英文を作ろう", words: ["You", "are", "kind"], exp: "You ＋ are（代入）＋ kind。be動詞は主語によって am / is / are を使い分けます。" }
    ]
  },

  /* ------------------------------------------------
     Unit 3
  ------------------------------------------------ */
  {
    id: "unit-3",
    title: "一般動詞＝メソッド実行",
    sub: "「〜する」は処理そのもの。主語で形が変わる",
    lv: "入門",
    sections: [
      { t: "intro", html: "be動詞以外の動詞（play, study, run など）を<b>一般動詞</b>と呼びます。一般動詞は「〜する」という<b>処理そのもの</b>。オブジェクト（主語）が持つメソッドを実行しているイメージです。" },
      {
        t: "code",
        title: "メソッド実行のいろいろ",
        code: "i.play(tennis);     // I play tennis.（私はテニスをします）\nwe.study(english);  // We study English.（私たちは英語を勉強します）\nmy_sister.works();  // My sister works.（姉は働いています）"
      },
      { t: "h", text: "主語によって動詞の形が変わる" },
      { t: "intro", html: "プログラムでは <code>i.play()</code> も <code>we.play()</code> も書き方は変わりません。しかし英語では<b>主語によって動詞の形が変わる</b>のがルールです。特に「3人称単数・現在形」のときは動詞に <b>s</b> がつきます。これを<b>三単現（さんたんげん）の s</b> と呼び、次の Unit 4 で詳しく扱います。" },
      {
        t: "pair",
        rows: [
          ["<span class='pos-sub'>I</span> <span class='pos-verb'>play</span> tennis.", "<span class='tk-var'>i</span>.<span class='tk-fn'>play</span>(<span class='tk-num'>tennis</span>);", "主語 I → 原形のまま"],
          ["<span class='pos-sub'>We</span> <span class='pos-verb'>play</span> tennis.", "<span class='tk-var'>we</span>.<span class='tk-fn'>play</span>(<span class='tk-num'>tennis</span>);", "複数 → 原形のまま"],
          ["<span class='pos-sub'>He</span> <span class='pos-verb'>plays</span> tennis.", "<span class='tk-var'>he</span>.<span class='tk-fn'>plays</span>(<span class='tk-num'>tennis</span>);", "3人称単数 → s 付きに自動変換！"]
        ]
      },
      {
        t: "note", kind: "tip", title: "原形のままでいい主語",
        body: "I / You / We / They / 複数の名詞（my parents など）のときは動詞は原形。He / She / It / 単数の名前（Ken, my father など）のときだけ s がつきます。"
      },
      {
        t: "terms",
        items: [
          ["原形", "辞書に載っている動詞のかたち。play, study など"],
          ["3人称", "話し手(I, we)・聞き手(you)以外の人やもの。he, she, it など"],
          ["メソッドチェーン", "処理をつなげて実行すること。英文なら文をつなげるイメージ"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "「彼女はピアノを弾きます」の正しい英文は？", opts: ["She plays the piano.", "She play the piano.", "She is play the piano.", "She playing the piano."], a: 0, exp: "主語が She（3人称単数）なので、動詞 play に s がついて plays になります。" },
      { type: "choice", q: "<code>i.run();</code> の意味はどれ？", opts: ["私は走ります", "私は走りました", "私は走っています", "走りなさい"], a: 0, exp: "一般動詞の現在形＝メソッド実行。「私は走ります」です。" },
      { type: "choice", q: "主語が They のとき、動詞はどんな形？", opts: ["原形のまま", "s をつける", "過去形にする", "ing 形にする"], a: 0, exp: "They は複数なので、三単現の s はつきません。原形のまま使います。" },
      { type: "order", q: "単語を並べ替えて「私たちは英語を勉強します」の英文を作ろう", words: ["We", "study", "English"], exp: "We は複数なので study に s はつきません。We study English. です。" }
    ]
  },

  /* ------------------------------------------------
     Unit 4
  ------------------------------------------------ */
  {
    id: "unit-4",
    title: "三単現のs＝自動変換ルール",
    sub: "条件を満たすと動詞に s が自動でつく if 文",
    lv: "基礎",
    sections: [
      { t: "intro", html: "「主語が3人称・単数・現在形」のとき、動詞に s が<b>自動で</b>つく——これは英語の処理系（コンパイラのようなもの）が勝手にやってくれる<b>変換ルール</b>です。あなたは s をつける操作をしているのではなく、条件を満たした結果、変換が発動している、と考えると理解が早いです。" },
      {
        t: "code",
        title: "三単現エンジンの正体（擬似コード）",
        code: "if (subject === he || subject === she || subject === it || isSingular(subject)) {\n  verb = verb + \"s\";   // 条件を満たすと自動で s が付く\n}"
      },
      { t: "h", text: "スペルの変換テーブル" },
      {
        t: "pair",
        rows: [
          ["通常", "+ s", "runs, plays, eats"],
          ["s / sh / ch / x / o で終わる", "+ es", "watches, goes, washes"],
          ["子音 + y で終わる", "y → ies", "studies, cries"],
          ["have（例外）", "has", "特別変換が登録されている"]
        ]
      },
      { t: "intro", html: "この変換テーブルは覚えるしかありません。ただ、プログラムの<b>例外処理</b>と同じで、よく使うパターンから順に「頭のテーブル」へ登録していけば自然になじみます。テストの前にテーブルを再読み込みする、くらいの気持ちで復習しましょう。" },
      {
        t: "note", kind: "tip", title: "確認ポイント",
        body: "三単現が効くのは「現在形」のときだけ。過去形（Unit 6）では動詞が過去形に変換されるので、s のルールは出番がありません。1つの変数に2つの変換はかからない、と覚えておきましょう。"
      },
      {
        t: "terms",
        items: [
          ["if 文", "「もし〜なら」の条件分岐。条件を満たすと処理が走る"],
          ["isSingular()", "主語が単数かどうかを調べる関数（擬似コード）"],
          ["例外処理", "ルールどおりにいかない特別なケースへの対応"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "<code>she.studies(english);</code> を英文にすると？", opts: ["She studies English.", "She study English.", "She studys English.", "She studying English."], a: 0, exp: "study は「子音+y」で終わるので、y が i に変わって studies になる変換ルールです。" },
      { type: "choice", q: "My father (　) TV every day. の（　）に入るのは？", opts: ["watches", "watch", "watching", "watched"], a: 0, exp: "主語 My father（3人称単数）＋ every day（現在形のサイン）なので三単現。watch は ch で終わるので watches になります。" },
      { type: "choice", q: "He (　) a dog. の（　）に入るのは？", opts: ["has", "haves", "have", "is have"], a: 0, exp: "have は例外の特別変換で、he / she / it のときは has になります。" },
      { type: "choice", q: "三単現の s がつく条件はどれ？", opts: ["主語が3人称・単数・現在形のとき", "過去の話をするとき", "主語が複数人のとき", "疑問文のとき"], a: 0, exp: "「3人称・単数・現在形」の3つがそろったときだけ、動詞への自動変換（+s）が発動します。" }
    ]
  },

  /* ------------------------------------------------
     Unit 5
  ------------------------------------------------ */
  {
    id: "unit-5",
    title: "否定文・疑問文＝NOT演算と確認",
    sub: "not は ! 演算子、疑問文の答えは true / false",
    lv: "基礎",
    sections: [
      { t: "intro", html: "<b>not</b> はプログラムの<b>NOT演算子（!）</b>と同じ「真偽の反転」です。<b>疑問文</b>は「この処理、本当？」という<b>確認クエリ</b>で、答えは <code>true</code>（Yes）/ <code>false</code>（No）で返ってきます。ここでは be動詞と一般動詞、両方のパターンを一度に整理します。" },
      { t: "h", text: "否定文 ＝ NOT" },
      {
        t: "code",
        title: "否定文のコード変換",
        code: "i != student;          // I am not a student.（私は学生ではありません）\n!(i.play(tennis));     // I don't play tennis.（私はテニスをしません）\n!(he.like(cats));      // He doesn't like cats.（彼は猫が好きではありません）"
      },
      { t: "intro", html: "一般動詞の否定では <b>do / does</b> という「ヘルパー」が登場して、NOT（!）を動詞のところまで運びます。<code>does</code> は do の三単現バージョンです。ヘルパーが NOT を運んでいる間、動詞は<b>原形に戻る</b>点に注目してください。" },
      { t: "h", text: "疑問文 ＝ 確認クエリ" },
      {
        t: "code",
        title: "疑問文のコード変換",
        code: "you == student ?     // Are you a student?\ni.play(tennis) ?     // Do you play tennis?\nhe.like(cats) ?      // Does he like cats?"
      },
      { t: "intro", html: "疑問文への答えは <code>true</code> / <code>false</code> そのものです。<code>Yes, I do.</code> は <code>return true;</code>、<code>No, I don't.</code> は <code>return false;</code> です。プログラムのブール値（真偽値）をそのまま返している感覚を掴みましょう。" },
      {
        t: "note", kind: "tip", title: "be動詞と一般動詞のちがい",
        body: "be動詞の疑問・否定は be動詞自身が動きます（Are you〜? / I am not〜）。一般動詞は do / does が手伝います。この違いは「代入文」と「メソッド実行」の違いから来ています。"
      },
      {
        t: "terms",
        items: [
          ["NOT 演算 (!)", "真偽を反転させる演算子。true は false に、false は true に"],
          ["ブール値 (boolean)", "true か false の2値だけのデータ型"],
          ["比較 (==)", "「同じか？」を確認する演算。疑問文のイメージ"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "<code>!(i.study(english));</code> を英文にすると？", opts: ["I don't study English.", "I study not English.", "I am not study English.", "Do I study English?"], a: 0, exp: "!(...) は否定です。一般動詞 study の否定なので、do not（don't）を使って I don't study English. になります。" },
      { type: "choice", q: "Does she play the piano? をコードで書くと？", opts: ["<code>she.play(piano) ?</code>", "<code>she.plays(piano) ?</code>", "<code>does(she.play(piano));</code>", "<code>she == play(piano) ?</code>"], a: 0, exp: "疑問文では動詞が原形に戻ります（s は does が引き取る）。だから <code>she.play(piano) ?</code> です。" },
      { type: "choice", q: "「Yes, he does.」はプログラムでいうと？", opts: ["<code>return true;</code>", "<code>return false;</code>", "<code>return null;</code>", "<code>error;</code>"], a: 0, exp: "Yes の答えは true の返却です。No の答えなら return false; になります。" },
      { type: "order", q: "単語を並べ替えて「あなたはテニスをしますか」の疑問文を作ろう", words: ["Do", "you", "play", "tennis"], exp: "一般動詞の疑問文は Do（主語＋動詞の原形）…？の語順。Do you play tennis? です。" }
    ]
  },

  /* ------------------------------------------------
     Unit 6
  ------------------------------------------------ */
  {
    id: "unit-6",
    title: "過去形＝実行ログ",
    sub: "過去の実行履歴。ログは書き換わらない",
    lv: "基礎",
    sections: [
      { t: "intro", html: "過去形は「過去に実行された処理の<b>ログ</b>」です。プログラムの実行ログは後から書き換えないのと同じで、過去形の文は「その時点で確定した履歴」を表します。<code>yesterday</code> や <code>last night</code> は、ログに付く<b>タイムスタンプ</b>だと思ってください。" },
      {
        t: "code",
        title: "規則動詞 ＝ +ed でログ化",
        code: "log(yesterday, i.play(tennis));    // I played tennis yesterday.\nlog(last_night, she.watch(tv));    // She watched TV last night."
      },
      { t: "h", text: "不規則動詞 ＝ 例外変換テーブル" },
      {
        t: "code",
        title: "頭の中に登録しておくテーブル",
        code: "irregular = {\n  go:   \"went\",\n  have: \"had\",\n  make: \"made\",\n  run:  \"ran\",\n  see:  \"saw\"\n};",
        desc: "不規則動詞は「例外処理テーブル」に登録された特別変換です。暗記＝テーブルの登録と考え、1つずつ確実に登録しましょう。"
      },
      { t: "h", text: "be動詞の過去形" },
      {
        t: "code",
        title: "was / were は過去時点の代入",
        code: "log(past, i.status = \"busy\");    // I was busy.\nlog(past, they.status = \"free\"); // They were free."
      },
      {
        t: "note", kind: "tip", title: "過去形のサインを見つける",
        body: "yesterday（昨日）/ last night（昨夜）/ last week（先週）/ in 2020（2020年に）/ two days ago（2日前）——「過去の時点」が書いてあれば、基本は過去形です。ログにはタイムスタンプが付く、という感覚です。"
      },
      {
        t: "terms",
        items: [
          ["ログ (log)", "システムが実行した処理の記録。過去形のイメージ"],
          ["タイムスタンプ", "「いつ実行されたか」の記録。yesterday など"],
          ["コミット (commit)", "変更履歴を確定して記録すること。過去形の確定感"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "go の過去形はどれ？", opts: ["went", "goed", "gone", "going"], a: 0, exp: "go は不規則動詞です。例外変換テーブルの go: \"went\" に従って went になります。" },
      { type: "choice", q: "「昨日、私は数学を勉強しました」の正しい英文は？", opts: ["I studied math yesterday.", "I study math yesterday.", "I am studying math yesterday.", "I will study math yesterday."], a: 0, exp: "yesterday（過去の時点）があるので過去形。study は「子音+y」なので studied に変換されます。" },
      { type: "choice", q: "She (　) TV last night. の（　）に入るのは？", opts: ["watched", "watches", "watch", "is watching"], a: 0, exp: "last night（過去の時点）があるので過去形。watch の過去形は規則変換で watched です。" },
      { type: "order", q: "単語を並べ替えて「私は昨日テニスをしました」の英文を作ろう", words: ["I", "played", "tennis", "yesterday"], exp: "play の過去形 played ＋ タイムスタンプ yesterday。ログとして過去の実行を表します。" }
    ]
  },

  /* ------------------------------------------------
     Unit 7
  ------------------------------------------------ */
  {
    id: "unit-7",
    title: "未来形＝予約実行",
    sub: "will はスケジューラ。be going to は計画済みタスク",
    lv: "基礎",
    sections: [
      { t: "intro", html: "<b>will</b> は「これから実行する処理を、未来の時間に<b>予約する</b>」スケジューラです。まだ実行されていない処理を <code>schedule()</code> に登録するイメージです。未来の話は「まだ走っていないタスク」を作ること、と考えると分かりやすいです。" },
      {
        t: "code",
        title: "will ＝ 予約実行",
        code: "schedule(i.play(tennis), tomorrow);     // I will play tennis tomorrow.\nschedule(i.visit(tokyo), next_week);    // I will visit Tokyo next week."
      },
      { t: "h", text: "will と be going to のちがい" },
      {
        t: "pair",
        rows: [
          ["will", "その場で決めた予定・予測", "I will help you.（今決めた）「手伝うよ」"],
          ["be going to", "前から計画していた予定", "I am going to visit Kyoto.（前からある計画）「京都に行くつもり」"]
        ]
      },
      { t: "intro", html: "will は「話している最中に決まった予約」、be going to は「<b>事前に計画済みのタスク</b>」。プログラムで言えば、その場で <code>schedule()</code> を実行するか、前もって作った計画リストを実行するか、の違いです。" },
      { t: "h", text: "will の否定と疑問" },
      {
        t: "code",
        title: "予約のキャンセルと確認",
        code: "!schedule(i.go(), tomorrow);    // I will not (won't) go tomorrow.\nschedule(you.help(me)) ?        // Will you help me?"
      },
      {
        t: "note", kind: "tip", title: "will の後ろは原形",
        body: "助動詞 will は動詞に「未来の予約」を付ける役割なので、後ろの動詞は必ず原形になります。He will <b>plays</b> ではなく He will <b>play</b>。予約ボタンが s 変換を代行する、と覚えましょう。"
      },
      {
        t: "terms",
        items: [
          ["スケジューラ", "処理を指定時刻に実行する仕組み。will のイメージ"],
          ["計画済みタスク", "前もって用意された処理。be going to のイメージ"],
          ["キャンセル", "予約の取り消し。will not (won't) のイメージ"]
        ]
      }
    ],
    quizzes: [
      { type: "choice", q: "「明日、東京を訪れます」の正しい英文は？", opts: ["I will visit Tokyo tomorrow.", "I visited Tokyo tomorrow.", "I am Tokyo tomorrow.", "I to visit Tokyo tomorrow."], a: 0, exp: "tomorrow（未来）の話なので will ＋ 動詞の原形。I will visit Tokyo tomorrow. です。" },
      { type: "choice", q: "前から計画していた予定を表すのはどれ？", opts: ["be going to", "will", "過去形", "進行形"], a: 0, exp: "be going to は「計画済みタスク」の表現。will はその場で決めた予定や予測に使います。" },
      { type: "choice", q: "I will not go tomorrow. のコード表現として合うものは？", opts: ["<code>!schedule(i.go(), tomorrow);</code>", "<code>schedule(!i.go(), tomorrow);</code>", "<code>log(i.go(), tomorrow);</code>", "<code>i.go() = tomorrow;</code>"], a: 0, exp: "will not は「予約しない（実行予定なし）」なので、予約全体に NOT（!）がかかります。" },
      { type: "order", q: "単語を並べ替えて「私はあなたを手伝います」の英文を作ろう", words: ["I", "will", "help", "you"], exp: "will ＋ 原形 help。その場で決めた予約（未来の約束）を表しています。" }
    ]
  }
);
