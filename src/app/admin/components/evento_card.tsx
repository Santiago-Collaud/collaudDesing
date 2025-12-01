"use client";
import React from "react";
import { Evento } from "../../../interface/evento";
import { useState } from "react";
import { useUpdateEvento } from "../components/hook/useUpdateEvento";

export default function EventoCard({ evento }: { evento: Evento }) {
  const [showEditModal, setShowEditModal] = useState(false);
   
    const { updateEvento, loading, error } = useUpdateEvento();
  
    // Estado local del formulario
    const [formData, setFormData] = useState({
      cliente_id: evento.id_cliente || "",
      tituloEvento: evento.tituloEvento || "",
      comentario: evento.comentario || "",
      link_drive: evento.link_drive || "",
      link_supa: evento.link_supa || "",
      preview_url: evento.preview_url || "",
      active: evento.active ?? true,
    });
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value, type } = e.target;
  
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      });
    };
  
    
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { cliente_id, ...rest } = formData;

    const payload = {
      ...rest,
      id_cliente: cliente_id,
      id: evento.id,
    };

    //console.log("Datos a enviar:", payload);

    const ok = await updateEvento(payload);

  if (ok) {
    setShowEditModal(false);
    alert("Evento actualizado!");
  } else {
    alert(error || "Error al actualizar");
  }
  }
  
  return (
    <div className="card bg-base-100 w-96 shadow-sm m-4">
      <h2 className="card-title justify-center border-b-5 text-xl font-bold"> {evento.tituloEvento}</h2>
      <button 
      onClick={() => setShowEditModal(true)}
      className="btn btn-neutral">editar evento</button>
        <figure>
            <img
              src={evento.preview_url}
              alt="preview"
              style={{ width: 200, borderRadius: 6, marginBottom: 10 }}
              className="m-4"
            />
          </figure>
        <div className="card-body"> 
          <h2>{evento.comentario || "—"}</h2>
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
      {/* Modal */}
      {showEditModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#292929ff",
              padding: 20,
              borderRadius: 8,
              width: 350,
            }}
          >
            <h3>Editar Evento</h3>

            <form onSubmit={handleSubmit}>
            <h3>Titulo evento</h3>
              <input
                name="tituloEvento"
                value={formData.tituloEvento}
                onChange={handleChange}
                placeholder="Titulo evento"
                style={{ width: "100%", marginTop: 8 }}
              />

              <h3>Comentario</h3>
              <input
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                placeholder="Comentario"
                style={{ width: "100%", marginTop: 8 }}
              />

              <h3>Link Drive</h3>
              <input
                name="link_drive"
                value={formData.link_drive}
                onChange={handleChange}
                placeholder="Link Drive"
                style={{ width: "100%", marginTop: 8 }}
              />

              <h3>Link Supa</h3>
              <input
                name="link_supa"
                value={formData.link_supa}
                onChange={handleChange}
                placeholder="Link Supa"
                style={{ width: "100%", marginTop: 8 }}
              />

              <h3>Preview</h3>
              <input
                name="preview_url"
                value={formData.preview_url}
                onChange={handleChange}
                placeholder="Preview URL"
                type="text"
                style={{ width: "100%", marginTop: 8 }}
              />
              <h3>Activo</h3>
              <label style={{ marginTop: 10, display: "block" }}>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />{" "}
                Activo
              </label>

              <button
                type="submit"
                style={{
                  marginTop: 12,
                  width: "100%",
                  padding: 8,
                  background: "#0070f3",
                  border: "none",
                  borderRadius: 6,
                  color: "white",
                }}
              >
                Guardar cambios
              </button>

              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                style={{
                  marginTop: 8,
                  width: "100%",
                  padding: 8,
                  background: "#ccc",
                  border: "none",
                  borderRadius: 6,
                }}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
      </div>
  );
}
