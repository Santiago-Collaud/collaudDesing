//borra la coockie de sesión del usuario y devuelve un mensaje de éxito
export async function POST() {
  return new Response(
    JSON.stringify({
      message: "Sesión cerrada.",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie":
          "token=; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=0",
      },
    }
  );
}