export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-5 sm:px-6 py-14 sm:py-16 text-center font-sans">
      <h1 className="text-6xl sm:text-7xl font-extrabold text-[#DBD0CE] mb-3 sm:mb-6 drop-shadow-sm">
        404
      </h1>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#DBD0CE] mb-8">
        Página no encontrada
      </h2>

      <div className="bg-[#EEDBB8] border border-[#e0c2a5] rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 max-w-2xl w-full">
        <div className="bg-[#fff6ea] border border-[#f0d7bc] rounded-2xl shadow-md p-6 sm:p-8">
          <p className="text-[#2d2d2d] leading-relaxed mb-8 text-sm sm:text-xl">
            La página que intentas visitar no existe o fue movida.  
            Verifica la dirección o utiliza el menú de navegación para regresar al inicio.
          </p>

          <a
            href="/"
            className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#2251e7] to-[#1f46c7] hover:from-[#1f46c7] hover:to-[#193aab] text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </section>
  );
}