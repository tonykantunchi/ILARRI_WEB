import Chatbot from "../components/Chatbot";

export default function Test() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 font-sans">
      <section className="bg-[#EEDBB8]/90 border border-[#e0c2a5]/60 rounded-3xl shadow-xl px-6 
      sm:px-10 py-10 sm:py-14 text-center transition-all duration-300">
      
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0f172a] mb-6 drop-shadow-sm">
          Evaluación - Encuentro Illari
        </h1>
        <p className="text-[#0f172a]/80 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          Descubre tu equilibrio interior, responde con sinceridad.
          ¡Inicia ahora tu test y conéctate contigo!

        </p>
        <div className="h-[2px] w-24 mx-auto mb-10 bg-gradient-to-r from-[#f4b183] via-[#f2a172] 
        to-[#ea6e4a] rounded-full shadow-sm"></div>
        <div className="max-w-3xl mx-auto">
          <Chatbot />
        </div>
      </section>
    </main>
  );
}
