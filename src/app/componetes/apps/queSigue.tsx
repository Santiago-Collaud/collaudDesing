"use client"
import { sendGAEvent } from '@next/third-parties/google'

export default function QueSigueViewer() {
    return (
        <div>
            <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                <img alt="" src="/icon/queSigue/icons/queSigue-logo-192.png" 
                className="h-56 w-full object-cover" />

                <div className="p-4 sm:p-6">
                    
                    <h3 className="text-lg font-medium text-gray-900">
                    Las listas de temas en la palma de tu mano
                    </h3>

                    <h3 className="text-lg font-medium text-gray-900">
                    Que Sigue visor
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        QueSigue es la aplicación que te permite crear y gestionar listas de temas de manera sencilla y eficiente. <br />
                        Con nuestra plataforma intuitiva, podrás organizar tus ideas, tareas y proyectos en un solo lugar, 
                    </p>

                    <a 
                        href="https://quesigue.vercel.app/" 
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