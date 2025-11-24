"use client";

import { useEffect, useState } from "react";

import EventoCard from "../../components/evento_card";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Evento } from "../../../../interface/evento";
import NavBar from "@/app/componetes/navbar/nav";

interface ClienteFull {
  id: string;
  username: string;
  active: boolean;
  created_at: string;
  eventos: Evento[];
}


export default function ClienteEventosPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [cliente, setCliente] = useState<ClienteFull | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCliente = async () => {
    try {
      const res = await fetch(`/api/clientes/getClienteById?id=${id}`, { 
    credentials: "include",

      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error");

      setCliente(data.cliente);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCliente();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!cliente) return <p>No se encontró el cliente</p>;

  return (
    <main style={{ padding: 24 }}>
      <NavBar />
      <h1>Cliente: {cliente.username}</h1>

      <h2>Eventos</h2>

      {cliente.eventos.length === 0 && <p>Este cliente no tiene eventos.</p>}

      {cliente.eventos.map((ev) => (
        <EventoCard key={ev.id} evento={ev} />
      ))}
      <button
        onClick={() => router.push(`/admin/clientes/${id}/eventos/new`)}
        style={{
          padding: "8px 14px",
          background: "green",
          color: "white",
          borderRadius: 6,
          marginBottom: 12,
        }}
      >
        + Crear evento
      </button>
    </main>
  );
}
