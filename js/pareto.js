/* ============================================================
   DeciTI · pareto.js — Cálculo y renderizado de Pareto
   Implementación 100% local en SVG. No utiliza Chart.js ni CDN.
   ============================================================ */

function computePareto(paretoData) {
  const total = paretoData.reduce((sum, d) => sum + d.value, 0);

  const sorted = [...paretoData].sort((a, b) => b.value - a.value);

  let cumulative = 0;
  const rows = sorted.map((d) => {
    const percentage = total > 0 ? (d.value / total) * 100 : 0;
    cumulative += percentage;
    return {
      ...d,
      percentage,
      cumulative
    };
  });

  let eightyIndex = rows.findIndex((r) => r.cumulative >= 80);
  if (eightyIndex === -1) eightyIndex = rows.length - 1;

  return { total, rows, eightyIndex };
}

function renderPareto(analysis) {
  const container = document.getElementById("view-pareto");
  const { rows, eightyIndex, total } = computePareto(analysis.pareto);

  container.innerHTML = `
    <div class="section-header">
      <h2>Diagrama de Pareto</h2>
      <p class="section-sub">Frecuencia, porcentaje y porcentaje acumulado de importancia asignada a los 10 factores.</p>
    </div>
    <div class="pareto-wrap">
      ${buildParetoSvg(rows, eightyIndex)}
    </div>
    <div class="pareto-table-wrap">
      <table class="pareto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Factor</th>
            <th>Puntuación</th>
            <th>% individual</th>
            <th>% acumulado</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (r, i) => `
            <tr class="${i <= eightyIndex ? "pareto-vital" : ""}">
              <td>${i + 1}</td>
              <td>${r.label}</td>
              <td>${r.value}</td>
              <td>${r.percentage.toFixed(1)}%</td>
              <td>${r.cumulative.toFixed(1)}%</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
      <p class="pareto-note">
        Los factores marcados corresponden al grupo que concentra aproximadamente el 80% de la
        importancia total asignada (puntuación total = ${total}), siguiendo el principio de Pareto.
      </p>
    </div>
  `;
}

function buildParetoSvg(rows, eightyIndex) {
  const width = 900;
  const height = 420;
  const marginLeft = 60;
  const marginRight = 60;
  const marginTop = 30;
  const marginBottom = 110;
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const barSlot = chartWidth / rows.length;
  const barWidth = barSlot * 0.55;
  const maxValue = Math.max(...rows.map((r) => r.value), 1);

  const yForValue = (v) => marginTop + chartHeight - (v / maxValue) * chartHeight;
  const yForPercent = (p) => marginTop + chartHeight - (p / 100) * chartHeight;

  const bars = rows
    .map((r, i) => {
      const x = marginLeft + i * barSlot + (barSlot - barWidth) / 2;
      const y = yForValue(r.value);
      const barHeight = marginTop + chartHeight - y;
      const isVital = i <= eightyIndex;
      return `
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" class="pareto-bar ${isVital ? "pareto-bar-vital" : ""}" />
        <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" class="pareto-value">${r.value}</text>
        <text x="${x + barWidth / 2}" y="${marginTop + chartHeight + 20}" text-anchor="end" class="pareto-label" transform="rotate(-35 ${x + barWidth / 2} ${marginTop + chartHeight + 20})">${r.label}</text>
      `;
    })
    .join("");

  const linePoints = rows
    .map((r, i) => {
      const x = marginLeft + i * barSlot + barSlot / 2;
      const y = yForPercent(r.cumulative);
      return `${x},${y}`;
    })
    .join(" ");

  const dots = rows
    .map((r, i) => {
      const x = marginLeft + i * barSlot + barSlot / 2;
      const y = yForPercent(r.cumulative);
      return `<circle cx="${x}" cy="${y}" r="4" class="pareto-dot" />`;
    })
    .join("");

  const eightyLineY = yForPercent(80);

  return `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="pareto-svg">
      <line x1="${marginLeft}" y1="${marginTop}" x2="${marginLeft}" y2="${marginTop + chartHeight}" class="pareto-axis" />
      <line x1="${marginLeft}" y1="${marginTop + chartHeight}" x2="${width - marginRight}" y2="${marginTop + chartHeight}" class="pareto-axis" />
      <line x1="${marginLeft}" y1="${eightyLineY}" x2="${width - marginRight}" y2="${eightyLineY}" class="pareto-80-line" />
      <text x="${width - marginRight}" y="${eightyLineY - 6}" text-anchor="end" class="pareto-80-label">80%</text>
      ${bars}
      <polyline points="${linePoints}" class="pareto-line" />
      ${dots}
    </svg>
  `;
}
