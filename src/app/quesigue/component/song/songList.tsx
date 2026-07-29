"use client";

import { useEffect, useState } from "react";
import type { SetListItem } from "../../../../../lib/queSigue/types";
import NewSongModal from "./newSongModal";
import EditSongModal from "./EditSongModal";


interface Song {
  id: string;
  name: string;
  tone: string;
  duration: string;
  detail: string;
  active: string;
}


interface SongListProps {
  idBand: string;
  refresh?: number;
}


export default function SongList({
  idBand,
  refresh = 0,
}: SongListProps) {


  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);



  async function loadSongs() {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        `/api/queSigue/song/list?id_band=${idBand}`
      );


      const data = await response.json();


      if(!response.ok){

        setError(data.error);
        return;

      }

      console.log("songList",data.songs);
      setSongs(data.songs);


    } catch(err){

      console.error(err);
      setError("Error de conexión.");

    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {

    loadSongs();

  }, [refresh]);



  if(loading){

    return <p>Cargando canciones...</p>;

  }


  if(error){

    return (
      <p className="text-error">
        {error}
      </p>
    );

  }



  return (

    <div>


      <div className="flex justify-between mb-4">

        <h2 className="text-xl font-bold">
          Canciones
        </h2>


        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowNew(true)}
        >
          Nueva canción
        </button>


      </div>



      {
        songs.length === 0 ? (

          <p className="opacity-60">
            No hay canciones.
          </p>

        ) : (

          <ul className="space-y-2">

            {
              songs.map(song => (

                <li
                  key={song.id}
                  className="border rounded-lg p-3 flex justify-between"
                >

                  <div>

                    <p className="font-bold">
                      {song.name}
                    </p>

                    <p className="text-sm opacity-60">
                      {song.tone} · {song.duration}
                    </p>

                  </div>


                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => {
                      setSelectedSong(song);
                      setShowEdit(true);
                    }}
                  >
                    Editar
                  </button>


                </li>

              ))
            }

          </ul>

        )
      }



      <NewSongModal
        open={showNew}
        idBand={idBand}
        onClose={() => setShowNew(false)}
        onCreated={() => {
          setShowNew(false);
          loadSongs();
        }}
      />



      {
        selectedSong && (

          <EditSongModal
            open={showEdit}
            song={selectedSong}
            onClose={() => setShowEdit(false)}
            onUpdated={() => {
              setShowEdit(false);
              loadSongs();
            }}
          />

        )
      }


    </div>

  );

}