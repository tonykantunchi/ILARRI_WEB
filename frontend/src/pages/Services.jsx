import {
  FaClipboardCheck,
  FaComments,
  FaPhoneAlt,
  FaBrain,
  FaChalkboardTeacher,
  FaSpa,
  FaLaptop,
  FaCreditCard,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Services() {
  const servicios = [
    {
      icon: <FaClipboardCheck size={40} className="text-[#e6644a]" />,
      titulo: "Evaluación (Encuentro Illari)",
      descripcion:
        "Primer paso para reconocer tus emociones y acompañarte con empatía y valoración personal.",
      color: "from-[#fff6ea] to-[#fae8d2]",
    },
    {
      icon: <FaComments size={40} className="text-[#e6924a]" />,
      titulo: "Orientación Inicial",
      descripcion:
        "Los resultados que recibas indicarán una valoración inicial de tu estado emocional.",
      color: "from-[#fff4e6] to-[#fdebd3]",
    },
    {
      icon: <FaPhoneAlt size={40} className="text-[#e6644a]" />,
      titulo: "Derivación profesional",
      descripcion:
        "En situación de riesgo, te brindo atención especializada y apoyo, con líneas de emergencia y acompañamiento profesional.",
      color: "from-[#fff6ea] to-[#fbe0c3]",
    },
    {
      icon: <FaBrain size={40} className="text-[#f59e0b]" />,
      titulo: "Terapia",
      descripcion:
        "Terapias de tercera generación para potenciar tu bienestar emocional, conciencia plena y crecimiento personal, para niños, adolescentes y adultos.",
      color: "from-[#fff3e0] to-[#ffe0b2]",
    },
    {
      icon: <FaChalkboardTeacher size={40} className="text-[#22a03a]" />,
      titulo: "Orientación vocacional y psicopedagógica",
      descripcion:
        "Orientación que busca iluminar tu camino, descubrir tu propósito y fortalecer tu crecimiento integral.",
      color: "from-[#f3fce7] to-[#e7f7cf]",
    },
    {
      icon: <FaBrain size={40} className="text-[#e6644a]" />,
      titulo: "Salud mental",
      descripcion:
        "Talleres para la salud mental que despiertan tu conciencia, fortalecen la resiliencia y cultivan equilibrio emocional.",
      color: "from-[#fff6ea] to-[#fae8d2]",
    },
    {
      icon: <FaSpa size={40} className="text-[#16a34a]" />,
      titulo: "Meditación",
      descripcion:
        "Espacio Illari para reconectar mente y cuerpo, cultivar calma interior y transformar tu bienestar integral con conciencia plena.",
      color: "from-[#e7f7cf] to-[#f7ffe7]",
    },
  ];

  return (
    <main className="px-6 sm:px-10 md:px-14 py-12 sm:py-16 bg-[#fffaf5] min-h-screen font-sans overflow-hidden relative">

      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#DBD0CE] drop-shadow-lg mb-4">
          Tu proceso de terapia psicológica empieza aquí
        </h1>

        <p className="text-[#D9CCCa]/70 max-w-2xl mx-auto text-base sm:text-lg">
          <strong>Si estás preparado, nosotros estamos aquí para acompañarte. Paso a paso.</strong> 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {servicios.map((servicio, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${servicio.color}
              border border-[#e0c2a5] rounded-3xl shadow-md p-6
              transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
          >
            <div className="flex flex-col items-start space-y-3">
              <div className="flex items-center gap-3">{servicio.icon}</div>

              <h2 className="text-xl font-semibold text-[#0f172a]">
                {servicio.titulo}
              </h2>

              {/* TEXTO MÁS GRANDE - Cambié de text-base a text-lg */}
              <p className="text-[#2d2d2d] text-lg leading-relaxed">
                {servicio.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-[#EEDBB8] border border-[#e0c2a5] rounded-3xl shadow-lg p-8 sm:p-10 max-w-4xl mx-auto text-center">

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center justify-center gap-3 text-[#101112] drop-shadow-lg">
          <FaLaptop className="text-[#e6644a]" />
          Modalidad, pago y ubicación
          <FaCreditCard className="text-[#e6644a]" />
        </h2>

        <div className="space-y-5 text-[#2d2d2d] text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
          <p>
            La atención presencial se brinda en <strong>Tonsupa</strong>,
            provincia de Esmeraldas, Ecuador.
          </p>

          <p>
            También ofrecemos atención virtual mediante <strong>Google Meet</strong> y{" "}
            <strong>Zoom</strong>, garantizando la comodidad y confidencialidad del proceso.
          </p>

          <p>
            Contamos con enlaces de pago y transferencia bancaria, cuidando la seguridad y privacidad
            de tus datos personales.
          </p>

          <p className="flex items-center justify-center gap-2 mt-6 text-[#0f172a] font-medium">
            <FaMapMarkerAlt className="text-[#e6644a]" />
            <span>
              <strong>Ubicación.</strong>
            </span>
          </p>
        </div>

        <div className="mt-8 w-full h-72 rounded-2xl overflow-hidden shadow-lg border border-[#e0c2a5] bg-[#EEDBB8]">
          <iframe
            title="Mapa Tonsupa"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d398.511!2d-79.812556!3d0.888389!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNTMnMTguMiJOIDc5wrA0OCc0NS4yIlc!5e0!3m2!1ses-419!2sec!4v1700000000000"
          ></iframe>
        </div>
      </div>
    </main>
  );
}