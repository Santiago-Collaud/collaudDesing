import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import crypto from "crypto";

function verifyMercadoPagoSignature(
  rawBody: string,
  signatureHeader: string | null
): boolean {
  if (!signatureHeader) return false;

  const secret = process.env.MP_WEBHOOK_SECRET!;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  return signatureHeader === expectedSignature;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature");

    // 🔐 Verificación de firma MP
    const isValid = verifyMercadoPagoSignature(rawBody, signature);
    if (!isValid) {
      console.error("❌ Webhook rechazado: firma inválida");
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const body = JSON.parse(rawBody);

    console.log("=== MP WEBHOOK RECIBIDO ===");
    console.log("BODY:", body);

    const paymentId = body?.data?.id;
    if (!paymentId) {
      console.log("Webhook sin paymentId");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 🔎 Consultar pago real en MP
    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    if (!mpResponse.ok) {
      console.error("Error consultando MP:", await mpResponse.text());
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const paymentData = await mpResponse.json();

    console.log("PAYMENT STATUS:", paymentData.status);
    console.log("EXTERNAL_REFERENCE:", paymentData.external_reference);

    // ⛔ Solo pagos aprobados
    if (paymentData.status !== "approved") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const eventId = paymentData.external_reference;
    if (!eventId) {
      console.error("Pago aprobado sin external_reference");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 🔁 IDEMPOTENCIA: verificar estado actual
    const { data: evento, error: selectError } = await supabaseAdmin
      .from("eventos")
      .select("id, estado_pago")
      .eq("id", eventId)
      .single();

    if (selectError || !evento) {
      console.error("Evento no encontrado:", eventId);
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (evento.estado_pago === "pagado") {
      console.log("Evento ya pagado → idempotencia OK");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // ✅ Update definitivo
    const { error: updateError } = await supabaseAdmin
      .from("eventos")
      .update({
        estado_pago: "pagado",
        fecha_pago: new Date().toISOString(),
        mp_payment_id: paymentId,
      })
      .eq("id", eventId);

    if (updateError) {
      console.error("Error actualizando evento:", updateError);
    } else {
      console.log("Evento actualizado correctamente:", eventId);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook crash:", err);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
