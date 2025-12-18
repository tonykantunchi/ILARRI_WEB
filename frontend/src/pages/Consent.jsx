import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Consent() {
  const BRAND_BLUE = "#123C69";
  const TANNED_BG = "#EEDBB8";
  const TITLE_ACCENT = "#DBD0CE";

  const [accepted, setAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAccept = () => {
    if (!accepted) {
      setShowModal(true);
      return;
    }

    sessionStorage.setItem(
      "consentAccepted",
      JSON.stringify({ t: Date.now() })
    );

    navigate("/real-test", { replace: true, state: { fromConsent: true } });
  };

  return (
    <>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="border border-[#e0c2a5] p-6 rounded-2xl shadow-2xl max-w-md w-full text-center animate-fadeIn relative"
            style={{ backgroundColor: TANNED_BG }}
          >
            <button
              className="absolute top-3 right-3 text-black font-bold text-lg hover:text-red-600"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: BRAND_BLUE }}
            >
              Atención
            </h2>

            <p style={{ color: BRAND_BLUE }}>
              Debes aceptar los términos y condiciones antes de continuar.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full font-semibold py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 font-sans">
        

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 drop-shadow-lg"
          style={{ color: TITLE_ACCENT }}
        >
          Consentimiento & Privacidad
        </h1>

        <div
          className="border border-[#e0c2a5] rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 space-y-5 transition-all duration-300"
          style={{ backgroundColor: TANNED_BG, color: BRAND_BLUE }}
        >
          {location.state?.reason === "need-consent" && (
            <p className="text-red-600 font-semibold text-center">
              Debes aceptar el consentimiento antes de realizar el test.
            </p>
          )}

          <p className="text-lg sm:text-xl leading-relaxed">
            En Illari, la confianza es esencial. Tus datos personales se
            resguardan con absoluta confidencialidad, conforme a la ética y la
            normativa de protección de datos.
          </p>

          <p className="text-lg sm:text-xl leading-relaxed">
            Tu historia, emociones y experiencias permanecen seguras, en un
            espacio diseñado para acompañarte con respeto, cuidado y total
            privacidad. Autorizo la aplicación de Encuentro Illari con fines de
            orientación emocional.
          </p>

          <div className="mt-6">
            <label className="flex flex-col sm:flex-row sm:items-center gap-3 text-lg sm:text-xl">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-5 h-5 accent-blue-600 cursor-pointer"
              />
              <span>Acepto los términos y condiciones</span>
            </label>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleAccept}
              className={`w-full sm:w-auto ${
                accepted
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300`}
            >
              Empieza con el cuestionario
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
