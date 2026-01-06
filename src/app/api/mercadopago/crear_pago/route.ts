//endpoint para crear un pago en Mercado Pago
//api/mercadopago/crear_pago/route.ts

import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { eventoId } = await req.json();

      console.log("Received eventoId:", eventoId);

    if (!eventoId) {
      return NextResponse.json(
        { error: "eventoId requerido" },
        { status: 400 }
      );
    }

    // 1️⃣ Buscar evento
    const { data: evento, error } = await supabase
      .from("eventos")
      .select("id, tituloEvento, precio, estado_pago")
      .eq("id", eventoId)
      .single();

      console.log("Supabase response:", { evento, error });

    if (error || !evento) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    console.log("Found evento:", evento.tituloEvento, evento.precio, evento.estado_pago);

    if (evento.estado_pago === "pagado") {
      return NextResponse.json(
        { error: "Evento ya pagado" },
        { status: 400 }
      );
    }

    // 2️⃣ Crear preferencia de pago
    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            title: evento.tituloEvento,
            quantity: 1,
            unit_price: Number(evento.precio),
          },
        ],
        external_reference: evento.id,

        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`,

        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/backUrlMP/pago-exitoso`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/backUrlMP/pago-fallido`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/backUrlMP/pago-pendiente`,
        },
        auto_return: "approved",
      }),
    });

    if (!mpRes.ok) {
      throw new Error("Error creando preferencia de pago");
    }

    const mpData = await mpRes.json();

    return NextResponse.json(
      { init_point: mpData.init_point },
      { status: 200 }
    );

  } catch (error) {
    console.error("Crear pago error:", error);
    return NextResponse.json(
      { error: "Error creando pago" },
      { status: 500 }
    );
  }
}
