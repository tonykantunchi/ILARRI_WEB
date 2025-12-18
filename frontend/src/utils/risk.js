// src/utils/risk.js

export function computeRisk(answers) {
  const scores = Object.values(answers).map(v => Number(v)).filter(n => !isNaN(n));
  if (scores.length === 0) {
    return {
      avg: 0,
      level: "Sin datos",
      suggestion: "No se recibieron respuestas válidas."
    };
  }

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  let level = "";
  let suggestion = "";

  const consejos = {
    AP: [
      `Sé que este momento puede sentirse abrumador, pero no estás sola. Tu bienestar es nuestra prioridad y podemos ayudarte a recuperar estabilidad. Por favor, busca apoyo inmediato: contacta a un psicólogo o acude al servicio de emergencia más cercano. Tu vida y tu salud son muy importantes.`,
      `Entiendo que lo que estás viviendo es muy difícil y quiero que sepas que tu vida tiene un gran valor. No enfrentes esto sola. Actúa ahora: comunícate con un profesional de salud mental o llama a los servicios de emergencia. Estamos aquí para apoyarte.`,
      `Lo que sientes es importante y merece atención inmediata. No estás sola en esto; hay personas dispuestas a ayudarte. Por favor, busca ayuda profesional de inmediato o llama a los servicios de emergencia. Tu seguridad y bienestar son lo más importante en este momento.`
    ],
    SA: [
      `Me alegra saber que estás manejando esta situación con cierto control. Eso habla de tu fortaleza y capacidad de afrontamiento. Aun así, no tienes que enfrentarlo solo/a. Considera buscar apoyo profesional para acompañarte en este proceso. Hablar con un psicólogo puede ayudarte a encontrar nuevas herramientas y aliviar la carga emocional. Da el siguiente paso: pedir ayuda también es una forma de cuidarte. ¡Tu bienestar importa!`,
      `Me alegra saber que estás manejando esta situación con cierto control. Eso demuestra tu fortaleza y capacidad de afrontamiento. Aun así, contar con apoyo profesional puede ayudarte a avanzar con más claridad y seguridad. Un psicólogo puede acompañarte en este proceso. Recuerda: cada paso que das es una victoria hacia tu bienestar. No lo postergues, da el siguiente paso y busca el acompañamiento que mereces. Tu bienestar emocional es prioridad.`,
      `Es valioso que hayas logrado mantener cierto control sobre lo que estás viviendo; eso refleja tu gran capacidad de afrontamiento. Sin embargo, contar con apoyo profesional puede ayudarte a fortalecer aún más tus recursos emocionales. Un psicólogo puede acompañarte en este proceso y brindarte herramientas para avanzar con mayor seguridad. Da el siguiente paso hacia tu bienestar: agenda una cita hoy mismo y comienza a construir la vida que deseas.`
    ],
    SF: [
      `Te felicito sinceramente por cómo has enfrentado esta situación difícil. Reconocerla y actuar con claridad demuestra tu fortaleza emocional. Aun así, contar con apoyo profesional puede ayudarte a seguir avanzando con más seguridad. Considera hablar con un psicólogo para acompañarte en este proceso. Recuerda: cada paso que das te acerca a tu bienestar. ¡No estás solo/a, da el siguiente paso!`,
      `Has demostrado una gran capacidad para enfrentar esta situación difícil. Reconocerla y actuar con claridad es un paso valiente. Aun así, contar con apoyo profesional puede ayudarte a fortalecer tus recursos emocionales. Hablar con un psicólogo puede marcar la diferencia. ¡Confía en ti, y da el siguiente paso hacia tu bienestar!`,
      `Felicitaciones por cómo estás manejando este momento complejo. Tu esfuerzo y claridad son señales de fortaleza. Si lo consideras, buscar acompañamiento profesional puede ayudarte a avanzar con más seguridad. Un psicólogo puede orientarte en este proceso. ¡Tu bienestar importa, y cada decisión que tomas te acerca a él!`
    ]
  };

  function randomAdvice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

 if (avg < 3) {
    level = "AP (Atención Profesional)";
    suggestion = randomAdvice(consejos.AP);
  } else if (avg >= 3 && avg < 4) {
    level = "SA (Apoyo Profesional)";
    suggestion = randomAdvice(consejos.SA);
  } else {
    level = "SF (Felicitación)";
    suggestion = randomAdvice(consejos.SF);
  }
  return { avg, level, suggestion };

}

// === Envío automático al backend ===
export async function enviarResultadoBackend(result) {
  try {
    await fetch("http://localhost:8000/resultados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        promedio: result.avg,
        nivel: result.level,
        color:
          result.avg < 3 ? "rojo" :
          result.avg < 4 ? "amarillo" : "verde",
        mensaje: result.suggestion
      }),
    });
  } catch (err) {
    console.error("❌ Error al enviar resultado:", err);
  }
}
