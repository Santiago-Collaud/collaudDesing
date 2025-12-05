import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value;
  const rol = req.cookies.get("rol")?.value;

  //console.log("Middleware - Token:", token);
  //console.log("Middleware - Rol:", rol);
  //console.log("Activando middleware");

  // Si no hay token → afuera
  if (!token) {
    return NextResponse.redirect(new URL("/download", req.url));
  }

  // Protege /admin
  if (req.nextUrl.pathname.startsWith("/admin") && rol !== "admin") {
    return NextResponse.redirect(new URL("/download", req.url));
  }

  // Protege /clientes
  if (req.nextUrl.pathname.startsWith("/clientes") && rol !== "cliente") {
    return NextResponse.redirect(new URL("/download", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/clientes/:path*"],
};
