"use client";
import React from "react";
import { Evento } from "../../../interface/evento";
import { useState } from "react";
import { useUpdateEvento } from "../components/hook/useUpdateEvento";

export default function EventoCard({ evento }: { evento: Evento }) {
  const [showEditModal, setShowEditModal] = useState(false);
   
    const { updateEvento, error } = useUpdateEvento();
  
    // Estado local del formulario
    const [formData, setFormData] = useState({
      cliente_id: evento.id_cliente || "",
      tituloEvento: evento.tituloEvento || "",
      comentario: evento.comentario || "",
      link_drive: evento.link_drive || "",
      link_supa: evento.link_supa || "",
      preview_url: evento.preview_url || "",
      active: evento.active ?? true,
      estado_pago: evento.estado_pago || "pendiente",
      link_MP: evento.link_mp || "",
      precio: evento.precio || 0,
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

    //console.log("Datos a enviar:", payload); OK

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
      <h2 className="card-title justify-center border-b-5 text-xl font-bold mb-4 mt-4 uppercase"> {evento.tituloEvento}</h2>
      <button 
      onClick={() => setShowEditModal(true)}
      className="btn btn-soft">editar evento</button>
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
            <h2>Precio: ${evento.precio || "0"}</h2>
            <p>
              Estado de pago:{" "}
              <strong
                style={{
                  color:
                    evento.estado_pago === "pagado"
                      ? "green"
                      : evento.estado_pago === "impago"
                      ? "red"
                      : "orange",
                }}
              >
                {evento.estado_pago}
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
            <h3 className="border-b-4">Editar Evento</h3>

            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Titulo Evento</legend>
                  <input 
                    type="text" 
                    className="input" 
                    name="tituloEvento"
                    placeholder="Titulo evento"
                    value={formData.tituloEvento}
                    onChange={handleChange} />
                </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Comentario</legend>
                  <input 
                    type="text" 
                    className="input" 
                    name="comentario"
                    placeholder="Comentario"
                    value={formData.comentario}
                    onChange={handleChange} />
                </fieldset>
              

              <fieldset className="fieldset">
                <legend className="fieldset-legend">link Drive</legend>
                  <input 
                    type="text" 
                    className="input" 
                    name="link_drive"
                    placeholder="Link Drive"
                    value={formData.link_drive}
                    onChange={handleChange} />
                </fieldset>

              
              <fieldset className="fieldset">
                <legend className="fieldset-legend">link Supabase</legend>
                  <input 
                    type="text" 
                    className="input" 
                    name="link_supa"
                    placeholder="Link Supabase"
                    value={formData.link_supa}
                    onChange={handleChange} />
                </fieldset>
              
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Preview</legend>
                  <input 
                    type="text" 
                    className="input" 
                    name="preview_url"
                    placeholder="Preview URL"
                    value={formData.preview_url}
                    onChange={handleChange} />
                </fieldset>

              <label style={{ marginTop: 10, display: "block" }}>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />{" "}
                Activo
              </label>

              <label style={{ marginTop: 10, display: "block" }}>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Estado de pago</legend>

                  <select
                    name="estado_pago"
                    className="select"
                    value={formData.estado_pago}
                    onChange={handleChange}
                  >
                    <option value="impago">Impago</option>
                    <option value="pagado">Pagado</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                </fieldset>
              </label>

            {formData.estado_pago === "impago" && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Precio</legend>
                  <input 
                    type="number" 
                    className="input" 
                    name="precio"
                    placeholder="0"
                    value={formData.precio}
                    onChange={handleChange} 
                    min={0}
                    max={1000000}/>
                </fieldset>
            )}
              


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
