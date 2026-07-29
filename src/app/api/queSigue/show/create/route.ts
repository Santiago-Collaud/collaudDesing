export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function POST(req: Request) {

  const {
    idBand,
    name,
    date,
    bandName,
  } = await req.json();

  if (!idBand || !name || !date || !bandName) {
    return new Response(
      JSON.stringify({
        error: "Faltan datos.",
      }),
      { status: 400 }
    );
  }

  const dataJson = {
    version: 1,
    banda: bandName,
    show: name,
    fecha: date,
    items: [],
  };

  try {

    const { data, error } = await supabaseQueSigue
      .from("setlist-show")
      .insert({
        id_band: idBand,
        name,
        date,
        active: "ACTIVE",
        data: dataJson,
      })
      .select("id")
      .single();

    if (error) {

      console.error(error);

      return new Response(
        JSON.stringify({
          error: "No fue posible crear el SetList.",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        id: data.id,
      }),
      { status: 200 }
    );

  } catch (err) {

    console.error(err);

    return new Response(
      JSON.stringify({
        error: "Error interno.",
      }),
      { status: 500 }
    );

  }

}