"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ShowHeader from "../../component/show/ShowHeader";
import ShowToolbar from "../../component/show/ShowToolbar";
import ShowItems from "../../component/show/ShowItems";

interface Show {
  id: string;
  name: string;
  date: string;
  active: string;
  id_band: string;
  data: any;
}

export default function ShowPage() {
  const params = useParams();
  const id = params.id as string;

  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadShow() {
    try {
      const response = await fetch(
        `/api/queSigue/show/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      console.log("SHOW RECIBIDO:", data);

      setShow(data.show);

    } catch (err) {
      console.error(err);
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  function addSongToShow(item: any) {
    if (!show) return;

    setShow({
      ...show,
      data: {
        ...show.data,
        items: [
          ...(show.data?.items ?? []),
          item,
        ],
      },
    });
  }
  useEffect(() => {
    if (id) {
      loadShow();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="p-6">
        Cargando show...
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 text-error">
        {error}
      </main>
    );
  }

  if (!show) {
    return null;
  }

  function removeItem(index: number) {
    if (!show) return;

    const items = [...(show.data?.items ?? [])];

    items.splice(index, 1);

    setShow({
      ...show,
      data: {
        ...show.data,
        items,
      },
    });
  }

  function moveItemUp(index: number) {
    if (!show || index === 0) return;

    const items = [...(show.data?.items ?? [])];

    [items[index - 1], items[index]] =
      [items[index], items[index - 1]];

    setShow({
      ...show,
      data: {
        ...show.data,
        items,
      },
    });
  }

  function moveItemDown(index: number) {
    if (!show) return;

    const items = [...(show.data?.items ?? [])];

    if (index >= items.length - 1) return;

    [items[index], items[index + 1]] =
      [items[index + 1], items[index]];

    setShow({
      ...show,
      data: {
        ...show.data,
        items,
      },
    });
  }

  async function saveShow() {

  if (!show) return;

  const response = await fetch(
    `/api/queSigue/show/${show.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: show.data,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    alert(result.error);
    return;
  }

  alert("SetList guardado.");
}

  return (
    <main className="min-h-screen bg-base-200 p-6">

      <div className="max-w-5xl mx-auto space-y-6">

        <ShowHeader
          show={show}
        />

        <ShowToolbar
            showId={show.id}
            idBand={show.id_band}
            onAddSong={addSongToShow}
            onSave={saveShow}
        />

        <ShowItems
          items={show.data?.items ?? []}
          onDelete={removeItem}
          onMoveUp={moveItemUp}
          onMoveDown={moveItemDown}
        />

      </div>

    </main>
  );
}