export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function PATCH(req: Request) {
  const { id, name, active } = await req.json();

  if (!id || !name) {
    return new Response(
      JSON.stringify({
        error: "Faltan datos.",
      }),
      { status: 400 }
    );
  }

  try {
    const { error } = await supabaseQueSigue
      .from("setlist-band")
      .update({
        name,
        active,
      })
      .eq("id", id);

    if (error) {
      console.error(error);

      return new Response(
        JSON.stringify({
          error: "No fue posible actualizar la banda.",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      { status: 200 }
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