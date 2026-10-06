/* PlacePrep – Coding practice: problem list + in-browser test runner */

document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  const listEl = $("problemList");
  const editor = $("editor");

  let solved = new Set(PP.get("solvedProblems", []));
  let current = PROBLEMS[0];

  /* ---------- Helpers ---------- */
  const draftKey = id => "draft_" + id;

  function updateSolvedCount() {
    $("solvedCount").textContent = `Solved ${solved.size} of ${PROBLEMS.length}.`;
  }

  /* ---------- List ---------- */
  function renderList() {
    const q = $("probSearch").value.trim().toLowerCase();
    const diff = $("probDiff").value;
    const items = PROBLEMS.filter(p =>
      (diff === "all" || p.diff === diff) &&
      (p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q))
    );
    if (!items.length) {
      listEl.innerHTML = '<div class="empty">No problems match your search.</div>';
      return;
    }
    listEl.innerHTML = items.map(p => `
      <button class="problem-item ${p.id === current.id ? "active" : ""}" data-id="${p.id}">
        <span class="tick">${solved.has(p.id) ? "✔" : ""}</span>
        <span class="t">${PP.escapeHTML(p.title)}<br><small class="muted">${p.topic}</small></span>
        <span class="badge ${p.diff}">${p.diff}</span>
      </button>`).join("");
  }
  listEl.addEventListener("click", e => {
    const btn = e.target.closest(".problem-item");
    if (!btn) return;
    current = PROBLEMS.find(p => p.id === btn.dataset.id);
    openProblem();
    renderList();
  });
  $("probSearch").addEventListener("input", renderList);
  $("probDiff").addEventListener("change", renderList);

  /* ---------- Detail ---------- */
  function openProblem() {
    $("pTitle").textContent = current.title;
    const d = $("pDiff"); d.textContent = current.diff; d.className = "badge " + current.diff;
    $("pTopic").textContent = current.topic;
    $("pDesc").innerHTML = current.desc;
    $("pHint").innerHTML = current.hint;
    document.querySelector("#detail details").open = false;
    editor.value = PP.get(draftKey(current.id), current.starter);
    $("results").innerHTML = "";
    $("solution").classList.add("hidden");
    $("solBtn").textContent = "Show solution";
  }

  // Save a draft as the student types
  editor.addEventListener("input", () => PP.set(draftKey(current.id), editor.value));

  // Tab key inserts two spaces instead of leaving the editor
  editor.addEventListener("keydown", e => {
    if (e.key === "Tab") {
      e.preventDefault();
      const s = editor.selectionStart;
      editor.value = editor.value.slice(0, s) + "  " + editor.value.slice(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = s + 2;
    }
  });

  $("resetBtn").addEventListener("click", () => {
    editor.value = current.starter;
    PP.remove(draftKey(current.id));
    $("results").innerHTML = "";
  });

  $("solBtn").addEventListener("click", () => {
    const sol = $("solution");
    const showing = !sol.classList.contains("hidden");
    sol.textContent = current.solution;
    sol.classList.toggle("hidden", showing);
    $("solBtn").textContent = showing ? "Show solution" : "Hide solution";
  });

  /* ---------- Test runner (Web Worker with 2 s timeout, so infinite loops cannot freeze the page) ---------- */
  function runInWorker(code, fnName, cases) {
    return new Promise(resolve => {
      const src = `
        onmessage = e => {
          const { code, fnName, cases } = e.data;
          try {
            const fn = new Function(code + "; return " + fnName + ";")();
            const out = cases.map(c => {
              try {
                const got = fn(...JSON.parse(JSON.stringify(c.in)));
                return { ok: JSON.stringify(got) === JSON.stringify(c.out), got: got === undefined ? "undefined" : JSON.stringify(got) };
              } catch (err) { return { ok: false, got: "Error: " + err.message }; }
            });
            postMessage({ out });
          } catch (err) { postMessage({ error: err.message }); }
        };`;
      const url = URL.createObjectURL(new Blob([src], { type: "application/javascript" }));
      const worker = new Worker(url);
      const timer = setTimeout(() => {
        worker.terminate(); URL.revokeObjectURL(url);
        resolve({ error: "Time limit exceeded (2 s). Check for an infinite loop." });
      }, 2000);
      worker.onmessage = e => { clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(url); resolve(e.data); };
      worker.onerror = e => { clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(url); resolve({ error: e.message || "Script error" }); };
      worker.postMessage({ code, fnName, cases });
    });
  }

  $("runBtn").addEventListener("click", async () => {
    const btn = $("runBtn");
    btn.disabled = true; btn.textContent = "Running…";
    const res = await runInWorker(editor.value, current.fn, current.cases);
    btn.disabled = false; btn.textContent = "▶ Run tests";

    const box = $("results");
    if (res.error) {
      box.innerHTML = `<div class="res-row fail">⚠ ${PP.escapeHTML(res.error)}</div>`;
      return;
    }
    const passed = res.out.filter(r => r.ok).length;
    box.innerHTML = res.out.map((r, i) => {
      const c = current.cases[i];
      const input = c.in.map(a => JSON.stringify(a)).join(", ");
      return `<div class="res-row ${r.ok ? "pass" : "fail"}">
        ${r.ok ? "✔ Pass" : "✘ Fail"} · ${current.fn}(${PP.escapeHTML(input)})<br>
        expected ${PP.escapeHTML(JSON.stringify(c.out))}${r.ok ? "" : " · got " + PP.escapeHTML(r.got)}
      </div>`;
    }).join("") + `<div style="font-weight:800;margin-top:4px">${passed} / ${res.out.length} tests passed</div>`;

    if (passed === res.out.length && !solved.has(current.id)) {
      solved.add(current.id);
      PP.set("solvedProblems", [...solved]);
      PP.toast("🎉 Solved: " + current.title);
      updateSolvedCount();
      renderList();
    }
  });

  /* ---------- Init ---------- */
  updateSolvedCount();
  renderList();
  openProblem();
});
