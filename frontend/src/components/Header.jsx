import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

const NavLink = ({ to, children, onClick }) => {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-2 rounded-md font-medium transition-all duration-300
        ${
          active
            ? "text-white bg-[#4A89C6] shadow-md scale-[1.03]"  // Azul para contraste en estado activo
            : "text-[#123C69] hover:text-[#0f2a4d] hover:bg-white/30 hover:scale-[1.05]"  // Texto azul oscuro para contraste con fondo beige
        }
      `}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTestClick = (e) => {
    e.preventDefault();
    navigate("/consent");
    setMenuOpen(false);
  };

  return (
    <header className="relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-3">
        <div
          className="
          backdrop-blur-sm
          border border-[#e0c2a5]
          rounded-2xl
          shadow-xl shadow-black/10
          px-6 py-3 flex items-center justify-between
          transition-all duration-500
          bg-[#EEDBB8]  // ← COLOR BEIGE UNIFORME
        "
        >
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="logo"
              className="h-16 sm:h-20 transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <nav className="flex gap-2">
              <NavLink to="/">Inicio</NavLink>
              <NavLink to="/about">Sobre mí</NavLink>
              <NavLink to="/services">Servicios</NavLink>
              <NavLink to="/contact">Contacto</NavLink>
              <NavLink to="/consent">Consentimiento</NavLink>
            </nav>

            <button
              onClick={handleTestClick}
              className="
                relative ml-2 px-7 py-2 rounded-full font-semibold text-white 
                // Botón CTA: Azul para buen contraste con fondo beige
                bg-[#4A89C6]
                shadow-lg shadow-[#4A89C6]/40 
                hover:shadow-[#4A89C6]/70
                hover:bg-[#3a79b6]
                transition-all duration-300 
                hover:scale-[1.08] active:scale-95 
                overflow-hidden group 
              "
            >
              <span
                className="
                absolute inset-0 bg-gradient-to-r from-white/20 to-transparent 
                opacity-0 group-hover:opacity-100 
                blur-xl transition-all duration-700 
                group-hover:animate-spin-slow
              "
              />
              <span
                className="
                absolute -inset-1 rounded-full blur-xl 
                bg-[#4A89C6]
                opacity-0 group-hover:opacity-30 
                transition-opacity duration-500
              "
              />
              <span className="absolute inset-0 rounded-full animate-pulse bg-white/0" />
              <span className="relative z-10 flex items-center gap-1">
                Encuentro con Illari
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>

          <button
            className="md:hidden text-[#123C69] text-3xl active:scale-90 transition"  // Texto azul oscuro para contraste
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="
          // Fondo del menú móvil: Mismo color beige
          md:hidden bg-[#EEDBB8] border-t border-[#e0c2a5] shadow-inner
          animate-fade-in
        "
        >
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-2 text-center">
            {[
              ["Inicio", "/"],
              ["Sobre mí", "/about"],
              ["Servicios", "/services"],
              ["Contacto", "/contact"],
              ["Consentimiento", "/consent"],
            ].map(([label, to]) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="
                  block px-3 py-2 rounded-md font-medium 
                  text-[#123C69]  // Texto azul oscuro para contraste
                  hover:bg-white/40 hover:scale-[1.03] 
                  transition-all duration-200
                "
              >
                {label}
              </Link>
            ))}

            <button
              onClick={handleTestClick}
              className="
                relative w-full rounded-full px-6 py-2 font-semibold text-white 
                // CTA móvil: Azul para contraste
                bg-[#4A89C6]
                shadow-md hover:shadow-xl 
                hover:bg-[#3a79b6]
                hover:scale-[1.05] active:95
                transition-all duration-300 overflow-hidden group
              "
            >
              <span
                className="
                absolute inset-0 bg-white/10 blur-xl opacity-0 
                group-hover:opacity-100 transition duration-500
              "
              />
              <span className="relative z-10">Encuentro con Illari →</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}