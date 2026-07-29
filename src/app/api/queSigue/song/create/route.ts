export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";


export async function POST(req: Request) {

  const {
    name,
    tone,
    duration,
    detail,
    id_band,
  } = await req.json();


  if (!name || !id_band) {

    return new Response(
      JSON.stringify({
        error: "Faltan datos obligatorios.",
      }),
      {
        status: 400,
      }
    );

  }


  try {

    const { data, error } = await supabaseQueSigue
      .from("setlist-song")
      .insert({
        name,
        tone,
        duration,
        detail,
        id_band,
        active: "ACTIVE",
      })
      .select()
      .single();


    console.log("SONG CREATE DATA:", data);
    console.log("SONG CREATE ERROR:", error);


    if (error) {

      return new Response(
        JSON.stringify({
          error: "No fue posible crear la canción.",
        }),
        {
          status:500,
        }
      );

    }


    return new Response(
      JSON.stringify({
        song:data,
      }),
      {
        status:201,
      }
    );


  } catch(err){

    console.error(err);

    return new Response(
      JSON.stringify({
        error:"Error interno del servidor.",
      }),
      {
        status:500,
      }
    );

  }

}