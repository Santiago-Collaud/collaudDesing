
// src/app/api/upload_preview/route.ts
import { NextResponse } from "next/server";
import cloudinary from "../../../../../lib/cloudinary";

export async function POST(req: Request) {
  try {
    // Leer FormData
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Falta la imagen de preview" },
        { status: 400 }
      );
    }

    // Convertir archivo a Base64 (Cloudinary necesita base64)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(base64, {
      folder: "CollaudDesign/preview",
      resource_type: "image",
    });

    return NextResponse.json(
      {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al subir preview:", error);
    return NextResponse.json(
      { error: "Error al subir preview" },
      { status: 500 }
    );
  }
}
