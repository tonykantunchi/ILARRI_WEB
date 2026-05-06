"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, X } from "lucide-react";

import L from "../assets/L.png";
import A from "../assets/A.png";

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#0b1b34] text-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center space-y-3">
          <p className="text-lg font-semibold text-white">
            Illari — Decide resplandecer
          </p>
          <p className="text-sm opacity-80">
            © 2025 Illari. Todos los derechos reservados.
          </p>

          <div className="flex justify-center gap-6 text-sm">
            <a href="/consent" className="hover:text-white transition">
              Privacidad
            </a>

            <button onClick={() => setOpen(true)} className="hover:text-white transition">
              Desarrolladores
            </button>

            <a href="/test" className="hover:text-white transition">
              Encuentro con Illari
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#EEDBB8] border border-[#e0c2a5] p-8 
              rounded-3xl shadow-xl max-w-3xl w-full relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-700 hover:text-black transition"
              >
                <X size={24} />
              </button>

              <div className="space-y-3 text-center">
                <img
                  src={L}
                  alt="Luis Angel Haas Aguayo"
                  className="w-28 h-28 rounded-full mx-auto object-cover border border-gray-400"
                />

                <p className="text-lg font-bold">
                  Luis Angel Haas Aguayo
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Desarrollador Frontend
                </p>

                <div className="flex justify-center gap-4 text-gray-700">
                  <a 
                    href="https://www.linkedin.com/in/luis-angel-haas-aguayo-309662397" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin />
                  </a>
                  <a href="mailto:lhaasaguayo@gmail.com">
                    <Mail />
                  </a>
                </div>
              </div>

              <div className="space-y-3 text-center">
                <img
                  src={A}
                  alt="Angel Antonio de Jesús Kantun Chi"
                  className="w-28 h-28 rounded-full mx-auto object-cover border border-gray-400"
                />

                <p className="text-lg font-bold">
                  Angel Antonio de Jesús Kantun Chi
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Desarrollador Backend
                </p>

                <div className="flex justify-center gap-4 text-gray-700">
                  <a 
                    href="https://www.linkedin.com/in/angel-antonio-chi-36ab00378?trk=contact-info" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin />
                  </a>
                  <a href="mailto:angel1418.chi@gmail.com">
                    <Mail />
                  </a>
                </div>
              </div>

              <p className="col-span-full text-center text-xs text-gray-600 pt-2">
                © 2025
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}