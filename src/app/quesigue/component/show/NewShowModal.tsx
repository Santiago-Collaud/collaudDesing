"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewShowModalProps {
  open: boolean;
  idBand: string;
  bandName: string;
  onClose: () => void;
}

export default function NewShowModal({
  open,
  idBand,
  bandName,
  onClose,
}: NewShowModalProps) {
  const [showName, setShowName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function createShow() {
  if (!showName.trim() || !date) {
    setError("Completá todos los campos.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch("/api/queSigue/show/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idBand,
        bandName,
        name: showName,
        date,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      return;
    }

    //console.log("SetList creado:", data);

    router.push(`/quesigue/show/${data.id}`);

  } catch (err) {
    console.error(err);
    setError("Error de conexión.");
  } finally {
    setLoading(false);
  }
}

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>

      <div className="modal-box">

        <h2 className="text-2xl font-bold">
          Nuevo SetList
        </h2>

        <p className="opacity-70 mt-1">
          Banda: <strong>{bandName}</strong>
        </p>

        <div className="mt-6 space-y-4">

          <label className="form-control">

            <span className="label-text">
              Nombre del Show
            </span>

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Ej. Festival Primavera"
              value={showName}
              onChange={(e) => setShowName(e.target.value)}
            />

          </label>

          <label className="form-control">

            <span className="label-text">
              Fecha
            </span>

            <input
              type="date"
              className="input input-bordered w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

          </label>

          {error && (
            <p className="text-error">
              {error}
            </p>
          )}

        </div>

        <div className="modal-action">

          <button
            className="btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            className="btn btn-primary"
            onClick={createShow}
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </button>

        </div>

      </div>

    </dialog>
  );
}