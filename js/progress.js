/* PlacePrep – Progress dashboard (reads data saved by the other modules) */

document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);

  function render() {
    const history = PP.get("quizHistory", []);
    const solved = PP.get("solvedProblems", []);
    const practiced = PP.get("practicedQuestions", []);

    const pct = h => Math.round(h.score / h.total * 100);
    const avg = history.length ? Math.round(history.reduce((s, h) => s + pct(h), 0) / history.length) : 0;

    $("sQuizzes").textContent = history.length;
    $("sAvg").textContent = avg + "%";
    $("sSolved").textContent = solved.length + " / " + PROBLEMS.length;
    $("sPracticed").textContent = practiced.length + " / " + INTERVIEW_BANK.length;

    /* Readiness = 40% aptitude average, 40% coding, 20% interview */
    const coding = solved.length / PROBLEMS.length * 100;
    const interview = practiced.length / INTERVIEW_BANK.length * 100;
    const ready = Math.round(avg * 0.4 + coding * 0.4 + interview * 0.2);
    $("readyPct").textContent = ready + "%";
    requestAnimationFrame(() => { $("readyBar").style.width = ready + "%"; });
    $("readyMsg").textContent =
      !history.length && !solved.length && !practiced.length ? "Nothing here yet — take a quiz or solve a problem to get started." :
      ready >= 75 ? "You are in great shape. Keep revising and take full mock rounds." :
      ready >= 40 ? "Good progress. Focus on whichever area has the lowest numbers below." :
                    "Just getting started. Aim for one quiz, one problem and three interview questions a day.";

    /* Bar chart of recent scores */
    const recent = history.slice(-8);
    $("chartBox").innerHTML = recent.length
      ? `<div class="bars">${recent.map(h => `
          <div class="bar-col" title="${QUIZ_CATEGORIES[h.cat].label}: ${h.score}/${h.total}">
            <b>${pct(h)}%</b>
            <div class="bar" style="height:${Math.max(pct(h), 2)}%"></div>
            <small>${QUIZ_CATEGORIES[h.cat].emoji}</small>
          </div>`).join("")}</div>`
      : '<div class="empty">No quiz attempts yet.<br><a href="aptitude.html">Take your first quiz →</a></div>';

    /* Category averages */
    $("catBox").innerHTML = Object.entries(QUIZ_CATEGORIES).map(([key, c]) => {
      const rows = history.filter(h => h.cat === key);
      const a = rows.length ? Math.round(rows.reduce((s, h) => s + pct(h), 0) / rows.length) : 0;
      return `<div>
        <div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:4px">
          <span>${c.emoji} ${c.label}</span><span>${rows.length ? a + "%" : "—"}</span>
        </div>
        <div class="meter" style="height:10px"><div style="width:${a}%"></div></div>
      </div>`;
    }).join("");
  }

  $("resetBtn").addEventListener("click", () => {
    if (!(function(){return true})("This clears quiz history, solved problems and practiced questions. Continue?")) return;
    ["quizHistory", "solvedProblems", "practicedQuestions"].forEach(PP.remove);
    PROBLEMS.forEach(p => PP.remove("draft_" + p.id));
    render();
    PP.toast("Progress reset");
  });

  render();
});
