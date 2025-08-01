"use client";
import Image from "next/image";
import Footer from "../componetes/footer/footer";
import Hero from "../componetes/hero/hero";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Lux from "../componetes/lux/page";
import Nexo from "../componetes/nexo/page";
import Vox from "../componetes/vox/page";
import { motion, AnimatePresence } from "framer-motion";

export default function Home(){
    const [activeSection, setActiveSection] = useState<"lux" | "nexo" | "vox" | "hero" | null>(null);
    const router = useRouter();
    

    // Al montar el componente, mostrar primero "hero"
    useEffect(() => {
    setActiveSection("hero");
    }, []);
    
    const handleModal = () => {
        //setShowModal(true);
        alert("Modal functionality is not implemented yet.");
    }
    
    return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            >
        <div>
            <div>
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="navbar-start">
                        <Image
                            src="/icon/CollaudDesing_Letras.png"
                            alt="Logo"
                            width={300}
                            height={200}
                            className="rounded-xl bg-gradient-to-b from-gray-300 to-gray-900 p-2"
                        />
                    </div>
                    
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><button onClick={() => setActiveSection("vox")}>VOX</button></li>
                            <li><button onClick={() => setActiveSection("nexo")}>NEXO</button></li>
                            <li><button onClick={() => setActiveSection("lux")}>LUX</button></li>
                        </ul>
                    </div>

                    
                <div className="navbar-end mr-10">
                     <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 mr-10 shadow">
                        <li><a><button onClick={() => router.push("/contacto")}>Contacto</button></a></li>
                        <li><a><button onClick={() => router.push("/galeria")}>Galeria</button></a></li>
                        <li><a><button onClick={handleModal}>Sobre Mi</button></a></li>
                        <div className="lg:hidden">
                            <li><button onClick={() => setActiveSection("vox")}>VOX</button></li>
                            <li><button onClick={() => setActiveSection("nexo")}>NEXO</button></li>
                            <li><button onClick={() => setActiveSection("lux")}>LUX</button></li>
                        </div>
                        
                    </ul>
                    </div>
                </div>
                </div>
                
                {/* Contenido dinámico debajo de navbar */}
                <div className="pl-8 pr-8 min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {activeSection === "hero" && (
                        <motion.div
                            key="hero"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Hero />
                        </motion.div>
                        )}
                        {activeSection === "vox" && (
                        <motion.div
                            key="vox"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Vox />
                        </motion.div>
                        )}
                        {activeSection === "nexo" && (
                        <motion.div
                            key="nexo"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Nexo />
                        </motion.div>
                        )}
                        {activeSection === "lux" && (
                        <motion.div
                            key="lux"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Lux />
                        </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {/* FOOTER */}
                </div>
                    <Footer/>
                </div>
        </motion.div>
    );
}