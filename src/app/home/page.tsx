"use client";
import Image from "next/image";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Lux from "../componetes/lux/page";
import Nexo from "../componetes/nexo/page";
import Vox from "../componetes/vox/page";
import AboutMe from "../componetes/aboutMe/aboutMe";
import Footer from "../componetes/footer/footer";
import Hero from "../componetes/hero/hero";

export default function Home(){
    //const [showModal, setShowModal] = useState(false);
    const [activeSection, setActiveSection] = useState<"lux" | "nexo" | "vox" | "hero" | null>(null);
    const router = useRouter();
    

    // Al montar el componente, mostrar primero "hero"
    useEffect(() => {
    setActiveSection("hero");
    }, []);
    
    
    return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            >
        <div>
            <div>
                <div className="navbar bg-white shadow-sm">
                    <div className="navbar-start">
                        <Image
                            src="/icon/CollaudDesing_Letras.png"
                            alt="Logo"
                            width={300}
                            height={200}
                            className="rounded-xl p-2"
                        />
                    </div>
                    
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-gray-700 font-semibold">
                            <li><button onClick={() => setActiveSection("vox")}>VOX</button></li>
                            <li><button onClick={() => setActiveSection("nexo")}>NEXO</button></li>
                            <li><button onClick={() => setActiveSection("lux")}>LUX</button></li>
                        </ul>
                    </div>

                    
                <div className="navbar-end mr-10">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle bg-gradient-to-r from-blue-300 to-sky-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-900 rounded-box  shadow">
                        <div className="lg:hidden">
                            <li><button onClick={() => setActiveSection("vox")}>VOX</button></li>
                            <li><button onClick={() => setActiveSection("nexo")}>NEXO</button></li>
                            <li><button onClick={() => setActiveSection("lux")}>LUX</button></li>
                        </div>
                        <li><a><button onClick={() => router.push("/contacto")}>Contacto</button></a></li>
                        <li><a><button onClick={() => router.push("/galeria")}>Galeria</button></a></li>
                        <li><a><button onClick={() => router.push("/download")}>Descargas</button></a></li>
                        {/*<li><a><label htmlFor="my_modal_6">Sobre Mi</label></a></li>*/}

                    </ul>
                    </div>
                </div>
                </div>
                
                {/* Contenido dinámico debajo de navbar */}
                <div className="pl-8 pr-8 pt-4 min-h-[300px]">
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
                    <div className="pt-10 pb-8">
                        <AboutMe />
                    </div>
                </div>
                {/* FOOTER */}
                </div>
                    <Footer/>
                </div>

                {/* Modal Sobre Mi 
                <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                    <div className="modal" role="dialog">
                    <div className="modal-box">
                        <AboutMe />
                        <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn">Close!</label>
                        </div>
                    </div>
                </div> */}
        </motion.div>
        
    );
}