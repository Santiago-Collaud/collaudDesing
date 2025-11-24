// /pages/api/upload_preview.ts
import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../../../../lib/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const { file } = req.body;

    if (!file) {
      return res.status(400).json({ error: "Falta la imagen de preview" });
    }

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "assets/collaudDesign/preview",
      resource_type: "image",
    });

    return res.status(200).json({
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error) {
    console.error("Error al subir preview:", error);
    return res.status(500).json({ error: "Error al subir preview" });
  }
}

