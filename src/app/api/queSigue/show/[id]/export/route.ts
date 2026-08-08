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

    const { data: show, error: showError } = await supabaseQueSigue
      .from("setlist-show")
      .select("*")
      .eq("id", id)
      .single();

    if (showError || !show) {
      return new Response(
        JSON.stringify({
          error: "SetList no encontrado.",
        }),
        { status: 404 }
      );
    }

    const { data: band, error: bandError } = await supabaseQueSigue
      .from("setlist-band")
      .select("name")
      .eq("id", show.id_band)
      .single();

    if (bandError || !band) {
      return new Response(
        JSON.stringify({
          error: "Banda no encontrada.",
        }),
        { status: 404 }
      );
    }

    const file = {
      version: 1,
      banda: band.name,
      show: show.name,
      fecha: show.date,
      items: show.data?.items ?? [],
    };

    //console.log(file);

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