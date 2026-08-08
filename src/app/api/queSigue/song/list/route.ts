export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";


export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const id_band = searchParams.get("id_band");


  if (!id_band) {

    return new Response(
      JSON.stringify({
        error:"Falta el id de la banda.",
      }),
      {
        status:400,
      }
    );

  }


  try {


    const { data, error } = await supabaseQueSigue
      .from("setlist-song")
      .select("*")
      .eq("id_band", id_band)
      .order("name", {
        ascending:true,
      });



    //console.log("SONG LIST DATA:", data);
    //console.log("SONG LIST ERROR:", error);



    if(error){

      return new Response(
        JSON.stringify({
          error:"No fue posible obtener las canciones.",
        }),
        {
          status:500,
        }
      );

    }


    return new Response(
      JSON.stringify({
        songs:data,
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