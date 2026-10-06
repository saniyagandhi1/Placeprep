/* PlacePrep – Mock interview: random questions, flip card, timer, notes */

document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  const LIMIT = 120;

  const catSel = $("intCat");
  catSel.innerHTML = Object.entries(INTERVIEW_CATEGORIES)
    .map(([k, label]) => `<option value="${k}">${label}</option>`).join("");

  let current = null;
  let lastIndex = -1;
  let practiced = new Set(PP.get("practicedQuestions", []));
  let timerId = null;
  let remaining = LIMIT;

  const badgeNames = { hr: "HR round", tech: "Technical", behav: "Behavioural" };

  function pool() {
    const cat = catSel.value;
    return cat === "all" ? INTERVIEW_BANK : INTERVIEW_BANK.filter(q => q.cat === cat);
  }

  function updateCounter() {
    const p = pool();
    const done = p.filter(q => practiced.has(q.q)).length;
    $("intCounter").textContent = `Practiced ${done} of ${p.length} in this category`;
  }

  function notesKey() { return "notes_" + INTERVIEW_BANK.indexOf(current); }

  function newQuestion() {
    const p = pool();
    // avoid repeating the same question twice in a row
    let idx;
    do { idx = Math.floor(Math.random() * p.length); } while (p.length > 1 && idx === lastIndex);
    lastIndex = idx;
    current = p[idx];

    $("flash").classList.remove("flipped");
    $("intBadge").textContent = badgeNames[current.cat];
    $("intQ").textContent = current.q;
    $("intA").textContent = current.a;
    $("notes").value = PP.get(notesKey(), "");
    resetTimer();
    refreshDone();
  }

  function refreshDone() {
    const btn = $("doneBtn");
    const isDone = current && practiced.has(current.q);
    btn.textContent = isDone ? "✔ Practiced" : "✔ Mark as practiced";
    btn.disabled = !current;
  }

  /* ---------- Flip ---------- */
  function flip() { if (current) $("flash").classList.toggle("flipped"); }
  $("flash").addEventListener("click", flip);
  $("flash").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });

  /* ---------- Timer ---------- */
  function paint() {
    const el = $("intTimer");
    el.textContent = PP.formatTime(remaining);
    el.style.color = remaining <= 15 ? "var(--bad)" : "";
  }
  function resetTimer() {
    clearInterval(timerId); timerId = null;
    remaining = LIMIT; paint();
    $("timerBtn").textContent = "▶ Start 2:00 timer";
  }
  $("timerBtn").addEventListener("click", () => {
    if (!current) { PP.toast("Pick a question first"); return; }
    if (timerId) { resetTimer(); return; }
    $("timerBtn").textContent = "■ Stop timer";
    timerId = setInterval(() => {
      remaining--;
      paint();
      if (remaining <= 0) {
        resetTimer();
        PP.toast("⏰ Time's up! Now flip the card and compare.");
      }
    }, 1000);
  });

  /* ---------- Notes + done ---------- */
  $("notes").addEventListener("input", () => { if (current) PP.set(notesKey(), $("notes").value); });

  $("doneBtn").addEventListener("click", () => {
    if (!current) return;
    if (practiced.has(current.q)) practiced.delete(current.q); else practiced.add(current.q);
    PP.set("practicedQuestions", [...practiced]);
    refreshDone();
    updateCounter();
    PP.toast(practiced.has(current.q) ? "Marked as practiced" : "Removed from practiced");
  });

  $("newBtn").addEventListener("click", newQuestion);
  catSel.addEventListener("change", () => { lastIndex = -1; updateCounter(); newQuestion(); });

  updateCounter();
  newQuestion();
});
