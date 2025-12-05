export const runtime = "nodejs";

import { supabase } from '../../../../lib/supabaseClient';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export async function POST(req: Request) {
  const { username, pass } = await req.json();

  if (!username || !pass) {
    return new Response(
      JSON.stringify({ error: 'Nombre de usuario y contraseña son requeridos' }),
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('user')
      .select('id, username, pass, rol, active')
      .eq('username', username)
      .single();

    if (error || !data) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 401 });
    }

    if (!data.active) {
      return new Response(JSON.stringify({ error: 'Cuenta suspendida por el administrador' }), { status: 403 });
    }

    // Comparar contraseña con bcrypt
    const passwordMatch = await bcrypt.compare(pass, data.pass);
    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });
    }

    if (data.rol !== 'admin' && data.rol !== 'cliente') {
      return new Response(JSON.stringify({ error: "Rol inválido" }), { status: 403 });
    }

    const token = await new SignJWT({
      id: data.id,
      username: data.username,
      rol: data.rol
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(SECRET);

    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `token=${token}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=3600`
    );

    headers.append(
      'Set-Cookie',
      `rol=${data.rol}; Path=/; SameSite=Strict; Secure; Max-Age=3600`
    );

    return new Response(JSON.stringify({ user: data, token }), { status: 200, headers });

  } catch (err) {
    console.error('Error en la autenticación', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}
