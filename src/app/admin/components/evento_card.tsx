import React from "react";
import { Evento } from "../../../interface/evento";

export default function EventoCard({ evento }: { evento: Evento }) {
  return (
    <div
      style={{
        border: "1px solid #aaa",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        background: "#070707ff",
      }}
    >
      <h3>{evento.tituloEvento}</h3>

      <img
        src={evento.preview_url}
        alt="preview"
        style={{ width: 200, borderRadius: 6, marginBottom: 10 }}
      />

      <p>Comentario: {evento.comentario || "—"}</p>

      {evento.link_drive && (
        <p>
          Drive:{" "}
          <a href={evento.link_drive} target="_blank">
            <button className="btn btn-primari">Ver archivo</button>
            
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

      <p>
        Estado:{" "}
        <strong style={{ color: evento.active ? "green" : "red" }}>
          {evento.active ? "Activo" : "Inactivo"}
        </strong>
      </p>

      <p>Fecha: {new Date(evento.created_at).toLocaleString()}</p>
    </div>
  );
}
