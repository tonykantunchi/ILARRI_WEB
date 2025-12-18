import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Results() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("lastResult");
    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  if (!result) {
    return (
      <main className="max-w-lg mx-auto my-16 px-6 py-10 bg-[#fae8d2]/90 border border-[#e0c2a5]/60 rounded-3xl shadow-lg text-center font-sans">
        <p className="text-[#0f172a]/80 mb-5 text-base sm:text-lg leading-relaxed">
          No hay resultados disponibles. Realiza el test primero para obtener tu nivel de bienestar emocional.
        </p>
        <Link
          to="/test"
          className="inline-block bg-gradient-to-r from-[#2251e7] to-[#1f46c7] hover:from-[#1f46c7] hover:to-[#193aab] text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          Ir al test
        </Link>
      </main>
    );
  }

  const colorMap = {
    red: "bg-red-500 shadow-red-300",
    orange: "bg-orange-400 shadow-orange-200",
    yellow: "bg-yellow-400 shadow-yellow-200",
    green: "bg-green-500 shadow-green-300",
    "light-green": "bg-green-400 shadow-green-200",
  };

  const circleColor = colorMap[result.color] || "bg-gray-400 shadow-gray-300";

  return (
    <main className="max-w-lg mx-auto my-16 px-6 py-10 bg-[#fae8d2]/90 border border-[#e0c2a5]/60 rounded-3xl shadow-xl font-sans text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-6 drop-shadow-sm">
        Resultado del Test
      </h2>
      <div className="flex justify-center mb-8">
        <div
          className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-md ${circleColor} transition-all duration-500`}
        />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-[#0f172a] mb-2">
        Nivel:{" "}
        <span className="font-bold text-[#0f172a]/90">{result.level}</span>
      </h3>
      <p className="text-[#0f172a]/80 text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto">
        {result.reason}
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-6">
        <Link
          to="/test"
          className="bg-gradient-to-r from-[#2251e7] to-[#1f46c7] hover:from-[#1f46c7] hover:to-[#193aab] text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          Volver a realizar el test
        </Link>

        <Link
          to="/"
          className="text-[#1f46c7] hover:text-[#193aab] font-medium text-base hover:underline transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
