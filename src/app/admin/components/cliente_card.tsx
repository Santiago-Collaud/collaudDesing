import React, { useState } from "react";
import Link from "next/link";
import { Cliente } from "@/interface/cliente";
import { useUpdateCliente } from "../components/hook/useUpdateCliente";

interface Props {
  cliente: Cliente;
}

export default function ClienteCard({ cliente }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);

  const { updateCliente, error } = useUpdateCliente();

  // Estado local del formulario
  const [formData, setFormData] = useState({
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    username: cliente.username,
    email: cliente.email,
    active: cliente.active,
    pass: "", // opcional para actualizar
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

  const payload = {
    id: cliente.id,
    ...formData,
  };

  //console.log("Datos a enviar:", payload);

  const ok = await updateCliente(payload);

if (ok) {
  setShowEditModal(false);
  alert("Cliente actualizado!");
} else {
  alert(error || "Error al actualizar");
}


};
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <div className="border rounded-t-md p-2 mb-2">
          <h2>cliente</h2>
          <h2 className="text-center font-bold text-lg">
            {cliente.nombre} {cliente.apellido}
          </h2>
        </div>
        <div className="border p-2 mb-2">
          <h2>Nombre de usuario</h2>
          <h3 className="text-center font-bold text-lg">
            {cliente.username}
          </h3>
        </div>
        <div className="border p-2 mb-2">
          <p>
            Estado: {" "}
              <strong style={{ color: cliente.active ? "green" : "red" }}>
                {cliente.active ? "Activo" : "Inactivo"}
              </strong>
          </p>
        </div>
      
        <div className="border rounded-b-md p-2 mb-2">
          <p>Creado: {new Date(cliente.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      
      

      {/* Botón Ver eventos */}
      <div className="card-actions justify-end mb-4 px-4">
        <Link href={`/admin/clientes/${cliente.id}`}>
          <button className="btn btn-neutral"
          >
            Ver eventos
          </button>
        </Link>

        {/* Botón Editar */}
        <button
          onClick={() => setShowEditModal(true)}
          className="btn btn-neutral"
        >
          Editar  
        </button>
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
            <h1 className="border-b text-xl pb-2">Editar cliente</h1>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Nombre</legend>
                <input 
                  type="text" 
                  className="input" 
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange} />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Apellido</legend>
                <input 
                  type="text" 
                  className="input" 
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={handleChange} />
              </fieldset>
              
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Usuario</legend>
                <input 
                  type="text" 
                  className="input" 
                  name="usuario"
                  placeholder="Usuario"
                 value={formData.username}
                  onChange={handleChange} />
              </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input 
                  type="text" 
                  className="input" 
                  name="email"
                  placeholder="Email"
                 value={formData.email}
                  onChange={handleChange} />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Nueva contraseña (opcional)</legend>
                <input 
                  type="password" 
                  className="input" 
                  name="pass"
                  placeholder="Nueva contraseña"
                  value={formData.pass}
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

