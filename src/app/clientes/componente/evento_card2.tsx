"use client";
import React from "react";
import { Evento } from "../../../interface/evento";

export default function EventoCard2({ evento }: { evento: Evento }) {
  
  return (
    <div className="card w-96 shadow-sm">
        <div className="bg-white grid sm:grid-cols-2 items-center border border-gray-200 shadow-md w-full max-w-2xl max-sm:max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
        <div className="min-h-[280px] h-full hover:scale-105 transition-transform duration-500 ease-in-out overflow-hidden">
          <img 
            src={evento.preview_url} 
            className="w-full h-full object-cover" 
            alt="preview"/>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-slate-900">{evento.tituloEvento}</h3>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            {evento.comentario || "No hay comentario."}
          </p>
          
          <div className="flex flex-wrap items-center cursor-pointer w-full mt-4 gap-4 mb-4">
            {evento.link_drive && (
                <p>
                  <a href={evento.link_drive} target="_blank">
                    <button type="button"
                      className="px-5 py-2.5 flex items-center justify-center rounded-sm cursor-pointer text-white text-sm tracking-wider font-medium border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600">
                      Ver archivo
                      <svg xmlns="http://www.w3.org/2000/svg" width="16px" fill="currentColor" className="ml-2 inline" viewBox="0 0 24 24">
                        <path
                          d="M12 16a.749.749 0 0 1-.542-.232l-5.25-5.5A.75.75 0 0 1 6.75 9H9.5V3.25c0-.689.561-1.25 1.25-1.25h2.5c.689 0 1.25.561 1.25 1.25V9h2.75a.75.75 0 0 1 .542 1.268l-5.25 5.5A.749.749 0 0 1 12 16zm10.25 6H1.75C.785 22 0 21.215 0 20.25v-.5C0 18.785.785 18 1.75 18h20.5c.965 0 1.75.785 1.75 1.75v.5c0 .965-.785 1.75-1.75 1.75z"
                          data-original="#000000" />
                      </svg>
                    </button>
                  </a>
                </p>
              )}
                {evento.link_supa && (
                  <p>
                    <a href={evento.link_supa} target="_blank">  
                    <button type="button"
                      className="px-5 py-2.5 flex items-center justify-center rounded-sm cursor-pointer text-white text-sm tracking-wider font-medium border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600">
                      Download
                      <svg xmlns="http://www.w3.org/2000/svg" width="16px" fill="currentColor" className="ml-2 inline" viewBox="0 0 24 24">
                        <path
                          d="M12 16a.749.749 0 0 1-.542-.232l-5.25-5.5A.75.75 0 0 1 6.75 9H9.5V3.25c0-.689.561-1.25 1.25-1.25h2.5c.689 0 1.25.561 1.25 1.25V9h2.75a.75.75 0 0 1 .542 1.268l-5.25 5.5A.749.749 0 0 1 12 16zm10.25 6H1.75C.785 22 0 21.215 0 20.25v-.5C0 18.785.785 18 1.75 18h20.5c.965 0 1.75.785 1.75 1.75v.5c0 .965-.785 1.75-1.75 1.75z"
                          data-original="#000000" />
                      </svg>
                    </button>
                    </a>
                  </p>
                )}
          </div>
          <p className="text-black">
              Estado:{" "}
              <strong style={{ color: evento.active ? "green" : "red" }}>
                {evento.active ? "Activo" : "Inactivo"}
              </strong>
            </p>
            <p className="text-sm text-black mt-2">Fecha: {new Date(evento.created_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
