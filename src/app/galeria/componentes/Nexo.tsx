import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
export default function Nexo(){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center justify-center">
                <Image src="/icon/Nexo.png" 
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
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756939956/WhatsApp_Image_2025-09-03_at_7.50.56_PM_jwgant.jpg"
                            , title: "Sistema de Gestion para gimnasio - año 2025"
                            , desc: "Gestion de pagos, clientes, rutinas y gastos" },
                        { src: "https://res.cloudinary.com/ddvc5vscj/image/upload/v1756939955/WhatsApp_Image_2025-09-01_at_6.10.33_PM_lja6hu.jpg"
                            , title: "Aplicacion movil para gimnasio - año 2025",
                              desc: "Rutinas personalizadas, visualizacion de pagos y notificaciones" },
                            
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