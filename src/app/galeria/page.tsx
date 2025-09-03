"use client"
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

import Lux from "./componentes/Lux";
import Vox from "./componentes/Vox";
import Nexo from "./componentes/Nexo";

export default function Galeria() {
  const [showGallery, setShowGallery] = useState(false);
  

  useEffect(() => {
    const timer = setTimeout(() => setShowGallery(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black overflow-hidden">
      {/* HERO - solo portada */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Fondo inicial con fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-rose-400 z-0"
        />

        {/* Línea negra que se expande */}
        <motion.div
          initial={{ width: "2px" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 bg-black z-10 mx-auto"
        />

        {/* Contenido hero */}
        {showGallery && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-20 flex flex-col items-center justify-center h-full bg-white text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
                <Image src="https://res.cloudinary.com/ddvc5vscj/image/upload/v1756925977/WhatsApp_Image_2025-08-24_at_12.08.49_PM_dgzmqe.jpg" 
                        alt="Galería portada" 
                        width={400} 
                        height={300}
                        className="filter grayscale rounded-br-xl shadow-xl/30" />
                <h1 className="text-5xl font-bold text-black">Galería</h1>
            </div>
            <div> 
                {/*<h3 className="text-lg text-red-200 ">Segui Bajando!</h3>/*}
            </div>
          </motion.section>
        )}
      </div>

      {/* SECCIÓN DE LUX */}
      <section className="z-20 min-h-screen bg-gray-100 flex items-center justify-center">
          <Lux/>
      </section>
      {/* SECCIÓN DE VOX */}
      <section className="z-20 min-h-screen bg-gray-100 flex items-center justify-center">
            <Vox/>
      </section>
      {/* SECCIÓN DE NEXO */}
      <section className="z-20 min-h-screen bg-gray-100 flex items-center justify-center">
            <Nexo/>
      </section>
    </div>
  );
}

