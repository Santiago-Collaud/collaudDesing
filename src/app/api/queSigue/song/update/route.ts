export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function PATCH(req: Request) {

  const {
    id,
    name,
    tone,
    duration,
    detail,
    active,
  } = await req.json();



  if (!id || !name) {

    return new Response(
      JSON.stringify({
        error:"Faltan datos.",
      }),
      {
        status:400,
      }
    );

  }


  try {


    const { data, error } = await supabaseQueSigue
      .from("setlist-song")
      .update({
        name,
        tone,
        duration,
        detail,
        active,
      })
      .eq("id", id)
      .select()
      .single();



    console.log("SONG UPDATE DATA:", data);
    console.log("SONG UPDATE ERROR:", error);



    if(error){

      return new Response(
        JSON.stringify({
          error:"No fue posible actualizar la canción.",
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
        status:200,
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