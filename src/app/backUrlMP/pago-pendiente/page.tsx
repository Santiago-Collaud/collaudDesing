"use client";
import NavBar from "@/app/componetes/navBarCliente/navCliente";
import { motion } from "framer-motion";

export default function PagoExitoso() {
  return (
    <div className=" text-center">
        <NavBar />
        
        <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeIn" }}
                    >
                        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
                            <img src="/icon/pago-pendiente.gif" 
                                alt="pago_pendiente" 
                                className="size-100 rounded-full bg-radial bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"/>
                            <h1 className="text-2xl font-bold text-red-600">
                                Pago pendiente
                            </h1>
                        </div>
                    </motion.div>
      <p className="mt-4">
        Tu pago esta en proceso de verificación por el prestador de servicios de pago.
      </p>
      <p className="mt-4 mb-4">
        Vuelve a entrar a la aplicación en unos minutos para ver los cambios.
      </p>
      <div>
        <button
          onClick={() => window.location.href = '/download'} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Volver a iniciar la sesión
          </button>      
      </div>
    </div>
  );
}