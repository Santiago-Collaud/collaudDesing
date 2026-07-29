//PAGINA SUITE DE SET LIST CREATOR
"use client";

import { useState } from "react";
import Dashboard from "./component/dashboard";

export default function SoftwarePage() {
  const [modal, setModal] = useState<"register" | "forgot" | null>(null);

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState<{
  id: string;
  username: string;
} | null>(null);

   async function login() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/queSigue/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          pass,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setUser(data.user);

    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }
  if (user) {
  return (
    <Dashboard
      username={user.username}
      idAdmin={user.id}
      onLogout={() => setUser(null)}
    />
  );
}
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 p-4">

      <div className="card w-full max-w-md bg-base-100 shadow-xl">

        <div className="card-body">

          <h1 className="text-3xl font-bold text-center">
            queSigue Creator
          </h1>

          <p className="text-center opacity-70 mb-4">
            Iniciá sesión para administrar tus SetLists.
          </p>

          <label className="form-control">
            <span className="label-text">Usuario</span>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered"
              placeholder="Usuario"
              required
            />
          </label>

          <label className="form-control mt-3">
            <span className="label-text">Contraseña</span>

            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="input input-bordered"
              placeholder="Contraseña"
              required
            />
          </label>

          <button
            className="btn btn-primary mt-6"
            onClick={login}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          {error && (
            <p className="text-error text-sm mt-2">
              {error}
            </p>
          )}

          <div className="divider">o</div>

          <button
            className="btn btn-outline"
            onClick={() => setModal("register")}
          >
            Crear cuenta
          </button>

          <button
            className="btn btn-ghost mt-2"
            onClick={() => setModal("forgot")}
          >
            ¿Olvidaste tu contraseña?
          </button>

        </div>

      </div>

      {/* Modal Registro */}

      <dialog className={`modal ${modal === "register" ? "modal-open" : ""}`}>

        <div className="modal-box">

          <h3 className="font-bold text-lg">
            Crear cuenta
          </h3>

          <div className="space-y-3 mt-4">

            <input
              type="text"
              placeholder="Usuario"
              className="input input-bordered w-full"
            />

            <input
              type="email"
              placeholder="Correo electrónico"
              className="input input-bordered w-full"
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="input input-bordered w-full"
            />

            <input
              type="password"
              placeholder="Repetir contraseña"
              className="input input-bordered w-full"
            />

          </div>

          <div className="modal-action">

            <button
              className="btn btn-primary"
            >
              Crear cuenta
            </button>

            <button
              className="btn"
              onClick={() => setModal(null)}
            >
              Cancelar
            </button>

          </div>

        </div>

      </dialog>

      {/* Modal Recuperar */}

      <dialog className={`modal ${modal === "forgot" ? "modal-open" : ""}`}>

        <div className="modal-box">

          <h3 className="font-bold text-lg">
            Recuperar contraseña
          </h3>

          <p className="py-3">
            Ingresá tu correo electrónico y te enviaremos un enlace para restablecer la contraseña.
          </p>

          <input
            type="email"
            placeholder="Correo electrónico"
            className="input input-bordered w-full"
          />

          <div className="modal-action">

            <button
              className="btn btn-primary"
            >
              Enviar
            </button>

            <button
              className="btn"
              onClick={() => setModal(null)}
            >
              Cancelar
            </button>

          </div>

        </div>

      </dialog>

    </main>
  );
}