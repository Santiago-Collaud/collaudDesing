"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import NavBar from "../componetes/navbar/nav";
import { useAuth } from "../download/hook/useAuth"; 

export default function DownloadPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { saveToken } = useAuth(); // ⬅️ USA EL HOOK

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username, 
          pass: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error en el inicio de sesión");
        setLoading(false);
        return;
      }

      // ⬅️ Guarda el token en localStorage + decodifica + setUser
      saveToken(data.token);

      // Redirección según rol
      if (data.user.rol === "admin") {
        router.push("/admin");
      } else {
        router.push("/clientes");
      }

    } catch (err) {
      setError("Error al conectar con el servidor");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="bg-neutral-950 min-h-screen">
        <NavBar />
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
          <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-xl border border-neutral-800">

            <div className="text-center mb-6">
              <Image 
                src="/icon/CollaudDesing_Icono.png"
                alt="Logo"
                width={300}
                height={300}
                className="mx-auto hover:scale-110 transition-transform duration-300"
              />
            </div>

            <form onSubmit={handleLogin} className="space-y-5">

              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}

              <div>
                <label className="text-neutral-300 text-sm">Usuario</label>
                <input
                  type="text"
                  required
                  className="w-full mt-1 px-3 py-2 bg-neutral-800 text-white rounded-lg outline-none border border-neutral-700 focus:border-white transition"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="text-neutral-300 text-sm">Contraseña</label>
                <input
                  type="password"
                  required
                  className="w-full mt-1 px-3 py-2 bg-neutral-800 text-white rounded-lg outline-none border border-neutral-700 focus:border-white transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 rounded-lg hover:bg-neutral-200 transition"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Ingresar"}
              </button>
            </form>

            <p className="text-neutral-500 text-xs text-center mt-8">
              © {new Date().getFullYear()} COLLAUD Design
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
