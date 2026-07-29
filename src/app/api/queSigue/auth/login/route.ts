export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret"
);

export async function POST(req: Request) {
  const { username, pass } = await req.json();

  if (!username || !pass) {
    return new Response(
      JSON.stringify({
        error: "Nombre de usuario y contraseña son requeridos",
      }),
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabaseQueSigue
      .from("setlist-admin")
      .select("id, username, pass, active")
      .eq("username", username)
      .single();

      //console.log("Datos obtenidos de la base de datos:", data);
      //console.log("LOGIN DATA:", data);
      //console.log("LOGIN ERROR:", error);

    if (error || !data) {
      return new Response(
        JSON.stringify({
          error: "Usuario no encontrado",
        }),
        { status: 401 }
      );
    }

    switch (data.active) {
  case "ACTIVE":
    // La cuenta está habilitada, continúa el login.
    break;

  case "PENDING":
    return new Response(
      JSON.stringify({
        error: "Tu cuenta está pendiente de activación.",
      }),
      { status: 403 }
    );

  case "INACTIVE":
    return new Response(
      JSON.stringify({
        error: "Tu cuenta se encuentra inactiva.",
      }),
      { status: 403 }
    );

  default:
    return new Response(
      JSON.stringify({
        error: "Estado de la cuenta inválido.",
      }),
      { status: 403 }
    );
}

    const passwordMatch = await bcrypt.compare(pass, data.pass);

    if (!passwordMatch) {
      return new Response(
        JSON.stringify({
          error: "Contraseña incorrecta",
        }),
        { status: 401 }
      );
    }

    const token = await new SignJWT({
      id: data.id,
      username: data.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(SECRET);

    const headers = new Headers();

    headers.append(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=3600`
    );

    return new Response(
      JSON.stringify({
        user: {
          id: data.id,
          username: data.username,
        },
      }),
      {
        status: 200,
        headers,
      }
    );
  } catch (err) {
    console.error("Error en la autenticación:", err);

    return new Response(
      JSON.stringify({
        error: "Error interno del servidor",
      }),
      {
        status: 500,
      }
    );
  }
}