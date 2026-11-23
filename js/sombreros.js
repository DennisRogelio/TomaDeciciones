/* ============================================================
   DeciTI · sombreros.js — Renderizado de los 6 Sombreros
   ============================================================ */

const HAT_META = {
  blanco: { title: "Sombrero Blanco", subtitle: "Datos y hechos", color: "#F1F5F9" },
  rojo: { title: "Sombrero Rojo", subtitle: "Emociones y percepciones", color: "#EF4444" },
  negro: { title: "Sombrero Negro", subtitle: "Riesgos", color: "#172033" },
  amarillo: { title: "Sombrero Amarillo", subtitle: "Beneficios", color: "#F59E0B" },
  verde: { title: "Sombrero Verde", subtitle: "Ideas y soluciones", color: "#22C55E" },
  azul: { title: "Sombrero Azul", subtitle: "Control y síntesis", color: "#3B82F6" }
};

function renderHats(analysis) {
  const container = document.getElementById("view-sombreros");
  const { hats } = analysis;

  const card = (key) => {
    const meta = HAT_META[key];
    const items = hats[key];
    return `
      <div class="hat-card" style="--hat-color:${meta.color}">
        <div class="hat-head">
          <span class="hat-dot"></span>
          <div>
            <h3>${meta.title}</h3>
            <p>${meta.subtitle}</p>
          </div>
        </div>
        <ul class="hat-list">
          ${
            items.length
              ? items.map((i) => `<li>${i}</li>`).join("")
              : `<li class="foda-empty">Sin observaciones para esta perspectiva.</li>`
          }
        </ul>
      </div>`;
  };

  container.innerHTML = `
    <div class="section-header">
      <h2>6 Sombreros para Pensar</h2>
      <p class="section-sub">Seis perspectivas complementarias generadas a partir de las respuestas del análisis.</p>
    </div>
    <div class="hats-grid">
      ${["blanco", "rojo", "negro", "amarillo", "verde", "azul"].map(card).join("")}
    </div>
  `;
}
