// frontend/src/utils/risk.js

export function computeRisk(answers) {
  const scores = Object.values(answers).map(v => Number(v)).filter(n => !isNaN(n));

  if (scores.length === 0) {
    return { avg: 0, level: "Sin datos", suggestion: "No se recibieron respuestas válidas.", color: "gris" };
  }

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  const consejos = {
    AP: [
      `Sé que este momento puede sentirse abrumador, pero no estás sola. Tu bienestar es nuestra prioridad y podemos ayudarte a recuperar estabilidad. Por favor, busca apoyo inmediato: contacta a un psicólogo o acude al servicio de emergencia más cercano. Tu vida y tu salud son muy importantes.`,
      `Entiendo que lo que estás viviendo es muy difícil y quiero que sepas que tu vida tiene un gran valor. No enfrentes esto sola. Actúa ahora: comunícate con un profesional de salud mental o llama a los servicios de emergencia. Estamos aquí para apoyarte.`,
      `Lo que sientes es importante y merece atención inmediata. No estás sola en esto; hay personas dispuestas a ayudarte. Por favor, busca ayuda profesional de inmediato o llama a los servicios de emergencia. Tu seguridad y bienestar son lo más importante en este momento.`
    ],
    SA: [
      `Me alegra saber que estás manejando esta situación con cierto control. Eso habla de tu fortaleza y capacidad de afrontamiento. Aun así, no tienes que enfrentarlo solo/a. Considera buscar apoyo profesional para acompañarte en este proceso. Hablar con un psicólogo puede ayudarte a encontrar nuevas herramientas y aliviar la carga emocional.`,
      `Me alegra saber que estás manejando esta situación con cierto control. Eso demuestra tu fortaleza y capacidad de afrontamiento. Aun así, contar con apoyo profesional puede ayudarte a avanzar con más claridad y seguridad. Un psicólogo puede acompañarte en este proceso.`,
      `Es valioso que hayas logrado mantener cierto control sobre lo que estás viviendo; eso refleja tu gran capacidad de afrontamiento. Sin embargo, contar con apoyo profesional puede ayudarte a fortalecer aún más tus recursos emocionales.`
    ],
    SF: [
      `Te felicito sinceramente por cómo has enfrentado esta situación difícil. Reconocerla y actuar con claridad demuestra tu fortaleza emocional. Aun así, contar con apoyo profesional puede ayudarte a seguir avanzando con más seguridad.`,
      `Has demostrado una gran capacidad para enfrentar esta situación difícil. Reconocerla y actuar con claridad es un paso valiente. ¡Confía en ti, y da el siguiente paso hacia tu bienestar!`,
      `Felicitaciones por cómo estás manejando este momento complejo. Tu esfuerzo y claridad son señales de fortaleza. ¡Tu bienestar importa, y cada decisión que tomas te acerca a él!`
    ]
  };

  function randomAdvice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  let level, suggestion, color;

  if (avg < 3) {
    level      = "AP (Atención Profesional)";
    suggestion = randomAdvice(consejos.AP);
    color      = avg < 2 ? "rojo" : "naranja";
  } else if (avg < 4) {
    level      = "SA (Apoyo Profesional)";
    suggestion = randomAdvice(consejos.SA);
    color      = "amarillo";
  } else {
    level      = "SF (Felicitación)";
    suggestion = randomAdvice(consejos.SF);
    color      = avg >= 4.5 ? "verde" : "verde-claro";
  }

  return { avg, level, suggestion, color };
}


// === Envío al backend ===
export async function enviarResultadoBackend(result) {
  try {
    const response = await fetch("http://localhost:8000/resultados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        promedio: parseFloat(result.avg.toFixed(2)),
        nivel:    result.level,
        color:    result.color,
        mensaje:  result.suggestion,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("❌ Error del backend:", err.detail);
    }
  } catch (err) {
    console.error("❌ Error de conexión al backend:", err);
  }
}