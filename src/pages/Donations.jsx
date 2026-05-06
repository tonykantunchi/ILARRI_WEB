// FRONTEND/src/pages/Donations.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ✅ CORRECCIÓN: Nunca hardcodear claves de Stripe.
// Si no está definida la variable de entorno, lanzar error claro en consola.
const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PK;
if (!STRIPE_PUBLIC_KEY) {
  console.error(
    "❌ Falta REACT_APP_STRIPE_PK en tu archivo .env\n" +
    "Agrega: REACT_APP_STRIPE_PK=pk_test_... (o pk_live_... en producción)"
  );
}

// ✅ CORRECCIÓN: Usar variable de entorno para la URL del backend.
// Define REACT_APP_API_URL=http://localhost:8000 en tu .env local.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const CURRENCIES = {
  MXN: {
    code: "MXN",
    symbol: "$",
    flag: "🇲🇽",
    country: "México",
    amounts: [50, 100, 200, 500, 1000],
    min: 20,
    placeholder: "Ej. 150",
  },
  COP: {
    code: "COP",
    symbol: "$",
    flag: "🇨🇴",
    country: "Colombia",
    amounts: [5000, 10000, 25000, 50000, 100000],
    min: 2000,
    placeholder: "Ej. 15000",
  },
};

export default function Donations() {
  const [currency, setCurrency] = useState("MXN");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState("form"); // 'form' | 'payment' | 'success' | 'error'
  const [loading, setLoading] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);
  const [stripeError, setStripeError] = useState("");

  const stripeRef = useRef(null);
  const elementsRef = useRef(null);
  const cardRef = useRef(null);
  const cardMounted = useRef(false);

  const cur = CURRENCIES[currency];
  const finalAmount = selectedAmount ||
    (customAmount ? Number(String(customAmount).replace(/\D/g, "")) : 0);

  // Cargar Stripe.js
  useEffect(() => {
    if (!STRIPE_PUBLIC_KEY) return; // No cargar si falta la clave

    if (window.Stripe) {
      stripeRef.current = window.Stripe(STRIPE_PUBLIC_KEY);
      setStripeReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.onload = () => {
      stripeRef.current = window.Stripe(STRIPE_PUBLIC_KEY);
      setStripeReady(true);
    };
    script.onerror = () => {
      console.error("❌ No se pudo cargar Stripe.js");
    };
    document.head.appendChild(script);
  }, []);

  // Montar elemento de tarjeta
  useEffect(() => {
    if (step !== "payment" || !stripeReady || cardMounted.current) return;

    const elements = stripeRef.current.elements();
    elementsRef.current = elements;

    const card = elements.create("card", {
      style: {
        base: {
          fontFamily: "Merriweather, serif",
          fontSize: "16px",
          color: "#123C69",
          "::placeholder": { color: "#a0aec0" },
        },
        invalid: { color: "#e53e3e" },
      },
      hidePostalCode: true,
    });

    card.mount("#stripe-card-element");
    cardRef.current = card;
    cardMounted.current = true;

    card.on("change", (e) => {
      setStripeError(e.error ? e.error.message : "");
    });
  }, [step, stripeReady]);

  // Cleanup al desmontar el componente
  useEffect(() => {
    return () => {
      if (cardRef.current) {
        cardRef.current.destroy();
        cardRef.current = null;
        cardMounted.current = false;
      }
    };
  }, []);

  function handleCurrencyChange(code) {
    setCurrency(code);
    setSelectedAmount(null);
    setCustomAmount("");
  }

  function handleCustomAmountChange(e) {
    const raw = e.target.value.replace(/\D/g, "");
    setCustomAmount(raw);
    setSelectedAmount(null);
  }

  function handleNext() {
    if (finalAmount < cur.min) return;
    setStep("payment");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripeReady || !cardRef.current || finalAmount < cur.min) return;

    setLoading(true);
    setStripeError("");

    try {
      // 1. Crear PaymentIntent en el backend
      const res = await fetch(`${API_URL}/api/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount * 100, // Stripe trabaja en centavos
          currency: currency.toLowerCase(),
        }),
      });

      // ✅ CORRECCIÓN: Manejar errores HTTP explícitamente
      if (!res.ok) {
        let detail = "Error al crear el pago";
        try {
          const errData = await res.json();
          detail = errData.detail || detail;
        } catch {
          // Si la respuesta no es JSON, usamos el mensaje genérico
        }
        throw new Error(detail);
      }

      const { clientSecret } = await res.json();

      // ✅ CORRECCIÓN: Verificar que clientSecret llegó correctamente
      if (!clientSecret) {
        throw new Error("No se recibió el secreto del pago. Revisa el backend.");
      }

      // 2. Confirmar el pago con Stripe
      const { error } = await stripeRef.current.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardRef.current,
        },
      });

      if (error) throw error;

      setStep("success");
    } catch (err) {
      console.error("Error en el pago:", err);
      setStripeError(err.message || "Error al procesar el pago");
      setStep("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-transparent relative">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #FFB600 0%, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #C0574A 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-lg mx-auto px-4 sm:px-6 py-12 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-[#123C69] font-medium mb-8 hover:opacity-70 transition">
          ← Volver al inicio
        </Link>

        {/* Paso 1: Selección de monto */}
        {step === "form" && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-[#e8cdbb]/60 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C0574A]/10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-[#C0574A]" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-[#123C69]" style={{ fontFamily: "Merriweather, serif" }}>
                Apoya a Illari
              </h1>
            </div>

            {/* Selector de moneda */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#123C69] mb-2">Moneda</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(CURRENCIES).map((c) => (
                  <button key={c.code} onClick={() => handleCurrencyChange(c.code)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition font-medium
                      ${currency === c.code ? "border-[#C0574A] bg-[#C0574A]/10 text-[#C0574A]" : "border-[#e0c2a5] bg-white/60 text-[#123C69] hover:border-[#C0574A]/40"}`}>
                    <span className="text-2xl">{c.flag}</span>
                    <div className="text-left">
                      <div className="text-sm font-bold">{c.code}</div>
                      <div className="text-xs opacity-70">{c.country}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Montos rápidos */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#123C69] mb-2">Monto sugerido</label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {cur.amounts.map((amt) => (
                  <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`py-2 px-1 rounded-xl border-2 text-sm font-semibold transition
                      ${selectedAmount === amt ? "border-[#FFB600] bg-[#FFB600] text-white shadow-md" : "border-[#e0c2a5] bg-white/60 text-[#123C69] hover:border-[#FFB600]/60"}`}>
                    {cur.symbol}{Number(amt).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Monto personalizado */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#123C69] mb-2">
                Otro monto <span className="font-normal text-[#123C69]/50">(mín. {cur.symbol}{Number(cur.min).toLocaleString()})</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#123C69]/40 font-bold">{cur.symbol}</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={cur.placeholder}
                  value={customAmount ? Number(customAmount).toLocaleString() : ""}
                  onChange={handleCustomAmountChange}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-[#e0c2a5] bg-white/80 text-[#123C69] focus:outline-none focus:border-[#FFB600] transition"
                />
              </div>
            </div>

            {finalAmount >= cur.min && (
              <div className="mb-6 p-4 rounded-2xl bg-[#EEDBB8]/60 border border-[#e0c2a5] text-center">
                <span className="text-[#123C69]/60 text-xs block mb-1">Vas a donar</span>
                <span className="text-2xl font-bold text-[#C0574A]">
                  {cur.symbol}{Number(finalAmount).toLocaleString()} {cur.code}
                </span>
              </div>
            )}

            {/* ✅ CORRECCIÓN: Mostrar aviso si falta la clave de Stripe */}
            {!STRIPE_PUBLIC_KEY && (
              <p className="text-red-500 text-sm text-center mb-4">
                ⚠️ Falta configurar REACT_APP_STRIPE_PK en el archivo .env
              </p>
            )}

            <button
              onClick={handleNext}
              disabled={finalAmount < cur.min || !STRIPE_PUBLIC_KEY}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200
                ${finalAmount >= cur.min && STRIPE_PUBLIC_KEY
                  ? "bg-[#C0574A] hover:bg-[#A84639] text-white shadow-xl"
                  : "bg-[#e0c2a5]/60 text-[#123C69]/40 cursor-not-allowed"}`}
            >
              Continuar →
            </button>
          </div>
        )}

        {/* Paso 2: Datos de pago */}
        {step === "payment" && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-[#e8cdbb]/60 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#123C69]">Datos de pago</h2>
              <p className="text-[#123C69]/60 mt-1">
                Donando <strong>{cur.symbol}{Number(finalAmount).toLocaleString()} {cur.code}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#123C69] mb-2">Tarjeta</label>
                <div id="stripe-card-element" className="px-4 py-4 rounded-xl border-2 border-[#e0c2a5] bg-white/90 min-h-[52px]" />
                {stripeError && <p className="text-red-500 text-sm mt-2">{stripeError}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setStep("form"); cardMounted.current = false; }}
                  className="flex-1 py-3 rounded-2xl border-2 border-[#e0c2a5] text-[#123C69] font-semibold hover:bg-[#EEDBB8]/40"
                >
                  ← Volver
                </button>
                <button
                  type="submit"
                  disabled={loading || !stripeReady}
                  className={`flex-1 py-3 rounded-2xl font-bold text-white transition-all
                    ${loading ? "bg-[#C0574A]/60 cursor-not-allowed" : "bg-[#C0574A] hover:bg-[#A84639]"}`}
                >
                  {loading ? "Procesando..." : `Donar ${cur.symbol}${Number(finalAmount).toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Éxito */}
        {step === "success" && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-[#e8cdbb]/60 p-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#123C69] mb-3">¡Gracias!</h2>
            <p className="text-[#123C69]/70 mb-8">
              Tu donación de <strong>{cur.symbol}{Number(finalAmount).toLocaleString()} {cur.code}</strong> se realizó con éxito.
            </p>
            <Link to="/" className="inline-block px-8 py-3 rounded-full bg-[#123C69] text-white font-bold hover:bg-[#0e2f55]">
              Volver al inicio
            </Link>
          </div>
        )}

        {/* Error */}
        {step === "error" && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-red-200/60 p-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Pago no realizado</h2>
            <p className="text-red-500 mb-8">{stripeError}</p>
            <button
              onClick={() => { setStep("payment"); setStripeError(""); }}
              className="px-8 py-3 rounded-full bg-[#C0574A] text-white font-bold hover:bg-[#A84639]"
            >
              Intentar de nuevo
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
