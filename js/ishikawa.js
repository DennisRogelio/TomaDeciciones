/* ============================================================
   DeciTI · ishikawa.js — Diagrama de espina de pescado (SVG)
   Generado completamente en JavaScript a partir de las causas
   calculadas por el motor de reglas (rules.js).
   ============================================================ */

function renderIshikawa(analysis) {
  const container = document.getElementById("view-ishikawa");
  const { ishikawa } = analysis;
  const categoryNames = Object.keys(ishikawa.categories);

  const svg = buildIshikawaSvg(ishikawa.problem, ishikawa.categories);

  container.innerHTML = `
    <div class="section-header">
      <h2>Diagrama de Ishikawa</h2>
      <p class="section-sub">Causas agrupadas por categoría según las respuestas del análisis.</p>
    </div>
    <div class="ishikawa-scroll">
      ${svg}
    </div>
    <div class="ishikawa-legend">
      ${categoryNames
        .map(
          (cat) => `
        <div class="ishikawa-legend-item">
          <h4>${cat}</h4>
          <ul>${ishikawa.categories[cat].map((c) => `<li>${c}</li>`).join("")}</ul>
        </div>`
        )
        .join("")}
    </div>
  `;
}

function buildIshikawaSvg(problemText, categories) {
  const names = Object.keys(categories);
  const width = 1500;
  const height = 620;
  const spineY = height / 2;
  const spineStartX = 60;
  const spineEndX = width - 220;

  const top = names.slice(0, Math.ceil(names.length / 2));
  const bottom = names.slice(Math.ceil(names.length / 2));

  const segment = (spineEndX - spineStartX) / (Math.max(top.length, bottom.length) + 1);

  let bones = "";

  const drawBoneGroup = (list, isTop) => {
    list.forEach((cat, idx) => {
      const anchorX = spineStartX + segment * (idx + 1);
      const boneLength = 190;
      const dirY = isTop ? -1 : 1;
      const tipX = anchorX - 130;
      const tipY = spineY + dirY * boneLength;

      bones += `<line x1="${anchorX}" y1="${spineY}" x2="${tipX}" y2="${tipY}" class="ishikawa-bone" />`;
      bones += `<text x="${tipX}" y="${tipY + dirY * 22}" text-anchor="middle" class="ishikawa-category">${cat}</text>`;

      const causes = categories[cat];
      const causeCount = causes.length;
      causes.forEach((cause, cIdx) => {
        const t = (cIdx + 1) / (causeCount + 1);
        const cx = anchorX + (tipX - anchorX) * t;
        const cy = spineY + (tipY - spineY) * t;
        const perpX = cx - 55;
        const perpY = cy - dirY * 30;

        bones += `<line x1="${cx}" y1="${cy}" x2="${perpX}" y2="${perpY}" class="ishikawa-cause-line" />`;
        bones += `<text x="${perpX - 6}" y="${perpY}" text-anchor="end" class="ishikawa-cause-text">${truncate(cause, 46)}</text>`;
      });
    });
  };

  drawBoneGroup(top, true);
  drawBoneGroup(bottom, false);

  return `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="ishikawa-svg">
      <line x1="${spineStartX}" y1="${spineY}" x2="${spineEndX}" y2="${spineY}" class="ishikawa-spine" />
      <polygon points="${spineEndX},${spineY - 40} ${spineEndX + 60},${spineY} ${spineEndX},${spineY + 40}" class="ishikawa-head" />
      <foreignObject x="${spineEndX - 10}" y="${spineY - 30}" width="230" height="60">
        <div xmlns="http://www.w3.org/1999/xhtml" class="ishikawa-problem">${problemText}</div>
      </foreignObject>
      ${bones}
    </svg>
  `;
}

function truncate(text, max) {
  return text.length > max ? text.slice(0, max - 1) + "\u2026" : text;
}
