"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import useMailing from "./hook/useMailing";
import { Send, Rocket } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../componetes/footer/footer";
import { useRouter } from "next/navigation";
import NavBar from "../componetes/navbar/nav";


export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"error" | "success">("success");

  const router = useRouter();

  const { sendMail, loading, error, success } = useMailing();
 
    // efecto para manejar éxito
    useEffect(() => {
      if (success) {
        setToastType("success");
        setShowToast(true);

        // limpiar form
        setNombre("");
        setEmail("");
        setMensaje("");

        // delay de 1 segundo antes de redirigir
        const timer = setTimeout(() => {
          router.push("/home");
        }, 1000);

        return () => clearTimeout(timer); // cleanup por las dudas
      }
    }, [success, router]);

    // efecto para manejar error
    useEffect(() => {
      if (error) {
        setToastType("error");
        setShowToast(true);
      }
    }, [error]);


  const handleEnviar = async () => {
    await sendMail({ nombre, email, mensaje });
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000); // toast desaparece a los 4s
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div> 
    <NavBar />
        <section className="relative min-h-screen bg-black text-white px-6 py-12 overflow-hidden">
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src="https://res.cloudinary.com/ddvc5vscj/image/upload/v1755632579/pexels-nietjuhart-796602_bkwst1.jpg"
              alt="Contact"
              fill
              className="absolute inset-0 z-0 bg-cover bg-center"
            />
        </motion.div>
      <div className="w-full max-w-lg flex justify-center border rounded-lg shadow-lg bg-black/80 backdrop-blur-md xl:justify-start mt-4 p-8 pb-10 relative z-10">
        <div className="w-full max-w-lg">
          <h1 className="text-4xl md:text-5xl font-mono mb-4 tracking-tight text-white">
            Comenzamos a hablar?
          </h1>
          <p>Este es el momento de hacer realidad tus ideas </p>

          {/* Formulario */}
          <div className="mb-4 mt-4">
            <h5 className="mb-2">Nombre</h5>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded text-xl text-sky-950 px-2 py-1 w-full"
              placeholder="Nombre"
              required
            />
          </div>

          <div className="mb-4">
            <h5 className="mb-2">Mail</h5>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded text-xl text-sky-950 px-2 py-1 w-full"
              placeholder="Mail"
              required
            />
          </div>

          <div className="mb-4">
            <h5 className="mb-2">Mensaje</h5>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              maxLength={250}
              wrap="soft"
              className="bg-gray-100 border border-gray-200 rounded text-xl text-sky-950 px-2 py-1 w-full"
              placeholder="Escribe tu mensaje aquí..."
              required
            />
          </div>

          <button
            onClick={handleEnviar}
            disabled={loading}
            className="relative overflow-hidden bg-sky-500 hover:bg-sky-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg shadow-md flex items-center justify-center w-ful "
          >
            <AnimatePresence mode="wait">
              {!loading ? (
                <motion.span
                  key="text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <Send className="h-5 w-5" /> Enviar
                </motion.span>
              ) : (
                <motion.div
                  key="rocket"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: -40 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="flex items-center gap-2"
                >
                  <Rocket className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div className="absolute mt-8 botton-0 left-0 w-full z-10">
        <Footer />
      </div>
          
      {/* Toast flotante */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 justify-center px-4 py-2 rounded shadow-lg text-white z-50 ${
              toastType === "error" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {toastType === "error" ? `⚠️ ${error}` : "✅ Mensaje enviado"}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </div>
    
  );
}

