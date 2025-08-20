import { MailData } from "@/interface/mail";

export function validateMailData(data: MailData): string[] {
  const errores: string[] = [];

  // Nombre
  if (!data.nombre || data.nombre.trim().length < 2) {
    errores.push("El nombre es obligatorio y debe tener al menos 2 caracteres.");
  }

  // Mail
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errores.push("Debe ingresar un correo electrónico válido.");
  }

  // Mensaje
  if (!data.mensaje || data.mensaje.trim().length < 10) {
    errores.push("El mensaje debe tener al menos 10 caracteres.");
  }

  return errores;
}