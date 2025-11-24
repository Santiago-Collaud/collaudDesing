// /pages/api/create_evento.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
     
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const {
      nombre,
      descripcion,
      preview_url,
      link_supa,
      link_drive,
      active=true,
    } = req.body;

    if (!nombre || !descripcion || !preview_url) {
      return res.status(400).json({
        error: "nombre, descripcion y preview_url son obligatorios",
      });
    }

    const { data, error } = await supabase
      .from("eventos")
      .insert({
        nombre,
        descripcion,
        preview_url,
        link_supa: link_supa || null,
        link_drive: link_drive || null,
        active,
      })
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ evento: data });
  } catch (error) {
    console.error("Error al crear evento:", error);
    return res.status(500).json({ error: "Error al crear evento" });
  }
}