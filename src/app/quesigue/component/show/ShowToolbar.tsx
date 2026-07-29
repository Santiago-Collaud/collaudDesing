"use client";

import { useState } from "react";
import type { SetListItem } from "../../../../../lib/queSigue/types";
import NewSongModal from "../song/newSongModal";
import AddSongModal from "../song/addItemsModal";
import ShareQRModal from "./ShareQRModal";


interface ShowToolbarProps {
  idBand: string;
  showId: string;
  onAddSong: (song: SetListItem) => void;
  onSave: () => void;
}


export default function ShowToolbar({
  idBand,
  showId,
  onAddSong,
  onSave,
}: ShowToolbarProps) {


  const [showNewSong, setShowNewSong] = useState(false);
  const [showAddSong, setShowAddSong] = useState(false);
  const [showQR, setShowQR] = useState(false);

  //console.log("ShowToolbar", { idBand, showNewSong });

    async function exportJson() {

      const response = await fetch(
        `/api/queSigue/show/${showId}/export`
      );

      if (!response.ok) {
        alert("No se pudo exportar.");
        return;
      }

      const text = await response.text();

      const blob = new Blob(
        [text],
        {
          type: "application/json",
        }
      );

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `setlist-${showId}.setlist`;

      a.click();

      URL.revokeObjectURL(url);

    }

  return (
    <>

      <div className="flex flex-wrap gap-3">


        <button
          className="btn btn-primary"
          onClick={() => setShowAddSong(true)}
        >
          Agregar canción
        </button>



        <button
          className="btn btn-primary"
          onClick={() => setShowNewSong(true)}
        >
          Crear canción
        </button>



        <button
          className="btn btn-outline"
          onClick={exportJson}
        >
          Exportar JSON
        </button>



        <button
          className="btn btn-outline"
          onClick={() => setShowQR(true)}
        >
          Generar QR
        </button>



        <button
          className="btn btn-success"
          onClick={onSave}
      >
          Guardar
      </button>


      </div>



      <NewSongModal

        open={showNewSong}

        idBand={idBand}

        onClose={() => setShowNewSong(false)}

        onCreated={() => {

          console.log("Canción creada");

          setShowNewSong(false);

        }}

      />
      <AddSongModal
          open={showAddSong}
          idBand={idBand}
          onClose={() => setShowAddSong(false)}
          onAdd={(song) => {
            onAddSong(song);
            setShowAddSong(false);
          }}
        />

      <ShareQRModal
        open={showQR}
        showId={showId}
        onClose={() => setShowQR(false)}
      />
    </>
  );
}