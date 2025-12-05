"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthRouteWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    const isPrivate =
      pathname.startsWith("/admin") || pathname.startsWith("/clientes");

    if (!isPrivate) {
      // no está en sección privada → limpiar token
      document.cookie = "token=; Path=/; Max-Age=0";
      document.cookie = "rol=; Path=/; Max-Age=0";
      localStorage.removeItem("token");
      console.log("Sesión cerrada por salir de zona privada");
    }
  }, [pathname]);

  return null; // no renderiza nada
}
