export const runtime = "nodejs";

import { supabase } from "../../../../../lib/supabaseClient";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export async function GET(req: Request) {
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

    // 2. Verificación del token
    let payload;
    try {
      const { payload: verified } = await jwtVerify(token, SECRET);
      payload = verified;
    } catch (err) {
      console.log("Token verification error:", err);
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 401,
      });
    }

    // 3. Chequear rol admin
    if (payload.rol !== "admin") {
      return new Response(JSON.stringify({ error: "Acceso denegado" }), {
        status: 403,
      });
    }

    // 4. Consulta a la BD (solo clientes)
    const { data, error } = await supabase
      .from("user")
      .select(
        `
        id,
        username,
        active,
        created_at,
        archivos (
          id,
          evento,
          comentario,
          link_drive,
          link_supa,
          link_preview,
          active,
          created_at
        )
      `
      )
      .eq("rol", "cliente")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching clients:", error);
      return new Response(JSON.stringify({ error: "Error obteniendo datos" }), {
        status: 500,
      });
    }

    //console.log("Fetched clients from DB:", data); OK

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("Error general:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
}
