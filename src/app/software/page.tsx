//PAGINA PARA VER Y DESCARGAR mis softwares
"use client"
import { motion, AnimatePresence } from "framer-motion";

import NavBar from '../componetes/navbar/nav';
import Turnit from '../componetes/apps/turnit';
import PPT from "../componetes/apps/PPT";

export default function SoftwarePage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <NavBar />
        <div className="p-8 bg-gray-900">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 ">Software a medida</h1>
          <p className='border-t border-gray-600'>
            Nos especializamos en el desarrollo de software a medida para satisfacer las necesidades específicas de nuestros clientes. Nuestro equipo de expertos en desarrollo de software trabaja estrechamente con cada cliente para comprender sus requisitos y crear soluciones personalizadas que impulsen su éxito.
          </p>
          <br />
          <h2 className="text-xl md:text-xl text-gray-300  border-gray-600">- Sistemas SaaS.</h2>
          <h2 className="text-xl md:text-xl text-gray-300  border-gray-600">- aplicaciones web y móviles.</h2>
          <h2 className="text-xl md:text-xl text-gray-300  border-gray-600">- Landing pages y websites.</h2>
          <h2 className="text-xl md:text-xl text-gray-300 mb-6 border-b border-gray-600">- Sistemas de gestión.</h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 flex-wrap gap-6 sm:grid-cols-2">
                <div className="hover:scale-105 transition-transform duration-300">
                  <Turnit />
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <PPT />
                </div>
                
                
              </div>
              
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}     