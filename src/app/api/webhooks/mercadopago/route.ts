import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("=== MP WEBHOOK RECIBIDO ===");
    console.log("BODY:", JSON.stringify(body));

    const paymentId = body?.data?.id;
    console.log("PAYMENT ID:", paymentId);

    if (!paymentId) {
      console.log("Webhook sin paymentId -> OK");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    if (!mpResponse.ok) {
      const txt = await mpResponse.text();
      console.error("ERROR CONSULTANDO MP:", txt);
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const paymentData = await mpResponse.json();

    console.log("=== PAYMENT DATA MP ===");
    console.log("STATUS:", paymentData.status);
    console.log("EXTERNAL_REFERENCE:", paymentData.external_reference);
    console.log("LIVE_MODE:", paymentData.live_mode);

    // Solo pagos aprobados
    if (paymentData.status !== "approved") {
      console.log("Pago no aprobado -> se ignora");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const eventId = paymentData.external_reference;
    if (!eventId) {
      console.log("Pago aprobado SIN external_reference");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 🔎 PRUEBA CLAVE: ¿existe el evento?
    const { data: eventoExiste, error: selectError } = await supabaseAdmin
      .from("eventos")
      .select("id, estado_pago")
      .eq("id", eventId);

    console.log("SELECT EVENTOS RESULT:", eventoExiste);
    console.log("SELECT ERROR:", selectError);

    if (!eventoExiste || eventoExiste.length === 0) {
      console.error("EVENTO NO EXISTE EN DB PARA ID:", eventId);
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 🧨 UPDATE REAL
    const { data: updateData, error: updateError } = await supabaseAdmin
      .from("eventos")
      .update({
        estado_pago: "pagado",
        fecha_pago: new Date().toISOString(),
        mp_payment_id: paymentId,
      })
      .eq("id", eventId)
      .select();

    console.log("UPDATE RESULT DATA:", updateData);
    console.log("UPDATE RESULT ERROR:", updateError);

    if (updateError) {
      console.error("ERROR ACTUALIZANDO EVENTO:", updateError);
    }

    console.log("=== FIN WEBHOOK ===");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("WEBHOOK CRASH:", err);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
