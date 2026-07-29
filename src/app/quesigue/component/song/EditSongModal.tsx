"use client";


import { useEffect, useState } from "react";



interface Song {

  id:string;
  name:string;
  tone:string;
  duration:string;
  detail:string;
  active:string;

}



interface EditSongModalProps {

  open:boolean;
  song:Song;
  onClose:()=>void;
  onUpdated:()=>void;

}




export default function EditSongModal({

  open,
  song,
  onClose,
  onUpdated,

}:EditSongModalProps){



  const [name,setName] = useState("");
  const [tone,setTone] = useState("");
  const [duration,setDuration] = useState("");
  const [detail,setDetail] = useState("");

  const [isActive,setIsActive] = useState(true);

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");





  useEffect(()=>{

    setName(song.name);
    setTone(song.tone);
    setDuration(song.duration);
    setDetail(song.detail);

    setIsActive(song.active === "ACTIVE");


  },[song]);





  async function updateSong(){


    setLoading(true);
    setError("");



    try{


      const response = await fetch(
        "/api/queSigue/song/update",
        {
          method:"PATCH",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({

            id:song.id,
            name,
            tone,
            duration,
            detail,
            active:isActive
              ? "ACTIVE"
              : "INACTIVE",

          }),
        }
      );



      const data = await response.json();



      if(!response.ok){

        setError(data.error);
        return;

      }



      onUpdated();
      onClose();



    }catch(err){

      console.error(err);
      setError("Error de conexión.");

    }finally{

      setLoading(false);

    }


  }





  return (

    <dialog className={`modal ${open ? "modal-open":""}`}>

      <div className="modal-box">


        <h3 className="font-bold text-lg">
          Editar canción
        </h3>



        <div className="mt-4 space-y-3">


          <input
            className="input input-bordered w-full"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />


          <input
            className="input input-bordered w-full"
            value={tone}
            onChange={(e)=>setTone(e.target.value)}
          />


          <input
            className="input input-bordered w-full"
            value={duration}
            onChange={(e)=>setDuration(e.target.value)}
          />



          <textarea
            className="textarea textarea-bordered w-full"
            value={detail}
            onChange={(e)=>setDetail(e.target.value)}
          />



          <div className="flex items-center gap-3">


            <span>
              Activa
            </span>


            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={isActive}
              onChange={(e)=>setIsActive(e.target.checked)}
            />


          </div>




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
            onClick={updateSong}
            disabled={loading}
          >
            {
              loading
              ? "Guardando..."
              : "Guardar"
            }
          </button>


        </div>



      </div>


    </dialog>

  );


}