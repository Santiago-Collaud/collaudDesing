
import { motion } from "framer-motion";

export default function Lux() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center p-8 gap-8">
      {/* Fondo animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-rose-100 z-0"
      />
      
      {/* Contenedor principal: videos a la izquierda, imagen a la derecha */}
      <div className="z-10 md:flex-row w-full gap-8 mt-20">
        {/* Videos */}
        <div >
          <div>
            <iframe
              width="100%"
              height="300"
              className="hover:scale-105 transition-transform duration-300 
              rounded-lg bg-sky-700 rounded-2xl shadow-sm shadow-sky-500 outline outline-slate-400 -outline-offset-8"
              src="https://www.youtube.com/embed/-qSTJ1Ny6-g"
              title="YouTube video 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <div className="mt-2 mb-4 gap-4 bg-white p-2 rounded-lg shadow-md">
              <h3 className="text-black">Campo y Liebre - Nicolas Muller</h3>
              <p className="text-black text-sm font-bold">Realizamos la producción, grabación y post producción de audio y video</p>
            </div>
            
          </div>
          
          <div>
            <iframe
            width="100%"
            height="300"
            className="hover:scale-105 transition-transform duration-300 
              rounded-lg bg-sky-700 rounded-2xl shadow-sm shadow-sky-500 outline outline-slate-400 -outline-offset-8"
            src="https://www.youtube.com/embed/Gk0v5Nhz2vM"
            title="YouTube video 2"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
            <div className="mt-2 mb-4 gap-4 bg-white p-2 rounded-lg shadow-md">
              <h3 className="text-black">Marcha de Entre Rios</h3>
              <p className="text-black text-sm font-bold">Realizamos la grabación en vivo de esta versión, producción y post producción de audio</p>
            </div>
          </div>
          
          <div>
            <iframe
            width="100%"
            height="300"
            className="hover:scale-105 transition-transform duration-300 
              rounded-lg bg-sky-700 rounded-2xl shadow-sm shadow-sky-500 outline outline-slate-400 -outline-offset-8"
            src="https://www.youtube.com/embed/3RlMySKmVbA?si=FtD9csmpwB7PZOqR"
            title="YouTube video 3"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="mt-2 mb-4 gap-4 bg-white p-2 rounded-lg shadow-md">
            <h3 className="text-black">Estancia Los Naranjos</h3>
            <p className="text-black text-sm font-bold">Realizamos la grabación, direccion y post produccion de imagen</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
