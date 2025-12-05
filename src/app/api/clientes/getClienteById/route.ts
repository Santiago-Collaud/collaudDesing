export const runtime = "nodejs";

import { supabase } from "../../../../../lib/supabaseClient";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");  

export async function GET(req: Request) {
  try {
    // Leer cookies
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

    // Verificar token
    let payload;
    try {
      const { payload: verified } = await jwtVerify(token, SECRET);
      payload = verified;
    } catch (err) {
      console.error("Token verification error:", err);
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 401,
      });
    }

    // Chequear rol admin
    if (payload.rol !== "admin") {
      return new Response(JSON.stringify({ error: "Acceso denegado" }), {
        status: 403,
      });
    }

    // Obtener ID desde la URL
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Falta el parámetro id" }), {
        status: 400,
      });
    }

    // Buscar cliente por ID
    const { data, error } = await supabase
      .from("user")
      .select(`
        id,
        username,
        active,
        created_at,
        nombre,
        apellido,
        email,
        eventos (
          id,
          tituloEvento,
          comentario,
          link_drive,
          link_supa,
          preview_url,
          active,
          created_at
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching client:", error);
      return new Response(JSON.stringify({ error: "Cliente no encontrado" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ cliente: data }), { status: 200 });
  } catch (err) {
    console.error("Error general:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
}
