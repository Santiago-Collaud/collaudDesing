"use client";

import { useEffect, useState } from "react";
import type { SetListItem } from "../../../../../lib/queSigue/types";
import { SHOW_EVENTS } from "../../../../../lib/queSigue/showEvents";

interface Song {
  id: string;
  name: string;
  tone: string;
  duration: string;
  detail: string;
}

interface AddSongModalProps {
  open: boolean;
  idBand: string;
  onClose: () => void;
  onAdd: (song: SetListItem) => void;
}

export default function AddSongModal({
  open,
  idBand,
  onClose,
  onAdd,
}: AddSongModalProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadSongs() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/queSigue/song/list?id_band=${idBand}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setSongs(data.songs);
      setFilteredSongs(data.songs);

    } catch (err) {
      console.error(err);
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      loadSongs();
      setSearch("");
    }
  }, [open]);

  useEffect(() => {

    const text = search.toLowerCase();

    setFilteredSongs(
      songs.filter(song =>
        song.name.toLowerCase().includes(text)
      )
    );

  }, [search, songs]);

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>

      <div className="modal-box max-w-2xl">

        <h3 className="font-bold text-lg">
          Agregar elemento
        </h3>

        <input
          type="text"
          placeholder="Buscar..."
          className="input input-bordered w-full mt-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mt-5 max-h-96 overflow-y-auto">

          {loading && (
            <p>Cargando canciones...</p>
          )}

          {error && (
            <p className="text-error">{error}</p>
          )}

          {!loading && !error && filteredSongs.length === 0 && (
            <p className="opacity-60">
              No se encontraron canciones.
            </p>
          )}

          <ul className="space-y-2">
            
            <details className="collapse collapse-arrow bg-base-200 mb-4">

              <summary className="collapse-title font-semibold">
                Eventos
              </summary>

              <div className="collapse-content">

                <ul className="space-y-2">

                  {SHOW_EVENTS.map((event) => (

                    <li
                      key={event.tipo}
                      className="border rounded-lg p-3 flex justify-between items-center"
                    >

                      <span>{event.nombre}</span>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          onAdd({
                            tipo: event.tipo,
                            color: event.color,
                            nombre: event.nombre,
                          });

                          onClose();
                        }}
                      >
                        Agregar
                      </button>

                    </li>

                  ))}

                </ul>

              </div>

            </details>
            {filteredSongs.map(song => (

              <li
                key={song.id}
                className="border rounded-lg p-3 flex justify-between items-center"
              >

                <div>

                  <p className="font-bold">
                    {song.name}
                  </p>

                  <p className="text-sm opacity-60">
                    {song.tone} • {song.duration}
                  </p>

                </div>

                <button
                  className="btn btn-primary btn-sm"
                 onClick={() => {
                    onAdd({
                      tipo: "song",
                      color: "default",
                      nombre: song.name,
                      tono: song.tone,
                      nota: song.detail,
                    });

                    onClose();
                  }}
                >
                  Agregar
                </button>

              </li>

            ))}

          </ul>

        </div>

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