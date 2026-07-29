export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../../lib/queSigue/supabaseAdmin";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (!id) {
    return new Response(
      JSON.stringify({
        error: "Falta el id del SetList.",
      }),
      { status: 400 }
    );
  }

  try {

    const { data, error } = await supabaseQueSigue
      .from("setlist-show")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return new Response(
        JSON.stringify({
          error: "SetList no encontrado.",
        }),
        { status: 404 }
      );
    }

    const file = {
      version: 1,
      banda: data.band_name,
      show: data.name,
      fecha: data.date,
      items: data.data?.items ?? [],
    };

    return new Response(
      JSON.stringify(file, null, 2),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
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