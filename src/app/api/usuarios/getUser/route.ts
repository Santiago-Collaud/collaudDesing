// src/app/api/pagos/routes.ts
import { supabase } from '../../../../../lib/supabaseClient';

export async function GET() { //(req: Request)
  try {
    // Realizamos la consulta a la tabla usuarios y unimos las tablas relacionadas
    const { data, error } = await supabase
      .from('usuarios')
      .select(`
        id,
        created_at,
        username,
        evento,
        comantario,
        rol,
        mail,
        link_drive,
        link_supa,
        activo
      `);

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error al obtener los usuarios' }),
        { status: 500 }
      );

    }
    
    return new Response(JSON.stringify({ usuarios: data }), { status: 200 });

  } catch (err) {
    console.error('Error al obtener usuarios', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}