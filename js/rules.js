/* ============================================================
   DeciTI · rules.js
   Corazón del sistema: todo el contenido de análisis está
   predefinido aquí. No hay IA, no hay generación aleatoria.
   generateAnalysis(responses) siempre produce el mismo
   resultado para las mismas respuestas.
   ============================================================ */

/* Factor cuya interpretación está INVERTIDA: para "cambios",
   una puntuación alta no significa "buen control de cambios"
   sino "los cambios frecuentes son un problema importante".
   Todos los demás factores siguen la lógica normal:
   puntuación alta = fortaleza / puntuación baja = debilidad. */
const INVERTED_FACTORS = ["cambios"];

/* --------------------------------------------------------------
   Contenido predefinido por factor y puntuación (1-5).
   Cada entrada puede incluir: fortalezas, debilidades,
   oportunidades, amenazas (FODA), rojo, negro, amarillo, verde
   (6 Sombreros — blanco y azul se generan aparte) e ishikawa
   (causas para el diagrama de espina de pescado).
   -------------------------------------------------------------- */
const analysisRules = {

  claridad: {
    1: {
      debilidades: ["Alta ambigüedad en los requerimientos, lo que provoca interpretaciones distintas entre los involucrados."],
      negro: ["Los requerimientos ambiguos incrementan el riesgo de construir funcionalidades que no cumplen lo esperado."],
      rojo: ["La falta de claridad genera inseguridad en el equipo sobre lo que realmente se debe construir."],
      ishikawa: ["Requerimientos ambiguos", "Criterios de aceptación poco definidos"]
    },
    2: {
      debilidades: ["Claridad limitada en los requerimientos, lo que dificulta su interpretación uniforme."],
      negro: ["Persisten dudas puntuales sobre el alcance de algunos requerimientos."],
      ishikawa: ["Interpretaciones diferentes entre los miembros del equipo"]
    },
    3: {
      azul: ["La claridad de los requerimientos se mantiene en un nivel intermedio que conviene reforzar."]
    },
    4: {
      fortalezas: ["Nivel adecuado de claridad en los requerimientos, lo que favorece su comprensión."],
      oportunidades: ["Reforzar la claridad existente puede reducir aún más el riesgo de retrabajo."],
      amarillo: ["Una mayor claridad facilita estimaciones más precisas y reduce el retrabajo."],
      verde: ["Formalizar plantillas de requerimientos para sostener el nivel de claridad alcanzado."]
    },
    5: {
      fortalezas: ["Requerimientos claramente definidos que facilitan la comprensión del alcance por todo el equipo."],
      oportunidades: ["La alta claridad permite anticipar pruebas y criterios de aceptación desde etapas tempranas."],
      amarillo: ["La claridad de los requerimientos reduce significativamente la ambigüedad y el retrabajo."],
      azul: ["Priorizar la claridad de requerimientos como eje central del proyecto."]
    }
  },

  documentacion: {
    1: {
      debilidades: ["Información difícil de consultar por falta de documentación adecuada."],
      negro: ["La dependencia de la comunicación verbal favorece la pérdida de conocimiento del proyecto."],
      rojo: ["El equipo puede sentirse inseguro al no contar con una fuente confiable de consulta."],
      ishikawa: ["Documentación insuficiente", "Conocimiento del proyecto disperso y no registrado"]
    },
    2: {
      debilidades: ["Documentación incompleta que obliga a recurrir frecuentemente a la comunicación verbal."],
      negro: ["Riesgo de pérdida parcial de información relevante para el proyecto."],
      ishikawa: ["Registro incompleto de decisiones y acuerdos"]
    },
    3: {
      azul: ["La documentación existente es funcional pero puede estandarizarse más."]
    },
    4: {
      fortalezas: ["Los requerimientos cuentan con un nivel de documentación adecuado."],
      oportunidades: ["Mayor trazabilidad de los requerimientos a lo largo del ciclo de vida del proyecto."],
      amarillo: ["Una documentación sólida facilita el mantenimiento y la incorporación de nuevos integrantes."],
      verde: ["Centralizar la documentación en un repositorio único y versionado."]
    },
    5: {
      fortalezas: ["Requerimientos documentados de forma sólida, lo que favorece la trazabilidad del proyecto."],
      oportunidades: ["La documentación robusta facilita auditorías, mantenimiento y transferencia de conocimiento."],
      amarillo: ["Una documentación completa reduce la dependencia de personas específicas del equipo."],
      azul: ["Mantener la documentación como activo central de la gestión de requerimientos."]
    }
  },

  cambios: {
    /* Interpretación invertida: puntuación alta = cambios frecuentes (problema) */
    1: {
      fortalezas: ["El alcance del proyecto se percibe como estable, con pocos cambios sobre los requerimientos iniciales."],
      azul: ["El bajo nivel de cambios sobre los requerimientos no representa una prioridad de atención inmediata."]
    },
    2: {
      fortalezas: ["Los cambios en los requerimientos son considerados de baja relevancia para la problemática actual."]
    },
    3: {
      azul: ["El control de cambios se percibe con una relevancia media; conviene mantenerlo bajo observación."]
    },
    4: {
      debilidades: ["Los cambios sobre los requerimientos ocurren con una frecuencia que empieza a afectar la estabilidad del alcance."],
      amenazas: ["Los cambios frecuentes pueden derivar en ampliaciones no controladas del alcance del proyecto."],
      negro: ["Un alcance inestable incrementa el riesgo de retrabajo y de incumplir fechas comprometidas."],
      ishikawa: ["Cambios frecuentes en los requerimientos"]
    },
    5: {
      debilidades: ["Alta frecuencia de cambios en los requerimientos, con un alcance inestable."],
      amenazas: ["Los cambios frecuentes pueden provocar ampliaciones del alcance y retrasos en la entrega."],
      rojo: ["La inestabilidad constante del alcance puede generar frustración y desgaste en el equipo."],
      negro: ["El retrabajo derivado de cambios constantes eleva significativamente el riesgo de retraso."],
      ishikawa: ["Cambios frecuentes en los requerimientos", "Alcance inestable durante el desarrollo"]
    }
  },

  comunicacion: {
    1: {
      debilidades: ["Falta de coordinación entre el cliente y el equipo de desarrollo."],
      negro: ["La información incompleta entre las partes favorece malentendidos sobre el alcance."],
      rojo: ["La falta de comunicación puede generar frustración tanto en el cliente como en el equipo."],
      ishikawa: ["Falta de comunicación entre cliente y equipo", "Canales de comunicación poco definidos"]
    },
    2: {
      debilidades: ["Comunicación limitada entre las partes, con retroalimentación esporádica."],
      ishikawa: ["Retroalimentación tardía por parte del cliente"]
    },
    3: {
      azul: ["La comunicación entre cliente y equipo es funcional pero podría formalizarse más."]
    },
    4: {
      fortalezas: ["Existe una comunicación adecuada entre el cliente y el equipo de desarrollo."],
      oportunidades: ["Fortalecer los canales de comunicación puede mejorar aún más la alineación del proyecto."],
      amarillo: ["Una comunicación efectiva favorece la retroalimentación constante y la alineación de expectativas."],
      verde: ["Establecer reuniones periódicas de seguimiento entre cliente y equipo."]
    },
    5: {
      fortalezas: ["Comunicación efectiva y constante entre el cliente y el equipo de desarrollo."],
      oportunidades: ["La retroalimentación constante permite ajustar el proyecto de forma temprana y precisa."],
      amarillo: ["La buena comunicación reduce malentendidos y mejora la alineación entre las partes."],
      azul: ["Mantener la comunicación como eje de alineación entre cliente y equipo."]
    }
  },

  planificacion: {
    1: {
      debilidades: ["Estimaciones deficientes que dificultan una organización adecuada del proyecto."],
      negro: ["La mala planificación incrementa la dificultad para cumplir las fechas comprometidas."],
      ishikawa: ["Estimaciones poco precisas", "Planificación inicial insuficiente"]
    },
    2: {
      debilidades: ["Planificación limitada, con estimaciones que suelen ajustarse durante el desarrollo."],
      ishikawa: ["Falta de datos históricos para estimar"]
    },
    3: {
      azul: ["La planificación actual es aceptable pero puede volverse más rigurosa."]
    },
    4: {
      fortalezas: ["Existe un nivel adecuado de planificación y estimación en los proyectos."],
      oportunidades: ["Una mejor planificación permite anticipar riesgos y ajustar recursos a tiempo."],
      amarillo: ["Las estimaciones más precisas favorecen un mejor control del cronograma."],
      verde: ["Incorporar estimación colaborativa basada en datos históricos del equipo."]
    },
    5: {
      fortalezas: ["Planificación y estimación sólidas que favorecen el control del proyecto."],
      oportunidades: ["La planificación robusta permite anticipar desviaciones antes de que se conviertan en retrasos."],
      amarillo: ["Una planificación precisa mejora la confiabilidad de las fechas comprometidas con el cliente."],
      azul: ["Priorizar la planificación como base del control del proyecto."]
    }
  },

  metodologia: {
    1: {
      debilidades: ["Procesos de desarrollo poco estructurados, sin una metodología clara."],
      negro: ["La falta de metodología dificulta el seguimiento consistente del proyecto."],
      ishikawa: ["Procesos poco estructurados", "Ausencia de una metodología formal"]
    },
    2: {
      debilidades: ["Metodología aplicada de forma parcial o inconsistente entre equipos."],
      ishikawa: ["Falta de seguimiento metodológico"]
    },
    3: {
      azul: ["La metodología actual es funcional pero podría formalizarse mejor."]
    },
    4: {
      fortalezas: ["Se cuenta con una metodología de desarrollo relativamente definida."],
      oportunidades: ["Formalizar aún más la metodología puede mejorar la consistencia entre equipos."],
      amarillo: ["Una metodología definida aporta mayor consistencia y control al proyecto."],
      verde: ["Adoptar ceremonias y artefactos ágiles adecuados al tamaño del equipo."]
    },
    5: {
      fortalezas: ["Metodología de desarrollo bien definida y aplicada de forma consistente."],
      oportunidades: ["Una metodología sólida facilita la incorporación de nuevos integrantes al proyecto."],
      amarillo: ["Los procesos definidos mejoran el control y la previsibilidad del desarrollo."],
      azul: ["Mantener la metodología como marco de referencia para todo el equipo."]
    }
  },

  capacitacion: {
    1: {
      debilidades: ["Falta de conocimientos técnicos suficientes para gestionar los requerimientos."],
      negro: ["Las dificultades técnicas del equipo incrementan el riesgo de errores en el desarrollo."],
      ishikawa: ["Falta de capacitación técnica del equipo", "Curva de aprendizaje elevada"]
    },
    2: {
      debilidades: ["Capacitación limitada del equipo en prácticas de gestión de requerimientos."],
      ishikawa: ["Conocimiento desigual entre los miembros del equipo"]
    },
    3: {
      azul: ["El nivel de capacitación del equipo es adecuado pero puede reforzarse."]
    },
    4: {
      fortalezas: ["El equipo cuenta con una preparación adecuada para gestionar los requerimientos."],
      oportunidades: ["Fortalecer la capacitación puede mejorar aún más la capacidad técnica del equipo."],
      amarillo: ["Un equipo mejor preparado comete menos errores y resuelve problemas con mayor autonomía."],
      verde: ["Diseñar un plan de capacitación continua para el equipo."]
    },
    5: {
      fortalezas: ["Personal bien preparado, con alta capacidad para gestionar los requerimientos del proyecto."],
      oportunidades: ["La capacitación sólida del equipo permite absorber cambios y nuevas tecnologías con mayor rapidez."],
      amarillo: ["Un equipo altamente capacitado reduce errores y mejora la calidad del software."],
      azul: ["Mantener la capacitación continua como inversión prioritaria del equipo."]
    }
  },

  herramientas: {
    1: {
      debilidades: ["Uso insuficiente de herramientas tecnológicas para gestionar los requerimientos."],
      negro: ["La falta de herramientas adecuadas dificulta organizar y trazar la información del proyecto."],
      ishikawa: ["Herramientas insuficientes para gestionar requerimientos", "Falta de trazabilidad tecnológica"]
    },
    2: {
      debilidades: ["Herramientas utilizadas de forma parcial, sin aprovechar todo su potencial."],
      ishikawa: ["Uso disperso de herramientas sin estandarizar"]
    },
    3: {
      azul: ["Las herramientas actuales son suficientes pero podrían aprovecharse mejor."]
    },
    4: {
      fortalezas: ["Se utilizan herramientas tecnológicas adecuadas para gestionar los requerimientos."],
      oportunidades: ["Ampliar el uso de estas herramientas puede centralizar aún más la información del proyecto."],
      amarillo: ["Las herramientas adecuadas mejoran la trazabilidad y la organización de la información."],
      verde: ["Integrar las herramientas de gestión de requerimientos con el resto del flujo de trabajo."]
    },
    5: {
      fortalezas: ["Uso consolidado de herramientas especializadas para la gestión de requerimientos."],
      oportunidades: ["La centralización de la información mediante herramientas facilita la trazabilidad completa del proyecto."],
      amarillo: ["Las herramientas especializadas mejoran significativamente la gestión y el control de la información."],
      azul: ["Mantener y actualizar las herramientas como soporte central de la gestión de requerimientos."]
    }
  },

  pruebas: {
    1: {
      debilidades: ["Errores detectados de forma tardía por falta de un proceso sólido de pruebas."],
      negro: ["Los problemas de calidad detectados tarde incrementan considerablemente el retrabajo."],
      ishikawa: ["Detección tardía de errores", "Ausencia de criterios de aceptación verificables"]
    },
    2: {
      debilidades: ["Pruebas aplicadas de forma parcial, sin cobertura suficiente sobre los requerimientos."],
      ishikawa: ["Cobertura de pruebas insuficiente"]
    },
    3: {
      azul: ["El control de calidad actual es aceptable pero puede formalizarse más."]
    },
    4: {
      fortalezas: ["Existe un proceso de pruebas que permite detectar errores en etapas razonablemente tempranas."],
      oportunidades: ["Reforzar las pruebas tempranas puede reducir aún más el retrabajo posterior."],
      amarillo: ["La detección temprana de errores mejora la calidad general del software entregado."],
      verde: ["Incorporar pruebas automatizadas ligadas a los criterios de aceptación."]
    },
    5: {
      fortalezas: ["Proceso sólido de pruebas y control de calidad, con detección temprana de errores."],
      oportunidades: ["La calidad temprana reduce el retrabajo y mejora la confianza del cliente en las entregas."],
      amarillo: ["Un control de calidad robusto disminuye significativamente el retrabajo y los defectos."],
      azul: ["Priorizar el control de calidad como parte integral del ciclo de desarrollo."]
    }
  },

  seguimiento: {
    1: {
      debilidades: ["Los problemas del proyecto son difíciles de detectar por falta de seguimiento."],
      negro: ["La falta de control incrementa el riesgo de que las desviaciones se detecten demasiado tarde."],
      ishikawa: ["Falta de seguimiento y control del proyecto", "Indicadores de avance inexistentes"]
    },
    2: {
      debilidades: ["Seguimiento aplicado de forma irregular, sin indicadores consistentes."],
      ishikawa: ["Revisión poco frecuente del avance del proyecto"]
    },
    3: {
      azul: ["El seguimiento actual es funcional pero puede volverse más sistemático."]
    },
    4: {
      fortalezas: ["Existe un seguimiento adecuado que permite dar visibilidad al avance del proyecto."],
      oportunidades: ["Fortalecer los indicadores de seguimiento puede anticipar desviaciones con más antelación."],
      amarillo: ["Un buen seguimiento permite detectar desviaciones antes de que afecten las fechas de entrega."],
      verde: ["Implementar tableros de seguimiento con indicadores de avance visibles para todo el equipo."]
    },
    5: {
      fortalezas: ["Seguimiento y control sólidos, con alta visibilidad sobre el avance del proyecto."],
      oportunidades: ["La visibilidad temprana de desviaciones permite tomar acciones correctivas oportunas."],
      amarillo: ["El control riguroso del avance mejora sustancialmente el cumplimiento de fechas de entrega."],
      azul: ["Mantener el seguimiento como mecanismo central de control del proyecto."]
    }
  }
};

/* --------------------------------------------------------------
   Reglas de combinación entre factores.
   Cada regla evalúa las respuestas completas y, si se cumple su
   condición, aporta un texto adicional a la síntesis del análisis.
   -------------------------------------------------------------- */
const combinationRules = [
  {
    id: "claridad-documentacion",
    condition: (r) => r.claridad >= 4 && r.documentacion >= 4,
    text: "La claridad y la documentación de los requerimientos representan un eje prioritario para reducir ambigüedades y retrabajo."
  },
  {
    id: "comunicacion-cambios",
    condition: (r) => r.comunicacion >= 4 && r.cambios >= 4,
    text: "La comunicación y el control de cambios son fundamentales para evitar modificaciones no controladas del alcance."
  },
  {
    id: "planificacion-seguimiento",
    condition: (r) => r.planificacion >= 4 && r.seguimiento >= 4,
    text: "La planificación y el seguimiento permiten detectar desviaciones antes de que afecten las fechas de entrega."
  },
  {
    id: "pruebas-claridad",
    condition: (r) => r.pruebas >= 4 && r.claridad >= 4,
    text: "La claridad de los requerimientos facilita la definición de pruebas y criterios de aceptación."
  },
  {
    id: "herramientas-documentacion",
    condition: (r) => r.herramientas >= 4 && r.documentacion >= 4,
    text: "El uso de herramientas adecuadas junto con una documentación sólida favorece la trazabilidad completa de los requerimientos."
  },
  {
    id: "capacitacion-metodologia",
    condition: (r) => r.capacitacion >= 4 && r.metodologia >= 4,
    text: "Un equipo capacitado dentro de una metodología definida logra procesos más consistentes y predecibles."
  },
  {
    id: "cambios-planificacion-debil",
    condition: (r) => r.cambios >= 4 && r.planificacion <= 2,
    text: "Los cambios frecuentes combinados con una planificación débil elevan considerablemente el riesgo de incumplir fechas de entrega."
  },
  {
    id: "claridad-comunicacion-debiles",
    condition: (r) => r.claridad <= 2 && r.comunicacion <= 2,
    text: "La baja claridad de los requerimientos junto con una comunicación limitada agrava la probabilidad de malentendidos entre cliente y equipo."
  },
  {
    id: "seguimiento-cambios",
    condition: (r) => r.seguimiento >= 4 && r.cambios >= 4,
    text: "Un seguimiento riguroso resulta especialmente valioso cuando el proyecto enfrenta cambios frecuentes en los requerimientos."
  },
  {
    id: "pruebas-metodologia-debiles",
    condition: (r) => r.pruebas <= 2 && r.metodologia <= 2,
    text: "La falta de un proceso de pruebas junto con una metodología poco estructurada aumenta el riesgo de defectos no detectados a tiempo."
  },
  {
    id: "herramientas-seguimiento",
    condition: (r) => r.herramientas >= 4 && r.seguimiento >= 4,
    text: "Las herramientas tecnológicas adecuadas potencian la efectividad del seguimiento y control del proyecto."
  },
  {
    id: "capacitacion-documentacion-debiles",
    condition: (r) => r.capacitacion <= 2 && r.documentacion <= 2,
    text: "La combinación de baja capacitación y documentación insuficiente dificulta que el equipo resuelva dudas de forma autónoma."
  }
];

/* --------------------------------------------------------------
   Utilidades del motor
   -------------------------------------------------------------- */

/* Elimina duplicados preservando el primer orden de aparición */
function dedupe(list) {
  const seen = new Set();
  const result = [];
  for (const item of list) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}

/* Determina si, para el factor dado, la puntuación debe leerse
   como "positiva" (fortaleza) o "negativa" (debilidad),
   respetando la inversión de "cambios". */
function isPositiveScore(factor, score) {
  if (INVERTED_FACTORS.includes(factor)) {
    return score <= 2;
  }
  return score >= 4;
}

function getFactorLabel(factor) {
  return FACTOR_META[factor] ? FACTOR_META[factor].label : factor;
}

/* --------------------------------------------------------------
   Cálculo de prioridades (sección 9 del brief)
   -------------------------------------------------------------- */
function computePriorities(responses) {
  const entries = FACTOR_ORDER.map((factor) => ({
    factor,
    label: getFactorLabel(factor),
    score: responses[factor]
  }));

  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const priorityFactor = sorted[0];
  const critical = entries.filter((e) => e.score >= 4).sort((a, b) => b.score - a.score);
  const low = entries.filter((e) => e.score <= 2).sort((a, b) => a.score - b.score);
  const moderate = entries.filter((e) => e.score === 3);
  const average = entries.reduce((sum, e) => sum + e.score, 0) / entries.length;

  return { entries, sorted, priorityFactor, critical, low, moderate, average };
}

/* --------------------------------------------------------------
   FODA
   -------------------------------------------------------------- */
function buildFoda(responses, priorities) {
  const foda = { fortalezas: [], oportunidades: [], debilidades: [], amenazas: [] };

  FACTOR_ORDER.forEach((factor) => {
    const score = responses[factor];
    const rule = analysisRules[factor] && analysisRules[factor][score];
    if (!rule) return;
    ["fortalezas", "oportunidades", "debilidades", "amenazas"].forEach((quad) => {
      if (rule[quad]) foda[quad].push(...rule[quad]);
    });
  });

  ["fortalezas", "oportunidades", "debilidades", "amenazas"].forEach((quad) => {
    foda[quad] = dedupe(foda[quad]);
  });

  fillFodaGaps(foda, priorities);

  return foda;
}

/* Garantiza que ningún cuadrante del FODA quede vacío. Si las
   reglas por factor no aportaron contenido a un cuadrante, se
   agrega una observación construida a partir de los datos reales
   de prioridad (nunca un mensaje de "sin datos"). */
function fillFodaGaps(foda, priorities) {
  const top = priorities.sorted[0];
  const bottom = priorities.sorted[priorities.sorted.length - 1];
  const topThree = priorities.sorted.slice(0, 3).map((e) => e.label).join(", ");
  const bottomThree = priorities.sorted.slice(-3).map((e) => e.label).join(", ");

  if (foda.fortalezas.length === 0) {
    foda.fortalezas.push(
      `El factor con mayor prioridad relativa, "${top.label}" (puntuación ${top.score}), es el que ofrece la mejor base para consolidarse como fortaleza dentro de la gestión de requerimientos.`
    );
  }
  if (foda.debilidades.length === 0) {
    foda.debilidades.push(
      `El factor con menor prioridad relativa, "${bottom.label}" (puntuación ${bottom.score}), es el que presenta mayor margen de mejora dentro de la gestión de requerimientos.`
    );
  }
  if (foda.oportunidades.length === 0) {
    foda.oportunidades.push(
      `Consolidar los avances en ${topThree} representa una oportunidad para impulsar mejoras en el resto de los factores evaluados.`
    );
  }
  if (foda.amenazas.length === 0) {
    foda.amenazas.push(
      `Descuidar los factores con menor prioridad relativa (${bottomThree}) podría convertirse en un obstáculo adicional para reducir los retrasos del proyecto.`
    );
  }
}

/* --------------------------------------------------------------
   6 Sombreros para pensar
   -------------------------------------------------------------- */
function buildHats(responses, priorities) {
  const hats = { blanco: [], rojo: [], negro: [], amarillo: [], verde: [], azul: [] };

  /* Blanco: hechos objetivos, generados a partir de las respuestas */
  FACTOR_ORDER.forEach((factor) => {
    const score = responses[factor];
    const scaleLabel = SCALE.find((s) => s.value === score).label;
    hats.blanco.push(
      `El factor "${getFactorLabel(factor)}" recibió una puntuación de ${score} (${scaleLabel.toLowerCase()}).`
    );
  });
  hats.blanco.push(
    `El promedio general de importancia asignado a los 10 factores es de ${priorities.average.toFixed(1)} sobre 5.`
  );

  FACTOR_ORDER.forEach((factor) => {
    const score = responses[factor];
    const rule = analysisRules[factor] && analysisRules[factor][score];
    if (!rule) return;
    ["rojo", "negro", "amarillo", "verde", "azul"].forEach((hat) => {
      if (rule[hat]) hats[hat].push(...rule[hat]);
    });
  });

  /* Azul: síntesis final basada en el factor prioritario y los críticos */
  hats.azul.push(
    `El factor con mayor prioridad es "${priorities.priorityFactor.label}", con una puntuación de ${priorities.priorityFactor.score}.`
  );
  if (priorities.critical.length > 0) {
    hats.azul.push(
      `Se recomienda concentrar los esfuerzos iniciales en: ${priorities.critical.map((c) => c.label).join(", ")}.`
    );
  }

  Object.keys(hats).forEach((hat) => {
    hats[hat] = dedupe(hats[hat]);
  });

  fillHatsGaps(hats, priorities);

  return hats;
}

/* Garantiza que ninguna de las seis perspectivas quede vacía.
   Si ningún factor aportó contenido a un sombrero, se agrega una
   observación construida a partir de los datos reales de
   prioridad (nunca un mensaje de "sin datos"). Blanco y Azul
   siempre tienen contenido por construcción y no requieren relleno. */
function fillHatsGaps(hats, priorities) {
  const top = priorities.sorted[0];
  const topThree = priorities.sorted.slice(0, 3).map((e) => e.label).join(", ");
  const bottomThree = priorities.sorted.slice(-3).map((e) => e.label).join(", ");

  if (hats.rojo.length === 0) {
    hats.rojo.push(
      "El equipo puede experimentar cierta incertidumbre mientras la gestión de requerimientos no alcance un nivel homogéneo de madurez en todos los factores evaluados."
    );
  }
  if (hats.negro.length === 0) {
    hats.negro.push(
      `Existe el riesgo de que los factores con menor prioridad relativa (${bottomThree}) se descuiden y terminen afectando el cumplimiento de las fechas de entrega.`
    );
  }
  if (hats.amarillo.length === 0) {
    hats.amarillo.push(
      `Fortalecer el factor mejor valorado, "${top.label}", puede generar beneficios que se extiendan al resto de la gestión de requerimientos.`
    );
  }
  if (hats.verde.length === 0) {
    hats.verde.push(
      `Diseñar un plan de acción que priorice ${topThree} puede convertirse en el punto de partida para reducir los retrasos del proyecto.`
    );
  }
}

/* --------------------------------------------------------------
   Ishikawa: causas agrupadas por categoría
   -------------------------------------------------------------- */
function buildIshikawa(responses) {
  const categories = {};
  FACTOR_ORDER.forEach((factor) => {
    const cat = FACTOR_META[factor].ishikawaCategory;
    if (!categories[cat]) categories[cat] = [];
  });

  FACTOR_ORDER.forEach((factor) => {
    const score = responses[factor];
    const rule = analysisRules[factor] && analysisRules[factor][score];
    const cat = FACTOR_META[factor].ishikawaCategory;
    if (rule && rule.ishikawa) {
      categories[cat].push(...rule.ishikawa);
    }
  });

  Object.keys(categories).forEach((cat) => {
    categories[cat] = dedupe(categories[cat]);
    if (categories[cat].length === 0) {
      categories[cat].push("Sin causas relevantes detectadas para esta categoría.");
    }
  });

  return {
    problem: "Retrasos en el desarrollo y entrega de proyectos de software",
    categories
  };
}

/* --------------------------------------------------------------
   Pareto: se calcula por completo en pareto.js a partir de
   responses; aquí solo se preparan los datos base.
   -------------------------------------------------------------- */
function buildParetoData(responses) {
  return FACTOR_ORDER.map((factor) => ({
    factor,
    label: getFactorLabel(factor),
    value: responses[factor]
  }));
}

/* --------------------------------------------------------------
   CATWDA
   -------------------------------------------------------------- */
function buildCatwda(responses, priorities) {
  const topLabels = priorities.sorted.slice(0, 3).map((e) => e.label);
  const lowLabels = priorities.low.map((e) => e.label);

  const clientes = [
    "Clientes y usuarios finales del software desarrollado.",
    "Product Owner o representante funcional del cliente.",
    "Áreas solicitantes internas que definen los requerimientos."
  ];

  const actores = [
    "Desarrolladores responsables de construir las funcionalidades.",
    "Analistas encargados de levantar y depurar los requerimientos.",
    "Project Manager a cargo de la planificación y el seguimiento.",
    "Testers responsables del control de calidad.",
    "Cliente, como fuente y validador de los requerimientos."
  ];

  const transformacion = {
    actual: "Requerimientos gestionados de forma inconsistente, con " +
      (lowLabels.length > 0 ? `debilidades en: ${lowLabels.join(", ")}.` : "algunas áreas de mejora identificadas."),
    problema: PROBLEM_STATEMENT,
    deseada: "Requerimientos gestionados de forma clara, documentada y trazable, priorizando " +
      `${topLabels.join(", ")}, con retrasos minimizados en el desarrollo y la entrega.`
  };

  const weltanschauung =
    "Una gestión adecuada de los requerimientos es la base que permite alinear las expectativas del cliente " +
    "con la capacidad de entrega del equipo; sin ella, cualquier mejora aislada en procesos o herramientas " +
    "tiene un impacto limitado sobre los retrasos del proyecto.";

  const duenos = [
    "Dirección general de la organización, interesada en la entrega oportuna de valor.",
    "Líder o responsable del proyecto, encargado de tomar decisiones sobre el alcance.",
    "La organización como responsable última de los compromisos con el cliente."
  ];

  const ambiente = [
    "Presupuesto disponible para el proyecto.",
    "Tiempo y fechas comprometidas con el cliente.",
    "Cambios solicitados por el cliente durante el desarrollo.",
    "Disponibilidad de recursos humanos y técnicos.",
    "Tecnología y herramientas disponibles para el equipo."
  ];

  return { clientes, actores, transformacion, weltanschauung, duenos, ambiente };
}

/* --------------------------------------------------------------
   Recomendaciones prioritarias (sección 31)
   -------------------------------------------------------------- */
function buildRecommendations(priorities) {
  const ranked = priorities.sorted.filter((e) => e.score >= 3);
  const source = ranked.length >= 3 ? ranked : priorities.sorted;
  const chosen = source.slice(0, 5).slice(0, Math.max(3, Math.min(5, source.length)));

  return chosen.map((entry) => FACTOR_META[entry.factor].recommendation);
}

/* --------------------------------------------------------------
   Resumen general (sección 11)
   -------------------------------------------------------------- */
function buildSummary(responses, priorities, combinations) {
  let interpretation;
  if (priorities.average >= 4) {
    interpretation =
      "En general, el equipo considera que la gran mayoría de los factores relacionados con la gestión de " +
      "requerimientos son determinantes para resolver los retrasos del proyecto. Se recomienda una intervención " +
      "amplia y simultánea sobre varios frentes.";
  } else if (priorities.average >= 3) {
    interpretation =
      "El equipo identifica un grupo relevante de factores importantes para resolver la problemática, " +
      "conviviendo con otros de menor prioridad. Conviene concentrar los esfuerzos en los factores críticos " +
      "antes de abordar el resto.";
  } else {
    interpretation =
      "El equipo percibe que, en general, los factores evaluados tienen una relevancia baja o moderada para " +
      "resolver la problemática, lo cual sugiere revisar si existen causas no contempladas en este análisis.";
  }

  return {
    problem: PROBLEM_STATEMENT,
    average: priorities.average,
    priorityFactor: priorities.priorityFactor,
    critical: priorities.critical,
    low: priorities.low,
    moderate: priorities.moderate,
    interpretation,
    combinations,
    recommendations: buildRecommendations(priorities)
  };
}

/* --------------------------------------------------------------
   Motor principal
   -------------------------------------------------------------- */
function generateAnalysis(responses) {
  const priorities = computePriorities(responses);

  const combinations = dedupe(
    combinationRules.filter((rule) => rule.condition(responses)).map((rule) => rule.text)
  );

  const summary = buildSummary(responses, priorities, combinations);
  const foda = buildFoda(responses, priorities);
  const hats = buildHats(responses, priorities);
  const ishikawa = buildIshikawa(responses);
  const pareto = buildParetoData(responses);
  const catwda = buildCatwda(responses, priorities);

  return { summary, foda, hats, ishikawa, pareto, catwda };
}
