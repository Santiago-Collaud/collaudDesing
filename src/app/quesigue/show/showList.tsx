//muestra los setlist creados por el admin, con la opcion de exportar el json, qr o aliminar.
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ShareQRModal from "../component/show/ShareQRModal";
import ShareJSON from "../component/show/ShareJSONModal";

import {SquarePen, Trash2, QrCode , } from "lucide-react";

interface Show {
  id: string;
  name: string;
  date: string;
  band: string;
  last_update: string;
}

interface ShowListProps {
  idAdmin: string;
  refresh?: number;
}

export default function ShowList({
  idAdmin,
  refresh = 0,
}: ShowListProps) {

  const router = useRouter();

  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showQR, setShowQR] = useState(false);
  const [selectedShowId, setSelectedShowId] = useState("");

  async function loadShows() {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        `/api/queSigue/show/list?id_admin=${idAdmin}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setShows(data.shows);

    } catch (err) {

      console.error(err);
      setError("Error de conexión.");

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadShows();

  }, [refresh]);

  if (loading) {
    return <p>Cargando SetLists...</p>;
  }

  if (error) {
    return (
      <p className="text-error">
        {error}
      </p>
    );
  }

  if (shows.length === 0) {
    return (
      <p className="opacity-60">
        Todavía no hay SetLists.
      </p>
    );
  }

  async function deleteShow(id: string) {

  if (!confirm("¿Eliminar este SetList?")) {
    return;
  }

  try {

    const response = await fetch(
      `/api/queSigue/show/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    loadShows();

  } catch (err) {

    console.error(err);

    alert("Error de conexión.");

  }

}

  return (
    <>

      <ul className="space-y-3">

        {shows.map((show) => (

          <li
            key={show.id}
            className="border rounded-xl p-4"
          >

            <div className="flex justify-between items-start">

              <div>

                <p className="font-bold">
                  {show.name}
                </p>

                <p className="text-sm opacity-70">
                  {show.band}
                </p>

                <p className="text-xs opacity-50">
                  {show.date}
                </p>

              </div>

              <div className="flex gap-2">
                
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() =>
                    router.push(`/quesigue/show/${show.id}`)
                  }
                >
                  <SquarePen size={18} />
                  {/*Editar*/}
                </button>   
                
                
                <button
                  className="btn btn-xs btn-outline"
                  onClick={() => {
                    setSelectedShowId(show.id);
                    setShowQR(true);
                  }}
                >
                  <QrCode size={18} />
                  {/*QR*/}
                </button>

                <ShareJSON
                  showId={show.id}
                />

                <button
                  className="btn btn-xs btn-error"
                  onClick={() => deleteShow(show.id)}
                >
                  <Trash2 size={18} />
                  {/*Eliminar*/}
                </button>

              </div>

            </div>

          </li>

        ))}

      </ul>

      <ShareQRModal
        open={showQR}
        showId={selectedShowId}
        onClose={() => setShowQR(false)}
      />

    </>
  );

}