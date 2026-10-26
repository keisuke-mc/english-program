/* =====================================================
   Grammar as Code — アプリ本体
   ルーティング / レンダリング / クイズエンジン / 進捗保存
   ===================================================== */
(function () {
  "use strict";

  var app = document.getElementById("app");
  var heroTimers = [];

  /* ----------------------------------------------------
     ユーティリティ
  ---------------------------------------------------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function getUnit(id) {
    for (var i = 0; i < GAC.units.length; i++) {
      if (GAC.units[i].id === id) return GAC.units[i];
    }
    return null;
  }
  function unitIndex(unit) {
    return GAC.units.indexOf(unit);
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /* ----------------------------------------------------
     進捗ストア（localStorage）
  ---------------------------------------------------- */
  var Store = {
    KEY: "gac-progress-v1",
    read: function () {
      try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; }
      catch (e) { return {}; }
    },
    write: function (d) {
      try { localStorage.setItem(this.KEY, JSON.stringify(d)); } catch (e) {}
    },
    saveUnit: function (id, results) {
      var d = this.read();
      d[id] = { results: results, done: true };
      this.write(d);
    },
    reset: function () {
      try { localStorage.removeItem(this.KEY); } catch (e) {}
    }
  };

  function unitProgress(unit) {
    var d = Store.read();
    var rec = d[unit.id];
    if (!rec || !rec.results) return 0;
    var total = unit.quizzes.length;
    var correct = 0;
    for (var i = 0; i < rec.results.length; i++) if (rec.results[i]) correct++;
    return Math.round((correct / total) * 100);
  }
  function overallProgress() {
    var done = 0;
    GAC.units.forEach(function (u) {
      var d = Store.read();
      if (d[u.id] && d[u.id].done) done++;
    });
    return { done: done, total: GAC.units.length };
  }
  function updateHeaderProgress() {
    var box = document.getElementById("header-progress");
    var p = overallProgress();
    var pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
    box.innerHTML =
      '<span>' + p.done + '/' + p.total + ' 完了</span>' +
      '<span class="hp-bar"><span class="hp-fill" style="width:' + pct + '%"></span></span>';
  }

  /* ----------------------------------------------------
     シンタックスハイライト（ミニトークナイザ）
  ---------------------------------------------------- */
  var TOK_RE = /(\/\/[^\n]*)|("[^"\n]*"|'[^'\n]*')|\b(if|else|return|new|const|let|var|function|true|false|null|for|while|NOT|AND|OR)\b|(\d+(?:\.\d+)?)|([A-Za-z_$][\w$]*(?=\s*\())|([A-Za-z_$][\w$]*)|(\s+)|([\s\S])/g;

  function hl(code) {
    // インデントの共通部分を除去（データ側で見やすく書けるように）
    var lines = String(code).split("\n");
    var minIndent = Infinity;
    lines.forEach(function (ln) {
      if (!ln.trim()) return;
      var m = ln.match(/^[ \t]*/)[0].length;
      if (m < minIndent) minIndent = m;
    });
    if (!isFinite(minIndent)) minIndent = 0;
    var src = lines.map(function (ln) { return ln.slice(minIndent); }).join("\n");

    var out = "";
    var m;
    TOK_RE.lastIndex = 0;
    while ((m = TOK_RE.exec(src)) !== null) {
      if (m[1]) out += '<span class="tk-cm">' + esc(m[1]) + "</span>";
      else if (m[2]) out += '<span class="tk-str">' + esc(m[2]) + "</span>";
      else if (m[3]) out += '<span class="tk-kw">' + esc(m[3]) + "</span>";
      else if (m[4]) out += '<span class="tk-num">' + esc(m[4]) + "</span>";
      else if (m[5]) out += '<span class="tk-fn">' + esc(m[5]) + "</span>";
      else if (m[6]) out += '<span class="tk-var">' + esc(m[6]) + "</span>";
      else if (m[7]) out += m[7];
      else out += esc(m[8]);
    }
    return out;
  }

  function codeCard(title, code, desc) {
    return '' +
      '<div class="code-card reveal">' +
        '<div class="code-card-head">' +
          '<span class="code-file">&lt;/&gt;</span>' +
          '<span>' + esc(title || "example") + "</span>" +
          '<button type="button" class="copy-btn" data-copy>コピー</button>' +
        "</div>" +
        "<pre>" + hl(code) + "</pre>" +
        (desc ? '<div class="code-desc">' + desc + "</div>" : "") +
      "</div>";
  }
  function bindCopy(root) {
    root.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var pre = btn.closest(".code-card").querySelector("pre");
        var text = pre.textContent;
        function done() { btn.textContent = "コピー済み ✓"; setTimeout(function () { btn.textContent = "コピー"; }, 1600); }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, done);
        } else {
          var ta = document.createElement("textarea");
          ta.value = text; document.body.appendChild(ta);
          ta.select(); try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(ta); done();
        }
      });
    });
  }

  /* ----------------------------------------------------
     ユニット解説のレンダリング
  ---------------------------------------------------- */
  function renderSections(unit) {
    var html = "";
    unit.sections.forEach(function (s) {
      if (s.t === "intro") {
        html += '<div class="lesson-sec reveal"><p>' + s.html + "</p></div>";
      } else if (s.t === "h") {
        html += '<div class="section reveal" style="padding-top:1.4rem"><h2 class="sec-title" style="font-size:1.15rem"><span class="comment-tag">##</span>' + esc(s.text) + "</h2></div>";
      } else if (s.t === "code") {
        html += codeCard(s.title, s.code, s.desc);
      } else if (s.t === "pair") {
        var rows = "";
        s.rows.forEach(function (r) {
          rows += "<tr><td class='pair-en'>" + r[0] + "</td><td class='pair-code'>" + r[1] + "</td><td class='pair-note'>" + r[2] + "</td></tr>";
        });
        html += '' +
          '<div class="lesson-sec reveal" style="padding-bottom:0.9rem">' +
            '<table class="pair-table">' +
              "<thead><tr><th>英文・概念</th><th>コード</th><th>解説</th></tr></thead>" +
              "<tbody>" + rows + "</tbody>" +
            "</table>" +
          "</div>";
      } else if (s.t === "note") {
        html += '' +
          '<div class="note ' + (s.kind === "warn" ? "note-warn" : "note-tip") + ' reveal">' +
            '<div class="note-head"><span class="note-tag">' + (s.kind === "warn" ? "warning" : "tip") + "</span>" + esc(s.title) + "</div>" +
            '<div class="note-body">' + s.body + "</div>" +
          "</div>";
      } else if (s.t === "terms") {
        var items = "";
        s.items.forEach(function (it) {
          items += '<div class="term-item reveal"><div class="term-name">' + esc(it[0]) + '</div><div class="term-desc">' + esc(it[1]) + "</div></div>";
        });
        html += '<div class="terms-grid">' + items + "</div>";
      }
    });
    return html;
  }

  /* ----------------------------------------------------
     クイズエンジン
  ---------------------------------------------------- */
  function startQuiz(unit) {
    var state = { i: 0, results: [] };
    var panel = document.getElementById("quiz-panel");
    panel.innerHTML = "";
    panel.appendChild(buildQuestion(unit, state));
    observeReveal();
  }

  function quizHead(unit, state) {
    return '' +
      '<div class="quiz-head">' +
        "<h2><span class=\"comment-tag\">//</span>チェックテスト</h2>" +
        '<span class="quiz-count">Q' + (state.i + 1) + " / " + unit.quizzes.length + "</span>" +
      "</div>" +
      '<div class="quiz-progress"><i style="width:' + (state.i / unit.quizzes.length) * 100 + '%"></i></div>';
  }

  function buildQuestion(unit, state) {
    var q = unit.quizzes[state.i];
    var wrap = document.createElement("div");
    wrap.innerHTML = quizHead(unit, state) + '<div class="q-text"><span class="q-prefix">Q' + (state.i + 1) + '.</span>' + q.q + "</div>";

    if (q.type === "choice") {
      var optsBox = document.createElement("div");
      optsBox.className = "opts";
      q.opts.forEach(function (opt, idx) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "opt";
        b.innerHTML = '<span class="opt-key">' + String.fromCharCode(65 + idx) + "</span><span>" + opt + "</span>";
        b.addEventListener("click", function () {
          if (wrap.dataset.answered) return;
          wrap.dataset.answered = "1";
          var ok = idx === q.a;
          state.results.push(ok);
          optsBox.querySelectorAll(".opt").forEach(function (el, i2) {
            el.disabled = true;
            if (i2 === q.a) el.classList.add("correct");
            else if (i2 === idx && !ok) el.classList.add("wrong");
            else el.classList.add("dim");
          });
          wrap.appendChild(explainBox(ok, q.exp));
          wrap.appendChild(nextRow(unit, state));
        });
        optsBox.appendChild(b);
      });
      wrap.appendChild(optsBox);
    }

    if (q.type === "order") {
      var pool = q.words.slice();
      var shuffled = shuffle(pool);
      if (shuffled.join("\u0001") === q.words.join("\u0001") && q.words.length > 1) shuffled = shuffle(pool);

      var ansBox = document.createElement("div");
      ansBox.className = "ans-box";
      ansBox.innerHTML = '<span class="placeholder">下の単語をタップして、正しい語順に並べよう</span>';
      var poolBox = document.createElement("div");
      poolBox.className = "chip-pool";

      var picked = [];
      shuffled.forEach(function (w, idx) {
        var c = document.createElement("button");
        c.type = "button";
        c.className = "chip";
        c.textContent = w;
        c.dataset.idx = idx;
        c.addEventListener("click", function () {
          if (wrap.dataset.answered) return;
          if (c.classList.contains("in-ans")) {
            c.classList.remove("in-ans");
            picked = picked.filter(function (p) { return p !== c; });
            refreshAns();
          } else {
            c.classList.add("in-ans");
            picked.push(c);
            refreshAns();
          }
        });
        poolBox.appendChild(c);
      });

      function refreshAns() {
        ansBox.innerHTML = "";
        if (!picked.length) {
          ansBox.innerHTML = '<span class="placeholder">下の単語をタップして、正しい語順に並べよう</span>';
          return;
        }
        picked.forEach(function (c) {
          var s = document.createElement("span");
          s.className = "chip in-ans";
          s.textContent = c.textContent;
          s.addEventListener("click", function () { c.classList.remove("in-ans"); picked = picked.filter(function (p) { return p !== c; }); refreshAns(); });
          ansBox.appendChild(s);
        });
      }

      var actions = document.createElement("div");
      actions.className = "order-actions";
      var checkBtn = document.createElement("button");
      checkBtn.type = "button";
      checkBtn.className = "btn btn-primary btn-sm";
      checkBtn.textContent = "答え合わせ";
      var resetBtn = document.createElement("button");
      resetBtn.type = "button";
      resetBtn.className = "btn btn-ghost btn-sm";
      resetBtn.textContent = "やり直す";
      resetBtn.addEventListener("click", function () {
        if (wrap.dataset.answered) return;
        picked = [];
        poolBox.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("in-ans"); });
        refreshAns();
      });
      checkBtn.addEventListener("click", function () {
        if (wrap.dataset.answered) return;
        if (picked.length !== q.words.length) {
          ansBox.style.borderColor = "var(--red)";
          setTimeout(function () { ansBox.style.borderColor = ""; }, 600);
          return;
        }
        wrap.dataset.answered = "1";
        var ok = true;
        picked.forEach(function (c, i2) {
          var good = c.textContent.toLowerCase() === q.words[i2].toLowerCase();
          c.classList.remove("in-ans");
          c.classList.add(good ? "chip-right" : "chip-wrongpos");
          if (!good) ok = false;
        });
        poolBox.querySelectorAll(".chip").forEach(function (c) { c.disabled = true; });
        state.results.push(ok);
        wrap.appendChild(explainBox(ok, q.exp));
        wrap.appendChild(nextRow(unit, state));
      });
      actions.appendChild(checkBtn);
      actions.appendChild(resetBtn);

      wrap.appendChild(ansBox);
      wrap.appendChild(poolBox);
      wrap.appendChild(actions);
    }

    return wrap;
  }

  function explainBox(ok, exp) {
    var d = document.createElement("div");
    d.className = "explain-box";
    d.innerHTML =
      '<div class="verdict ' + (ok ? "ok" : "ng") + '">' + (ok ? "✓ 正解！" : "✕ おしい、不正解…") + "</div>" +
      '<div><span class="ex-label">// 解説</span>' + exp + "</div>";
    return d;
  }

  function nextRow(unit, state) {
    var row = document.createElement("div");
    row.className = "quiz-next-row";
    var isLast = state.i === unit.quizzes.length - 1;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn-primary";
    b.textContent = isLast ? "結果を見る" : "次の問題へ";
    b.addEventListener("click", function () {
      state.i++;
      if (state.i < unit.quizzes.length) {
        startQuizAt(unit, state);
      } else {
        finishQuiz(unit, state);
      }
    });
    row.appendChild(b);
    return row;
  }

  function startQuizAt(unit, state) {
    var panel = document.getElementById("quiz-panel");
    panel.innerHTML = "";
    panel.appendChild(buildQuestion(unit, state));
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function finishQuiz(unit, state) {
    Store.saveUnit(unit.id, state.results);
    updateHeaderProgress();
    var correct = state.results.filter(function (r) { return r; }).length;
    var pct = Math.round((correct / state.results.length) * 100);
    var msg;
    if (pct === 100) msg = "パーフェクト！このユニットはコンパイル完了です。";
    else if (pct >= 75) msg = "Good job! あと一歩でパーフェクトです。";
    else if (pct >= 50) msg = "まずまず。解説を読み返して、もう一度チャレンジ！";
    else msg = "大丈夫、最初は誰でもエラーが出ます。解説を読み直して再挑戦！";

    var panel = document.getElementById("quiz-panel");
    panel.innerHTML =
      '<div class="quiz-head"><h2><span class="comment-tag">//</span>結果発表</h2><span class="quiz-count">' + unit.quizzes.length + "問中 " + correct + "問 正解</span></div>" +
      '<div class="result-card">' +
        '<div class="result-score">' + pct + "%</div>" +
        '<p class="result-msg">' + msg + "</p>" +
        '<div class="result-actions">' +
          '<button type="button" class="btn" id="q-retry">もう一度挑戦</button>' +
          nextUnitLinkHtml(unit) +
          '<a class="btn btn-ghost" href="#/">ホームへ</a>' +
        "</div>" +
      "</div>";
    var retry = document.getElementById("q-retry");
    if (retry) retry.addEventListener("click", function () { startQuiz(unit); });
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function nextUnitLinkHtml(unit) {
    var idx = unitIndex(unit);
    var next = GAC.units[idx + 1];
    if (next) return '<a class="btn btn-primary" href="#/unit/' + next.id + '">次のユニットへ →</a>';
    return '<a class="btn btn-primary" href="#/">全ユニット完了！おめでとう！</a>';
  }

  /* ----------------------------------------------------
     ページ: ホーム
  ---------------------------------------------------- */
  function renderHome() {
    var stats = { units: GAC.units.length, quiz: 0, map: 0 };
    GAC.units.forEach(function (u) { stats.quiz += u.quizzes.length; });
    GAC.map.forEach(function (c) { stats.map += c.rows.length; });

    var unitCards = "";
    GAC.units.forEach(function (u) {
      var p = unitProgress(u);
      var rec = Store.read()[u.id];
      unitCards += '' +
        '<a class="unit-card reveal' + (rec && rec.done ? " is-done" : "") + '" href="#/unit/' + u.id + '">' +
          '<div class="unit-card-top">' +
            '<span class="unit-no">unit_' + ("0" + u.id.split("-")[1]).slice(-2) + '.js</span>' +
            '<span class="unit-done">✓ 完了</span>' +
          "</div>" +
          '<div class="unit-title">' + esc(u.title) + "</div>" +
          '<div class="unit-sub">' + esc(u.sub) + "</div>" +
          '<div class="unit-meta"><span class="lv-badge lv-' + u.lv + '">' + u.lv + '</span><span>' + u.quizzes.length + "問</span></div>" +
          '<div class="unit-bar"><i style="width:' + p + '%"></i></div>' +
        "</a>";
    });

    app.innerHTML = '' +
      '<section class="hero">' +
        "<div>" +
          '<span class="hero-badge">⌘ 中学英語 × プログラミング</span>' +
          "<h1>英文法を、<br><span class=\"grad\">プログラム</span>に置き換えて学ぶ。</h1>" +
          '<p class="hero-lead">be動詞は「=」（代入）、疑問文は確認クエリ、if文はそのままif文——。中学で学ぶ英文法をコードに変換すると、丸暗記ではなく<b>仕組み</b>で理解できるようになります。</p>' +
          '<div class="hero-cta">' +
            '<a class="btn btn-primary" href="#/unit/unit-1">Unit 1 から始める</a>' +
            '<a class="btn" href="#/map">対応表を見る</a>' +
          "</div>" +
          '<div class="hero-points"><span>ビルド不要の静的サイト</span><span>進捗はブラウザに自動保存</span><span>全問に解説つき</span></div>' +
        "</div>" +
        '<div class="terminal" aria-hidden="true">' +
          '<div class="terminal-bar"><span class="terminal-dots"><i></i><i></i><i></i></span><span class="terminal-title">english_grammar — zsh</span></div>' +
          '<div class="terminal-body">' +
            '<div class="t-line"><span class="t-label">$ translate --english-to-code</span></div>' +
            '<div class="t-line"><span class="t-prompt">&gt;&gt;&gt; </span><span class="t-en" id="t-en"></span><span class="cursor"></span></div>' +
            '<div class="t-line"><span class="t-code" id="t-code"></span></div>' +
            '<div class="t-line"><span class="t-label" id="t-note"></span></div>' +
          "</div>" +
        "</div>" +
      "</section>" +

      '<section class="section">' +
        '<div class="stats-row">' +
          '<div class="stat-card reveal"><span class="stat-num">' + stats.units + '</span><span class="stat-label">ユニット（文法項目）</span></div>' +
          '<div class="stat-card reveal"><span class="stat-num">' + stats.quiz + '</span><span class="stat-label">クイズ（解説つき）</span></div>' +
          '<div class="stat-card reveal"><span class="stat-num">' + stats.map + '</span><span class="stat-label">対応表エントリ</span></div>' +
        "</div>" +
      "</section>" +

      '<section class="section">' +
        '<h2 class="sec-title"><span class="comment-tag">//</span>実際に動かしてみよう</h2>' +
        '<p class="sec-sub">英文の単語にマウスをのせると（スマホならタップすると）、対応するコードの部分が光ります。</p>' +
        '<div class="demo-wrap reveal" id="demo-wrap"></div>' +
      "</section>" +

      '<section class="section">' +
        '<h2 class="sec-title"><span class="comment-tag">//</span>3つの学び方</h2>' +
        '<div class="feature-grid">' +
          '<div class="feature-card reveal"><span class="feature-icon">01</span><h3>ユニットで理解する</h3><p>14のユニットで、文法項目ごとに「英文 ↔ コード」の対応を学びます。be動詞から関係代名詞まで、中学校の学習範囲をカバー。</p></div>' +
          '<div class="feature-card reveal"><span class="feature-icon">02</span><h3>クイズで定着させる</h3><p>各ユニットにチェックテストつき。選択式と語順並べ替えで、理解したかどうかをその場で確認。結果は自動保存されます。</p></div>' +
          '<div class="feature-card reveal"><span class="feature-icon">03</span><h3>対応表で振り返る</h3><p>「not は ! 演算子」「will は予約実行」——文法とプログラミングの対応を1枚のチートシートにまとめました。テスト前の復習に。</p></div>' +
        "</div>" +
      "</section>" +

      '<section class="section">' +
        '<h2 class="sec-title"><span class="comment-tag">//</span>ユニット一覧</h2>' +
        '<p class="sec-sub">入門（Unit 1〜3）→ 基礎（Unit 4〜7）→ 中級（Unit 8〜11）→ 応用（Unit 12〜14）の順に進めるのがおすすめです。</p>' +
        '<div class="unit-grid">' + unitCards + "</div>" +
      "</section>";

    buildDemo();
    bindCopy(app);
    observeReveal();
    startHero();
  }

  function buildDemo() {
    var wrap = document.getElementById("demo-wrap");
    if (!wrap) return;
    var d = GAC.demo;
    var enHtml = "";
    d.en.forEach(function (w, i) {
      enHtml += '<span class="w ' + w.cls + '" data-demo-en="' + i + '">' + esc(w.t) + "</span>";
    });
    var codeHtml = "";
    d.code.forEach(function (c) {
      codeHtml += '<span class="c ' + c.cls + '" data-demo-code="' + c.pair + '">' + esc(c.t) + "</span>";
    });
    wrap.innerHTML =
      '<div class="demo-en">' + enHtml + "</div>" +
      '<div class="demo-arrow">↓ translate ↓</div>' +
      '<div class="demo-code">' + codeHtml + "</div>" +
      '<div class="demo-role" id="demo-role">単語にマウスをのせると、対応するコードが光ります（タップでもOK）</div>';

    var role = document.getElementById("demo-role");
    var defaultMsg = role.innerHTML;
    function clearLit() {
      wrap.querySelectorAll(".lit").forEach(function (el) { el.classList.remove("lit"); });
    }
    wrap.querySelectorAll("[data-demo-en]").forEach(function (el) {
      var i = el.getAttribute("data-demo-en");
      var on = function () {
        clearLit();
        el.classList.add("lit");
        wrap.querySelectorAll('[data-demo-code="' + i + '"]').forEach(function (c) { c.classList.add("lit"); });
        role.innerHTML = d.en[i].role + " — " + d.en[i].note;
      };
      el.addEventListener("mouseenter", on);
      el.addEventListener("click", on);
      el.addEventListener("mouseleave", function () {
        clearLit(); role.innerHTML = defaultMsg;
      });
    });
    wrap.querySelectorAll("[data-demo-code]").forEach(function (el) {
      var i = el.getAttribute("data-demo-code");
      if (i === "-1") return;
      var on = function () {
        clearLit();
        el.classList.add("lit");
        wrap.querySelectorAll('[data-demo-en="' + i + '"]').forEach(function (c) { c.classList.add("lit"); });
        role.innerHTML = d.en[i].role + " — " + d.en[i].note;
      };
      el.addEventListener("mouseenter", on);
      el.addEventListener("click", on);
      el.addEventListener("mouseleave", function () {
        clearLit(); role.innerHTML = defaultMsg;
      });
    });
  }

  /* ---------- ヒーロータイピング ---------- */
  function startHero() {
    stopHero();
    var enEl = document.getElementById("t-en");
    var codeEl = document.getElementById("t-code");
    var noteEl = document.getElementById("t-note");
    if (!enEl) return;
    var pairs = GAC.hero;
    var pi = 0;

    function typeText(el, text, speed, cb) {
      var i = 0;
      el.textContent = "";
      (function tick() {
        if (i < text.length) {
          el.textContent += text[i++];
          heroTimers.push(setTimeout(tick, speed));
        } else if (cb) cb();
      })();
    }
    function play() {
      var p = pairs[pi % pairs.length];
      pi++;
      noteEl.textContent = "";
      codeEl.textContent = "";
      typeText(enEl, p.en, 62, function () {
        heroTimers.push(setTimeout(function () {
          typeText(codeEl, p.code, 34, function () {
            heroTimers.push(setTimeout(function () {
              typeText(noteEl, "# 次の例へ…", 26, function () {
                heroTimers.push(setTimeout(function () {
                  enEl.textContent = ""; codeEl.textContent = ""; noteEl.textContent = "";
                  play();
                }, 900));
              });
            }, 1400));
          });
        }, 350));
      });
    }
    play();
  }
  function stopHero() {
    heroTimers.forEach(function (t) { clearTimeout(t); });
    heroTimers = [];
  }

  /* ----------------------------------------------------
     ページ: ユニット詳細
  ---------------------------------------------------- */
  function renderUnit(id) {
    var unit = getUnit(id);
    if (!unit) { location.hash = "#/"; return; }
    var idx = unitIndex(unit);
    var prev = GAC.units[idx - 1];
    var next = GAC.units[idx + 1];
    var rec = Store.read()[unit.id];

    var prevHtml = prev
      ? '<a href="#/unit/' + prev.id + '"><span class="dir">&larr; prev</span>' + esc(prev.title) + "</a>"
      : '<a class="disabled" href="#/"><span class="dir">&larr; prev</span>前のユニットはありません</a>';
    var nextHtml = next
      ? '<a class="next" href="#/unit/' + next.id + '"><span class="dir">next &rarr;</span>' + esc(next.title) + "</a>"
      : '<a class="next" href="#/"><span class="dir">finish &rarr;</span>全ユニット完了！</a>';

    app.innerHTML = '' +
      '<div class="breadcrumb"><a href="#/">ホーム</a> / <span>Unit ' + unit.id.split("-")[1] + "</span></div>" +
      '<div class="unit-head reveal in">' +
        '<div class="unit-head-top">' +
          '<span class="unit-head-no">Unit ' + unit.id.split("-")[1] + "</span>" +
          '<span class="lv-badge lv-' + unit.lv + '">' + unit.lv + "</span>" +
          (rec && rec.done ? '<span class="unit-done" style="display:inline-flex">✓ チェックテスト完了</span>' : "") +
        "</div>" +
        "<h1>" + esc(unit.title) + "</h1>" +
        '<p class="unit-sub">' + esc(unit.sub) + "</p>" +
      "</div>" +
      renderSections(unit) +
      '<section class="section" style="padding-top:1.6rem">' +
        '<div class="quiz-panel" id="quiz-panel"></div>' +
      "</section>" +
      '<nav class="unit-nav">' + prevHtml + nextHtml + "</nav>";

    bindCopy(app);
    observeReveal();

    // クイズ開始（前回記録があればバナーつきで）
    var panel = document.getElementById("quiz-panel");
    if (rec && rec.done) {
      var correct = 0;
      if (rec.results) rec.results.forEach(function (r) { if (r) correct++; });
      var total = rec.results ? rec.results.length : unit.quizzes.length;
      var pct = Math.round((correct / total) * 100);
      panel.innerHTML =
        '<div class="quiz-head"><h2><span class="comment-tag">//</span>チェックテスト</h2><span class="quiz-count">前回: ' + pct + "%</span></div>" +
        '<div class="result-card" style="padding-top:0.6rem">' +
          '<p class="result-msg">前回のスコアは <b>' + pct + "%</b> でした。もう一度挑戦して記録を更新できます。</p>" +
          '<div class="result-actions"><button type="button" class="btn btn-primary" id="q-start">チェックテストを始める</button></div>' +
        "</div>";
      document.getElementById("q-start").addEventListener("click", function () { startQuiz(unit); });
    } else {
      var p2 = document.createElement("div");
      p2.innerHTML =
        '<div class="quiz-head"><h2><span class="comment-tag">//</span>チェックテスト</h2><span class="quiz-count">' + unit.quizzes.length + "問</span></div>" +
        '<div class="result-card" style="padding-top:0.6rem">' +
          '<p class="result-msg">解説を読んだら、クイズで理解をチェックしましょう。結果はブラウザに自動保存されます。</p>' +
          '<div class="result-actions"><button type="button" class="btn btn-primary" id="q-start">チェックテストを始める</button></div>' +
        "</div>";
      panel.innerHTML = "";
      while (p2.firstChild) panel.appendChild(p2.firstChild);
      document.getElementById("q-start").addEventListener("click", function () { startQuiz(unit); });
    }
  }

  /* ----------------------------------------------------
     ページ: 対応表
  ---------------------------------------------------- */
  function renderMap() {
    var total = 0;
    GAC.map.forEach(function (c) { total += c.rows.length; });

    var cats = "";
    GAC.map.forEach(function (c, ci) {
      var rows = "";
      c.rows.forEach(function (r) {
        rows += '' +
          '<div class="map-row">' +
            '<div class="map-en">' + esc(r.en) + "</div>" +
            '<div class="map-code">' + hl(r.code) + "</div>" +
            '<div class="map-note">' + esc(r.note) + "</div>" +
          "</div>";
      });
      cats += '<div class="map-cat" data-cat><div class="map-cat-head"><h2>' + esc(c.cat) + '</h2><span class="cnt">' + c.rows.length + " items</span></div>" +
        '<div class="map-rows">' + rows + "</div></div>";
    });

    app.innerHTML = '' +
      '<div class="breadcrumb"><a href="#/">ホーム</a> / <span>対応表</span></div>' +
      '<section class="section" style="padding-top:1rem">' +
        '<h2 class="sec-title"><span class="comment-tag">//</span>英文法 → プログラム 対応表</h2>' +
        '<p class="sec-sub">全 ' + total + " エントリ。キーワードで絞り込みできます。</p>" +
        '<div class="map-search"><span class="search-icon">/</span><input type="search" id="map-search" placeholder="キーワードで検索（例: 受動, 過去, can）" aria-label="対応表を検索"></div>' +
        '<div id="map-list">' + cats + "</div>" +
        '<div class="map-empty" id="map-empty" style="display:none">一致する項目がありません。キーワードを変えてみてください。</div>' +
      "</section>";

    var input = document.getElementById("map-search");
    input.addEventListener("input", function () {
      var kw = input.value.trim().toLowerCase();
      var hit = 0;
      app.querySelectorAll("[data-cat]").forEach(function (cat) {
        var catHit = 0;
        cat.querySelectorAll(".map-row").forEach(function (row) {
          var text = row.textContent.toLowerCase();
          var show = !kw || text.indexOf(kw) > -1;
          row.style.display = show ? "" : "none";
          if (show) { catHit++; hit++; }
        });
        cat.style.display = catHit ? "" : "none";
      });
      document.getElementById("map-empty").style.display = hit ? "none" : "";
    });
    observeReveal();
  }

  /* ----------------------------------------------------
     出現アニメーション
  ---------------------------------------------------- */
  var observer = null;
  function observeReveal() {
    if (observer) observer.disconnect();
    if (!("IntersectionObserver" in window)) {
      app.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
      return;
    }
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); observer.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    app.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------
     ルーター
  ---------------------------------------------------- */
  function setNav(page) {
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === page);
    });
  }

  function router() {
    stopHero();
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/");
    var page = parts[0] || "home";
    if (page === "unit" && parts[1]) {
      setNav("");
      renderUnit(parts[1]);
    } else if (page === "map") {
      setNav("map");
      renderMap();
    } else {
      setNav("home");
      renderHome();
    }
    updateHeaderProgress();
    window.scrollTo(0, 0);
  }

  /* ----------------------------------------------------
     初期化
  ---------------------------------------------------- */
  document.getElementById("reset-progress").addEventListener("click", function () {
    if (window.confirm("学習の進捗をすべて削除します。よろしいですか？")) {
      Store.reset();
      updateHeaderProgress();
      router();
    }
  });

  window.addEventListener("hashchange", router);
  router();
})();
