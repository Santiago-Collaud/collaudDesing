//useCrearPagos.ts hook para crear pagos en Mercado Pago
"use client";

import { useState } from "react";

interface CrearPagoParams {
  eventoId: string;
}

export function useCrearPago() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crearPago = async ({ eventoId }: CrearPagoParams) => { 
    setLoading(true);
    setError(null);

    console.log("Creando pago para eventoId:", eventoId);

    try {
      const res = await fetch("/api/mercadopago/crear_pago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventoId }),
      });

      if (!res.ok) {
        throw new Error("Error al crear el pago");
      }

      const data = await res.json();

      if (!data.init_point) {
        throw new Error("No se recibió link de pago");
      }

      // Redirección a Mercado Pago
      window.location.href = data.init_point;

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return { crearPago, loading, error };
}
