"use client";

import { useState } from "react";

interface CreateBandModalProps {
  open: boolean;
  idAdmin: string;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateBandModal({
  open,
  idAdmin,
  onClose,
  onCreated,
}: CreateBandModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createBand() {
    if (!name.trim()) {
      setError("Ingresá un nombre.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/queSigue/band/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          id_admin: idAdmin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setName("");
      onCreated();
      onClose();

    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>

      <div className="modal-box">

        <h3 className="font-bold text-lg">
          Nueva banda
        </h3>

        <div className="mt-4">

          <label className="form-control">

            <span className="label-text">
              Nombre
            </span>

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Nombre de la banda"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </label>

          {error && (
            <p className="text-error text-sm mt-3">
              {error}
            </p>
          )}

        </div>

        <div className="modal-action">

          <button
            className="btn"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="btn btn-primary"
            onClick={createBand}
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </button>

        </div>

      </div>

    </dialog>
  );
}