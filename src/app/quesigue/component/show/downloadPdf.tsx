"use client";

import jsPDF from "jspdf";
import { SetListFile } from "../../../../../lib/queSigue/types";

interface ExportPdfProps {
  showId: string;
}

export default function SharePDF({
  showId,
}: ExportPdfProps) {

  async function loadImage(
    src: string
  ): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = reject;

      img.src = src;
    });
  }

  async function exportPdf() {
    try {

      const response = await fetch(
        `/api/queSigue/show/${showId}/export`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        alert("No se pudo exportar el SetList.");
        return;
      }

      const data: SetListFile = await response.json();

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        pdf.internal.pageSize.getHeight();

      const margin = 20;

      /*
       * LOGO
       */

      const logo = await loadImage(
        "/icon/queSigue/icons/queSigue-texto.png"
      );

      const logoWidth = 50;

      const logoHeight =
        (logo.height / logo.width) *
        logoWidth;

      const logoX =
        (pageWidth - logoWidth) / 2;

      /*
       * FONDO NEGRO DEL LOGO
       */

      const logoPaddingX = 5;
      const logoPaddingY = 3;

      const logoBgX =
        logoX - logoPaddingX;

      const logoBgY =
        15 - logoPaddingY;

      const logoBgWidth =
        logoWidth +
        logoPaddingX * 2;

      const logoBgHeight =
        logoHeight +
        logoPaddingY * 2;

      pdf.setFillColor(
        0,
        0,
        0
      );

      pdf.rect(
        logoBgX,
        logoBgY,
        logoBgWidth,
        logoBgHeight,
        "F"
      );

      /*
       * LOGO
       */

      pdf.addImage(
        logo,
        "PNG",
        logoX,
        15,
        logoWidth,
        logoHeight
      );

      /*
       * POSICIÓN INICIAL
       */

      let y =
        15 +
        logoHeight +
        12;

      /*
       * INFORMACIÓN DEL SHOW
       */

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(16);

      pdf.text(
        data.banda,
        margin,
        y
      );

      y += 8;

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(13);

      pdf.text(
        data.show,
        margin,
        y
      );

      y += 7;

      pdf.setFontSize(11);

      pdf.text(
        data.fecha,
        margin,
        y
      );

      y += 12;

      /*
       * LÍNEA
       */

      pdf.setLineWidth(0.4);

      pdf.line(
        margin,
        y,
        pageWidth - margin,
        y
      );

      y += 10;

      /*
       * COLORES
       */

      function getColor(
        color: string
      ): [number, number, number] {

        switch (
          color.toLowerCase()
        ) {

          case "yellow":
            return [220, 170, 0];

          case "red":
            return [200, 0, 0];

          case "gray":
            return [189, 187, 187];

          case "blue":
            return [0, 100, 200];

          case "green":
            return [79, 252, 63];

          case "purple":
            return [130, 70, 180];

          case "orange":
            return [255, 124, 10];

          default:
            return [235, 235, 235];
        }
      }

      /*
       * ITEMS
       */

      data.items.forEach(
        (item, index) => {

          const itemHeight =
            item.nota
              ? 15
              : 10;

          /*
           * NUEVA PÁGINA
           */

          if (
            y + itemHeight >
            pageHeight - margin
          ) {

            pdf.addPage();

            y = margin;
          }

          /*
           * NÚMERO
           */

          const number =
            String(index + 1)
              .padStart(2, "0");

          pdf.setFont(
            "helvetica",
            "bold"
          );

          pdf.setFontSize(11);

          pdf.setTextColor(
            80,
            80,
            80
          );

          pdf.text(
            number,
            margin,
            y
          );

          /*
           * NOMBRE
           */

          const nameX =
            margin + 12;

          const color =
            getColor(item.color);

          pdf.setFont(
            "helvetica",
            "bold"
          );

          pdf.setFontSize(11);

          const textWidth =
            pdf.getTextWidth(
              item.nombre
            );

          const paddingX = 3;

          const boxWidth =
            textWidth +
            paddingX * 2;

          const boxHeight = 7;

          /*
           * BORDE
           */

          pdf.setDrawColor(
            color[0],
            color[1],
            color[2]
          );

          pdf.setLineWidth(0.6);

          pdf.roundedRect(
            nameX,
            y - 5,
            boxWidth,
            boxHeight,
            1.5,
            1.5
          );

          /*
           * NOMBRE
           */

          pdf.setTextColor(
            30,
            30,
            30
          );

          pdf.text(
            item.nombre,
            nameX + paddingX,
            y
          );

          /*
           * METADATOS
           */

          let metadataX =
            nameX +
            boxWidth +
            8;

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setFontSize(10);

          pdf.setTextColor(
            80,
            80,
            80
          );

          /*
           * TONO
           */

          if (item.tono) {

            pdf.text(
              item.tono,
              metadataX,
              y
            );

            metadataX += 18;
          }

          /*
           * TEMPO
           */

          if (item.tempo) {

            pdf.text(
              `${item.tempo} BPM`,
              metadataX,
              y
            );

            metadataX += 25;
          }

          /*
           * NOTA
           */

          if (item.nota) {

            pdf.setFontSize(9);

            pdf.setTextColor(
              100,
              100,
              100
            );

            pdf.text(
              item.nota,
              nameX,
              y + 7
            );

            y += 5;
          }

          y += 10;
        }
      );

      /*
       * PIE DE PÁGINA
       */

      const totalPages =
        pdf.getNumberOfPages();

      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {

        pdf.setPage(page);

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(8);

        pdf.setTextColor(
          130,
          130,
          130
        );

        pdf.text(
          `queSigue · ${data.banda} · ${data.show}`,
          margin,
          pageHeight - 10
        );

        pdf.text(
          `${page} / ${totalPages}`,
          pageWidth - margin,
          pageHeight - 10,
          {
            align: "right",
          }
        );
      }

      /*
       * DESCARGA
       */

      const fileName =
        `setlist-${data.banda}-${data.show}.pdf`
          .replace(
            /[\/\\:*?"<>|]/g,
            "-"
          );

      pdf.save(fileName);

    } catch (error) {

      console.error(
        "Error exportando PDF:",
        error
      );

      alert(
        "Ocurrió un error al generar el PDF."
      );
    }
  }

  return (
    <button
      className="btn btn-outline"
      onClick={exportPdf}
    >
      Descargar PDF
    </button>
  );
}