import { supabase } from '../../../../lib/supabaseClient';

export async function GET() {
  
  try {
    // Hacemos una consulta muy liviana (no consume mucho del free plan)
    const { count, error } = await supabase
    .from("eventos")
    .select("*", { count: "exact", head: true })


    if (error) {
      console.error("Error en keep-alive:", error);
      return new Response(
        JSON.stringify({ ok: false, error: error.message }),
        { status: 500 }
      );
    }

    console.log("llama a mantener-vivo");
    console.log("eventos count:", count);
    
    return new Response(
      JSON.stringify({ ok: true, message: "Supabase keep-alive ✅" }),
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error interno:", err.message);
      return new Response(
        JSON.stringify({ ok: false, error: err.message }),
        { status: 500 }
      );
    }

    console.error("Error desconocido:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
