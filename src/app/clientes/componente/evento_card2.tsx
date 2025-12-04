"use client";
import React from "react";
import { Evento } from "../../../interface/evento";

export default function EventoCard({ evento }: { evento: Evento }) {
  
  return (
    <div className="card bg-base-100 w-96 shadow-sm m-4">
      <h2 className="card-title justify-center border-b-5 text-xl font-bold mb-4 mt-4 uppercase"> {evento.tituloEvento}</h2>
          <figure>
              <img
                src={evento.preview_url}
                alt="preview"
                style={{ width: 200, borderRadius: 6, marginBottom: 10 }} 
                className="m-4"
              />
          </figure>
        <div className="card-body"> 
          <h1>Comentario</h1>
          <h2 className="border rounded-lg m-4 text-center">{evento.comentario || "—"}</h2>
          <div className="card-actions">
            <div className="border p-4 rounded-lg w-full">
              {evento.link_drive && (
                <p>
                  Drive:{" "}
                  <a href={evento.link_drive} target="_blank">
                    <button className="btn btn-primary">Ver archivo</button>
                  </a>
                </p>
              )}
                {evento.link_supa && (
                  <p>
                    Archivo Supa:{" "}
                    <a href={evento.link_supa} target="_blank">
                      Descargar
                    </a>
                  </p>
                )}
              </div>
            </div>
            <p>
              Estado:{" "}
              <strong style={{ color: evento.active ? "green" : "red" }}>
                {evento.active ? "Activo" : "Inactivo"}
              </strong>
            </p>
            <p>Fecha: {new Date(evento.created_at).toLocaleString()}</p>
        </div>
    </div>
  );
}
