import { useEffect, useState } from "react";

export default function BackgroundAura() {
  const [mouseShift, setMouseShift] = useState({ x: 0, y: 0 });
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => (prev === 1 ? 1.02 : 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseShift({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
  
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#163b65]">
      
      <div
        className="absolute inset-0 transition-transform duration-[4000ms] ease-linear"
        style={{
          transform: `translate(${mouseShift.x}px, ${mouseShift.y}px) scale(${pulse})`,
          background: `linear-gradient(
            135deg, 
            #163b65 0%,    /* Azul Océano (Inicio) */
            #336ca1 55%,   /* Azul Intermedio */
            #e6b980 85%,   /* Dorado (Ahora empieza en 85%, antes en 94%) */
            #fff1e0 100%   /* Luz final */
          )`,
          backgroundSize: "120% 120%", 
        }}
      ></div>
      <div
        className="absolute bottom-[-15vh] left-[70%] -translate-x-1/2 w-[750px] h-[550px]
        bg-[#e6b980] blur-[140px] rounded-full opacity-40 mix-blend-screen transition-all duration-[2500ms]"
        style={{
        
          transform: `translate(${mouseShift.x * 0.25}px, ${mouseShift.y * 0.15}px)`,
        }}
      ></div>

      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          transform: `translate(${mouseShift.x * 0.1}px, ${mouseShift.y * 0.1}px)`,
          backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")`,
          backgroundRepeat: "repeat",
          backgroundSize: "450px 450px",
        }}
      ></div>

      <div
        className="absolute inset-0 opacity-20 blur-[100px] transition-all duration-700 mix-blend-soft-light"
        style={{
          transform: `translate(${mouseShift.x * 0.12}px, ${mouseShift.y * 0.12}px)`,
          background:
            "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.2), transparent 50%)",
          "--mx": `${30 + mouseShift.x * 1.3}%`,
          "--my": `${30 + mouseShift.y * 1.3}%`,
        }}
      ></div>
    </div>
  );
}