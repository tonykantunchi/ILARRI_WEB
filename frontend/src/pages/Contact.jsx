export default function Contact() {
  const BRAND_BLUE = "#123C69";
  const TANNED_BG = "#EEDBB8";
  const TITLE_ACCENT = "#DBD0CE";

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 font-sans">

      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 drop-shadow-lg"
        style={{ color: TITLE_ACCENT }}
      >
        Contacto
      </h1>

      <div
        className="border border-[#e0c2a5] rounded-3xl shadow-lg p-8 sm:p-10 mb-12"
        style={{ backgroundColor: TANNED_BG }}
      >
        <p
          className="text-lg sm:text-xl leading-relaxed text-center"
          style={{ color: BRAND_BLUE }}
        >
          Atrévete a dar el primer paso hacia tu bienestar emocional.
          En <strong>Illari</strong>, encontrarás un espacio de escucha,
          comprensión y crecimiento personal.
          <br /><br />
          <strong>¡Agenda tu cita hoy!</strong> y comienza a iluminar tu camino interior.
          <br /><br />
          Da hoy el primer paso hacia tu bienestar emocional.
          <br /><br />
          Agenda tu encuentro con <strong>Illari</strong>.
        </p>
      </div>

      <div className="text-center mb-12">
        <a
          href="https://wa.me/593995663740"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center px-8 py-3 
                     font-semibold text-white text-lg rounded-full shadow-lg 
                     bg-gradient-to-r from-[#25d366] via-[#1ebe5d] to-[#128c7e]
                     hover:scale-110 hover:shadow-2xl transition-all"
        >
          💬 Contactar por WhatsApp
        </a>
      </div>

      <div
        className="border border-[#e0c2a5] rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 max-w-3xl mx-auto"
        style={{ backgroundColor: TANNED_BG }}
      >
        <div
          className="border border-[#e0c2a5] rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-xl transition"
          style={{ backgroundColor: "#fff5e6" }}
        >
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4 flex items-center justify-center gap-2"
            style={{ color: BRAND_BLUE }}
          >
            📞 Teléfonos de apoyo inmediato
          </h2>

          <div
            className="space-y-3 text-lg sm:text-xl text-center"
            style={{ color: BRAND_BLUE }}
          >
            <p>
              <strong>Teléfono de emergencias: </strong>
              <a
                href="tel:911"
                className="text-blue-600 hover:text-blue-700 font-medium underline-offset-2 hover:underline"
              >
                911
              </a>
            </p>
            <p>
              <strong>Línea de la vida (México): </strong>
              <a
                href="tel:8009112000"
                className="text-blue-600 hover:text-blue-700 font-medium underline-offset-2 hover:underline"
              >
                800 911 2000
              </a>
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}