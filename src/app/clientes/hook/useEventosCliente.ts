"use client";

import { useEffect, useState } from "react";
import { Evento } from "@/interface/evento";

export function useEventosCliente() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/clientes/getData", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al obtener clientes");
      
      const data = await res.json();
      setEventos(data || []);

      //console.log("Clients fetched:", data.activos);

    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
    //console.log("Fetching clients...");
  }, []);

  return {
    eventos,
    loading,
    error,
    refetch: fetchClientes,
  };
}
