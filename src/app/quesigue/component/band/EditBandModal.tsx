"use client";

import { useEffect, useState } from "react";

interface EditBandModalProps {
  open: boolean;
  id: string;
  name: string;
  active: string;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditBandModal({
  open,
  id,
  name,
  active,   
  onClose,
  onUpdated,
}: EditBandModalProps) {
  const [bandName, setBandName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setBandName(name);
    setIsActive(active === "ACTIVE");
  }, [name, active]);

  async function updateBand() {
    if (!bandName.trim()) {
      setError("Ingresá un nombre.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/queSigue/band/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: bandName,
          active: isActive ? "ACTIVE" : "INACTIVE",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      onUpdated();
      onClose();

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

        <h3 className="font-bold text-lg">
          Editar banda
        </h3>

        <div className="mt-4">

          <label className="form-control">

            <span className="label-text">
              Nombre
            </span>

            <input
              type="text"
              className="input input-bordered w-full"
              value={bandName}
              onChange={(e) => setBandName(e.target.value)}
            />

          </label>
          <label className="label cursor-pointer mt-4">

            <span className="label-text">
                Banda activa
            </span>

            <input
                type="checkbox"
                className="toggle toggle-success"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
            />

            </label>

          {error && (
            <p className="text-error mt-3">
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
            onClick={updateBand}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>

        </div>

      </div>

    </dialog>
  );
}