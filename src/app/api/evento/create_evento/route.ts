//endpoint para crear un nuevo evento
import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      cliente_id: id_cliente,
      tituloEvento,
      comentario,
      preview_url,
      link_supa,
      link_drive,
      active = true,
      estado_pago,
      precio,
    } = body;

    //console.log(tituloEvento, comentario, preview_url, link_supa, link_drive, active, link_mp,precio);

    if (!tituloEvento || !comentario || !preview_url) {
      return NextResponse.json(
        { error: "tituloEvento, comentario y preview_url son obligatorios" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("eventos")
      .insert({
        id_cliente,
        tituloEvento,
        comentario,
        preview_url,
        link_supa: link_supa || null,
        link_drive: link_drive || null,
        active,
        estado_pago: estado_pago || "impago",
        precio: precio || 0,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ evento: data }, { status: 200 });
  } catch (error) {
    console.error("Error al crear evento:", error);
    return NextResponse.json(
      { error: "Error al crear evento" },
      { status: 500 }
    );
  }
}
