import { supabase } from "../../../../../lib/supabaseClient";
import bcrypt from "bcryptjs";
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

    // 3. Datos del body
    const { id, username, pass, active, nombre, apellido, email } =
      await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "Falta ID del usuario" }), {
        status: 400,
      });
    }

    // 4. Construir objeto de actualización
    const updateData: {
      username?: string;
      nombre?: string;
      apellido?: string;
      email?: string;
      active?: boolean;
      pass?: string;
    } = {
      username,
      nombre,
      apellido,
      email,
      active,
    };

    // Si enviaron contraseña → la hasheamos
    if (pass && pass.trim() !== "") {
      const saltRounds = 10;
      const hashedPass = await bcrypt.hash(pass, saltRounds);
      updateData.pass = hashedPass;
    }

    // 5. Ejecutar update
    const { data, error } = await supabase
      .from("user")
      .update(updateData)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error de Supabase:", error);

      if (error.code === "23505") {
        return new Response(
          JSON.stringify({ error: "Ya existe un usuario con ese dato" }),
          { status: 400 }
        );
      }

      return new Response(
        JSON.stringify({ error: "Error al actualizar el usuario" }),
        { status: 500 }
      );
    }

    // 6. OK
    return new Response(JSON.stringify({ cliente: data }), { status: 200 });
  } catch (err) {
    console.error("Error general:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
}
