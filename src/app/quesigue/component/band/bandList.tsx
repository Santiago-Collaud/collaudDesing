"use client";

import { useEffect, useState } from "react";
import EditBandModal from "./EditBandModal";
import NewShowModal from "../show/NewShowModal";

import {
  SquarePen,
  Trash2,
} from "lucide-react";


interface Band {
  id: string;  
  name: string;
  active: string;
}

interface BandListProps {
  idAdmin: string;
  refresh: number;
}

export default function BandList({
  idAdmin,
  refresh,
}: BandListProps) {
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [selectedBand, setSelectedBand] = useState<Band | null>(null);

  const [showNewShow, setShowNewShow] = useState(false);
  const [selectedBandForShow, setSelectedBandForShow] = useState<Band | null>(null);

  async function loadBands() {
    setLoading(true);
    setError("");
    
    console.log("Loading bands for admin:", idAdmin);

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

    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteBand(band: Band) {
  const confirmed = window.confirm(
    `¿Estás seguro de eliminar la banda "${band.name}"?\n\n` +
    "La banda dejará de aparecer en tu lista, " +
    "pero sus canciones y SetLists se conservarán."+
    "\n\n Para reactivarla, contactese con el administrador de la pagina."
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      `/api/queSigue/band/${band.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    // La quitamos inmediatamente de la pantalla
    setBands((prev) =>
      prev.filter((item) => item.id !== band.id)
    );

  } catch (error) {
    console.error("Error eliminando banda:", error);

    alert("Error de conexión.");
  }
}

  useEffect(() => {
    loadBands();
  }, [refresh]);

  if (loading) {
    return <p>Cargando bandas...</p>;
  }

  if (error) {
    return <p className="text-error">{error}</p>;
  }

  if (bands.length === 0) {
    return (
      <p className="opacity-60">
        Todavía no hay bandas.
      </p>
    );
  }

  return (
  <>

    <ul className="space-y-2">

      {bands.map((band) => (

        <li
          key={band.id}
          className="border rounded-lg p-3 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              {band.name}
            </p>

            <span
              className={`text-xs ${
                band.active === "ACTIVE"
                  ? "text-success"
                  : "text-error"
              }`}
            >
              {band.active === "ACTIVE" ? "Activa" : "Inactiva"}
            </span>
          </div>
          
          
          <div className="flex gap-2">

            <button
              className="btn btn-xs btn-secondary"
              disabled={band.active !== "ACTIVE"}
              onClick={() => {
                setSelectedBandForShow(band);
                setShowNewShow(true);
              }}
            >
              Crear SetList
            </button>
            
            <button
              className="btn btn-xs btn-primary"
              onClick={() => {
                setSelectedBand(band);
                setShowEdit(true);
              }}
            >
              <SquarePen size={18} />
              {/*Editar*/}
            </button>

            <button
              className="btn btn-xs btn-error"
              onClick={() => deleteBand(band)}
            >
              <Trash2 size={18} />
              {/*Eliminar*/}
            </button>

          </div>
        </li>
      ))}

    </ul>

    {selectedBand && (
      <EditBandModal
        open={showEdit}
        id={selectedBand.id}
        name={selectedBand.name}
        active={selectedBand.active}
        onClose={() => setShowEdit(false)}
        onUpdated={() => {
          setShowEdit(false);
          loadBands();
        }}
      />
    )}

    {selectedBandForShow && (
      <NewShowModal
        open={showNewShow}
        idBand={selectedBandForShow.id}
        bandName={selectedBandForShow.name}
        onClose={() => setShowNewShow(false)}
      />
    )}

  </>
);
}  
