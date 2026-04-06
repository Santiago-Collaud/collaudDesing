"use client"
import { sendGAEvent } from '@next/third-parties/google'

export default function PPT() {
    return (
        <div>
            <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs ">
                <img alt="" src="/icon/PPT_icon.jpg" 
                className="h-56 w-full object-cover" />

                <div className="p-4 sm:p-6">
                    
                    <h3 className="text-lg font-medium text-gray-900">
                            Jugamos?
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        Clasico de clasicos. <br />
                        Piedra, papel o tijera. <br />
                        El juego que ha entretenido a generaciones. <br />
                        ¿Quién ganará esta vez? <br />
                        
                    </p>
                    
                    <strong className="text-lg font-bold text-red-500 border-t border-b border-gray-600 mt-4 block">
                        DISPONIBLE UNICAMENTE PARA ANDROID
                    </strong>

                    <a 
                        href="https://github.com/Santiago-Collaud/piedra-papel-tijera/releases/download/v1.0.0/PPT-app.apk" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 ml-4"
                        onClick={() => sendGAEvent('event', 'Descargar-PPT', {
                            source: 'portfolio'
                        })}
                        >
                        Descargar e instalar
                    </a>
                    
                </div>
            </article>
        </div>
    );
}