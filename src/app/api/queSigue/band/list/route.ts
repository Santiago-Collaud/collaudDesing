export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id_admin = searchParams.get("id_admin");

  if (!id_admin) {
    return new Response(
      JSON.stringify({
        error: "Falta el id del administrador.",
      }),
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabaseQueSigue
      .from("setlist-band")
      .select("*")
      .eq("id_admin", id_admin)
      .neq("active", "DELETE")
      .order("name", { ascending: true });

      //console.log("BAND DATA:", data);
      //console.log("BAND ERROR:", error);

    if (error) {
      console.error(error);

      return new Response(
        JSON.stringify({
          error: "No fue posible obtener las bandas.",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        bands: data,
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