export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return new Response(
        JSON.stringify({
          error: "ID de banda requerido.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { data, error } = await supabaseQueSigue
      .from("setlist-band")
      .update({
        active: "DELETE",
      })
      .eq("id", id)
      .select("id, name, active")
      .single();

    if (error || !data) {
      console.error("Error eliminando banda:", error);

      return new Response(
        JSON.stringify({
          error: "No se pudo eliminar la banda.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Banda eliminada correctamente.",
        band: data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Error en DELETE band:", error);

    return new Response(
      JSON.stringify({
        error: "Error interno del servidor.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}