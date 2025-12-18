import { Link } from "react-router-dom";
import fondo from "../assets/IMG11.jpg";
import mari from "../assets/IMGM.jpg";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <section
          className="relative overflow-hidden rounded-3xl shadow-2xl border border-[#e8cdbb]/60 text-center text-white"
          style={{
            backgroundImage: `url(${fondo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60 rounded-3xl" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 sm:py-24">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight drop-shadow-lg">
              Illari — Decide resplandecer
            </h1>

            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-white/95">
              Plataforma de acompañamiento emocional inicial donde podrás evaluar tu estado emocional y recibir orientación de acuerdo con tu estado. Además, se ofrecen
              intervenciones psicológicas en el área educativa y clínica, así como investigación en
              psicología, valoraciones psicopedagógicas y orientación vocacional.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/test"
                className="
                  rounded-full px-6 py-3 bg-[#FFB600] hover:bg-[#E6A300] 
                  text-white font-semibold shadow-xl shadow-[#FFB600]/40 hover:shadow-lg transition
                "
              >
                Encuentro con Illari
              </Link>
              <Link
                to="/about"
                className="
                  rounded-full px-6 py-3 bg-[#4A89C6] hover:bg-[#3C77B0] 
                  text-white font-semibold shadow-md hover:shadow-lg transition
                "
              >
                Conocer a la profesional
              </Link>
            </div>
          </div>
        </section>

        <section 
          className="bg-[#EEDBB8] rounded-3xl shadow-lg border border-[#e0c2a5] mt-12 p-10 text-center"
        >
          <h2 
            className="text-3xl sm:text-4xl font-bold text-[#123C69] mb-6"
          >
            Bienestar a tu alcance
          </h2>

          <p 
            className="text-[#123C69]/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Explora Illari, un espacio para fortalecer tu salud mental con orientación psicológica y profesionales calificados. 
            ¡Conecta contigo mismo y transforma tu bienestar hoy!
          </p>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="text-left max-w-md">
              <h3 
                className="text-2xl font-bold text-[#123C69] mb-2"
              >
                ¿Por qué Illari?
              </h3>

              <p className="text-[#123C69]/80 text-lg">
                Illari significa amanecer o luz del día; te invito a iniciar un cambio de conciencia, iluminar tu mente y vivir el equilibrio emocional que trasforma.
              </p>
            </div>

            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-radial from-orange-300/40 via-orange-100/10 to-transparent blur-3xl animate-pulse-slow" />
              <img
                src={mari}
                alt="mariposa"
                className="w-56 h-auto object-contain drop-shadow-xl rounded-2xl transition-transform duration-500 hover:scale-105 relative z-10"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
