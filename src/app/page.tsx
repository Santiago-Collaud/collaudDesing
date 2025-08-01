"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Inicial() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleClick = () => {
    setLoading(true);
    router.push("/home");
  }
  
  return (
    <main className="min-h-screen w-full bg-gray-900">
        
      <div className="flex flex-col min-h-screen w-full">
          {/*
          <div className="group hover:bg-gray-700 transition duration-900 p-10 rounded-lg shadow-lg text-center">
            <h1 className="text-5xl font-mono text-blue-600">Estamos llegando</h1>
            <h1 className="titulo-personalizado text-5xl text-blue-600 group-hover:text-red-100 transition duration-900">Preparate</h1>
          </div>*/}
        <div className="hero min-h-screen">
          <div className="relative w-full h-full"> {/* o cualquier altura deseada */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src="/videos/fondo.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-content flex-col lg:flex-row rounded-lg shadow-2xl">
            <Image
              src="/icon/CollaudDesing_2.png"
              alt="Hero Image"
              width={500}
              height={500}
              className="max-w-sm rounded-xl shadow-2xl pt-4 pb-2 bg-linear-to-t from-gray-600 to-gray-900 p-10
              hover:scale-150 transition-transform duration-600"
            />
            <div>
              <p className="text-lg flex justify-center font-mono">
                <strong>Hacemos que tus ideas cobren vida.</strong> 
              </p>
              <p>¿Está listo para llevar tu presencia en línea al siguiente nivel?</p>
              <div className="flex justify-end mt-4">  

                <motion.button
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow-lg"
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0px 0px 8px rgba(0, 170, 255, 0.6)",
                          "0px 0px 20px rgba(0, 170, 255, 1)",
                          "0px 0px 8px rgba(0, 170, 255, 0.6)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      onClick={() => handleClick()}
                    >
                      {loading ? (
                        <div className="flex gap-1 items-center">
                          <span>Cargando</span>
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 bg-white rounded-full"
                              animate={{
                                y: [0, -4, 0],
                                opacity: [0.4, 1, 0.4],
                              }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <span>Conoce más</span>
                      )}
                    </motion.button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </main> 
  )
}
