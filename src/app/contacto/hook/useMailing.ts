"use client";
import { useState } from "react";
import { MailData } from "../../../interface/mail"
import { validateMailData } from "../../../validations/validarMail";


export default function useMailing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendMail = async ({ nombre, email, mensaje }: MailData) => {
    const errores = validateMailData({ nombre, email: email, mensaje });

    if (errores.length > 0) {
    setError(errores.join(" | ")); // Mostrás los errores en tu UI
    return;
  }
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const res = await fetch("/api/mailing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, mensaje }),
      });

      if (!res.ok) throw new Error("Error al enviar el mensaje");

      await res.json();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return { sendMail, loading, error, success };
}
