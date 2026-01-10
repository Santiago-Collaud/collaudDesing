import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Webhook recibido:", body);

    const paymentId = body?.data?.id;
    if (!paymentId) {
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
      console.error("Error MP:", await mpResponse.text());
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const paymentData = await mpResponse.json();
    console.log("Payment data:", paymentData);

    if (paymentData.status !== "approved") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const eventId = paymentData.external_reference;
    if (!eventId) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const { error } = await supabaseAdmin
      .from("eventos")
      .update({
        estado_pago: "pagado",
        fecha_pago: new Date().toISOString(),
        mp_payment_id: paymentId,
      })
      .eq("id", String(eventId));

    if (error) {
      console.error("Supabase error:", error);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}

