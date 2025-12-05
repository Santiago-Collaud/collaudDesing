export interface ICliente {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  active: boolean;
  // la contraseña NO se trae jamás desde la DB, solo se envía cuando se edita
  pass?: string;
}