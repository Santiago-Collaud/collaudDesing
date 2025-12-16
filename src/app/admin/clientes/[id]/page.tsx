"use client";
import { useEffect, useState , useCallback } from "react";

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

  const fetchCliente = useCallback(async () => {
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
}, [id]);


  useEffect(() => {
    fetchCliente();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!cliente) return <p>No se encontró el cliente</p>;

  return (
    <main >
      <NavBar />
      <h1 className="text-lg mt-4 mb-4 ml-4">Cliente: {cliente.username}</h1>
      <button
        onClick={() => router.push(`/admin/clientes/${id}/eventos/new`)}
        className="btn btn-soft btn-success"
      >
        + Crear evento
      </button>
      <button
          onClick={() => router.push("/admin")}
          className="btn btn-soft btn-success"
          >
          Administrador
      </button>

      {cliente.eventos.length === 0 && <p>Este cliente no tiene eventos.</p>}

      <div className="grid grid-cols-2 gap-4 border-t pt-4 mt-4">
        {cliente.eventos.map((ev) => (
                <EventoCard key={ev.id} evento={ev}/>
              ))}  
      </div>
    </main>
  );
}
