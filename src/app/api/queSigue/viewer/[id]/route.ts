export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};


export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (!id) {
    return Response.json(
      { error: "Falta el id del SetList." },
      {
        status: 400,
        headers: corsHeaders,
      }
    );
  }

  try {

    const { data: show, error: showError } = await supabaseQueSigue
      .from("setlist-show")
      .select("*")
      .eq("id", id)
      .single();


    if (showError || !show) {
      return Response.json(
        { error: "SetList no encontrado." },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }


    const { data: band, error: bandError } = await supabaseQueSigue
      .from("setlist-band")
      .select("name")
      .eq("id", show.id_band)
      .single();


    if (bandError || !band) {
      return Response.json(
        { error: "Banda no encontrada." },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }


    const file = {
      version: 1,
      banda: band.name,
      show: show.name,
      fecha: show.date,
      items: show.data?.items ?? [],
    };


    return Response.json(
      file,
      {
        headers: corsHeaders,
      }
    );


  } catch (err) {

    console.error(err);

    return Response.json(
      { error: "Error interno del servidor." },
      {
        status: 500,
        headers: corsHeaders,
      }
    );

  }

}