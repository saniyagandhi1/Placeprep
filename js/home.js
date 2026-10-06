/* PlacePrep – Home page: counters, drive countdown, drive filter, feedback form */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Animated counters ---------- */
  const totals = {
    quiz: QUIZ_BANK.length,
    code: PROBLEMS.length,
    interview: INTERVIEW_BANK.length,
    modules: 5
  };
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = totals[el.dataset.count];
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 35);
  });

  /* ---------- Build the drive list (dates relative to today) ---------- */
  const day = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const drives = DRIVE_TEMPLATES.map(d => {
    const when = new Date(now + d.days * day);
    when.setHours(10, 0, 0, 0);
    return { ...d, when };
  }).sort((a, b) => a.when - b.when);

  /* ---------- Countdown to the nearest drive ---------- */
  const next = drives[0];
  document.getElementById("cdCompany").textContent = next.company + " — " + next.role;
  function tick() {
    let diff = Math.max(0, Math.floor((next.when - Date.now()) / 1000));
    const d = Math.floor(diff / 86400); diff -= d * 86400;
    const h = Math.floor(diff / 3600);  diff -= h * 3600;
    const m = Math.floor(diff / 60);
    const s = diff - m * 60;
    document.getElementById("cdDays").textContent = d;
    document.getElementById("cdHours").textContent = String(h).padStart(2, "0");
    document.getElementById("cdMins").textContent = String(m).padStart(2, "0");
    document.getElementById("cdSecs").textContent = String(s).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Drive table with search + filter ---------- */
  const body = document.getElementById("driveBody");
  const search = document.getElementById("driveSearch");
  const typeSel = document.getElementById("driveType");
  const empty = document.getElementById("driveEmpty");
  const registered = new Set(PP.get("registeredDrives", []));

  function renderDrives() {
    const q = search.value.trim().toLowerCase();
    const type = typeSel.value;
    const rows = drives.filter(d =>
      (type === "all" || d.type === type) &&
      (d.company.toLowerCase().includes(q) || d.role.toLowerCase().includes(q))
    );
    body.innerHTML = rows.map(d => {
      const isReg = registered.has(d.company);
      return `<tr>
        <td><b>${PP.escapeHTML(d.company)}</b></td>
        <td>${PP.escapeHTML(d.role)}</td>
        <td><span class="badge">${d.type}</span></td>
        <td>${d.pkg}</td>
        <td>${d.when.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
        <td><button class="btn btn-sm ${isReg ? "btn-ghost" : ""}" data-company="${PP.escapeHTML(d.company)}">${isReg ? "Registered ✔" : "Register"}</button></td>
      </tr>`;
    }).join("");
    empty.style.display = rows.length ? "none" : "block";
  }

  body.addEventListener("click", e => {
    const btn = e.target.closest("button[data-company]");
    if (!btn) return;
    const name = btn.dataset.company;
    if (registered.has(name)) registered.delete(name); else registered.add(name);
    PP.set("registeredDrives", [...registered]);
    PP.toast(registered.has(name) ? "Registered for " + name : "Registration cancelled");
    renderDrives();
  });
  search.addEventListener("input", renderDrives);
  typeSel.addEventListener("change", renderDrives);
  renderDrives();

  /* ---------- Feedback form validation ---------- */
  const form = document.getElementById("feedbackForm");
  const setErr = (id, msg) => { document.getElementById(id).textContent = msg; return !msg; };

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("fbName").value.trim();
    const email = document.getElementById("fbEmail").value.trim();
    const msg = document.getElementById("fbMsg").value.trim();

    const okName = setErr("fbNameErr", name.length < 2 ? "Please enter your name." : "");
    const okEmail = setErr("fbEmailErr", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : "Enter a valid email address.");
    const okMsg = setErr("fbMsgErr", msg.length < 10 ? "Message should be at least 10 characters." : "");

    if (okName && okEmail && okMsg) {
      const all = PP.get("feedback", []);
      all.push({ name, email, msg, date: new Date().toISOString() });
      PP.set("feedback", all);
      form.reset();
      PP.toast("Thanks! Your feedback was saved.");
    }
  });
});
