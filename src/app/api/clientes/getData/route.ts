//trae los datos del cliete logueado
export const runtime = "nodejs";

import { supabase } from "../../../../../lib/supabaseClient";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export async function GET(req: Request) {
  try {
    // 1. Leer cookie
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
    let payload;
    try {
      const { payload: verified } = await jwtVerify(token, SECRET);
      payload = verified;
    } catch (err) {
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 401,
      });
    }

    // 3. Verificar rol cliente
    if (payload.rol !== "cliente") {
      return new Response(JSON.stringify({ error: "Acceso denegado" }), {
        status: 403,
      });
    }
    
    // 4. Obtener solo los eventos de ese cliente
    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .eq("id_cliente", payload.id) // 👈 clave
      .order("created_at", { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: "DB error" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
}
