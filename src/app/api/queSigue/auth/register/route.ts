export const runtime = "nodejs";

import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { supabaseQueSigue } from "../../../../../../lib/queSigue/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { username, email, pass } = await req.json();

    // -----------------------------
    // Validaciones básicas
    // -----------------------------

    if (!username || !email || !pass) {
      return Response.json(
        {
          error: "Usuario, email y contraseña son requeridos.",
        },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return Response.json(
        {
          error: "El usuario debe tener al menos 3 caracteres.",
        },
        { status: 400 }
      );
    }

    if (pass.length < 8) {
      return Response.json(
        {
          error: "La contraseña debe tener al menos 8 caracteres.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Normalizar datos
    // -----------------------------

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    // -----------------------------
    // Verificar usuario existente
    // -----------------------------

    const { data: existingUser } = await supabaseQueSigue
      .from("setlist-admin")
      .select("id")
      .eq("username", cleanUsername)
      .maybeSingle();

    if (existingUser) {
      return Response.json(
        {
          error: "El nombre de usuario ya está registrado.",
        },
        { status: 409 }
      );
    }

    // -----------------------------
    // Verificar email existente
    // -----------------------------

    const { data: existingEmail } = await supabaseQueSigue
      .from("setlist-admin")
      .select("id")
      .eq("mail", cleanEmail)
      .maybeSingle();

    if (existingEmail) {
      return Response.json(
        {
          error: "El email ya está registrado.",
        },
        { status: 409 }
      );
    }

    // -----------------------------
    // Hashear contraseña
    // -----------------------------

    const hashedPassword = await bcrypt.hash(pass, 12);

    // -----------------------------
    // Crear usuario
    // -----------------------------

    const { data: newUser, error: userError } =
      await supabaseQueSigue
        .from("setlist-admin")
        .insert({
          username: cleanUsername,
          mail: cleanEmail,
          pass: hashedPassword,
          active: "PENDING",
        })
        .select("id, username, mail")
        .single();

    if (userError || !newUser) {
      console.error("Error creando usuario:", userError);

      return Response.json(
        {
          error: "No se pudo crear la cuenta.",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // Generar código de verificación
    // -----------------------------

    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiresAt = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // -----------------------------
    // Guardar código
    // -----------------------------

    const { error: verificationError } =
      await supabaseQueSigue
        .from("setlist-email-verification")
        .insert({
          id_admin: newUser.id,
          code,
          expires_at: expiresAt.toISOString(),
        });

    if (verificationError) {
      console.error(
        "Error guardando código:",
        verificationError
      );

      return Response.json(
        {
          error: "No se pudo generar la verificación.",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // Configurar Nodemailer
    // -----------------------------

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // -----------------------------
    // Enviar email
    // -----------------------------

    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: cleanEmail,
      subject: "Verificación de cuenta - queSigue",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">

          <h2>Verificación de cuenta</h2>

          <p>
            Hola <strong>${cleanUsername}</strong>.
          </p>

          <p>
            Para completar la creación de tu cuenta de queSigue,
            ingresá el siguiente código:
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
            Si no solicitaste crear una cuenta en queSigue,
            simplemente ignorá este mensaje.
          </p>

        </div>
      `,
    });

    // -----------------------------
    // Respuesta
    // -----------------------------

    return Response.json(
      {
        message:
          "Cuenta creada. Se envió un código de verificación al email.",
      },
      { status: 201 }
    );

  } catch (err) {

    console.error(
      "Error en registro de usuario:",
      err
    );

    return Response.json(
      {
        error:
          "Error interno del servidor.",
      },
      { status: 500 }
    );
  }
}