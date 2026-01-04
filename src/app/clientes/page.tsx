//modulo de clientes, donde se muestran los eventos disponibles para el cliente
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEventosCliente } from "./hook/useEventosCliente";
import EventoCard2 from "../clientes/componente/evento_card2";
import NavBar from "../componetes/navBarCliente/navCliente";
import LegalDescarga from "../componetes/avisoLegal/llegalDescarga";

// ← IMPORTAMOS VARIANTS
import { fadeUp, fadeUpDelayed } from "../clientes/variants/variants";

export default function Page() {
  const { eventos, loading, error } = useEventosCliente();

  return (
    <main className="min-h-screen bg-[url(/bg-clientes.jpg)] bg-cover h-64 w-full text-white ">
      <NavBar />

      {/* HEADER FADE IN */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-6"
      >
        <div className="bg-gradient-to-l from-sky-500 to-indigo-500 m-4 p-2 border-radius-lg shadow-lg text-center rounded-lg">
            <h1 className="text-4xl font-bold mb-2">Bienvenidos</h1>
            <p className="text-gray-300">Explora los eventos disponibles a continuación.</p>
        </div>
        
      </motion.div>

      {/* EVENTOS FADE-IN DESPUÉS */}
      <motion.section
        variants={fadeUpDelayed}
        initial="hidden"
        animate="show"
      >
        <div className="container mx-auto p-4">
          {loading && (
            <span className="loading loading-dots loading-xl"></span>
          )}

          {error && <p className="text-red-500">{error}</p>}

          <AnimatePresence mode="wait">
            {eventos.length === 0 && !loading && (
              <p>No hay eventos disponibles.</p>
            )}

            <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 ">
              {eventos.map((evento) => (
                <motion.div
                  key={evento.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <EventoCard2 evento={evento} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </motion.section>
      <LegalDescarga />
    </main>
  );
}
