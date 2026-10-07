/* CodeXStudys in-app mock test player (opens from the test cards in the batch list) */
(function () {
  "use strict";
  var SEC={P:"Physics",C:"Chemistry",B:"Biology"};
  var TESTS=[
  {id:1,title:"NEET Mini Mock 1",mins:10,qs:[
  ["P","What is the SI unit of force?",["Joule","Newton","Pascal","Watt"],1,"Force = mass × acceleration, measured in newton (kg·m/s²)."],
  ["P","The speed of light in vacuum is approximately:",["3 × 10⁶ m/s","3 × 10⁸ m/s","3 × 10¹⁰ m/s","3 × 10⁵ m/s"],1,"c ≈ 3 × 10⁸ m/s."],
  ["P","Which of these is a vector quantity?",["Speed","Distance","Displacement","Mass"],2,"Displacement has both magnitude and direction."],
  ["C","What is the atomic number of carbon?",["4","6","8","12"],1,"Carbon has 6 protons."],
  ["C","The pH of pure water at 25 °C is:",["0","1","7","14"],2,"Pure water is neutral, so pH = 7."],
  ["C","Zinc reacts with dilute HCl to release which gas?",["Oxygen","Chlorine","Hydrogen","Nitrogen"],2,"Zn + 2HCl → ZnCl₂ + H₂."],
  ["B","Which organelle is called the powerhouse of the cell?",["Ribosome","Mitochondria","Golgi body","Lysosome"],1,"Mitochondria produce most of the cell's ATP."],
  ["B","The basic unit of heredity is:",["Chromosome","Cell","Gene","Protein"],2,"A gene carries the instructions for a trait."],
  ["B","Which blood group is the universal donor for red cells?",["A positive","B negative","AB positive","O negative"],3,"O negative red cells have no A, B or Rh antigens."]]},
  {id:2,title:"NEET Mini Mock 2",mins:10,qs:[
  ["P","The SI unit of frequency is:",["Hertz","Tesla","Farad","Henry"],0,"1 Hz = 1 cycle per second."],
  ["P","Acceleration due to gravity on Earth is about:",["1.6 m/s²","9.8 m/s²","12 m/s²","98 m/s²"],1,"g ≈ 9.8 m/s² near the surface."],
  ["P","Which lens corrects myopia (short-sightedness)?",["Convex","Cylindrical","Plane","Concave"],3,"A concave lens diverges rays so the image falls on the retina."],
  ["C","The chemical formula of table salt is:",["KCl","NaCl","CaCl₂","NaOH"],1,"Table salt is sodium chloride."],
  ["C","The most electronegative element is:",["Oxygen","Chlorine","Fluorine","Nitrogen"],2,"Fluorine has the highest electronegativity (3.98)."],
  ["C","Avogadro's number is approximately:",["6.022 × 10²³","6.022 × 10²⁰","3.011 × 10²³","9.1 × 10⁻³¹"],0,"One mole contains 6.022 × 10²³ particles."],
  ["B","Which pigment captures light in photosynthesis?",["Haemoglobin","Melanin","Chlorophyll","Keratin"],2,"Chlorophyll absorbs mainly red and blue light."],
  ["B","How many chromosomes are in a human somatic cell?",["23","44","46","48"],2,"Humans have 23 pairs, so 46."],
  ["B","Which vitamin is made in the skin with sunlight?",["Vitamin A","Vitamin C","Vitamin D","Vitamin K"],2,"UVB converts a cholesterol derivative into vitamin D."]]}
  ];

  var css = ".cxt{position:fixed;inset:0;z-index:150;display:none;flex-direction:column;background:var(--bg);color:var(--text);font-family:inherit;overflow:hidden}.cxt.on{display:flex}" +
  ".cxt *{box-sizing:border-box}.cxt button{font:inherit;color:inherit;cursor:pointer;border:0;background:none}" +
  ".cxt-top{flex:none;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 16px;padding-top:calc(12px + env(safe-area-inset-top,0px));background:var(--bg-raised);border-bottom:1px solid var(--line)}" +
  ".cxt-top strong{font-size:1rem;text-align:center}.cxt-tm{font:700 1.05rem Consolas,monospace;color:var(--mint);border:1px solid var(--line-strong);border-radius:99px;padding:5px 14px;min-width:84px;text-align:center}.cxt-tm.low{color:var(--danger);border-color:var(--danger)}" +
  ".cxt-ghost{border:1px solid var(--line-strong)!important;border-radius:99px;padding:7px 16px;font-weight:600;font-size:.9rem;color:var(--muted-bright)}" +
  ".cxt-prog{flex:none;height:3px;background:var(--line)}.cxt-prog i{display:block;height:100%;width:0;background:var(--brand);transition:width .3s}" +
  ".cxt-tabs{flex:none;display:flex;gap:6px;padding:10px 16px;overflow-x:auto;border-bottom:1px solid var(--line)}.cxt-tab{white-space:nowrap;padding:6px 16px;border-radius:99px!important;font-weight:600;color:var(--muted)!important;border:1px solid transparent!important}.cxt-tab.on{color:var(--brand-bright)!important;border-color:var(--brand)!important;background:rgba(139,124,255,.14)!important}" +
  ".cxt-body{flex:1;overflow-y:auto;padding:18px 16px calc(40px + env(safe-area-inset-bottom,0px))}.cxt-in{max-width:1000px;margin:0 auto;display:grid;gap:16px;grid-template-columns:1fr}@media(min-width:820px){.cxt-in.two{grid-template-columns:1fr 270px}}" +
  ".cxt-card{background:var(--panel-solid);border:1px solid var(--line);border-radius:var(--radius-lg);padding:22px}.cxt-qh{display:flex;justify-content:space-between;color:var(--muted);font-size:.85rem;margin-bottom:12px}.cxt-qh b{color:var(--orange)}" +
  ".cxt-qt{font-size:1.2rem;font-weight:600;line-height:1.45;margin-bottom:18px}.cxt-opt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:12px 14px;border:1px solid var(--line-strong)!important;border-radius:var(--radius-md);margin-bottom:10px;background:var(--panel-soft)!important}" +
  ".cxt-bub{flex:none;width:30px;height:30px;border-radius:10px;border:1px solid var(--line-strong);display:grid;place-items:center;font-weight:700;font-size:.85rem;color:var(--muted-bright)}" +
  ".cxt-opt.sel{border-color:var(--brand)!important;background:rgba(139,124,255,.16)!important}.cxt-opt.sel .cxt-bub{background:var(--brand);border-color:transparent;color:#fff}" +
  ".cxt-opt.right{border-color:var(--mint)!important;background:rgba(85,221,187,.12)!important}.cxt-opt.right .cxt-bub{background:var(--mint);border-color:transparent;color:#06140f}.cxt-opt.wrong{border-color:var(--danger)!important;background:rgba(255,117,133,.12)!important}.cxt-opt.wrong .cxt-bub{background:var(--danger);border-color:transparent;color:#fff}" +
  ".cxt-nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}.cxt-nav button{flex:1;min-width:100px}.cxt-line{border:1px solid var(--line-strong)!important;border-radius:var(--radius-sm);padding:12px 14px;font-weight:600;font-size:.92rem}" +
  ".cxt-pri{background:linear-gradient(135deg,var(--brand),var(--brand-bright))!important;color:#fff!important;border-radius:var(--radius-sm);padding:12px 18px;font-weight:700}" +
  ".cxt-pg{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.cxt-pb{aspect-ratio:1;border-radius:11px!important;border:1px solid var(--line-strong)!important;font-weight:600;color:var(--muted-bright)}.cxt-pb.a{background:rgba(85,221,187,.14)!important;border-color:var(--mint)!important;color:var(--mint)}.cxt-pb.m{background:rgba(255,179,107,.14)!important;border-color:var(--orange)!important;color:var(--orange)}.cxt-pb.v{border-color:var(--danger)!important;color:var(--danger)}.cxt-pb.c{box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--brand)}" +
  ".cxt-leg{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:.78rem;color:var(--muted);margin:14px 0}.cxt-leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;border:1px solid var(--line-strong)}" +
  ".cxt-mod{position:absolute;inset:0;background:rgba(1,2,5,.72);backdrop-filter:blur(6px);display:none;place-items:center;padding:18px;z-index:2}.cxt-mod.on{display:grid}.cxt-mb{background:var(--panel-solid);border:1px solid var(--line-strong);border-radius:var(--radius-lg);padding:24px;max-width:380px;width:100%}.cxt-mb h3{margin-bottom:8px}.cxt-mb p{color:var(--muted);margin-bottom:18px}.cxt-mbb{display:flex;gap:10px}.cxt-mbb button{flex:1}" +
  ".cxt-sc{display:flex;align-items:center;gap:22px;flex-wrap:wrap}.cxt-ring{position:relative;width:140px;height:140px;flex:none}.cxt-ring svg{transform:rotate(-90deg)}.cxt-ring circle{fill:none;stroke-width:9}.cxt-ring .bg{stroke:var(--line-strong)}.cxt-ring .fg{stroke:var(--brand-bright);stroke-linecap:round;stroke-dasharray:327;stroke-dashoffset:327;transition:stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)}.cxt-ring div{position:absolute;inset:0;display:grid;place-content:center;text-align:center}.cxt-ring b{font-size:2.1rem;line-height:1}.cxt-ring span{font-size:.78rem;color:var(--muted)}" +
  ".cxt-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.cxt-st{background:var(--panel-solid);border:1px solid var(--line);border-radius:var(--radius-md);padding:14px 6px;text-align:center}.cxt-st b{display:block;font-size:1.4rem}.cxt-st span{font-size:.75rem;color:var(--muted)}" +
  ".cxt-row{display:grid;grid-template-columns:90px 1fr 56px;gap:12px;align-items:center;margin:12px 0}.cxt-tr{height:8px;border-radius:99px;background:var(--line-strong);overflow:hidden}.cxt-tr i{display:block;height:100%;background:var(--brand);border-radius:99px}" +
  ".cxt-tag{font-size:.75rem;font-weight:700;border-radius:99px;padding:3px 12px}.cxt-tag.ok{background:rgba(85,221,187,.14);color:var(--mint)}.cxt-tag.bad{background:rgba(255,117,133,.14);color:var(--danger)}.cxt-tag.sk{background:var(--line-strong);color:var(--muted)}.cxt-why{color:var(--muted-bright);border-left:2px solid var(--brand);padding-left:12px;margin-top:4px}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var root = document.createElement("div"); root.className = "cxt"; root.setAttribute("role", "dialog"); root.setAttribute("aria-modal", "true");
  root.innerHTML = '<div class="cxt-top"><button class="cxt-ghost" id="cxtExit" type="button">Exit</button><strong id="cxtTtl"></strong><div class="cxt-tm" id="cxtTm">00:00</div></div><div class="cxt-prog"><i id="cxtPr"></i></div><div class="cxt-tabs" id="cxtTabs"></div>' +
  '<div class="cxt-body" id="cxtBody"><div class="cxt-in two" id="cxtQ"><div><div class="cxt-card"><div class="cxt-qh"><span id="cxtQn"></span><b>+4 / −1</b></div><div class="cxt-qt" id="cxtQt"></div><div id="cxtOpts"></div></div>' +
  '<div class="cxt-nav"><button class="cxt-line" id="cxtPrev" type="button">Previous</button><button class="cxt-line" id="cxtClr" type="button">Clear answer</button><button class="cxt-line" id="cxtMrk" type="button">Mark for review</button><button class="cxt-pri" id="cxtNext" type="button">Save &amp; next</button></div></div>' +
  '<aside class="cxt-card" style="align-self:start"><h4 style="margin-bottom:12px">Question palette</h4><div class="cxt-pg" id="cxtPg"></div><div class="cxt-leg"><span><i style="background:var(--mint)"></i>Answered</span><span><i style="background:var(--orange)"></i>Marked</span><span><i style="background:var(--danger)"></i>Skipped</span><span><i></i>Not visited</span></div><button class="cxt-pri" style="width:100%" id="cxtSub" type="button">Submit test</button></aside></div>' +
  '<div class="cxt-in hide" id="cxtR" style="display:none"></div></div>' +
  '<div class="cxt-mod" id="cxtMod"><div class="cxt-mb"><h3 id="cxtMt"></h3><p id="cxtMp"></p><div class="cxt-mbb"><button class="cxt-line" id="cxtNo" type="button">Keep going</button><button class="cxt-pri" id="cxtYes" type="button"></button></div></div></div>';
  document.body.appendChild(root);

  var $ = function (id) { return document.getElementById(id); };
  var T, A, M, V, I, left, tick, L = "ABCD", best = {};
  try { best = JSON.parse(localStorage.getItem("codex-studys-test-best") || "{}"); } catch (e) {}
  function fmt(s) { return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }
  function ask(t, p, yes, fn) { $("cxtMt").textContent = t; $("cxtMp").textContent = p; $("cxtYes").textContent = yes; $("cxtYes").onclick = function () { $("cxtMod").classList.remove("on"); fn(); }; $("cxtMod").classList.add("on"); }
  function shell(mode) { $("cxtQ").style.display = mode === "q" ? "" : "none"; $("cxtR").style.display = mode === "r" ? "grid" : "none"; $("cxtTabs").style.display = $("cxtPr").parentNode.style.display = mode === "q" ? "" : "none"; $("cxtTm").style.display = mode === "q" ? "" : "none"; $("cxtBody").scrollTop = 0; }
  function close() { clearInterval(tick); root.classList.remove("on"); document.body.classList.remove("modal-open"); }

  function open(id) {
    T = TESTS.filter(function (t) { return "cx-test-" + t.id === String(id); })[0];
    if (!T) return false;
    A = T.qs.map(function () { return -1; }); M = T.qs.map(function () { return false; }); V = T.qs.map(function () { return false; });
    I = 0; left = T.mins * 60; $("cxtTtl").textContent = T.title;
    var secs = []; T.qs.forEach(function (q) { if (secs.indexOf(q[0]) < 0) secs.push(q[0]); });
    $("cxtTabs").innerHTML = secs.map(function (s) { return '<button class="cxt-tab" type="button" data-s="' + s + '">' + SEC[s] + "</button>"; }).join("");
    Array.prototype.forEach.call($("cxtTabs").children, function (b) { b.onclick = function () { go(T.qs.findIndex(function (q) { return q[0] === b.dataset.s; })); }; });
    $("cxtPg").innerHTML = T.qs.map(function (q, i) { return '<button class="cxt-pb" type="button" data-i="' + i + '">' + (i + 1) + "</button>"; }).join("");
    Array.prototype.forEach.call($("cxtPg").children, function (b) { b.onclick = function () { go(+b.dataset.i); }; });
    clearInterval(tick); $("cxtTm").classList.remove("low"); $("cxtTm").textContent = fmt(left);
    tick = setInterval(function () { left--; $("cxtTm").textContent = fmt(left); $("cxtTm").classList.toggle("low", left <= 60); if (left <= 0) finish(); }, 1000);
    document.body.classList.add("modal-open"); root.classList.add("on"); shell("q"); go(0); return true;
  }
  function go(i) { if (i < 0 || i >= T.qs.length) return; I = i; V[i] = true; draw(); }
  function draw() {
    var q = T.qs[I];
    $("cxtQn").textContent = "Question " + (I + 1) + " of " + T.qs.length + " · " + SEC[q[0]]; $("cxtQt").textContent = q[1];
    $("cxtOpts").innerHTML = q[2].map(function (o, k) { return '<button type="button" class="cxt-opt' + (A[I] === k ? " sel" : "") + '" data-k="' + k + '"><span class="cxt-bub">' + L[k] + "</span><span>" + o + "</span></button>"; }).join("");
    Array.prototype.forEach.call($("cxtOpts").children, function (b) { b.onclick = function () { A[I] = +b.dataset.k; draw(); }; });
    $("cxtMrk").textContent = M[I] ? "Unmark review" : "Mark for review";
    Array.prototype.forEach.call($("cxtTabs").children, function (b) { b.classList.toggle("on", b.dataset.s === q[0]); });
    Array.prototype.forEach.call($("cxtPg").children, function (b, i) { b.className = "cxt-pb" + (M[i] ? " m" : A[i] >= 0 ? " a" : V[i] ? " v" : "") + (i === I ? " c" : ""); });
    $("cxtPr").style.width = A.filter(function (x) { return x >= 0; }).length / T.qs.length * 100 + "%";
    $("cxtNext").textContent = I === T.qs.length - 1 ? "Save" : "Save & next";
  }
  $("cxtClr").onclick = function () { A[I] = -1; draw(); };
  $("cxtMrk").onclick = function () { M[I] = !M[I]; draw(); };
  $("cxtPrev").onclick = function () { go(I - 1); };
  $("cxtNext").onclick = function () { I < T.qs.length - 1 ? go(I + 1) : draw(); };
  $("cxtNo").onclick = function () { $("cxtMod").classList.remove("on"); };
  $("cxtSub").onclick = function () { var n = A.filter(function (x) { return x >= 0; }).length; ask("Submit test?", "You answered " + n + " of " + T.qs.length + " questions. You can't change answers after submitting.", "Submit", finish); };
  $("cxtExit").onclick = function () { if ($("cxtR").style.display === "grid") close(); else ask("Exit test?", "Your progress will be lost.", "Exit", close); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && root.classList.contains("on") && !$("cxtMod").classList.contains("on")) $("cxtExit").click(); });

  function finish() {
    clearInterval(tick); $("cxtMod").classList.remove("on");
    var c = 0, w = 0, sk = 0, sc = {};
    T.qs.forEach(function (q, i) { var s = sc[q[0]] = sc[q[0]] || { m: 0, t: 0 }; s.t += 4; if (A[i] < 0) sk++; else if (A[i] === q[3]) { c++; s.m += 4; } else { w++; s.m -= 1; } });
    var tot = c * 4 - w, max = T.qs.length * 4, pct = Math.max(0, tot) / max;
    if (best[T.id] == null || tot > best[T.id]) { best[T.id] = tot; try { localStorage.setItem("codex-studys-test-best", JSON.stringify(best)); } catch (e) {} }
    var h = '<div class="cxt-card cxt-sc"><div class="cxt-ring"><svg width="140" height="140" viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" id="cxtFg" cx="60" cy="60" r="52"/></svg><div><b>' + tot + "</b><span>out of " + max + "</span></div></div><div><h2>" + (pct >= .7 ? "Strong attempt" : pct >= .4 ? "Good start" : "Keep practising") + "</h2><p style=\"color:var(--muted);margin-top:6px\">" + T.title + ". Read the review below, then retry.</p></div></div>";
    h += '<div class="cxt-stats"><div class="cxt-st"><b style="color:var(--mint)">' + c + '</b><span>Correct</span></div><div class="cxt-st"><b style="color:var(--danger)">' + w + '</b><span>Wrong</span></div><div class="cxt-st"><b>' + sk + '</b><span>Skipped</span></div><div class="cxt-st"><b>' + (c + w ? Math.round(c / (c + w) * 100) : 0) + "%</b><span>Accuracy</span></div></div>";
    h += '<div class="cxt-card"><h4>Section-wise score</h4>' + Object.keys(sc).map(function (k) { var s = sc[k]; return '<div class="cxt-row"><span>' + SEC[k] + '</span><div class="cxt-tr"><i style="width:' + Math.max(0, s.m / s.t * 100) + '%"></i></div><b>' + s.m + "/" + s.t + "</b></div>"; }).join("") + "</div>";
    T.qs.forEach(function (q, i) {
      var t = A[i] < 0 ? ["sk", "Skipped"] : A[i] === q[3] ? ["ok", "Correct +4"] : ["bad", "Wrong −1"];
      h += '<div class="cxt-card"><div class="cxt-qh"><span>Q' + (i + 1) + " · " + SEC[q[0]] + '</span><span class="cxt-tag ' + t[0] + '">' + t[1] + '</span></div><div class="cxt-qt">' + q[1] + "</div>" + q[2].map(function (o, k) { return '<div class="cxt-opt' + (k === q[3] ? " right" : A[i] === k ? " wrong" : "") + '"><span class="cxt-bub">' + L[k] + "</span><span>" + o + "</span></div>"; }).join("") + '<p class="cxt-why">' + q[4] + "</p></div>";
    });
    h += '<div class="cxt-nav"><button class="cxt-line" id="cxtRetry" type="button">Retry test</button><button class="cxt-pri" id="cxtDone" type="button">Back to courses</button></div>';
    $("cxtR").innerHTML = h; shell("r");
    $("cxtRetry").onclick = function () { open("cx-test-" + T.id); }; $("cxtDone").onclick = close;
    setTimeout(function () { var f = $("cxtFg"); if (f) f.style.strokeDashoffset = 327 * (1 - pct); }, 60);
  }
  window.CXTests = { open: open, isTest: function (id) { return /^cx-test-/.test(String(id)); } };
})();
