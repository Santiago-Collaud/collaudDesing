//PAGINA PARA VER Y DESCARGAR mis softwares
"use client"
import { Typewriter } from 'react-simple-typewriter';
import { motion, AnimatePresence } from "framer-motion";

import NavBar from '../componetes/navbar/nav';
import Turnit from '../componetes/apps/turnit';

export default function SoftwarePage() {
    return (
        <div>
            <NavBar/> 
          <div className="p-8 bg-gray-900">
            <span className="text-pink-400 text-3xl md:text-5xl font-mono mb-4 md:mb-6 flex items-center justify-center">
                        <Typewriter
                          words={["software", "apps", "proyectos", "desarrollo", "tecnología", "innovación"]}
                          loop={0}
                          cursor
                          cursorStyle="_"
                          typeSpeed={70}
                          deleteSpeed={50}
                          delaySpeed={1000}
                        />
                      </span>   
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <Turnit />
                    </motion.div>
              
            </div>
          </div>  
        </div>
    );
}     