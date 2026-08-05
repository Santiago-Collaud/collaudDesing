export const runtime = "nodejs";

import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    // -----------------------------
    // Validaciones básicas
    // -----------------------------

    if (!email || !code) {
      return Response.json(
        {
          error: "Email y código de verificación son requeridos.",
        },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    if (!/^\d{6}$/.test(cleanCode)) {
      return Response.json(
        {
          error: "El código debe tener 6 dígitos.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Buscar usuario
    // -----------------------------

    const { data: user, error: userError } =
      await supabaseQueSigue
        .from("setlist-admin")
        .select("id, username, mail, active")
        .eq("mail", cleanEmail)
        .maybeSingle();

    if (userError) {
      console.error("Error buscando usuario:", userError);

      return Response.json(
        {
          error: "Error buscando la cuenta.",
        },
        { status: 500 }
      );
    }

    if (!user) {
      return Response.json(
        {
          error: "No existe una cuenta asociada a ese email.",
        },
        { status: 404 }
      );
    }

    // -----------------------------
    // Comprobar estado
    // -----------------------------

    if (user.active === "ACTIVE") {
      return Response.json(
        {
          error: "La cuenta ya está verificada.",
        },
        { status: 409 }
      );
    }

    if (user.active !== "PENDING") {
      return Response.json(
        {
          error: "La cuenta no puede ser verificada.",
        },
        { status: 403 }
      );
    }

    // -----------------------------
    // Buscar código
    // -----------------------------

    const { data: verification, error: verificationError } =
      await supabaseQueSigue
        .from("setlist-email-verification")
        .select("id, code, expires_at")
        .eq("id_admin", user.id)
        .eq("code", cleanCode)
        .maybeSingle();

    if (verificationError) {
      console.error(
        "Error buscando código:",
        verificationError
      );

      return Response.json(
        {
          error: "Error verificando el código.",
        },
        { status: 500 }
      );
    }

    if (!verification) {
      return Response.json(
        {
          error: "El código de verificación es incorrecto.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Comprobar expiración
    // -----------------------------

    const expiresAt = new Date(verification.expires_at);

    if (expiresAt.getTime() < Date.now()) {

      // El código expiró.
      // Lo eliminamos porque ya no sirve.

      await supabaseQueSigue
        .from("setlist-email-verification")
        .delete()
        .eq("id", verification.id);

      return Response.json(
        {
          error:
            "El código de verificación expiró. Solicitá uno nuevo.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Activar usuario
    // -----------------------------

    const { error: updateError } =
      await supabaseQueSigue
        .from("setlist-admin")
        .update({
          active: "ACTIVE",
        })
        .eq("id", user.id);

    if (updateError) {
      console.error(
        "Error activando usuario:",
        updateError
      );

      return Response.json(
        {
          error: "No se pudo activar la cuenta.",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // Eliminar código utilizado
    // -----------------------------

    const { error: deleteError } =
      await supabaseQueSigue
        .from("setlist-email-verification")
        .delete()
        .eq("id", verification.id);

    if (deleteError) {
      console.error(
        "Error eliminando código:",
        deleteError
      );

      // La cuenta ya fue activada.
      // No devolvemos error al usuario.
    }

    // -----------------------------
    // Respuesta
    // -----------------------------

    return Response.json(
      {
        message: "Cuenta verificada correctamente.",
        user: {
          id: user.id,
          username: user.username,
          mail: user.mail,
        },
      },
      { status: 200 }
    );

  } catch (err) {

    console.error(
      "Error en verificación:",
      err
    );

    return Response.json(
      {
        error: "Error interno del servidor.",
      },
      { status: 500 }
    );
  }
}