"use client";

import { useEffect, useState } from "react";
import { Cliente } from "@/interface/cliente";

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/clientes/getClient", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al obtener clientes");

      const data = await res.json();
      setClientes(data || []);

      console.log("Clients fetched:", data.clientes);

    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
    console.log("Fetching clients...");
  }, []);

  return {
    clientes,
    loading,
    error,
    refetch: fetchClientes,
  };
}
