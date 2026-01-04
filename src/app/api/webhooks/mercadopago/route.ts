import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Mercado Pago puede enviar distintos tipos de notificaciones
    if (body.type !== "payment") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const paymentId = body.data?.id;

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID no recibido" },
        { status: 400 }
      );
    }

    // Consultamos el pago real a Mercado Pago
    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`, 
        },
      }
    );

    if (!mpResponse.ok) {
      throw new Error("Error consultando pago a Mercado Pago");
    }

    const paymentData = await mpResponse.json();

    // Solo nos interesa si el pago está aprobado
    if (paymentData.status !== "approved") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Este valor debe ser el ID del evento
    const eventId = paymentData.external_reference;

    if (!eventId) {
      return NextResponse.json(
        { error: "external_reference no presente" },
        { status: 400 }
      );
    }

    // Actualizamos el evento como pagado
    const { error } = await supabase
      .from("eventos")
      .update({
        estado_pago: "pagado",
        fecha_pago: new Date().toISOString(),
        mp_payment_id: paymentId,
      })
      .eq("id", eventId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook Mercado Pago error:", error);
    return NextResponse.json(
      { error: "Error procesando webhook" },
      { status: 500 }
    );
  }
}
