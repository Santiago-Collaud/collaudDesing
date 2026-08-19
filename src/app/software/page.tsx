// PAGINA PARA VER Y DESCARGAR MIS SOFTWARES
"use client";

import { motion } from "framer-motion";

import NavBar from "../componetes/navbar/nav";
import Turnit from "../componetes/apps/turnit";
import PPT from "../componetes/apps/PPT";
import QueSigue from "../componetes/apps/queSigue";
import QueSigueCredator from "../componetes/apps/queSigueCredator";

export default function SoftwarePage() {
  return (
    <div className="min-h-screen bg-gray-900">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
      >

        <NavBar />

        <main className="px-6 py-10 md:px-10 lg:px-16">

          {/* INTRODUCCIÓN */}

          <div className="mx-auto max-w-7xl">

            <h1 className="mb-4 text-2xl font-bold text-white md:text-4xl">
              Software a medida
            </h1>

            <p className="border-t border-gray-600 pt-5 text-gray-300 leading-relaxed">
              Nos especializamos en el desarrollo de software a medida para
              satisfacer las necesidades específicas de nuestros clientes.
              Nuestro equipo de expertos en desarrollo de software trabaja
              estrechamente con cada cliente para comprender sus requisitos y
              crear soluciones personalizadas que impulsen su éxito.
            </p>

            {/* SERVICIOS */}

            <div className="mt-6 mb-10 grid gap-2 text-sm md:grid-cols-2 md:text-base">

              <div className="text-gray-300">
                <span className="mr-2 text-gray-500">—</span>
                Sistemas SaaS.
              </div>

              <div className="text-gray-300">
                <span className="mr-2 text-gray-500">—</span>
                Aplicaciones web y móviles.
              </div>

              <div className="text-gray-300">
                <span className="mr-2 text-gray-500">—</span>
                Landing pages y websites.
              </div>

              <div className="text-gray-300">
                <span className="mr-2 text-gray-500">—</span>
                Sistemas de gestión.
              </div>

            </div>

            {/* SOFTWARE */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
            >

              <div
                className="
                  grid
                  grid-cols-1
                  gap-8
                  sm:grid-cols-2
                  xl:grid-cols-3
                "
              >

                <div className="h-full transition-transform duration-300 hover:-translate-y-1">
                  <QueSigue />
                </div>

                <div className="h-full transition-transform duration-300 hover:-translate-y-1">
                  <QueSigueCredator />
                </div>

                <div className="h-full transition-transform duration-300 hover:-translate-y-1">
                  <Turnit />
                </div>

                <div className="h-full transition-transform duration-300 hover:-translate-y-1">
                  <PPT />
                </div>

              </div>

            </motion.div>

          </div>

        </main>

      </motion.div>

    </div>
  );
}