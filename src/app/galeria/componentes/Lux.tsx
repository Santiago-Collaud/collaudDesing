import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
export default function Lux(){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center justify-center">
                <Image src="/icon/Lux.png" 
                alt="Galería portada" 
                width={400} 
                height={300}
                className="object-contain"/>
            </div>
            
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-rose-100 z-0"
            />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935800/Carrousel_3_no5qb2.jpg"
                            , title: "Cabalgando"
                            , desc: "Imagen que obtubo el 3º lugar en el 13º concurso de fotografía del HCD de HAsenkamp - 2024" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935799/Carrousel_2_a7fnfh.jpg"
                            , title: "Nuestra bandera es nuetro equipo",
                              desc: "Imagen que obtubo el 1º lugar en 3º concurso fotografico HCD Hasenkamp - 2016" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935800/CollaudDesing_6_mublnl.jpg",
                             title: "Energia libre", 
                             desc: "Imagen tomada en una noche de tormenta" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935800/Carrousel_4_eip1dk.jpg"
                            , title: "Soplo de verde"
                            , desc: "Fotografia que recibio mencion especial concurso fotografico gobierno Entre Rios" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935800/Carrousel_1_dbo5jm.jpg"
                            , title: "Hora dorada"
                            , desc: "Imagen que refleja el ocaso de cada dia" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935800/CollaudDesing_5_jnlutu.jpg"
                            , title: "Aca estoy"
                            , desc: "Esta imagen evoca un recuerdo de cada 30 de noviembre. Ahi esta la nona Plasida" },
                            
                    ].map((item, i) => (
                        <div key={i} className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg">

                       
                        <img src={item.src} alt={item.title} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-sm">{item.desc}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                <motion.div/>

        </div>
    )
}