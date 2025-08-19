"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";
import BtnContact from "../butonContact/btnContact";


export default function AboutMe() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-6 py-16 text-black bg-gradient-to-br from-stone-200 to-zinc-800 rounded-lg shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.section
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-6 p-10 md:mb-0  bg-gradient-to-br from-stone-200 to-zinc-800 rounded-xl shadow-lg">
            <Image
              src="https://res.cloudinary.com/ddvc5vscj/image/upload/v1754945581/Autoretrato_2_izibup.jpg"
              alt="autorretrato"
              width={400}
              height={400}
              className="rounded-tl-xl rounded-br-xl shadow-2xl object-cover flex justify-center mx-auto filter grayscale hover:grayscale-0 transition-all duration-500 ease-in-out hover:scale-120 duration-500"
            />
          </div>
        </motion.section>
        
        <div className="text-left">
          
          <div ref={ref} className="flex flex-col gap-2 md:hidden">
                {[
                  "-> Animarse a más",
                  "-> Salir de la caja",
                  "-> Hacerse notar"
                ].map((frase, i) => (
                  <p
                    key={i}
                    className={`text-xl md:text-2xl text-gray-800 font-mono ${
                      inView ? "opacity-0 animate-fadeIn" : "opacity-0"
                    }`}
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      animationFillMode: "forwards"
                    }}
                  >
                    <strong>{frase}</strong>
                  </p>
                ))}
              </div>
            <h2 className="text-4xl md:text-5xl font-bold mt-8 tracking-tight text-black">
              Soy Santiago Collaud.
            </h2>
            <h2 className="text-4xl md:text-2xl font-serif mb-4 mt-1 tracking-tight text-black">
              creador digital.
            </h2>
            
          <p className="text-lg text-gray-300 mb-4 mt-4 p-4 border-t-4 rounded-lg border-b-4 border-indigo-400">
            Hace muchos años que el campo multimedia me atrapo, empecé en la radio, luego la imagen y el sonido fueron mis proyectos, 
            sume diseño gráfico, fotografía, video y llegue hasta la programación.
          </p>    
          <p className="text-lg text-gray-900 mb-4 font-semibold">
             Hoy decidí abrirme y 
             <strong> hacer que mi experiencia sea la herramienta </strong>  
             para que a tus ideas les crezcan alas y vuelen.
          </p>
          <BtnContact/>
      </div>
    </div>
    </motion.section>
  );
}
