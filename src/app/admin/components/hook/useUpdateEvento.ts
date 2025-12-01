// src/app/admin/components/hook/useUpdateEvento.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IEventoUpdate } from "@/interface/updateEvento";

export function useUpdateEvento() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ---- SUBIR PREVIEW ----
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

  // ---- SUBIR ARCHIVO SUPA ----
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

  // ---- UPDATE EVENTO ----
  const updateEvento = async (payload: IEventoUpdate) => {
    try {
      setLoading(true);
      setError(null);

      let preview_url = payload.preview_url;
      let link_supa = payload.link_supa;

      // 1️⃣ ¿El usuario subió nueva preview?
      if (payload.newPreviewFile) {
        preview_url = await uploadPreview(payload.newPreviewFile);
      }

      // 2️⃣ ¿Subió nuevo archivo supa?
      if (payload.newSupaFile) {
        link_supa = await uploadSupa(payload.newSupaFile);
      }

      // 3️⃣ Enviar update al backend
      const res = await fetch("/api/evento/updateEvento", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: payload.id,
          tituloEvento: payload.tituloEvento,
          comentario: payload.comentario,
          link_drive: payload.link_drive,
          link_supa,
          preview_url,
          active: payload.active,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error actualizando evento");
      }

      router.refresh();
      return true;

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error(err);
      return false;

    } finally {
      setLoading(false);
    }
  };

  return { updateEvento, loading, error };
}
