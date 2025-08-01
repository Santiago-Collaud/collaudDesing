"use client";
import { Typewriter } from 'react-simple-typewriter';


export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-700 to-purple-900 rounded-tl-2xl rounded-br-2xl shadow-2xl flex items-center justify-center p-10">
      <div className="grid grid-cols-2 gap-10 w-full max-w-7xl">
        {/* Columna izquierda: textos animados */}
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-white mb-4">COLLAUD is</h1>
          <span className="text-pink-400 text-5xl font-mono mb-6">
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

        {/* Columna derecha: frases una debajo de la otra */}
        <div className="flex flex-col justify-center">
          <p className="text-3xl text-gray-300 mb-4">
            Hacemos que tus ideas cobren vida.
          </p>
          <p className="text-lg text-gray-400">
            ¿Estás listo para llevar tu presencia en línea al siguiente nivel?
          </p>
          <p className="text-lg text-gray-400">
            Si pensaste <strong>que estas preparado</strong>, aca estamos nosotros para ayudarte y ser parte de tu equipo.
          </p>
          <p className="text-lg text-gray-400">
            Somos una empresa joven que tiene una gran variedad de servicios para ofrecerte, desde fotografia de productos e institucional
            hasta desarrollo de aplicaciones web y móviles.
            Hacemos videos para redes sociales, marketing digital y mucho más.
          </p>
          <p className="text-lg text-gray-400">
            Estamos cerca tuyo y queremos ayudarte a crecer.
          </p>
            <p className="text-lg text-gray-400">
                <strong>¡Contáctanos!</strong>
            </p>
            <p className="text-lg text-gray-400">
                Mira para arriba 👆🏽 y fijate que hacemos en LUX, VOX o NEXO.
            </p>
            
        </div>
      </div>
    </div>
  );
}
