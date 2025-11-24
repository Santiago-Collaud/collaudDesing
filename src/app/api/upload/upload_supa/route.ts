// /pages/api/upload_supa.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const { file, fileName } = req.body;

    if (!file || !fileName) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // file debe venir como base64 o buffer
    const fileBuffer = Buffer.from(file, "base64");

    const { error } = await supabase.storage
      .from("eventos") // tu bucket
      .upload(fileName, fileBuffer, {
        contentType: "application/octet-stream",
        upsert: true,
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "No se pudo subir a Supabase" });
    }

    // obtener URL pública
    const { data: urlData } = supabase.storage
      .from("eventos")
      .getPublicUrl(fileName);

    return res.status(200).json({
      url: urlData.publicUrl,
    });

  } catch (error) {
    console.error("Error al subir archivo a supa:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
