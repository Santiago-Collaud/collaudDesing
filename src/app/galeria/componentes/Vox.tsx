import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Lux() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center p-8 gap-8">
      {/* Fondo animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-rose-100 z-0"
      />

      {/* Contenedor principal: videos a la izquierda, imagen a la derecha */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl gap-8">
        {/* Videos */}
        <div className="flex flex-col gap-6 md:w-1/2">
          <iframe
            width="100%"
            height="200"
            className="rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/-qSTJ1Ny6-g"
            title="YouTube video 1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <iframe
            width="100%"
            height="200"
            className="rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/Gk0v5Nhz2vM"
            title="YouTube video 2"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Imagen VOX */}
        <div className="flex justify-center items-center md:w-1/2">
          <Image
            src="/icon/Vox.png"
            alt="Galería portada"
            width={400}
            height={300}
            className="object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
