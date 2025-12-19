import foto from "../assets/FOTO PERSONAL.jpg";

export default function About() {

  const BRAND_BLUE = '#123C69';
  const TANNED_BG = '#EEDBB8'; 
  const ACCENT_BLUE_TITLE = '#DBD0CE'; 

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 font-sans">
      <h1 
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 drop-shadow-lg"
        style={{ color: ACCENT_BLUE_TITLE }}
      >
        Sobre mí
      </h1>

      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 border border-[#e0c2a5] p-6 sm:p-8 
        md:p-10 rounded-3xl shadow-lg items-start"
        style={{ backgroundColor: TANNED_BG }}
      >
        <div className="flex justify-center">
          <img
            src={foto}
            alt="Foto profesional"
            className="w-auto h-64 sm:h-72 object-cover rounded-2xl shadow-md mx-auto" 
          />
        </div>
        
        <div 
          className="md:col-span-2 space-y-6 text-justify text-lg sm:text-xl leading-relaxed"
          style={{ color: BRAND_BLUE }}
        >
          <p>
            Soy psicóloga clínica con más de 18 años de trayectoria universitaria, con experiencia en niños, 
            adolescentes y adultos. Promuevo un espacio donde sentir es seguro y ser uno mismo no requiere 
            permiso. Conocerse requiere de calma y respeto desde el autocuidado.
          </p>
          
          <div className="pt-4">
            <h2 
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3"
              style={{ color: BRAND_BLUE }}
            >
              Datos académicos
            </h2>
            <ul className="space-y-2 text-lg sm:text-xl" style={{ color: BRAND_BLUE }}>
              <li>
                <strong>Dra. Psic. Clínica</strong> — N.1054-07-740797
              </li>
              <li>
                <strong>Mg. Psic. Educativa</strong> — N.1010-09-699765
              </li>
              <li>
                <strong>Mg. Gestión del Talento Humano</strong> — N.1027-2023-2670999
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}