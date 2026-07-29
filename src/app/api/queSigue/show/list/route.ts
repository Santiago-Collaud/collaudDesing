export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const idAdmin = searchParams.get("id_admin");

  if (!idAdmin) {
    return Response.json(
      {
        error: "Falta el id del administrador.",
      },
      {
        status: 400,
      }
    );
  }

  try {

    const { data, error } = await supabaseQueSigue
      .from("setlist-show")
      .select(`
        id,
        name,
        date,
        last_update,
        setlist-band!inner(
          name,
          id_admin
        )
      `)
      .eq("setlist-band.id_admin", idAdmin)
      .order("date", {
        ascending: false,
      });

    if (error) {

      console.error(error);

      return Response.json(
        {
          error: "No fue posible obtener los SetLists.",
        },
        {
          status: 500,
        }
      );

    }

    const shows = (data ?? []).map((show: any) => ({
      id: show.id,
      name: show.name,
      date: show.date,
      last_update: show.last_update,
      band: show["setlist-band"]?.name ?? "",
    }));

    return Response.json(
      {
        shows,
      },
      {
        status: 200,
      }
    );

  } catch (err) {

    console.error(err);

    return Response.json(
      {
        error: "Error interno del servidor.",
      },
      {
        status: 500,
      }
    );

  }

}