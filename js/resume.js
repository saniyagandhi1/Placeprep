/* PlacePrep – Resume builder: live preview, score checklist, autosave */

document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  const FIELDS = ["name", "role", "email", "phone", "links", "summary", "degree", "college", "gradYear", "cgpa", "skills", "extras", "color"];
  const ACTION_VERBS = ["built", "developed", "designed", "created", "implemented", "led", "optimized", "optimised", "improved", "automated", "analyzed", "analysed", "deployed", "won", "managed"];

  const SAMPLE = {
    name: "Aarav Sharma", role: "Software Engineer",
    email: "aarav.sharma@example.com", phone: "+91 98765 43210",
    links: "github.com/aaravsharma · linkedin.com/in/aaravsharma",
    summary: "Final-year B.Tech student with hands-on experience building full-stack web applications. Strong in data structures, JavaScript and SQL, with a record of shipping projects and winning hackathons.",
    degree: "B.Tech, Computer Science", college: "ABC Institute of Technology", gradYear: "2027", cgpa: "8.4 CGPA",
    skills: "JavaScript, Python, SQL, React, Node.js, Git, Data Structures",
    extras: "Winner – Inter-college Hackathon 2026\nPython for Everybody – Coursera",
    color: "#14213d",
    projects: [
      { title: "Campus Event Manager", desc: "Built a full-stack web app for event registration used by 500+ students; reduced manual work by 60%." },
      { title: "Expense Tracker", desc: "Developed a responsive budgeting tool with charts and offline storage using JavaScript." }
    ]
  };

  let projects = [{ title: "", desc: "" }];

  /* ---------- Project blocks ---------- */
  function renderProjectInputs() {
    $("projects").innerHTML = projects.map((p, i) => `
      <div class="proj-block" data-i="${i}">
        <input class="input" data-k="title" placeholder="Project title" value="${PP.escapeHTML(p.title)}" style="margin-bottom:8px">
        <textarea class="input" data-k="desc" placeholder="What you built, the tech used and the result (start with an action verb)">${PP.escapeHTML(p.desc)}</textarea>
        ${projects.length > 1 ? `<button class="btn btn-sm btn-ghost" type="button" data-remove="${i}" style="margin-top:8px">Remove</button>` : ""}
      </div>`).join("");
  }
  $("projects").addEventListener("input", e => {
    const block = e.target.closest(".proj-block");
    if (!block) return;
    projects[Number(block.dataset.i)][e.target.dataset.k] = e.target.value;
    update();
  });
  $("projects").addEventListener("click", e => {
    const rm = e.target.closest("[data-remove]");
    if (!rm) return;
    projects.splice(Number(rm.dataset.remove), 1);
    renderProjectInputs();
    update();
  });
  $("addProject").addEventListener("click", () => {
    if (projects.length >= 4) { PP.toast("Maximum 4 projects"); return; }
    projects.push({ title: "", desc: "" });
    renderProjectInputs();
  });

  /* ---------- Read values ---------- */
  function values() {
    const v = {};
    FIELDS.forEach(f => v[f] = $(f).value.trim());
    v.projects = projects.filter(p => p.title.trim() || p.desc.trim());
    return v;
  }

  /* ---------- Preview ---------- */
  function ph(text, placeholder) {
    return text ? PP.escapeHTML(text) : `<span class="placeholder">${placeholder}</span>`;
  }

  function renderPreview(v) {
    const paper = $("resumePreview");
    paper.style.setProperty("--rc", v.color);
    const contact = [v.email, v.phone, v.links].filter(Boolean).map(PP.escapeHTML).join(" · ");
    const skills = v.skills.split(",").map(s => s.trim()).filter(Boolean);
    const extras = v.extras.split("\n").map(s => s.trim()).filter(Boolean);
    const edu = [v.degree, v.college].filter(Boolean).map(PP.escapeHTML).join(", ");
    const eduMeta = [v.gradYear, v.cgpa].filter(Boolean).map(PP.escapeHTML).join(" · ");

    paper.innerHTML = `
      <h2>${ph(v.name, "Your Name")}</h2>
      <div style="font-weight:600;margin-bottom:2px">${v.role ? PP.escapeHTML(v.role) : ""}</div>
      <div class="contact">${contact || '<span class="placeholder">email · phone · links</span>'}</div>

      <h4>Summary</h4>
      <p>${ph(v.summary, "A 2–3 line summary of your strengths and goals.")}</p>

      <h4>Education</h4>
      <p>${edu ? "<b>" + edu + "</b>" : '<span class="placeholder">Degree, College</span>'}${eduMeta ? "<br>" + eduMeta : ""}</p>

      <h4>Skills</h4>
      <div class="chips">${skills.length ? skills.map(s => `<span>${PP.escapeHTML(s)}</span>`).join("") : '<span class="placeholder">Add your skills</span>'}</div>

      <h4>Projects</h4>
      ${v.projects.length ? v.projects.map(p => `<p><b>${PP.escapeHTML(p.title || "Untitled project")}</b><br>${PP.escapeHTML(p.desc)}</p>`).join("") : '<p class="placeholder">Add at least two projects.</p>'}

      ${extras.length ? `<h4>Certifications &amp; Achievements</h4><ul>${extras.map(x => `<li>${PP.escapeHTML(x)}</li>`).join("")}</ul>` : ""}
    `;
  }

  /* ---------- Resume score ---------- */
  function score(v) {
    const text = (v.summary + " " + v.projects.map(p => p.desc).join(" ")).toLowerCase();
    const skillCount = v.skills.split(",").filter(s => s.trim()).length;
    const checks = [
      ["Name, valid email and phone added", !!v.name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) && v.phone.replace(/\D/g, "").length >= 10, 15],
      ["Career summary of 20+ words", v.summary.split(/\s+/).filter(Boolean).length >= 20, 15],
      ["Education with year and CGPA", !!(v.degree && v.college && v.gradYear && v.cgpa), 15],
      ["At least 5 skills listed", skillCount >= 5, 15],
      ["Two or more projects described", v.projects.filter(p => p.title && p.desc).length >= 2, 20],
      ["Uses action verbs (built, developed, led…)", ACTION_VERBS.some(w => text.includes(w)), 10],
      ["Includes a number or result (e.g. 60%, 500+)", /\d/.test(v.projects.map(p => p.desc).join(" ")), 5],
      ["GitHub / LinkedIn link added", /github|linkedin/i.test(v.links), 5]
    ];
    let total = 0;
    $("checklist").innerHTML = checks.map(([label, ok, pts]) => {
      if (ok) total += pts;
      return `<li class="${ok ? "ok" : ""}">${label}</li>`;
    }).join("");
    $("scoreText").textContent = total + "%";
    const fill = $("scoreFill");
    fill.style.width = total + "%";
    fill.style.background = total >= 75 ? "var(--good)" : total >= 40 ? "var(--warn)" : "var(--bad)";
  }

  /* ---------- Update + autosave ---------- */
  function update() {
    const v = values();
    renderPreview(v);
    score(v);
    PP.set("resume", { ...v, projects });
  }
  FIELDS.forEach(f => $(f).addEventListener("input", update));

  function load(data) {
    FIELDS.forEach(f => { $(f).value = data[f] || (f === "color" ? "#14213d" : ""); });
    projects = data.projects && data.projects.length ? data.projects.map(p => ({ ...p })) : [{ title: "", desc: "" }];
    renderProjectInputs();
    update();
  }

  /* ---------- Buttons ---------- */
  $("printBtn").addEventListener("click", () => {
    if (!$("name").value.trim()) { PP.toast("Enter your name first"); $("name").focus(); return; }
    PP.toast("Open the downloaded site in your browser to save the resume as PDF");
  });
  $("sampleBtn").addEventListener("click", () => { load(SAMPLE); PP.toast("Sample data loaded"); });
  $("clearBtn").addEventListener("click", () => {
    if ((function(){return true})("Clear everything in the resume form?")) { PP.remove("resume"); load({}); }
  });

  /* ---------- Init ---------- */
  load(PP.get("resume", {}));
});
