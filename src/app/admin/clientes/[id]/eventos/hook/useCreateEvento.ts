"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateEventoPayload {
  tituloEvento: string;
  comentario?: string;
  previewFile: File;
  archivoSupa?: File | null;
  link_drive?: string | null;
  cliente_id: string;
}

export function useCreateEvento() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPreview = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload/upload_preview", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) throw new Error("Error subiendo preview");
    const data = await res.json();
    return data.url;
  };

  const uploadSupa = async (file: File | null) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload_supa", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) throw new Error("Error subiendo archivo supa");
    const data = await res.json();
    return data.url;
  };

  const createEvento = async (payload: CreateEventoPayload) => {
    try {
      setLoading(true);
      setError(null);

      // 1) Preview obligatorio
      const preview_url = await uploadPreview(payload.previewFile);

      // 2) SUPA opcional
      const link_supa = await uploadSupa(payload.archivoSupa || null);

      // 3) Crear Evento
      const res = await fetch("/api/evento/create_evento", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tituloEvento: payload.tituloEvento,
          comentario: payload.comentario || null,
          preview_url,
          link_supa,
          link_drive: payload.link_drive || null,
          cliente_id: payload.cliente_id,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error creando evento");
      }

      router.push(`/admin/clientes/${payload.cliente_id}`);
      router.refresh();

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }else{
        setError(String(err));
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { createEvento, loading, error };
}
