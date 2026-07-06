import { supabase } from "../../../../../lib/supabaseClient";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export async function POST(req: Request) {
  try {
    // Verificar token
    const cookieHeader = req.headers.get("cookie") || "";

    const token = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token faltante" }),
        { status: 401 }
      );
    }

    try {
      await jwtVerify(token, SECRET);
    } catch {
      return new Response(
        JSON.stringify({ error: "Token inválido" }),
        { status: 401 }
      );
    }

    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Falta el ID" }),
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("eventos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);

      return new Response(
        JSON.stringify({ error: "No se pudo eliminar" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200 }
    );
    

  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({ error: "Error interno" }),
      { status: 500 }
    );
  }
}
