/* ============================================================
   DeciTI · catwda.js — Renderizado del análisis CATWDA
   ============================================================ */

function renderCatwda(analysis) {
  const container = document.getElementById("view-catwda");
  const { catwda } = analysis;

  const listBlock = (letter, title, items) => `
    <div class="catwda-card">
      <div class="catwda-letter">${letter}</div>
      <div class="catwda-body">
        <h3>${title}</h3>
        <ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>
    </div>`;

  const transformBlock = `
    <div class="catwda-card catwda-transform">
      <div class="catwda-letter">T</div>
      <div class="catwda-body">
        <h3>Transformación</h3>
        <div class="transform-flow">
          <div class="transform-step">
            <span class="transform-tag">Situación actual</span>
            <p>${catwda.transformacion.actual}</p>
          </div>
          <div class="transform-arrow">&#8595;</div>
          <div class="transform-step transform-problem">
            <span class="transform-tag">Problema</span>
            <p>${catwda.transformacion.problema}</p>
          </div>
          <div class="transform-arrow">&#8595;</div>
          <div class="transform-step">
            <span class="transform-tag">Situación deseada</span>
            <p>${catwda.transformacion.deseada}</p>
          </div>
        </div>
      </div>
    </div>`;

  const weltBlock = `
    <div class="catwda-card">
      <div class="catwda-letter">W</div>
      <div class="catwda-body">
        <h3>Weltanschauung (Cosmovisión)</h3>
        <p>${catwda.weltanschauung}</p>
      </div>
    </div>`;

  container.innerHTML = `
    <div class="section-header">
      <h2>Análisis CATWDA</h2>
      <p class="section-sub">Clientes, Actores, Transformación, Weltanschauung, Dueños y Ambiente.</p>
    </div>
    <div class="catwda-grid">
      ${listBlock("C", "Clientes", catwda.clientes)}
      ${listBlock("A", "Actores", catwda.actores)}
      ${transformBlock}
      ${weltBlock}
      ${listBlock("D", "Dueños", catwda.duenos)}
      ${listBlock("A", "Ambiente", catwda.ambiente)}
    </div>
  `;
}
