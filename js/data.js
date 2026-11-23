/* ============================================================
   DeciTI · data.js
   Datos fijos de la aplicación: problemática, preguntas,
   escala de respuesta, metadatos de factores y estado inicial.
   No contiene lógica de análisis (ver rules.js).
   ============================================================ */

const PROBLEM_STATEMENT =
  "Retrasos en el desarrollo y entrega de proyectos de software debido a una mala gestión de requerimientos.";

/* Escala fija utilizada en las 10 preguntas */
const SCALE = [
  { value: 1, label: "Nada importante" },
  { value: 2, label: "Poco importante" },
  { value: 3, label: "Moderadamente importante" },
  { value: 4, label: "Muy importante" },
  { value: 5, label: "Extremadamente importante" }
];

/* Metadatos de cada factor: etiqueta visible, categoría de Ishikawa
   a la que pertenece y recomendación canónica asociada al factor. */
const FACTOR_META = {
  claridad: {
    label: "Claridad de requerimientos",
    ishikawaCategory: "Requerimientos",
    recommendation:
      "Establecer criterios claros de aceptación y una definición de \u201cterminado\u201d para cada requerimiento."
  },
  documentacion: {
    label: "Documentación de requerimientos",
    ishikawaCategory: "Requerimientos",
    recommendation:
      "Estandarizar plantillas de documentación y centralizar los requerimientos en un repositorio único."
  },
  cambios: {
    label: "Control de cambios",
    ishikawaCategory: "Requerimientos",
    recommendation:
      "Implementar un proceso formal de control de cambios con evaluación de impacto antes de aprobar modificaciones."
  },
  comunicacion: {
    label: "Comunicación cliente-equipo",
    ishikawaCategory: "Comunicación",
    recommendation:
      "Establecer reuniones periódicas de seguimiento entre el cliente y el equipo de desarrollo."
  },
  planificacion: {
    label: "Planificación y estimación",
    ishikawaCategory: "Procesos",
    recommendation:
      "Adoptar técnicas de estimación colaborativa y planificación incremental basadas en datos históricos."
  },
  metodologia: {
    label: "Metodología de desarrollo",
    ishikawaCategory: "Procesos",
    recommendation:
      "Formalizar una metodología de desarrollo (ágil o híbrida) adecuada al contexto del proyecto."
  },
  capacitacion: {
    label: "Capacitación del equipo",
    ishikawaCategory: "Equipo",
    recommendation:
      "Diseñar un plan de capacitación continua en gestión de requerimientos y prácticas de ingeniería."
  },
  herramientas: {
    label: "Herramientas tecnológicas",
    ishikawaCategory: "Herramientas",
    recommendation:
      "Adoptar herramientas especializadas de gestión de requerimientos con trazabilidad integrada."
  },
  pruebas: {
    label: "Pruebas y control de calidad",
    ishikawaCategory: "Calidad",
    recommendation:
      "Reforzar las pruebas tempranas y ligar cada requerimiento a criterios de aceptación verificables."
  },
  seguimiento: {
    label: "Seguimiento y control de proyectos",
    ishikawaCategory: "Procesos",
    recommendation:
      "Implementar tableros de seguimiento con indicadores de avance y alertas tempranas de desviación."
  }
};

/* Orden fijo de factores (define el orden de preguntas y de las
   categorías de Ishikawa) */
const FACTOR_ORDER = [
  "claridad",
  "documentacion",
  "cambios",
  "comunicacion",
  "planificacion",
  "metodologia",
  "capacitacion",
  "herramientas",
  "pruebas",
  "seguimiento"
];

/* Las 10 preguntas fijas */
const QUESTIONS = [
  {
    number: 1,
    factor: "claridad",
    text: "¿Qué tan importante es mejorar la claridad de los requerimientos para resolver la problemática?"
  },
  {
    number: 2,
    factor: "documentacion",
    text: "¿Qué tan importante es mejorar la documentación de los requerimientos para resolver la problemática?"
  },
  {
    number: 3,
    factor: "cambios",
    text: "¿Qué tan importante es reducir los cambios constantes en los requerimientos para resolver la problemática?"
  },
  {
    number: 4,
    factor: "comunicacion",
    text: "¿Qué tan importante es mejorar la comunicación entre el cliente y el equipo de desarrollo para resolver la problemática?"
  },
  {
    number: 5,
    factor: "planificacion",
    text: "¿Qué tan importante es mejorar la planificación y estimación de los proyectos para resolver la problemática?"
  },
  {
    number: 6,
    factor: "metodologia",
    text: "¿Qué tan importante es implementar una metodología adecuada de desarrollo para resolver la problemática?"
  },
  {
    number: 7,
    factor: "capacitacion",
    text: "¿Qué tan importante es mejorar la capacitación del equipo de desarrollo para resolver la problemática?"
  },
  {
    number: 8,
    factor: "herramientas",
    text: "¿Qué tan importante es utilizar herramientas tecnológicas adecuadas para gestionar los requerimientos para resolver la problemática?"
  },
  {
    number: 9,
    factor: "pruebas",
    text: "¿Qué tan importante es mejorar las pruebas y el control de calidad del software para resolver la problemática?"
  },
  {
    number: 10,
    factor: "seguimiento",
    text: "¿Qué tan importante es mejorar el seguimiento y control de los proyectos para resolver la problemática?"
  }
];

/* Pasos del formulario: 5 pasos de 2 preguntas cada uno */
const FORM_STEPS = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
  [9, 10]
];

/* Respuestas de ejemplo (botón "Cargar ejemplo") */
const EXAMPLE_RESPONSES = {
  claridad: 5,
  documentacion: 5,
  cambios: 5,
  comunicacion: 3,
  planificacion: 2,
  metodologia: 4,
  capacitacion: 3,
  herramientas: 4,
  pruebas: 2,
  seguimiento: 4
};

/* Claves usadas en LocalStorage */
const STORAGE_KEYS = {
  responses: "deciti_responses",
  analysis: "deciti_analysis",
  screen: "deciti_screen"
};

/* Estado inicial de la aplicación */
function createInitialState() {
  return {
    responses: {},
    analysis: null,
    screen: "welcome" /* welcome | form | dashboard */,
    dashboardSection: "resumen",
    formStep: 0
  };
}
