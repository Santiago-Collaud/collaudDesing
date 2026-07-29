"use client";

import { useState } from "react";


interface NewSongModalProps {
  open: boolean;
  idBand: string;
  onClose: () => void;
  onCreated: () => void;
}


export default function NewSongModal({
  open,
  idBand,
  onClose,
  onCreated,
}: NewSongModalProps) {


  const [name, setName] = useState("");
  const [tone, setTone] = useState("");
  const [duration, setDuration] = useState("");
  const [detail, setDetail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  async function createSong() {


    if (!name.trim()) {

      setError("Ingresá un nombre.");
      return;

    }


    setLoading(true);
    setError("");



    try {

      console.log({
        name,
        tone,
        duration,
        detail,
        idBand,
      });
      
      const response = await fetch(
        "/api/queSigue/song/create",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            name,
            tone,
            duration,
            detail,
            id_band:idBand,
          }),
        }
      );


      const data = await response.json();



      if(!response.ok){

        setError(data.error);
        return;

      }



      setName("");
      setTone("");
      setDuration("");
      setDetail("");

      onCreated();
      onClose();



    } catch(err){

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
          Nueva canción
        </h3>



        <div className="mt-4 space-y-3">


          <input
            className="input input-bordered w-full"
            placeholder="Nombre"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />


          <input
            className="input input-bordered w-full"
            placeholder="Tono"
            value={tone}
            onChange={(e)=>setTone(e.target.value)}
          />


          <input
            className="input input-bordered w-full"
            placeholder="Duración (ej: 4:30)"
            value={duration}
            onChange={(e)=>setDuration(e.target.value)}
          />



          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Detalle"
            value={detail}
            onChange={(e)=>setDetail(e.target.value)}
          />



          {
            error && (
              <p className="text-error">
                {error}
              </p>
            )
          }


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
            onClick={createSong}
            disabled={loading}
          >
            {
              loading
              ? "Guardando..."
              : "Crear"
            }
          </button>


        </div>


      </div>

    </dialog>

  );

}