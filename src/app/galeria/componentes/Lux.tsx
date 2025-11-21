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
            className="absolute inset-0 z-0"
            />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935800/Carrousel_3_no5qb2.jpg"
                            , title: "Cabalgando"
                            , desc: "Esta imagen obtuvo el 3º lugar en el 13º concurso de fotografía del HCD de Hasenkamp - 2024" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935799/Carrousel_2_a7fnfh.jpg"
                            , title: "Nuestra bandera, nuestro equipo",
                              desc: "Esta imagen que obtuvo el 1º lugar en 3º concurso fotografico HCD Hasenkamp - 2016" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935800/CollaudDesing_6_mublnl.jpg",
                             title: "Energía libre", 
                             desc: "Imagen tomada en una noche de tormenta" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935800/Carrousel_4_eip1dk.jpg"
                            , title: "Soplo de verde"
                            , desc: "Fotografía que recibió mención especial concurso fotográfico del gobierno Entre Ríos" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935800/Carrousel_1_dbo5jm.jpg"
                            , title: "Hora dorada"
                            , desc: "Imagen que refleja el ocaso de cada día" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756935800/CollaudDesing_5_jnlutu.jpg"
                            , title: "Acá estoy"
                            , desc: "Esta imagen evoca un recuerdo de cada 30 de noviembre. Ahí esta la nona Placida" },
                            
                    ].map((item, i) => (
                        <div key={i} className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg">

                       
                        <Image src={item.src} alt={item.title} 
                            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        <h3 className="absolute text-lg font-bold text-black md:hidden m-2">{item.title}</h3>
                        <p className=" relative text-sm text-black md:hidden pt-8">{item.desc}</p>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h3 className="text-lg font-bold m-2">{item.title}</h3>
                            <p className="text-sm m-2">{item.desc}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                <motion.div/>

        </div>
    )
}