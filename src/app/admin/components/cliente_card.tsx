import React from "react";
import Link from "next/link";
import { Cliente } from "@/interface/cliente";

interface Props {
  cliente: Cliente;
}

export default function ClienteCard({ cliente }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        background: "#1a1a1aff",
        height: 200,
        width: 300,
      }}
    >
      <h2>{cliente.nombre} {cliente.apellido}</h2>
      <h3>{cliente.username}</h3>
      {/*<p>ID: {cliente.id}</p>*/}
      <p>
        Estado:{" "}
        <strong style={{ color: cliente.active ? "green" : "red" }}>
          {cliente.active ? "Activo" : "Inactivo"}
        </strong>
      </p>
      <p>Creado: {new Date(cliente.created_at).toLocaleDateString()}</p>

      <Link href={`/admin/clientes/${cliente.id}`}>
        <button
          style={{
            marginTop: 10,
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
    </div>
  );
}
