import { useState } from "react";
import questions from "../data/questions";
import { computeRisk, enviarResultadoBackend } from "../utils/risk";

export default function Chatbot() {
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showInstructions, setShowInstructions] = useState(true);

  const [mensajes, setMensajes] = useState([
    {
      tipo: "bot",
      texto:
        "👋 Hola, soy Illari, estoy aquí para acompañarte y entender cómo te sientes hoy.",
    },
  ]);

  const [readyToSend, setReadyToSend] = useState(false);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  const q = questions[cursor];

  const handleAnswer = (value, textoRespuesta) => {
    const nuevasRespuestas = { ...answers, [q.id]: value };
    setAnswers(nuevasRespuestas);

    const nuevosMensajes = [
      ...mensajes,
      { tipo: "user", texto: textoRespuesta },
    ];

    if (cursor + 1 < questions.length) {
      nuevosMensajes.push({
        tipo: "bot",
        texto: questions[cursor + 1].text,
      });
      setCursor((c) => c + 1);
      setMensajes(nuevosMensajes);
    } else {
      setMensajes(nuevosMensajes);
      setReadyToSend(true);
    }
  };

  const handleSend = () => {
    const r = computeRisk(answers);
    setResult(r);
    setFinished(true);
    setReadyToSend(false);

    // 👉 Envío automático al backend
    enviarResultadoBackend(r);

    setMensajes((m) => [
      ...m,
      {
        tipo: "bot",
        texto: "✅ Hemos terminado. Tus resultados se han guardado correctamente.",
      },
    ]);
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

      {showInstructions && (
        <div className="relative z-10 text-[#0f172a] space-y-4">
          <div className="bg-[#EEDBB8] border border-[#f3d4b6]/60 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-3">
              📝 Instrucciones para responder
            </h2>

            <ul className="space-y-2 text-xl leading-relaxed">
              <li>1. Busca un lugar tranquilo y sin distracciones.</li>
              <li>2. Lee con atención cada pregunta antes de responder.</li>
              <li>3. No hay respuestas correctas o incorrectas.</li>
              <li>4. Responde con sinceridad.</li>
              <li>5. Al final presiona “Enviar resultados”.</li>
            </ul>

            <button
              onClick={() => {
                setShowInstructions(false);
                setMensajes((m) => [
                  ...m,
                  { tipo: "bot", texto: questions[0].text },
                ]);
              }}
              className="mt-5 bg-gradient-to-r from-[#2251e7] to-[#1f46c7] text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {!showInstructions &&
        mensajes.map((m, i) => (
          <div
            key={i}
            className={`px-4 py-3 sm:px-5 sm:py-3 rounded-2xl max-w-[85%] text-xl leading-relaxed backdrop-blur-sm relative z-10 ${
              m.tipo === "bot"
                ? "self-start bg-[#EEDBB8] text-[#0f172a] shadow-sm border border-[#e0c2a5]/60"
                : "self-end bg-[#dbeafe] text-[#0f172a] shadow-sm border border-[#bfd7f8]/70"
            }`}
          >
            {m.texto}
          </div>
        ))}

      {!showInstructions && !finished && !readyToSend && (
        <div className="flex flex-wrap justify-center gap-3 mt-4 relative z-10">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx + 1, opt)}
              className="bg-gradient-to-r from-[#2251e7]/90 to-[#1f46c7] hover:from-[#1f46c7] hover:to-[#193aab] text-white font-medium py-2.5 px-5 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {!showInstructions && !finished && readyToSend && (
        <div className="relative z-10 mt-4 flex flex-col items-center gap-3">
          <p className="text-lg text-[#0f172a]/80">
            Has respondido todas las preguntas.
          </p>
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Enviar resultados
          </button>
        </div>
      )}

      {finished && result && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-inner mt-6 text-center border border-[#f0d6b8]/70 relative z-10">
          <h3 className="text-2xl font-bold mb-4">📊 Resultados</h3>
          <p className="mb-2 text-xl">
            <strong>Nivel:</strong> {result.level}
          </p>
          <p className="text-xl">{result.suggestion}</p>

          <div
            className="mx-auto mt-6 w-24 h-24 rounded-full shadow-lg"
            style={{
              backgroundColor: getColor(result.avg),
              boxShadow: `0 0 25px ${getColor(result.avg)}`,
            }}
          />

          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {result.avg < 3 && (
              <button
                onClick={() => (window.location.href = "/contact")}
                className="bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg"
              >
                📞 Contactar apoyo inmediato
              </button>
            )}
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-[#2251e7] to-[#1f46c7] text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg"
            >
              ↩ Volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
