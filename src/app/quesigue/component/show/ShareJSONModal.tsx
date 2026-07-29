"use client";

interface ExportJsonProps {
  showId: string;
}

export default function ShareJSON({
  showId,
}: ExportJsonProps) {

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
    <button
      className="btn btn-xs btn-outline"
      onClick={exportJson}
    >
      JSON
    </button>
  );

}