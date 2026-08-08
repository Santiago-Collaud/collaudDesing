export const runtime = "nodejs";

import bcrypt from "bcrypt";
import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email, code, pass } = await req.json();

    // --------------------------------
    // Validaciones
    // --------------------------------

    if (!email || !code || !pass) {
      return Response.json(
        {
          error:
            "Email, código y nueva contraseña son requeridos.",
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

    if (pass.length < 8) {
      return Response.json(
        {
          error:
            "La contraseña debe tener al menos 8 caracteres.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Buscar usuario
    // --------------------------------

    const { data: user, error: userError } =
      await supabaseQueSigue
        .from("setlist-admin")
        .select("id, username, mail, active")
        .eq("mail", cleanEmail)
        .maybeSingle();

    if (userError) {
      console.error(
        "Error buscando usuario:",
        userError
      );

      return Response.json(
        {
          error: "Error procesando la solicitud.",
        },
        { status: 500 }
      );
    }

    if (!user) {
      return Response.json(
        {
          error: "Código incorrecto o expirado.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Buscar código
    // --------------------------------

    const { data: verification, error: verificationError } =
      await supabaseQueSigue
        .from("setlist-email-verification")
        .select("id, code, expires_at")
        .eq("id_admin", user.id)
        .eq("code", cleanCode)
        .eq("type", "PASSWORD_RESET")
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
          error: "Código incorrecto o expirado.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Comprobar expiración
    // --------------------------------

    const expiresAt = new Date(
      verification.expires_at
    );

    if (expiresAt.getTime() < Date.now()) {

      await supabaseQueSigue
        .from("setlist-email-verification")
        .delete()
        .eq("id", verification.id);

      return Response.json(
        {
          error:
            "El código expiró. Solicitá uno nuevo.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Generar nuevo hash
    // --------------------------------

    const hashedPassword = await bcrypt.hash(
      pass,
      12
    );

    // --------------------------------
    // Actualizar contraseña
    // --------------------------------

    const { error: updateError } =
      await supabaseQueSigue
        .from("setlist-admin")
        .update({
          pass: hashedPassword,
        })
        .eq("id", user.id);

    if (updateError) {
      console.error(
        "Error actualizando contraseña:",
        updateError
      );

      return Response.json(
        {
          error:
            "No se pudo actualizar la contraseña.",
        },
        { status: 500 }
      );
    }

    // --------------------------------
    // Eliminar código utilizado
    // --------------------------------

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
    }

    // --------------------------------
    // Respuesta
    // --------------------------------

    return Response.json(
      {
        message:
          "Contraseña actualizada correctamente.",
      },
      { status: 200 }
    );

  } catch (err) {

    console.error(
      "Error restableciendo contraseña:",
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