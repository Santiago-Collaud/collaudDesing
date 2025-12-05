"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useCreateEvento } from "../hook/useCreateEvento";
import NavBar from "@/app/componetes/navbar/nav";

export default function CrearEventoPage() {
  const params = useParams();
  const id = params.id as string;
  
  const { createEvento, loading, error } = useCreateEvento();

  const [tituloEvento, setTituloEvento] = useState("");
  const [comentario, setComentario] = useState("");
  const [linkDrive, setLinkDrive] = useState("");
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [archivoSupa, setArchivoSupa] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!previewFile) {
      alert("La imagen preview es obligatoria");
      return;
    }

    await createEvento({
      tituloEvento,
      comentario,
      previewFile,
      archivoSupa,
      link_drive: linkDrive || null,
      cliente_id: id,
    });
  };

  return (
    <main style={{ padding: 24 }}>
      <NavBar />
      <h1 className="mt-5 font-serif mb-4">Crear evento para cliente </h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}
      className="bg-gray-800 max-w-lg p-6 rounded-lg shadow-md">

        <h2>Titulo del evento</h2>
        <input
          type="text"
          placeholder="Nombre del evento"
          value={tituloEvento}
          onChange={(e) => setTituloEvento(e.target.value)}
          required
          className="input input-lg"
        />

        <h2>Comentario</h2>
        <textarea
          placeholder="Comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="textarea textarea-neutra"
        />
        <div className="border rounded-lg m-4 p-2">
          <label>Vista Previa (imagen obligatoria):</label>
          <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setPreviewFile(e.target.files?.[0] || null)} 
              required 
              className="file-input "/>
        </div>

        <div className="border rounded-lg m-4 p-2">
          <h2>Link Drive (opcional)</h2>
            <input
              type="text"
              placeholder="Link drive (opcional)"
              value={linkDrive}
              onChange={(e) => setLinkDrive(e.target.value)}
              className="border p-2"
            />
        </div>
        
      <div className="border rounded-lg m-4 p-2">
        <h2>Archivo Supa (opcional):</h2>
        <input 
            type="file" 
            onChange={(e) => setArchivoSupa(e.target.files?.[0] || null)} 
            className="file-input"/>
      </div>
        

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Creando..." : "Crear evento"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
