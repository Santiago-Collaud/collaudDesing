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

  const handleDelete = async () => {

  const confirmar = window.confirm(
    "¿Eliminar este evento? Esta acción no se puede deshacer."
  );

  if (!confirmar) return;
  console.log("Eliminando evento con ID:", evento.id); // Agregado para depuración

  const res = await fetch("/api/evento/deleteEvento", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: evento.id,
    }),
  });

  if (res.ok) {
    alert("Evento eliminado");
    window.location.reload();
  } else {
    alert("No se pudo eliminar el evento");
  }
};
  
  return (
  <div className="card w-full min-w-0 max-w-full bg-base-100 shadow-sm">
    <h2 className="card-title mt-4 mb-4 justify-center border-b text-center text-lg sm:text-xl font-bold uppercase break-words px-3">
      {evento.tituloEvento}
    </h2>

    <div className="px-4">
      <button
        onClick={() => setShowEditModal(true)}
        className="btn btn-soft w-full"
      >
        Editar evento
      </button>
    </div>

    {evento.preview_url && (
      <figure className="px-4 pt-4">
        <img
          src={evento.preview_url}
          alt="Preview"
          className="h-auto w-full max-w-[200px] rounded-md object-contain"
        />
      </figure>
    )}

    <div className="card-body min-w-0 gap-3 p-4">
      <h3 className="font-semibold">Comentario</h3>

      <p className="w-full min-w-0 break-words rounded-lg border p-3 text-center whitespace-pre-wrap">
        {evento.comentario || "—"}
      </p>

      <div className="card-actions w-full min-w-0">
        <div className="w-full min-w-0 space-y-3 rounded-lg border p-3">
          {evento.link_drive && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>Drive</span>
              <a
                href={evento.link_drive}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full sm:w-auto"
              >
                Ver archivo
              </a>
            </div>
          )}

          {evento.link_supa && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>Archivo Supa</span>
              <a
                href={evento.link_supa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-full sm:w-auto"
              >
                Descargar
              </a>
            </div>
          )}
        </div>
      </div>

      <p className="break-words">
        Estado:{" "}
        <strong className={evento.active ? "text-green-600" : "text-red-600"}>
          {evento.active ? "Activo" : "Inactivo"}
        </strong>
      </p>

      <p className="break-words">
        Precio: <strong>${evento.precio || "0"}</strong>
      </p>

      <p className="break-words">
        Estado de pago:{" "}
        <strong
          className={
            evento.estado_pago === "pagado"
              ? "text-green-600"
              : evento.estado_pago === "impago"
                ? "text-red-600"
                : "text-orange-500"
          }
        >
          {evento.estado_pago}
        </strong>
      </p>

      <p className="break-words text-sm">
        Fecha: {new Date(evento.created_at).toLocaleString()}
      </p>
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
                onClick={handleDelete}
                style={{
                  marginTop: 20,
                  width: "100%",
                  padding: 8,
                  background: "#dc2626",
                  border: "none",
                  borderRadius: 6,
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Eliminar evento
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
