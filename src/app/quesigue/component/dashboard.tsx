"use client";
import { useState } from "react";
import CreateBandModal from "./band/newBand";
import BandList from "./band/bandList";
import ShowList from "../show/showList";
import SongList from "../component/song/songList";

interface DashboardProps {
  idAdmin: string;
  username: string;
  onLogout: () => void;
}

export default function Dashboard({
  idAdmin,
  username,
  onLogout,
}: DashboardProps) {

  const [showCreateBand, setShowCreateBand] = useState(false);
  const [refreshBands, setRefreshBands] = useState(0);
  

  return (
    <main className="min-h-screen bg-base-200">

  {/* HEADER */}
  <header className="navbar bg-base-100 shadow-sm px-6">

    <div className="flex-1">
      <div>
        <img
          src="/icon/queSigue/icons/queSigue-texto.png"
          alt="queSigue"
          className="h-10 w-auto"
        />

        <span className="text-sm opacity-60">
          Creator
        </span>
      </div>
    </div>

    <div className="flex items-center gap-3">

      <span className="text-sm">
        {username}
      </span>

      <button
        className="btn btn-outline btn-sm"
        onClick={onLogout}
      >
        Cerrar sesión
      </button>

    </div>

  </header>


  {/* CONTENIDO */}
  <main className="max-w-6xl mx-auto p-6">

    {/* BANDAS */}
    <section>

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          Bandas
        </h2>

        <button
          className="btn btn-primary"
          onClick={() => setShowCreateBand(true)}
        >
          + Crear banda
        </button>

      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">

          <BandList
            idAdmin={idAdmin}
            refresh={refreshBands}
          />

        </div>
      </div>

    </section>


    {/* SETLISTS */}
    <section className="mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Shows
      </h2>

      <div className="card bg-base-100 shadow-sm">

        <div className="card-body">

          <ShowList
            idAdmin={idAdmin}
          />

        </div>

      </div>

    </section>

{/* SONG LIST */}
    <section className="mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Canciones
      </h2>

      <div className="card bg-base-100 shadow-sm">

        <div className="card-body">

          <SongList
            idAdmin={idAdmin}
          />

        </div>

      </div>

    </section>

  </main>


  {/* MODAL CREAR BANDA */}

  <CreateBandModal
    open={showCreateBand}
    idAdmin={idAdmin}
    onClose={() => setShowCreateBand(false)}
    onCreated={() => {
      setRefreshBands((prev) => prev + 1);
      setShowCreateBand(false);
    }}
  />

</main>
  );
}