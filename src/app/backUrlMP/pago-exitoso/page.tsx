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
                            <img src="/icon/SmartphonePayment.gif" 
                                alt="pago_exitoso" 
                                className="size-100 rounded-full bg-radial bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"/>
                            <h1 className="text-2xl font-bold text-green-600">
                                Pago recibido
                            </h1>
                        </div>
                    </motion.div>
      <p className="mt-4">
        Estamos procesando tu pago. En breve se actualizará el evento.
      </p>
      <p className="mt-4 mb-4">
        Vuelve a entrar a la aplicación para ver los cambios.
      </p>
    </div>
  );
}