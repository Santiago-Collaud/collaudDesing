import { useState } from "react";

export function useUpdateCliente() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCliente = async (clienteData: unknown) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/clientes/updateCliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al actualizar cliente");
        return false;   // ❌ error
      }

      return true;       // ✅ éxito
    } catch (err) {
      console.error(err);
      setError("Error de conexión");
      return false;       // ❌ error
    } finally {
      setLoading(false);
    }
  };

  return { updateCliente, loading, error };
}
