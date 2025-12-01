import { supabase } from "../../../../../lib/supabaseClient";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export async function POST(req: Request) {
  try {
    // 1. Leer cookies
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return new Response(JSON.stringify({ error: "Token faltante" }), {
        status: 401,
      });
    }

    // 2. Verificar token
    try {
      await jwtVerify(token, SECRET);
    } catch (err) {
      console.log("Token verification error:", err);
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 401,
      });
    }

    // 3. Leer body
    const { id, tituloEvento, comentario, link_drive, link_supa, preview_url, active } =
      await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "Falta ID del evento" }), {
        status: 400,
      });
    }

    // 4. Confirmar que el evento existe
    const { data: eventoExistente, error: findErr } = await supabase
      .from("eventos")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (findErr) {
      console.log("Error buscando evento:", findErr);
      return new Response(JSON.stringify({ error: "Error buscando evento" }), { status: 500 });
    }

    if (!eventoExistente) {
      return new Response(JSON.stringify({ error: "Evento no encontrado" }), {
        status: 404,
      });
    }

    // 5. Construir campos a actualizar (sin incluir ID)
    const updateData: unknown = {
      tituloEvento,
      comentario,
      link_drive,
      link_supa,
      preview_url,
      active,
    };

    console.log("ID recibido:", id);
    console.log("Datos a actualizar:", updateData);

    // 6. Ejecutar update
    const { data, error } = await supabase
      .from("eventos")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error de Supabase:", error);
      return new Response(
        JSON.stringify({ error: "Error al actualizar el evento" }),
        { status: 500 }
      );
    }

    // 7. OK
    return new Response(JSON.stringify({ evento: data }), { status: 200 });

  } catch (err) {
    console.error("Error general:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
}
