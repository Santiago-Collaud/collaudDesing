"use client";
import { Typewriter } from 'react-simple-typewriter';


export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-700 to-purple-900 rounded-tl-2xl rounded-br-2xl shadow-2xl flex items-center justify-center p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full max-w-7xl">
        
        {/* Columna izquierda: textos animados */}
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 md:mb-4">COLLAUD is</h1>
          <span className="text-pink-400 text-3xl md:text-5xl font-mono mb-4 md:mb-6">
            <Typewriter
              words={["Diseño", "Code", "Audio", "Video", "Marketing", "Imagen", "Web", "App", "UX/UI"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </div>

        {/* Columna derecha: textos explicativos */}
        <div className="flex flex-col justify-center space-y-3">
          <p className="text-base md:text-xl text-gray-300">
            Hacemos que tus ideas cobren vida.
          </p>
          <p className="text-sm md:text-lg text-gray-400">
            ¿Estás listo para llevar tu presencia en línea al siguiente nivel?
          </p>
          <p className="text-sm md:text-lg text-gray-400">
            Si pensaste <strong>que estás preparado</strong>, acá estamos nosotros para ayudarte y ser parte de tu equipo.
          </p>
          <p className="text-sm md:text-lg text-gray-400">
            Somos una empresa joven que tiene una gran variedad de servicios para ofrecerte: desde fotografía de productos e institucional hasta desarrollo de aplicaciones web y móviles.
            Hacemos videos para redes sociales, marketing digital y mucho más.
          </p>
          <p className="text-sm md:text-lg text-gray-400">
            Estamos cerca tuyo y queremos ayudarte a crecer.
          </p>
          <p className="text-sm md:text-lg text-gray-400 font-semibold">
            ¡Contáctanos!
          </p>
          <p className="text-sm md:text-lg text-gray-400">
            Mirá para arriba 👆🏽 y fijate qué hacemos en LUX, VOX o NEXO.
          </p>
        </div>
      </div>
    </div>
  );
}
