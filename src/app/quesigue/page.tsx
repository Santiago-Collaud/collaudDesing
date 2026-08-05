//PAGINA SUITE DE SET LIST CREATOR
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Dashboard from "./component/dashboard";

export default function SoftwarePage() {
  const [modal, setModal] = useState<"register" | "forgot" | null>(null);

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPass, setShowPass] = useState(false);

  const [user, setUser] = useState<{
  id: string;
  username: string;
} | null>(null);

  //ESTADOS PARA REGISTRO
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [registerPassRepeat, setRegisterPassRepeat] = useState("");

  //ESTADOS PARA VERIFICACION DE CODIGO
  const [verificationCode, setVerificationCode] = useState("");

  const [registerStep, setRegisterStep] = useState<
    "register" | "verify"
  >("register");

  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  
  
  //FORGOT PASSWORD STATES
  const [forgotStep, setForgotStep] = useState<
  "email" | "code" | "password"
    >("email");

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [forgotPass, setForgotPass] = useState("");
  const [forgotPassRepeat, setForgotPassRepeat] = useState("");

  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");

  //LOGUIN
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

  //REGISTRO
  async function register() {
  setRegisterError("");
  setRegisterMessage("");

  if (
    !registerUsername ||
    !registerEmail ||
    !registerPass ||
    !registerPassRepeat
  ) {
    setRegisterError("Completá todos los campos.");
    return;
  }

  if (registerPass !== registerPassRepeat) {
    setRegisterError("Las contraseñas no coinciden.");
    return;
  }

  setRegisterLoading(true);

  try {
    const response = await fetch(
      "/api/queSigue/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          pass: registerPass,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setRegisterError(data.error);
      return;
    }

    setRegisterMessage(data.message);
    setRegisterStep("verify");

  } catch {
    setRegisterError(
      "Error de conexión con el servidor."
    );
  } finally {
    setRegisterLoading(false);
  }
}

  //VERIFICACION DE CODIGO
  async function verifyRegister() {
    setRegisterError("");
    setRegisterMessage("");

    if (!verificationCode) {
      setRegisterError(
        "Ingresá el código de verificación."
      );
      return;
    }

    setRegisterLoading(true);

    try {
      const response = await fetch(
        "/api/queSigue/auth/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerEmail,
            code: verificationCode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(data.error);
        return;
      }
      
      alert(
        "Cuenta creada correctamente.\n\nYa podés iniciar sesión."
      );

      setRegisterStep("register");

      setRegisterUsername("");
      setRegisterEmail("");
      setRegisterPass("");
      setRegisterPassRepeat("");
      setVerificationCode("");

      setModal(null);
      
    } catch {
      setRegisterError(
        "Error de conexión con el servidor."
      );
    } finally {
      setRegisterLoading(false);
    }
  }

  //FORGOT PASSWORD
  async function forgotPassword() {
    setForgotError("");

    if (!forgotEmail) {
      setForgotError("Ingresá tu correo electrónico.");
      return;
    }

    setForgotLoading(true);

    try {
      const response = await fetch(
        "/api/queSigue/auth/forgot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setForgotError(data.error);
        return;
      }

      setForgotStep("code");

    } catch {
      setForgotError(
        "Error de conexión con el servidor."
      );
    } finally {
      setForgotLoading(false);
    }
  }
  //RESET PASSWORD
  async function resetPassword() {
    setForgotError("");

    if (!forgotCode) {
      setForgotError(
        "Ingresá el código de verificación."
      );
      return;
    }

    if (!forgotPass || !forgotPassRepeat) {
      setForgotError(
        "Completá los dos campos de contraseña."
      );
      return;
    }

    if (forgotPass !== forgotPassRepeat) {
      setForgotError(
        "Las contraseñas no coinciden."
      );
      return;
    }

    if (forgotPass.length < 8) {
      setForgotError(
        "La contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    setForgotLoading(true);

    try {
      const response = await fetch(
        "/api/queSigue/auth/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotEmail,
            code: forgotCode,
            pass: forgotPass,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setForgotError(data.error);
        return;
      }

      // Limpiar todo
      setForgotStep("email");
      setForgotEmail("");
      setForgotCode("");
      setForgotPass("");
      setForgotPassRepeat("");
      setForgotError("");

      setModal(null);

      alert(
        "Contraseña actualizada correctamente.\n\nYa podés iniciar sesión."
      );

    } catch {
      setForgotError(
        "Error de conexión con el servidor."
      );
    } finally {
      setForgotLoading(false);
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
          <img src="/icon/queSigue/icons/queSigue-texto.png" alt="logo" />
          <h1 className="text-3xl font-bold text-center">
            Creator
          </h1>

          <p className="text-center opacity-70 mb-4">
            Iniciá sesión para administrar tus SetLists.
          </p>

        <div className="w-full">
        <label className="form-control w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full mb-4"
            placeholder="Usuario"
            required
          />
        </label>
      </div>

      <label className="form-control w-full mt-3">
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="input input-bordered w-full pr-12"
              placeholder="Contraseña"
              required
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
              onClick={() => setShowPass((value) => !value)}
              aria-label={
                showPass
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
            >
              {showPass ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
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
      <dialog
        className={`modal ${
          modal === "register" ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">

          {registerStep === "register" ? (
            <>
              <h3 className="font-bold text-lg">
                Crear cuenta
              </h3>

              <p className="text-sm opacity-70 mt-2">
                Creá tu cuenta de queSigue para administrar
                tus SetLists.
              </p>

              <div className="space-y-3 mt-4">

                <input
                  type="text"
                  placeholder="Usuario"
                  className="input input-bordered w-full"
                  value={registerUsername}
                  onChange={(e) =>
                    setRegisterUsername(e.target.value)
                  }
                />

                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="input input-bordered w-full"
                  value={registerEmail}
                  onChange={(e) =>
                    setRegisterEmail(e.target.value)
                  }
                />

                <input
                  type="password"
                  placeholder="Contraseña"
                  className="input input-bordered w-full"
                  value={registerPass}
                  onChange={(e) =>
                    setRegisterPass(e.target.value)
                  }
                />

                <input
                  type="password"
                  placeholder="Repetir contraseña"
                  className="input input-bordered w-full"
                  value={registerPassRepeat}
                  onChange={(e) =>
                    setRegisterPassRepeat(e.target.value)
                  }
                />

              </div>

              {registerError && (
                <p className="text-error text-sm mt-3">
                  {registerError}
                </p>
              )}

              {registerMessage && (
                <p className="text-success text-sm mt-3">
                  {registerMessage}
                </p>
              )}

              <div className="modal-action">

                <button
                  className="btn btn-primary"
                  onClick={register}
                  disabled={registerLoading}
                >
                  {registerLoading
                    ? "Creando..."
                    : "Crear cuenta"}
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setModal(null);
                    setRegisterError("");
                    setRegisterMessage("");
                  }}
                  disabled={registerLoading}
                >
                  Cancelar
                </button>

              </div>
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg">
                Verificar correo electrónico
              </h3>

              <p className="mt-3">
                Enviamos un código de verificación a:
              </p>

              <p className="font-semibold mt-1 break-all">
                {registerEmail}
              </p>

              <p className="text-sm opacity-70 mt-3">
                Ingresá el código de 6 dígitos que recibiste
                por correo electrónico.
              </p>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Código de verificación"
                className="input input-bordered w-full mt-4 text-center text-xl tracking-[0.4em]"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />

              {registerError && (
                <p className="text-error text-sm mt-3">
                  {registerError}
                </p>
              )}

              {registerMessage && (
                <p className="text-success text-sm mt-3">
                  {registerMessage}
                </p>
              )}

              <div className="modal-action">

                <button
                  className="btn btn-primary"
                  onClick={verifyRegister}
                  disabled={registerLoading}
                >
                  {registerLoading
                    ? "Verificando..."
                    : "Verificar cuenta"}
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setRegisterStep("register");
                    setRegisterError("");
                    setRegisterMessage("");
                  }}
                  disabled={registerLoading}
                >
                  Volver
                </button>

              </div>
            </>
          )}

        </div>
      </dialog>

      {/* Modal Recuperar */}
      <dialog
        className={`modal ${
          modal === "forgot" ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">

          {/* ========================= */}
          {/* PASO 1 - EMAIL */}
          {/* ========================= */}

          {forgotStep === "email" && (
            <>
              <h3 className="font-bold text-lg">
                Recuperar contraseña
              </h3>

              <p className="py-3">
                Ingresá tu correo electrónico y te
                enviaremos un código para restablecer
                tu contraseña.
              </p>

              <input
                type="email"
                placeholder="Correo electrónico"
                className="input input-bordered w-full"
                value={forgotEmail}
                onChange={(e) =>
                  setForgotEmail(e.target.value)
                }
              />

              {forgotError && (
                <p className="text-error text-sm mt-3">
                  {forgotError}
                </p>
              )}

              <div className="modal-action">

                <button
                  className="btn btn-primary"
                  onClick={forgotPassword}
                  disabled={forgotLoading}
                >
                  {forgotLoading
                    ? "Enviando..."
                    : "Enviar código"}
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setModal(null);
                    setForgotError("");
                  }}
                  disabled={forgotLoading}
                >
                  Cancelar
                </button>

              </div>
            </>
          )}

          {/* ========================= */}
          {/* PASO 2 - CÓDIGO */}
          {/* ========================= */}

          {forgotStep === "code" && (
            <>
              <h3 className="font-bold text-lg">
                Verificar código
              </h3>

              <p className="mt-3">
                Enviamos un código de recuperación a:
              </p>

              <p className="font-semibold mt-1 break-all">
                {forgotEmail}
              </p>

              <p className="text-sm opacity-70 mt-3">
                Ingresá el código de 6 dígitos que
                recibiste por correo electrónico.
              </p>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Código de verificación"
                className="input input-bordered w-full mt-4 text-center text-xl tracking-[0.4em]"
                value={forgotCode}
                onChange={(e) =>
                  setForgotCode(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />

              {forgotError && (
                <p className="text-error text-sm mt-3">
                  {forgotError}
                </p>
              )}

              <div className="modal-action">

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setForgotError("");

                    if (!forgotCode) {
                      setForgotError(
                        "Ingresá el código de verificación."
                      );
                      return;
                    }

                    if (!/^\d{6}$/.test(forgotCode)) {
                      setForgotError(
                        "El código debe tener 6 dígitos."
                      );
                      return;
                    }

                    setForgotStep("password");
                  }}
                >
                  Continuar
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setForgotStep("email");
                    setForgotCode("");
                    setForgotError("");
                  }}
                >
                  Volver
                </button>

              </div>
            </>
          )}

          {/* ========================= */}
          {/* PASO 3 - NUEVA PASSWORD */}
          {/* ========================= */}

          {forgotStep === "password" && (
            <>
              <h3 className="font-bold text-lg">
                Nueva contraseña
              </h3>

              <p className="text-sm opacity-70 mt-2">
                Elegí una nueva contraseña para tu cuenta.
              </p>

              <div className="space-y-3 mt-4">

                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  className="input input-bordered w-full"
                  value={forgotPass}
                  onChange={(e) =>
                    setForgotPass(e.target.value)
                  }
                />

                <input
                  type="password"
                  placeholder="Repetir contraseña"
                  className="input input-bordered w-full"
                  value={forgotPassRepeat}
                  onChange={(e) =>
                    setForgotPassRepeat(e.target.value)
                  }
                />

              </div>

              {forgotError && (
                <p className="text-error text-sm mt-3">
                  {forgotError}
                </p>
              )}

              <div className="modal-action">

                <button
                  className="btn btn-primary"
                  onClick={resetPassword}
                  disabled={forgotLoading}
                >
                  {forgotLoading
                    ? "Actualizando..."
                    : "Cambiar contraseña"}
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setForgotStep("code");
                    setForgotPass("");
                    setForgotPassRepeat("");
                    setForgotError("");
                  }}
                  disabled={forgotLoading}
                >
                  Volver
                </button>

              </div>
            </>
          )}

        </div>
      </dialog>

    </main>
  );
}