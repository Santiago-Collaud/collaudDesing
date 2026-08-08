"use client";

import { useEffect, useState } from "react";
import NewSongModal from "./newSongModal";
import EditSongModal from "./EditSongModal";

import {SquarePen, Trash2 } from "lucide-react";

interface Band {
  id: string;
  name: string;
  active: string;
}

interface Song {
  id: string;
  name: string;
  tone: string;
  duration: string;
  detail: string;
  active: string;
}

interface SongListProps {
  idAdmin: string;
  refresh?: number;
}

export default function SongList({
  idAdmin,
  refresh = 0,
}: SongListProps) {

  const [bands, setBands] = useState<Band[]>([]);
  const [selectedBandId, setSelectedBandId] = useState("");

  const [songs, setSongs] = useState<Song[]>([]);

  const [loadingBands, setLoadingBands] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState(false);

  const [error, setError] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);


  // --------------------------------
  // CARGAR BANDAS DEL USUARIO
  // --------------------------------

  async function loadBands() {

    setLoadingBands(true);
    setError("");

    try {

      const response = await fetch(
        `/api/queSigue/band/list?id_admin=${idAdmin}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setBands(data.bands);

    } catch (err) {

      console.error(err);

      setError("Error de conexión.");

    } finally {

      setLoadingBands(false);

    }
  }


  // --------------------------------
  // CARGAR CANCIONES DE LA BANDA
  // --------------------------------

  async function loadSongs() {

    if (!selectedBandId) {
      setSongs([]);
      return;
    }

    setLoadingSongs(true);
    setError("");

    try {

      const response = await fetch(
        `/api/queSigue/song/list?id_band=${selectedBandId}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setSongs(data.songs);

    } catch (err) {

      console.error(err);

      setError("Error de conexión.");

    } finally {

      setLoadingSongs(false);

    }
  }


  // --------------------------------
  // CARGAR BANDAS AL ENTRAR
  // --------------------------------

  useEffect(() => {

    loadBands();

  }, [idAdmin, refresh]);


  // --------------------------------
  // CARGAR CANCIONES AL CAMBIAR BANDA
  // --------------------------------

  useEffect(() => {

    loadSongs();

  }, [selectedBandId]);


  // --------------------------------
  // RENDER
  // --------------------------------

  if (loadingBands) {

    return (
      <p>
        Cargando bandas...
      </p>
    );

  }

  async function deleteSong(song: Song) {

    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar la canción "${song.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `/api/queSigue/song/${song.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      await loadSongs();

    } catch (err) {

      console.error(err);

      alert("Error de conexión.");

    }
  }

  if (error) {

    return (
      <p className="text-error">
        {error}
      </p>
    );

  }


  return (

    <div>

      {/* SELECTOR DE BANDA */}

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

        <select
          className="select select-bordered w-full max-w-md"
          value={selectedBandId}
          onChange={(e) => setSelectedBandId(e.target.value)}
        >

          <option value="">
            Seleccioná una banda
          </option>

          {bands.map((band) => (

            <option
              key={band.id}
              value={band.id}
            >
              {band.name}
            </option>

          ))}

        </select>


        {selectedBandId && (

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowNew(true)}
          >
            + Nueva canción
          </button>

        )}

      </div>


      {/* CANCIONES */}

      {!selectedBandId ? (

        <p className="opacity-60">
          Seleccioná una banda para ver sus canciones.
        </p>

      ) : loadingSongs ? (

        <p>
          Cargando canciones...
        </p>

      ) : songs.length === 0 ? (

        <p className="opacity-60">
          No hay canciones.
        </p>

      ) : (

        <ul className="space-y-2">

          {songs.map((song) => (

            <li
              key={song.id}
              className="border rounded-lg p-3 flex justify-between items-center"
            >

              <div>

                <p className="font-bold">
                  {song.name}
                </p>

                <p className="text-sm opacity-60">
                  {song.tone} · {song.duration}
                </p>

                <p className="text-sm opacity-60">
                  {song.detail}
                </p>
<span
              className={`text-xs ${
                song.active === "ACTIVE"
                  ? "text-success"
                  : "text-error"
              }`}
            >
              {song.active === "ACTIVE" ? "Activa" : "Inactiva"}
            </span>
              </div>

            <div className="flex gap-2">
              <button
                className="btn btn-xs btn-primary"
                onClick={() => {

                  setSelectedSong(song);
                  setShowEdit(true);

                }}
              >
                <SquarePen size={18} />
                {/*Editar*/}
              </button>

               <button
                  className="btn btn-xs btn-error"
                  onClick={() => deleteSong(song)}
                >
                  <Trash2 size={18} />
                  {/*Eliminar*/}
                </button>
              </div>
            </li>

          ))}

        </ul>

      )}


      {/* NUEVA CANCIÓN */}

      {selectedBandId && (

        <NewSongModal
          open={showNew}
          idBand={selectedBandId}
          onClose={() => setShowNew(false)}
          onCreated={() => {

            setShowNew(false);
            loadSongs();

          }}
        />

      )}


      {/* EDITAR CANCIÓN */}

      {selectedSong && (

        <EditSongModal
          open={showEdit}
          song={selectedSong}
          onClose={() => setShowEdit(false)}
          onUpdated={() => {

            setShowEdit(false);
            loadSongs();

          }}
        />

      )}

    </div>

  );
}