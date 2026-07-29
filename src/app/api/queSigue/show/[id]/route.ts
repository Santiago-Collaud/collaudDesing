export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

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
      {
        status: 400,
      }
    );
  }


  try {

    const { data, error } = await supabaseQueSigue
      .from("setlist-show")
      .select("*")
      .eq("id", id)
      .single();


    //console.log("SHOW DATA:", data);
    //console.log("SHOW ERROR:", error);


    if (error || !data) {

      return new Response(
        JSON.stringify({
          error: "SetList no encontrado.",
        }),
        {
          status: 404,
        }
      );

    }


    return new Response(
      JSON.stringify({
        show: data,
      }),
      {
        status: 200,
      }
    );


  } catch (err) {

    console.error(err);

    return new Response(
      JSON.stringify({
        error: "Error interno del servidor.",
      }),
      {
        status: 500,
      }
    );

  }

}


export async function PUT(
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

  const body = await req.json();

  const { data } = body;

  if (!data) {
    return new Response(
      JSON.stringify({
        error: "Faltan datos.",
      }),
      { status: 400 }
    );
  }

  try {

    const { error } = await supabaseQueSigue
      .from("setlist-show")
      .update({
        data,
      })
      .eq("id", id);

    if (error) {
      return new Response(
        JSON.stringify({
          error: "No se pudo guardar.",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
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

export async function DELETE(
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

    const { error } = await supabaseQueSigue
      .from("setlist-show")
      .delete()
      .eq("id", id);

    if (error) {

      console.error(error);

      return new Response(
        JSON.stringify({
          error: "No se pudo eliminar el SetList.",
        }),
        { status: 500 }
      );

    }

    return new Response(
      JSON.stringify({
        ok: true,
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