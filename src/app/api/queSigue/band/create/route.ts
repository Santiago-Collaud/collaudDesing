export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function POST(req: Request) {
  const { name, id_admin } = await req.json();

  if (!name || !id_admin) {
    return new Response(
      JSON.stringify({
        error: "Faltan datos.",
      }),
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabaseQueSigue
      .from("setlist-band")
      .insert({
        name,
        id_admin,
        active: "ACTIVE",
      })
      .select()
      .single();

      //console.log("BAND DATA:", data);
      //console.log("BAND ERROR:", error);

    if (error) {
      console.error(error);

      return new Response(
        JSON.stringify({
          error: "No fue posible crear la banda.",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        band: data,
      }),
      { status: 201 }
    );

  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        error: "Error interno del servidor.",
      }),
      { status: 500 }
    );
  }
}