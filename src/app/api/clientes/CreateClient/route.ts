import { supabase } from '../../../../../lib/supabaseClient';
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const {username, pass, active} = await req.json();
    const rol = 'cliente';

    // Verificar que la contraseña no esté vacía
    if (!pass) {
        return new Response(JSON.stringify({ error: 'La contraseña es obligatoria' }), { status: 400 });
      }
  
      // Generar el hash de la contraseña antes de guardarla
      const saltRounds = 10; // Número de rondas de encriptación
      const hashedPass = await bcrypt.hash(pass, saltRounds);

    const { data, error } = await supabase
      .from('usuarios')
      .insert([
        {
          username,
          active,
          rol,
          pass: hashedPass,
          activo:'TRUE'
        },
      ]);

    if (error) {
        console.error('Error de Supabase:', error); // Imprime el error de Supabase
         // Verificar si el error es por restricción única
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'Ya usuario registrado' }),
          { status: 400 }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Error al registrar el usuario'}),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ pago: data }), { status: 200 });
  } catch (err) {
    console.error('Error al registrar usuario', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}