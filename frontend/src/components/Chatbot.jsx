import { useState } from "react";
import questions from "../data/questions";
import { computeRisk, enviarResultadoBackend } from "../utils/risk";

export default function Chatbot() {
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState({});
  const [mensajes, setMensajes] = useState([
    {
      tipo: "bot",
      texto:
        "👋 Hola, soy Ilarri. Estoy aquí para acompañarte. Responde unas preguntas y juntos veremos cómo te encuentras.",
    },
    { tipo: "bot", texto: questions[0].text },
  ]);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  const q = questions[cursor];

  const handleAnswer = (value, textoRespuesta) => {
    const nuevasRespuestas = { ...answers, [q.id]: value };
    setAnswers(nuevasRespuestas);

    const nuevosMensajes = [...mensajes, { tipo: "user", texto: textoRespuesta }];

    if (cursor + 1 < questions.length) {
      nuevosMensajes.push({ tipo: "bot", texto: questions[cursor + 1].text });
      setCursor(cursor + 1);
    } else {
      const r = computeRisk(nuevasRespuestas);
      setResult(r);
      setFinished(true);
      enviarResultadoBackend(r); // <--- envía al backend automáticamente
      nuevosMensajes.push({
        tipo: "bot",
        texto: "✅ Hemos terminado, aquí tienes tus resultados:",
      });
    }

    setMensajes(nuevosMensajes);
  };

  const getColor = (avg) => {
    if (avg < 2) return "#ef4444";
    if (avg >= 2 && avg < 3) return "#f97316";
    if (avg >= 3 && avg < 4) return "#facc15";
    if (avg >= 4 && avg < 4.5) return "#86efac";
    if (avg >= 4.5) return "#22c55e";
    return "#9ca3af";
  };

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-8 bg-[#fff8f2] border border-[#f0d6b8]/70 rounded-3xl shadow-lg max-w-3xl mx-auto min-h-[70vh] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/60 via-transparent to-transparent pointer-events-none rounded-3xl" />

      {mensajes.map((m, i) => (
        <div
          key={i}
          className={`px-4 py-3 sm:px-5 sm:py-3 rounded-2xl max-w-[85%] text-sm sm:text-base leading-relaxed backdrop-blur-sm relative z-10 ${
            m.tipo === "bot"
              ? "self-start bg-[#fde7d3] text-[#0f172a] shadow-sm border border-[#f3d4b6]/60"
              : "self-end bg-[#dbeafe] text-[#0f172a] shadow-sm border border-[#bfd7f8]/70"
          }`}
        >
          {m.texto}
        </div>
      ))}

      {!finished && (
        <div className="flex flex-wrap justify-center gap-3 mt-4 relative z-10">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx + 1, opt)}
              className="bg-gradient-to-r from-[#2251e7]/90 to-[#1f46c7] hover:from-[#1f46c7] hover:to-[#193aab] text-white font-medium py-2.5 px-5 rounded-full shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {finished && result && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-inner mt-6 text-center border border-[#f0d6b8]/70 relative z-10">
          <h3 className="text-2xl font-bold text-[#0f172a] mb-4">📊 Resultados</h3>
          <p className="text-[#0f172a]/80 mb-2 text-base">
            <strong>Nivel:</strong> {result.level}
          </p>
          <p className="text-[#0f172a]/70 text-base">{result.suggestion}</p>

          <div
            className="mx-auto mt-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg"
            style={{
              backgroundColor: getColor(result.avg),
              boxShadow: `0 0 25px ${getColor(result.avg)}`,
            }}
          />

          <div className="flex justify-center flex-wrap gap-4 mt-8">
            {result.avg < 3 && (
              <button
                onClick={() => (window.location.href = "/contact")}
                className="bg-gradient-to-r from-[#ef4444] to-[#f97316] hover:from-[#dc2626] hover:to-[#ea580c] text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                📞 Contactar apoyo inmediato
              </button>
            )}
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-[#2251e7] to-[#1f46c7] text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              ↩ Volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
