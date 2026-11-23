/* ============================================================
   DeciTI · foda.js — Renderizado de la matriz FODA
   ============================================================ */

function renderFoda(analysis) {
  const container = document.getElementById("view-foda");
  const { foda } = analysis;

  const quadrant = (title, icon, items, className) => `
    <div class="foda-quad ${className}">
      <div class="foda-quad-head">
        <span class="foda-icon">${icon}</span>
        <h3>${title}</h3>
      </div>
      <ul class="foda-list">
        ${
          items.length
            ? items.map((i) => `<li>${i}</li>`).join("")
            : `<li class="foda-empty">Sin elementos relevantes según las respuestas actuales.</li>`
        }
      </ul>
    </div>`;

  container.innerHTML = `
    <div class="section-header">
      <h2>Análisis FODA</h2>
      <p class="section-sub">Fortalezas, Oportunidades, Debilidades y Amenazas derivadas de las 10 respuestas.</p>
    </div>
    <div class="foda-grid">
      ${quadrant("Fortalezas", "&#9733;", foda.fortalezas, "foda-fortalezas")}
      ${quadrant("Oportunidades", "&#9679;", foda.oportunidades, "foda-oportunidades")}
      ${quadrant("Debilidades", "&#9888;", foda.debilidades, "foda-debilidades")}
      ${quadrant("Amenazas", "&#10060;", foda.amenazas, "foda-amenazas")}
    </div>
  `;
}
