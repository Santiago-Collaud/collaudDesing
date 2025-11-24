"use client";

import { useState } from "react";

export interface CreateClienteInput {
  username: string;
  pass: string;
  active: boolean;
  nombre?: string;
  apellido?: string;
  mail?: string;
}

export function useCreateCliente() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createCliente = async (data: CreateClienteInput) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/clientes/CreateClient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Error al crear cliente");
      }

      setSuccess(true);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCliente,
    loading,
    error,
    success,
  };
}
