/* =======================================================================
 *  Clean Technology — App logic
 * ======================================================================= */
(() => {
  "use strict";
  const data = window.CleanTech;
  const $  = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  /* ---------- Chart.js global defaults ---------- */
  if (window.Chart) {
    Chart.defaults.color = "#9aa3b2";
    Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.borderColor = "rgba(255,255,255,0.06)";
    Chart.defaults.plugins.tooltip.backgroundColor = "rgba(7,11,24,0.96)";
    Chart.defaults.plugins.tooltip.borderColor = "rgba(255,255,255,0.1)";
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.titleFont = { family: "Space Grotesk", weight: 600, size: 13 };
    Chart.defaults.plugins.tooltip.bodyFont = { family: "Inter", size: 12 };
    Chart.defaults.plugins.tooltip.boxPadding = 6;
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.animation.duration = 900;
    Chart.defaults.animation.easing = "easeOutQuart";
  }

  /* =======================================================
   *  HERO counters
   * ===================================================== */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();
    const isInt = Number.isInteger(target);

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = target * eased;
      el.textContent = (isInt ? Math.round(v) : v.toFixed(1)) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  $$("[data-counter]").forEach((el) => counterObserver.observe(el));

  /* =======================================================
   *  Reveal on scroll
   * ===================================================== */
  const revealTargets = $$(".section, .hero-inner, .timeline-list li, .card, .tech-card, .cta-card");
  revealTargets.forEach((el) => el.classList.add("reveal"));
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* =======================================================
   *  Technology Explorer
   * ===================================================== */
  const grid = $("#techGrid");
  const detail = $("#techDetail");

  function renderTechGrid() {
    grid.innerHTML = data.technologies.map((t, i) => `
      <button class="tech-card ${i === 0 ? "active" : ""}" data-id="${t.id}" role="tab" aria-selected="${i === 0}">
        <span class="tech-card-ico">${t.icon}</span>
        <h4>${t.name}</h4>
        <p>${t.tagline}</p>
      </button>
    `).join("");

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".tech-card");
      if (!btn) return;
      $$(".tech-card", grid).forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderTechDetail(btn.dataset.id);
    });
  }

  function renderTechDetail(id) {
    const t = data.technologies.find((x) => x.id === id) || data.technologies[0];
    detail.innerHTML = `
      <span class="tag">${t.tag}</span>
      <h3>${t.name}</h3>
      <p>${t.description}</p>
      <div class="tech-metrics">
        ${t.metrics.map((m) => `
          <div class="metric">
            <div class="metric-label">${m.label}</div>
            <div class="metric-value">${m.value}</div>
          </div>
        `).join("")}
      </div>
      <div class="tech-bar">
        ${t.bars.map((b) => `
          <div class="tech-bar-row">
            <div class="tech-bar-label">${b.label}</div>
            <div class="tech-bar-track"><div class="tech-bar-fill" data-target="${b.value}"></div></div>
            <div class="tech-bar-val">${b.value}/100</div>
          </div>
        `).join("")}
      </div>
    `;

    requestAnimationFrame(() => {
      $$(".tech-bar-fill", detail).forEach((el) => {
        el.style.width = el.dataset.target + "%";
      });
    });
  }

  renderTechGrid();
  renderTechDetail(data.technologies[0].id);

  /* =======================================================
   *  LCOE cost chart
   * ===================================================== */
  const costCtx = $("#costChart");
  const legendEl = $("#costLegend");

  legendEl.innerHTML = data.lcoe.datasets
    .map((d) => `<span class="legend-item"><span class="legend-swatch" style="background:${d.color}"></span>${d.label}</span>`)
    .join("");

  const costChart = new Chart(costCtx, {
    type: "line",
    data: {
      labels: data.lcoe.years,
      datasets: data.lcoe.datasets.map((d) => ({
        label: d.label,
        data: d.data,
        borderColor: d.color,
        backgroundColor: d.color + "22",
        borderWidth: 2.5,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: d.color,
        pointBorderColor: "#0b1124",
        pointBorderWidth: 2,
        fill: false
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: $${ctx.parsed.y}/MWh`
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: { color: "#9aa3b2" }
        },
        y: {
          type: "linear",
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: {
            color: "#9aa3b2",
            callback: (v) => "$" + v
          },
          title: {
            display: true,
            text: "USD / MWh  (lower = cheaper)",
            color: "#6b7280",
            font: { size: 11 }
          }
        }
      }
    }
  });

  $$(".toggle-group .toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".toggle-group .toggle").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const scale = btn.dataset.scale;
      costChart.options.scales.y.type = scale;
      if (scale === "log") {
        costChart.options.scales.y.min = 20;
      } else {
        delete costChart.options.scales.y.min;
      }
      costChart.update();
    });
  });

  /* =======================================================
   *  Capacity stacked chart
   * ===================================================== */
  const capCtx = $("#capacityChart");
  new Chart(capCtx, {
    type: "line",
    data: {
      labels: data.capacity.years,
      datasets: data.capacity.datasets.map((d) => ({
        label: d.label,
        data: d.data,
        borderColor: d.color,
        backgroundColor: d.color + "55",
        fill: true,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: d.color,
        borderWidth: 2
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            padding: 16,
            usePointStyle: true,
            pointStyle: "rectRounded",
            color: "#9aa3b2"
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${Intl.NumberFormat().format(ctx.parsed.y)} GW`
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: { color: "#9aa3b2" }
        },
        y: {
          stacked: true,
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: {
            color: "#9aa3b2",
            callback: (v) => v >= 1000 ? (v / 1000) + " TW" : v + " GW"
          }
        }
      }
    }
  });

  /* =======================================================
   *  Scenario Simulator
   * ===================================================== */
  const slidersRoot = $("#sliders");
  const co2Value = $("#co2Value");
  const co2Sub = $("#co2Sub");
  const gaugeArc = $("#gaugeArc");
  const gaugeLabel = $("#gaugeLabel");
  const alignValue = $("#alignValue");
  const alignSub = $("#alignSub");
  const GAUGE_LENGTH = 251.3;

  const state = Object.fromEntries(
    data.scenario.sources.map((s) => [s.id, s.start])
  );

  function renderSliders() {
    slidersRoot.innerHTML = data.scenario.sources.map((s) => `
      <div class="slider-row">
        <div class="name"><span class="dot" style="background:${s.color}"></span>${s.label}</div>
        <div class="val" data-val="${s.id}">${state[s.id]}%</div>
        <input type="range" min="0" max="100" value="${state[s.id]}" data-id="${s.id}" />
      </div>
    `).join("");

    slidersRoot.addEventListener("input", (e) => {
      if (e.target.tagName !== "INPUT") return;
      const id = e.target.dataset.id;
      state[id] = Number(e.target.value);
      // Normalize to 100
      normalize(id);
      updateSliders();
      updateResults();
    });
  }

  function normalize(changedId) {
    const total = Object.values(state).reduce((a, b) => a + b, 0);
    if (total === 100) return;

    const others = data.scenario.sources.filter((s) => s.id !== changedId);
    const otherTotal = others.reduce((sum, s) => sum + state[s.id], 0);
    const deficit = 100 - state[changedId];

    if (otherTotal === 0) {
      // distribute evenly
      const each = deficit / others.length;
      others.forEach((s) => (state[s.id] = Math.max(0, each)));
    } else {
      const ratio = deficit / otherTotal;
      others.forEach((s) => (state[s.id] = Math.max(0, state[s.id] * ratio)));
    }

    // round + fix rounding drift
    const sum = Object.values(state).reduce((a, b) => a + b, 0);
    if (sum !== 100) {
      const diff = 100 - sum;
      state[changedId] = Math.max(0, Math.min(100, state[changedId] + diff));
    }
  }

  function updateSliders() {
    data.scenario.sources.forEach((s) => {
      const val = Math.round(state[s.id]);
      const slider = slidersRoot.querySelector(`input[data-id="${s.id}"]`);
      const label = slidersRoot.querySelector(`[data-val="${s.id}"]`);
      if (slider && document.activeElement !== slider) slider.value = val;
      if (label) label.textContent = val + "%";
    });
  }

  function updateResults() {
    // weighted emission factor, kgCO2/MWh
    const ef = data.scenario.sources.reduce(
      (acc, s) => acc + (state[s.id] / 100) * s.emission,
      0
    );
    // total Gt = factor(kg/MWh) * demand(TWh) * 1e6 MWh/TWh / 1e12 kg/Gt
    const totalGt = (ef * data.scenario.totalDemandTWh * 1e6) / 1e12;
    const target = 4.0; // 1.5°C pathway
    const diff = totalGt - target;

    co2Value.textContent = totalGt.toFixed(1);
    co2Sub.textContent = "Gt CO₂ / year (from electricity)";

    // Gauge: 0 Gt → 0 offset, 20 Gt → full offset
    const pct = Math.min(1, totalGt / 20);
    gaugeArc.style.strokeDashoffset = GAUGE_LENGTH * (1 - pct);

    if (totalGt <= target) {
      alignValue.textContent = "On track";
      alignValue.style.background = "linear-gradient(95deg,#fff,#34d399)";
      alignValue.style.webkitBackgroundClip = "text";
      alignSub.textContent = `${Math.abs(diff).toFixed(1)} Gt under pathway`;
      gaugeLabel.textContent = "Pathway alignment · safe";
    } else if (totalGt <= target * 1.8) {
      alignValue.textContent = "Off track";
      alignValue.style.background = "linear-gradient(95deg,#fff,#fbbf24)";
      alignValue.style.webkitBackgroundClip = "text";
      alignSub.textContent = `+${diff.toFixed(1)} Gt over pathway`;
      gaugeLabel.textContent = "Pathway alignment · warning";
    } else {
      alignValue.textContent = "Critical";
      alignValue.style.background = "linear-gradient(95deg,#fff,#ef4444)";
      alignValue.style.webkitBackgroundClip = "text";
      alignSub.textContent = `+${diff.toFixed(1)} Gt over pathway`;
      gaugeLabel.textContent = "Pathway alignment · danger";
    }
  }

  renderSliders();
  updateResults();

  /* =======================================================
   *  Leaderboard
   * ===================================================== */
  const lb = $("#leaderboard");
  const sortedLB = [...data.leaderboard].sort((a, b) => b.value - a.value);
  const max = sortedLB[0].value;

  lb.innerHTML = sortedLB.map((c, i) => `
    <div class="lb-row ${i < 3 ? "lb-top" : ""}">
      <div class="lb-rank">${String(i + 1).padStart(2, "0")}</div>
      <div class="lb-body">
        <div class="lb-name"><span class="lb-flag">${c.flag}</span>${c.country}</div>
        <div class="lb-track"><div class="lb-fill" data-pct="${(c.value / max) * 100}"></div></div>
      </div>
      <div class="lb-val">$${c.value}<span>B</span></div>
    </div>
  `).join("");

  const lbObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          $$(".lb-fill", lb).forEach((el) => {
            el.style.width = el.dataset.pct + "%";
          });
          lbObs.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );
  lbObs.observe(lb);

  /* =======================================================
   *  Smooth scroll for anchor nav (keep explicit for Safari)
   * ===================================================== */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
