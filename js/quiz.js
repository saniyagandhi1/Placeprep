/* PlacePrep – Aptitude quiz engine */

document.addEventListener("DOMContentLoaded", () => {
  const SECONDS_PER_QUESTION = 30;
  const MIXED_COUNT = 10;

  const $ = id => document.getElementById(id);
  const startScreen = $("startScreen"), quizScreen = $("quizScreen"), resultScreen = $("resultScreen");
  const picker = $("catPicker");

  let category = "mixed";
  let questions = [];
  let index = 0;
  let score = 0;
  let answers = [];       // { q, chosen, correct }
  let timeLeft = SECONDS_PER_QUESTION;
  let timerId = null;
  let answered = false;

  /* ---------- Category picker ---------- */
  function renderPicker() {
    picker.innerHTML = Object.entries(QUIZ_CATEGORIES).map(([key, c]) => `
      <button class="cat-btn ${key === category ? "selected" : ""}" data-cat="${key}" type="button">
        <span class="e">${c.emoji}</span><b>${c.label}</b><small>${c.desc}</small>
      </button>`).join("");
    showBest();
  }
  picker.addEventListener("click", e => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;
    category = btn.dataset.cat;
    renderPicker();
  });

  function showBest() {
    const history = PP.get("quizHistory", []).filter(h => h.cat === category);
    const line = $("bestLine");
    if (!history.length) { line.textContent = "No attempts yet for this round."; return; }
    const best = Math.max(...history.map(h => Math.round(h.score / h.total * 100)));
    line.textContent = `Your best score in this round: ${best}% (${history.length} attempt${history.length > 1 ? "s" : ""})`;
  }

  /* ---------- Start ---------- */
  function start() {
    let pool = category === "mixed" ? QUIZ_BANK : QUIZ_BANK.filter(q => q.cat === category);
    questions = PP.shuffle(pool).slice(0, category === "mixed" ? MIXED_COUNT : pool.length);
    index = 0; score = 0; answers = [];
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
  }
  $("startBtn").addEventListener("click", start);
  $("retryBtn").addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    $("reviewBox").classList.add("hidden");
    startScreen.classList.remove("hidden");
    renderPicker();
  });

  /* ---------- Question flow ---------- */
  function showQuestion() {
    const q = questions[index];
    answered = false;
    $("qCounter").textContent = `Question ${index + 1} / ${questions.length}`;
    $("qProgress").style.width = (index / questions.length * 100) + "%";
    $("qText").textContent = q.q;
    $("qExplain").classList.add("hidden");
    $("nextBtn").disabled = true;
    $("nextBtn").textContent = index === questions.length - 1 ? "Finish ✔" : "Next →";

    // Shuffle option order but remember which is correct
    const order = PP.shuffle(q.opts.map((text, i) => ({ text, i })));
    $("qOptions").innerHTML = order.map((o, n) =>
      `<button class="opt" data-i="${o.i}"><span class="k">${"ABCD"[n]}</span><span>${PP.escapeHTML(o.text)}</span></button>`
    ).join("");

    startTimer();
  }

  $("qOptions").addEventListener("click", e => {
    const btn = e.target.closest(".opt");
    if (!btn || answered) return;
    choose(Number(btn.dataset.i));
  });

  function choose(chosenIndex) {
    answered = true;
    stopTimer();
    const q = questions[index];
    const correct = chosenIndex === q.ans;
    if (correct) score++;
    answers.push({ q, chosen: chosenIndex, correct });

    document.querySelectorAll(".opt").forEach(b => {
      b.disabled = true;
      const i = Number(b.dataset.i);
      if (i === q.ans) b.classList.add("correct");
      else if (i === chosenIndex) b.classList.add("wrong");
    });
    const ex = $("qExplain");
    ex.innerHTML = (chosenIndex === -1 ? "⏰ <b>Time's up.</b> " : correct ? "✅ <b>Correct!</b> " : "❌ <b>Not quite.</b> ") + PP.escapeHTML(q.why);
    ex.classList.remove("hidden");
    $("nextBtn").disabled = false;
  }

  $("nextBtn").addEventListener("click", () => {
    index++;
    if (index >= questions.length) finish(); else showQuestion();
  });

  /* ---------- Timer ---------- */
  function startTimer() {
    stopTimer();
    timeLeft = SECONDS_PER_QUESTION;
    paintTimer();
    timerId = setInterval(() => {
      timeLeft--;
      paintTimer();
      if (timeLeft <= 0) { choose(-1); }
    }, 1000);
  }
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
  function paintTimer() {
    const t = $("qTimer");
    t.textContent = PP.formatTime(Math.max(0, timeLeft));
    t.classList.toggle("low", timeLeft <= 10);
  }

  /* ---------- Result ---------- */
  function finish() {
    stopTimer();
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const total = questions.length;
    const pct = Math.round(score / total * 100);
    $("scoreRing").style.setProperty("--pct", pct + "%");
    $("resPct").textContent = pct + "%";
    $("resLine").textContent = `You scored ${score} out of ${total}`;
    $("resMsg").textContent =
      pct >= 80 ? "Excellent! You are well prepared for this section." :
      pct >= 50 ? "Good effort. Review the explanations and try again to improve." :
                  "Keep practising — read each explanation and retry the round.";

    const history = PP.get("quizHistory", []);
    history.push({ cat: category, score, total, date: new Date().toISOString() });
    PP.set("quizHistory", history.slice(-50));

    $("reviewBox").innerHTML = "<h3 style='margin-bottom:8px'>Answer review</h3>" + answers.map((a, n) => `
      <div class="review-item">
        <b>${n + 1}. ${PP.escapeHTML(a.q.q)}</b><br>
        <span class="muted">Your answer: ${a.chosen === -1 ? "No answer (time up)" : PP.escapeHTML(a.q.opts[a.chosen])} ${a.correct ? "✅" : "❌"}</span><br>
        ${a.correct ? "" : `<span>Correct answer: <b>${PP.escapeHTML(a.q.opts[a.q.ans])}</b></span>`}
      </div>`).join("");
  }
  $("reviewBtn").addEventListener("click", () => $("reviewBox").classList.toggle("hidden"));

  renderPicker();
});
