export const runtime = "nodejs";

import nodemailer from "nodemailer";
import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        {
          error: "El email es requerido.",
        },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

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
      console.error("Error buscando usuario:", userError);

      return Response.json(
        {
          error: "Error procesando la solicitud.",
        },
        { status: 500 }
      );
    }

    // --------------------------------
    // Respuesta genérica
    // --------------------------------
    // No revelamos si el email existe.

    if (!user) {
      return Response.json(
        {
          message:
            "Si existe una cuenta asociada a ese email, recibirás un código para recuperar tu contraseña.",
        },
        { status: 200 }
      );
    }

    // --------------------------------
    // Generar código
    // --------------------------------

    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiresAt = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // --------------------------------
    // Eliminar códigos anteriores
    // --------------------------------

    await supabaseQueSigue
      .from("setlist-email-verification")
      .delete()
      .eq("id_admin", user.id)
      .eq("type", "PASSWORD_RESET");

    // --------------------------------
    // Guardar nuevo código
    // --------------------------------

    const { error: verificationError } =
      await supabaseQueSigue
        .from("setlist-email-verification")
        .insert({
          id_admin: user.id,
          code,
          expires_at: expiresAt.toISOString(),
          type: "PASSWORD_RESET",
        });

    if (verificationError) {
      console.error(
        "Error guardando código:",
        verificationError
      );

      return Response.json(
        {
          error: "No se pudo generar el código.",
        },
        { status: 500 }
      );
    }

    // --------------------------------
    // Nodemailer
    // --------------------------------

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // --------------------------------
    // Enviar email
    // --------------------------------

    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: cleanEmail,
      subject: "Recuperación de contraseña - queSigue",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">

          <h2>Recuperación de contraseña</h2>

          <p>
            Hola <strong>${user.username}</strong>.
          </p>

          <p>
            Recibimos una solicitud para restablecer
            la contraseña de tu cuenta de queSigue.
          </p>

          <p>
            Utilizá el siguiente código:
          </p>

          <div
            style="
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              text-align: center;
              padding: 20px;
              margin: 20px 0;
              background: #f3f3f3;
            "
          >
            ${code}
          </div>

          <p>
            Este código vence en 15 minutos.
          </p>

          <p style="color: #666; font-size: 13px;">
            Si no solicitaste recuperar tu contraseña,
            simplemente ignorá este mensaje.
          </p>

        </div>
      `,
    });

    return Response.json(
      {
        message:
          "Si existe una cuenta asociada a ese email, recibirás un código para recuperar tu contraseña.",
      },
      { status: 200 }
    );

  } catch (err) {

    console.error(
      "Error en recuperación de contraseña:",
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