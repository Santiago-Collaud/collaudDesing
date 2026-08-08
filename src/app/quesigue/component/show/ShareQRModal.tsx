"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";

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

  const svg = qrRef.current.querySelector("svg");

  if (!svg) return;

  const canvas = document.createElement("canvas");

  // Tamaño final de la imagen
  const width = 600;
  const height = 760;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // Fondo blanco
  ctx.fillStyle = "#c5c3c3";
  ctx.fillRect(0, 0, width, height);

  // Convertimos el SVG del QR en una imagen
  const svgData = new XMLSerializer().serializeToString(svg);

  const svgBlob = new Blob(
    [svgData],
    { type: "image/svg+xml;charset=utf-8" }
  );

  const svgUrl = URL.createObjectURL(svgBlob);

  const qrImage = new Image();

  qrImage.onload = () => {

    // Tamaño del QR
    const qrSize = 500;

    // Centrar QR horizontalmente
    const qrX = (width - qrSize) / 2;
    const qrY = 40;

    ctx.drawImage(
      qrImage,
      qrX,
      qrY,
      qrSize,
      qrSize
    );

    URL.revokeObjectURL(svgUrl);

    // Logo
    const logo = new Image();

    logo.onload = () => {

      const logoSize = 70;

      const logoX = (width - logoSize) / 2;
      const logoY = 575;

      ctx.drawImage(
        logo,
        logoX,
        logoY,
        logoSize,
        logoSize
      );

      // Texto principal
      ctx.fillStyle = "#111111";
      ctx.textAlign = "center";

      ctx.font = "bold 36px Arial";

      ctx.fillText(
        "queSigue",
        width / 2,
        680
      );

      // Texto secundario
      ctx.font = "20px Arial";

      ctx.fillText(
        "Escaneá para abrir el SetList",
        width / 2,
        720
      );

      // Descargar
      const link = document.createElement("a");

      link.download = "setlist-qr.png";

      link.href = canvas.toDataURL(
        "image/png"
      );

      link.click();
    };

    logo.onerror = () => {
      console.error("No se pudo cargar el logo.");

      // Si falla el logo, igualmente descargamos el QR
      ctx.fillStyle = "#111111";
      ctx.textAlign = "center";
      ctx.font = "bold 36px Arial";

      ctx.fillText(
        "queSigue",
        width / 2,
        680
      );

      ctx.font = "20px Arial";

      ctx.fillText(
        "Escaneá para abrir el SetList",
        width / 2,
        720
      );

      const link = document.createElement("a");

      link.download = "setlist-qr.png";

      link.href = canvas.toDataURL(
        "image/png"
      );

      link.click();
    };

    logo.src = "/icon/queSigue/icons/queSigue-logo-192.png";
  };

  qrImage.onerror = () => {
    URL.revokeObjectURL(svgUrl);
    console.error("No se pudo generar la imagen del QR.");
  };

  qrImage.src = svgUrl;
}
  return (

    <dialog className={`modal ${open ? "modal-open" : ""}`}>

      <div className="modal-box">

        <h3 className="text-xl font-bold">

          Compartir SetList

        </h3>

        <div
          ref={qrRef}
          className="bg-white p-5 rounded-lg mt-6 flex justify-center items-center"
          style={{
            width: "290px",
            height: "290px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >

          {url && (
            <QRCode
              value={url}
              size={250}
            />
          )}
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