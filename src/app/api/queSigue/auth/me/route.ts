export const runtime = "nodejs";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret"
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({
          error: "No hay sesión activa.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { payload } = await jwtVerify(token, SECRET);

    if (!payload.id || !payload.username) {
      return new Response(
        JSON.stringify({
          error: "Sesión inválida.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        user: {
          id: payload.id,
          username: payload.username,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Error verificando sesión:", error);

    return new Response(
      JSON.stringify({
        error: "Sesión inválida o expirada.",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}