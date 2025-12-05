"use client";

import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();

  const handleLogout = async () => {
    /*// Borrar token de localStorage
    localStorage.removeItem("token");

    // Borrar cookies (middleware las usa)
    document.cookie = "token=; Path=/; Max-Age=0;";
    document.cookie = "rol=; Path=/; Max-Age=0;";

    // Redirigir
    router.push("/download");*/
    await fetch("/api/logout", { method: "GET" });

  router.push("/download");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="px-4 py-2 text-gray-300 rounded-md hover:bg-red-700 transition"
    >
      Salir
    </button>
  );
}
