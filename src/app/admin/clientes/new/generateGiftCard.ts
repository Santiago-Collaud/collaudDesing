export async function generateGiftCard({
  username,
  pass,
}: {
  username: string;
  pass: string;
}) {
  return new Promise<string>((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject("No se pudo obtener el contexto 2D del canvas.");
      return;
    }

    const base = new Image();
    base.src = "/giftCard.png"; // Asegurate que está en /public

    base.onload = () => {
      canvas.width = base.width;
      canvas.height = base.height;

      ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

      // Estilo del texto
      ctx.font = "70px sans-serif";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";

      // === Coordenadas perfectas ===
      const userX = canvas.width / 2;   // centrado
      const userY = 1090;

      const passX = canvas.width / 2;
      const passY = 1350;

      ctx.fillText(username, userX, userY);
      ctx.fillText(pass, passX, passY);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      resolve(dataUrl);
    };

    base.onerror = () => reject("No se pudo cargar la imagen base.");
  });
}
