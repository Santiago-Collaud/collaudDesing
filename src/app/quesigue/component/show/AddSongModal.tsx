"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddSongModal({
  open,
  onClose,
}: Props) {
  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>

      <div className="modal-box">

        <h2 className="text-xl font-bold">
          Agregar canción
        </h2>

        <p className="mt-4">
          Próximamente...
        </p>

        <div className="modal-action">

          <button
            className="btn"
            onClick={onClose}
          >
            Cerrar
          </button>

        </div>

      </div>

    </dialog>
  );
}