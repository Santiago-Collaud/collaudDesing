import { supabase } from "../../../../../lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "Falta archivo" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("eventos")
      .upload(fileName, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (error) {
      console.error(error);
      return Response.json({ error: "No se pudo subir a Supabase" }, { status: 500 });
    }

    const { data } = supabase.storage
      .from("eventos")
      .getPublicUrl(fileName);

    return Response.json({ url: data.publicUrl });

  } catch (error) {
    console.error("Error al subir archivo a supa:", error);
    return Response.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

