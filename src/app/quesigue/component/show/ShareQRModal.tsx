"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

interface Props {
  open: boolean;
  showId: string;
  onClose: () => void;
}

export default function ShareQRModal({
  open,
  showId,
  onClose,
}: Props) {

  const [url, setUrl] = useState("");

  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!open) return;

    async function load() {

      const response = await fetch(
        `/api/queSigue/show/${showId}/share`
      );

      const data = await response.json();

      setUrl(data.url);

    }

    load();

  }, [open, showId]);



  async function downloadQR() {

    if (!qrRef.current) return;

    const dataUrl = await toPng(qrRef.current);

    const link = document.createElement("a");

    link.download = "setlist-qr.png";

    link.href = dataUrl;

    link.click();

  }

  return (

    <dialog className={`modal ${open ? "modal-open" : ""}`}>

      <div className="modal-box">

        <h3 className="text-xl font-bold">

          Compartir SetList

        </h3>

        <div
          ref={qrRef}
          className="bg-white p-5 rounded-lg mt-6 flex justify-center"
        >

          {
            url &&
            <QRCode
              value={url}
              size={250}
            />
          }

        </div>

        <p className="text-xs mt-4 break-all">

          {url}

        </p>

        <div className="modal-action">

          <button
            className="btn"
            onClick={onClose}
          >
            Cerrar
          </button>

          <button
            className="btn btn-primary"
            onClick={downloadQR}
          >
            Descargar PNG
          </button>

        </div>

      </div>

    </dialog>

  );

}