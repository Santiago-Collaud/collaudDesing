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
    <div
      style={{
        border: "1px solid #ccc",
        padding: 2,
        borderRadius: 8,
        marginBottom: 12,
        background: "#1a1a1aff",
        height: 200,
        width: 300,
      }}
    >
      <h2>
        {cliente.nombre} {cliente.apellido}
      </h2>
      <h3>{cliente.username}</h3>

      <p>
        Estado:{" "}
        <strong style={{ color: cliente.active ? "green" : "red" }}>
          {cliente.active ? "Activo" : "Inactivo"}
        </strong>
      </p>

      <p>Creado: {new Date(cliente.created_at).toLocaleDateString()}</p>

      {/* Botón Ver eventos */}
      <Link href={`/admin/clientes/${cliente.id}`}>
        <button
          style={{
            marginTop: 2,
            padding: "6px 12px",
            borderRadius: 6,
            border: "none",
            background: "#0070f3",
            color: "white",
            cursor: "pointer",
          }}
        >
          Ver eventos
        </button>
      </Link>

      {/* Botón Editar */}
      <button
        onClick={() => setShowEditModal(true)}
        style={{
          display: "block",
          marginTop: 10,
          padding: "6px 12px",
          borderRadius: 6,
          border: "none",
          background: "#ffaa00",
          color: "black",
          cursor: "pointer",
        }}
      >
        Editar  
      </button>

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
            <h3>Editar cliente</h3>

            <form onSubmit={handleSubmit}>
            <h3>Nombre</h3>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                style={{ width: "100%", marginTop: 8 }}
              />

              <h3>Apellido</h3>
              <input
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                style={{ width: "100%", marginTop: 8 }}
              />

              <h3>Usuario</h3>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Usuario"
                style={{ width: "100%", marginTop: 8 }}
              />

              <h3>Email</h3>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                style={{ width: "100%", marginTop: 8 }}
              />

              <h3>Nueva contraseña (opcional)</h3>
              <input
                name="pass"
                value={formData.pass}
                onChange={handleChange}
                placeholder="Nueva contraseña (opcional)"
                type="password"
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

