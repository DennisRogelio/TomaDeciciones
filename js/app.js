/* ============================================================
   DeciTI · app.js
   Controla: navegación, formulario de 5 pasos, respuestas,
   dashboard, LocalStorage y orquestación de la generación
   del análisis. No contiene reglas de negocio (ver rules.js).
   ============================================================ */

let state = createInitialState();

/* --------------------------------------------------------------
   Arranque
   -------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("problem-statement-text").textContent = PROBLEM_STATEMENT;
  document.getElementById("problem-statement-text-2").textContent = PROBLEM_STATEMENT;

  loadFromStorage();
  bindGlobalEvents();
  renderScreen();
});

/* --------------------------------------------------------------
   Persistencia en LocalStorage (sección 21)
   -------------------------------------------------------------- */
function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.responses, JSON.stringify(state.responses));
    localStorage.setItem(STORAGE_KEYS.analysis, JSON.stringify(state.analysis));
    localStorage.setItem(STORAGE_KEYS.screen, JSON.stringify({
      screen: state.screen,
      dashboardSection: state.dashboardSection,
      formStep: state.formStep
    }));
  } catch (e) {
    /* LocalStorage no disponible: la app continúa funcionando sin persistencia */
    console.warn("No fue posible guardar en LocalStorage.", e);
  }
}

function loadFromStorage() {
  try {
    const responses = localStorage.getItem(STORAGE_KEYS.responses);
    const analysis = localStorage.getItem(STORAGE_KEYS.analysis);
    const screenInfo = localStorage.getItem(STORAGE_KEYS.screen);

    if (responses) state.responses = JSON.parse(responses);
    if (analysis) state.analysis = JSON.parse(analysis);
    if (screenInfo) {
      const parsed = JSON.parse(screenInfo);
      state.screen = parsed.screen || "welcome";
      state.dashboardSection = parsed.dashboardSection || "resumen";
      state.formStep = parsed.formStep || 0;
    }
  } catch (e) {
    console.warn("No fue posible recuperar datos de LocalStorage.", e);
    state = createInitialState();
  }
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEYS.responses);
  localStorage.removeItem(STORAGE_KEYS.analysis);
  localStorage.removeItem(STORAGE_KEYS.screen);
}

/* --------------------------------------------------------------
   Eventos globales
   -------------------------------------------------------------- */
function bindGlobalEvents() {
  document.getElementById("btn-start").addEventListener("click", () => {
    state.screen = "form";
    state.formStep = 0;
    saveToStorage();
    renderScreen();
  });

  document.getElementById("btn-load-example").addEventListener("click", () => {
    state.responses = { ...EXAMPLE_RESPONSES };
    state.analysis = generateAnalysis(state.responses);
    state.screen = "dashboard";
    state.dashboardSection = "resumen";
    saveToStorage();
    renderScreen();
  });

  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", () => {
      state.dashboardSection = link.dataset.section;
      saveToStorage();
      renderDashboardSection();
      updateSidebarActive();
      closeSidebarMobile();
    });
  });

  document.getElementById("btn-edit-responses").addEventListener("click", () => {
    state.screen = "form";
    state.formStep = 0;
    saveToStorage();
    renderScreen();
  });

  document.getElementById("btn-new-analysis").addEventListener("click", () => {
    document.getElementById("confirm-modal").classList.add("visible");
  });

  document.getElementById("confirm-cancel").addEventListener("click", () => {
    document.getElementById("confirm-modal").classList.remove("visible");
  });

  document.getElementById("confirm-accept").addEventListener("click", () => {
    document.getElementById("confirm-modal").classList.remove("visible");
    clearStorage();
    state = createInitialState();
    renderScreen();
  });

  document.getElementById("btn-menu-toggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
  });
}

function closeSidebarMobile() {
  document.getElementById("sidebar").classList.remove("open");
}

/* --------------------------------------------------------------
   Render de pantallas raíz
   -------------------------------------------------------------- */
function renderScreen() {
  const welcome = document.getElementById("screen-welcome");
  const form = document.getElementById("screen-form");
  const dashboard = document.getElementById("screen-dashboard");

  welcome.classList.toggle("hidden", state.screen !== "welcome");
  form.classList.toggle("hidden", state.screen !== "form");
  dashboard.classList.toggle("hidden", state.screen !== "dashboard");

  if (state.screen === "form") {
    renderFormStep();
  } else if (state.screen === "dashboard") {
    if (!state.analysis) {
      state.analysis = generateAnalysis(state.responses);
    }
    updateSidebarActive();
    renderDashboardSection();
  }
}

/* --------------------------------------------------------------
   Formulario de 5 pasos (sección 18)
   -------------------------------------------------------------- */
function renderFormStep() {
  const stepIndex = state.formStep;
  const questionNumbers = FORM_STEPS[stepIndex];
  const questions = QUESTIONS.filter((q) => questionNumbers.includes(q.number));

  const progress = ((stepIndex + 1) / FORM_STEPS.length) * 100;
  document.getElementById("form-progress-bar").style.width = `${progress}%`;
  document.getElementById("form-progress-text").textContent =
    `Paso ${stepIndex + 1} de ${FORM_STEPS.length}`;

  const container = document.getElementById("form-questions");
  container.innerHTML = questions
    .map((q) => {
      const selected = state.responses[q.factor];
      return `
        <div class="question-card">
          <div class="question-number">Pregunta ${q.number} de 10</div>
          <h3 class="question-text">${q.text}</h3>
          <div class="scale-options" data-factor="${q.factor}">
            ${SCALE.map(
              (s) => `
              <button type="button" class="scale-btn ${selected === s.value ? "selected" : ""}"
                data-factor="${q.factor}" data-value="${s.value}">
                <span class="scale-value">${s.value}</span>
                <span class="scale-label">${s.label}</span>
              </button>`
            ).join("")}
          </div>
        </div>`;
    })
    .join("");

  container.querySelectorAll(".scale-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const factor = btn.dataset.factor;
      const value = Number(btn.dataset.value);
      state.responses[factor] = value;
      saveToStorage();
      renderFormStep();
    });
  });

  const btnPrev = document.getElementById("btn-form-prev");
  const btnNext = document.getElementById("btn-form-next");

  btnPrev.disabled = stepIndex === 0;

  const answeredCurrentStep = questionNumbers.every(
    (num) => state.responses[QUESTIONS.find((q) => q.number === num).factor] !== undefined
  );
  btnNext.disabled = !answeredCurrentStep;
  btnNext.textContent = stepIndex === FORM_STEPS.length - 1 ? "Ver resultados" : "Siguiente";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-form-prev").addEventListener("click", () => {
    if (state.formStep > 0) {
      state.formStep -= 1;
      saveToStorage();
      renderFormStep();
    }
  });

  document.getElementById("btn-form-next").addEventListener("click", () => {
    if (state.formStep < FORM_STEPS.length - 1) {
      state.formStep += 1;
      saveToStorage();
      renderFormStep();
    } else {
      state.analysis = generateAnalysis(state.responses);
      state.screen = "dashboard";
      state.dashboardSection = "resumen";
      saveToStorage();
      renderScreen();
    }
  });
});

/* --------------------------------------------------------------
   Dashboard: navegación lateral y render por sección
   -------------------------------------------------------------- */
function updateSidebarActive() {
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === state.dashboardSection);
  });
  document.querySelectorAll(".dashboard-view").forEach((view) => {
    view.classList.toggle("active", view.id === `view-${state.dashboardSection}`);
  });
}

function renderDashboardSection() {
  updateSidebarActive();
  const analysis = state.analysis;
  if (!analysis) return;

  switch (state.dashboardSection) {
    case "resumen":
      renderSummary(analysis);
      break;
    case "foda":
      renderFoda(analysis);
      break;
    case "sombreros":
      renderHats(analysis);
      break;
    case "ishikawa":
      renderIshikawa(analysis);
      break;
    case "pareto":
      renderPareto(analysis);
      break;
    case "catwda":
      renderCatwda(analysis);
      break;
  }
}

/* --------------------------------------------------------------
   Resumen (sección 11)
   -------------------------------------------------------------- */
function renderSummary(analysis) {
  const container = document.getElementById("view-resumen");
  const { summary } = analysis;

  const factorRow = (entry) => `
    <div class="factor-chip">
      <span>${entry.label}</span>
      <strong>${entry.score}</strong>
    </div>`;

  container.innerHTML = `
    <div class="section-header">
      <h2>Resumen del análisis</h2>
      <p class="section-sub">Síntesis general basada en las 10 respuestas registradas.</p>
    </div>

    <div class="problem-banner">
      <span class="problem-eyebrow">Problemática analizada</span>
      <p>${summary.problem}</p>
    </div>

    <div class="summary-stats">
      <div class="stat-card">
        <span class="stat-label">Promedio general</span>
        <span class="stat-value">${summary.average.toFixed(1)} / 5</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Factor prioritario</span>
        <span class="stat-value stat-value-sm">${summary.priorityFactor.label}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Factores críticos</span>
        <span class="stat-value">${summary.critical.length}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Factores de baja prioridad</span>
        <span class="stat-value">${summary.low.length}</span>
      </div>
    </div>

    <div class="summary-columns">
      <div class="summary-block">
        <h3>Factores críticos (&ge; 4)</h3>
        <div class="factor-chip-list">
          ${summary.critical.length ? summary.critical.map(factorRow).join("") : "<p class='muted'>No se identificaron factores críticos.</p>"}
        </div>
      </div>
      <div class="summary-block">
        <h3>Factores de menor prioridad (&le; 2)</h3>
        <div class="factor-chip-list">
          ${summary.low.length ? summary.low.map(factorRow).join("") : "<p class='muted'>No se identificaron factores de baja prioridad.</p>"}
        </div>
      </div>
    </div>

    <div class="summary-block">
      <h3>Interpretación general</h3>
      <p>${summary.interpretation}</p>
    </div>

    ${
      summary.combinations.length
        ? `<div class="summary-block">
            <h3>Relaciones entre factores</h3>
            <ul class="bullet-list">${summary.combinations.map((c) => `<li>${c}</li>`).join("")}</ul>
          </div>`
        : ""
    }

    <div class="summary-block recommendations-block">
      <h3>Recomendaciones prioritarias</h3>
      <ol class="recommendations-list">
        ${summary.recommendations.map((r) => `<li>${r}</li>`).join("")}
      </ol>
    </div>
  `;
}
