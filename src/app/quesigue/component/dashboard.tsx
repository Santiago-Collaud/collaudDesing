"use client";
import { useState } from "react";
import CreateBandModal from "./band/newBand";
import BandList from "./band/bandList";
import ShowList from "../show/showList";

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
  const [refreshBands] = useState(0);
  

  return (
    <main className="min-h-screen bg-base-200 p-6">

      <header className="flex justify-between items-center mb-8">
      <nav>
        <div>
          <h1 className="text-3xl font-bold">
            queSigue Creator
          </h1>

          <p className="opacity-70">
            Usuario: {username}
          </p>
        </div>

        <button
          className="btn btn-outline" 
          onClick={() => setShowCreateBand(true)}
        >
          crear banda
        </button>
        <button
          className="btn btn-outline"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
        </nav>
        

      </header>


      <section>

        <div className="card bg-base-100 shadow mb-4">
          <div className="card-body">
            <h2 className="card-title">
              Bandas
            </h2>
            <div className="card-body">
              <BandList
                idAdmin={idAdmin}
                refresh={refreshBands}
              />
            </div>
          </div>
        </div>

        {/*
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Canciones
            </h2>

            <p>
              Administrar repertorio
            </p>

            <button className="btn btn-primary mt-4">
              Entrar
            </button>
          </div>
        </div>
        */}

        <div className="card bg-base-100 shadow">

        <div className="card-body">

          <h2 className="card-title">
            SetLists
          </h2>

          <div className="card-body">

            <ShowList
              idAdmin={idAdmin}
            />

          </div>

        </div>

      </div>


      </section>
      {/*MODAL CREAR BANDA */}
        <CreateBandModal
          open={showCreateBand}
          idAdmin={idAdmin}
          onClose={() => setShowCreateBand(false)}
          onCreated={() => {
            console.log("Banda creada");
            // Después acá vamos a recargar el listado.
          }}
        />
    </main>
  );
}