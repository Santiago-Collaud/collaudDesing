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
      y += 5;

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

    const itemStartX = margin + 12;
    const itemRightLimit = pageWidth - margin;
    const itemWidth = itemRightLimit - itemStartX;

    const rowHeight = 10;
    const noteLineHeight = 4.5;
    const noteGap = 2;
    const textPadding = 3;
    const boxHeight = 7;

    data.items.forEach((item, index) => {
      const number = String(index + 1).padStart(2, "0");
      const color = getColor(item.color);
      const nameX = itemStartX;

      /*
      * NOMBRE: UNA SOLA LÍNEA
      */

      pdf.setFont("helvetica", "bold");

      let nameFontSize = 11;
      pdf.setFontSize(nameFontSize);

      // El nombre dispone del ancho de la fila, dejando espacio
      // para los metadatos cuando sea posible.
      const preferredNameWidth = Math.max(30, itemWidth * 0.65);

      while (
        pdf.getTextWidth(item.nombre) + textPadding * 2 >
          preferredNameWidth &&
        nameFontSize > 6
      ) {
        nameFontSize -= 0.5;
        pdf.setFontSize(nameFontSize);
      }

      // Si todavía no entra, seguir reduciendo hasta el mínimo.
      const maxNameWidth = itemWidth - textPadding * 2;

      while (
        pdf.getTextWidth(item.nombre) > maxNameWidth &&
        nameFontSize > 4
      ) {
        nameFontSize -= 0.5;
        pdf.setFontSize(nameFontSize);
      }

      const finalBoxWidth =
        pdf.getTextWidth(item.nombre) + textPadding * 2;

      /*
      * NOTA: CALCULAR ANTES DE DIBUJAR
      */

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);

      const noteLines = item.nota
        ? pdf.splitTextToSize(item.nota, itemWidth)
        : [];

      const noteHeight = noteLines.length * noteLineHeight;

      const itemHeight =
        rowHeight +
        (noteLines.length > 0 ? noteGap + noteHeight : 0);

      /*
      * SALTO DE PÁGINA
      */

      if (y + itemHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }

      /*
      * NÚMERO
      */

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(80, 80, 80);

      pdf.text(number, margin, y);

      /*
      * RECUADRO Y NOMBRE
      */

      pdf.setDrawColor(color[0], color[1], color[2]);
      pdf.setLineWidth(0.6);

      pdf.roundedRect(
        nameX,
        y - 5,
        finalBoxWidth,
        boxHeight,
        1.5,
        1.5
      );

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(nameFontSize);
      pdf.setTextColor(30, 30, 30);

      pdf.text(
        item.nombre,
        nameX + textPadding,
        y
      );

      /*
      * METADATOS: TONO Y TEMPO
      */

      let metadataCursorX = nameX + finalBoxWidth + 8;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);

      if (item.tono) {
        const tonoWidth = pdf.getTextWidth(item.tono) + 5;

        if (metadataCursorX + tonoWidth <= itemRightLimit) {
          pdf.text(item.tono, metadataCursorX, y);
          metadataCursorX += tonoWidth;
        }
      }

      if (item.tempo) {
        const tempoText = `${item.tempo} BPM`;

        if (
          metadataCursorX + pdf.getTextWidth(tempoText) <=
          itemRightLimit
        ) {
          pdf.text(tempoText, metadataCursorX, y);
        }
      }

      /*
      * NOTA MULTILÍNEA
      */

      if (noteLines.length > 0) {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);

        pdf.text(
          noteLines,
          nameX,
          y + rowHeight - 3,
          { lineHeightFactor: 1.15 }
        );
      }

      y += itemHeight;
    });


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