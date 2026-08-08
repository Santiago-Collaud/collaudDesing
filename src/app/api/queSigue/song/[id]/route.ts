export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (!id) {
    return new Response(
      JSON.stringify({
        error: "Falta el id de la canción.",
      }),
      {
        status: 400,
      }
    );
  }

  try {

    const { error } = await supabaseQueSigue
      .from("setlist-song")
      .delete()
      .eq("id", id);

    if (error) {

      console.error("Error eliminando canción:", error);

      return new Response(
        JSON.stringify({
          error: "No fue posible eliminar la canción.",
        }),
        {
          status: 500,
        }
      );

    }

    return new Response(
      JSON.stringify({
        message: "Canción eliminada correctamente.",
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