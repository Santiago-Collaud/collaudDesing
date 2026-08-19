"use client";

import { sendGAEvent } from "@next/third-parties/google";

export default function QueSigueCredator() {
  return (
    <div className="h-full">

      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">

        {/* LOGO */}

        <div className="flex h-32 w-full items-center justify-center bg-gray-900 px-8">
          <img
            alt="queSigue Creator"
            src="/icon/queSigue/icons/queSigue-texto.png"
            className="max-h-20 w-auto max-w-[80%] object-contain"
          />
        </div>

        {/* CONTENIDO */}

        <div className="flex flex-1 flex-col p-4 sm:p-6">

          <h3 className="text-lg font-medium text-gray-900">
            Página para administrar las listas de temas de QueSigue
          </h3>

          <h3 className="mt-1 text-lg font-medium text-gray-900">
            QueSigue Creator
          </h3>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            QueSigue es la aplicación que te permite crear y gestionar listas
            de temas de manera sencilla y eficiente.
            <br />
            Con nuestra plataforma intuitiva, podrás organizar tus ideas,
            tareas y proyectos en un solo lugar.
          </p>

          <a
            href="https://www.santiagocollaud.com.ar/quesigue"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-blue-600"
            onClick={() =>
              sendGAEvent("event", "Abrir-QueSigue-Creator", {
                source: "portfolio",
              })
            }
          >
            Abrir
          </a>

        </div>

      </article>

    </div>
  );
}