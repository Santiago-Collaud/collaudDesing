export interface IEventoUpdate {
  id: string;
  tituloEvento: string;
  comentario: string | null;
  link_drive: string | null;
  link_supa: string | null;  // si sube un archivo se reemplaza
  preview_url: string;       // url existente
  newPreviewFile?: File | null;  // opcional si el usuario sube uno nuevo
  newSupaFile?: File | null;     // opcional
  active: boolean;
  id_cliente: string;
  estado_pago: string;
  link_MP?: string | null;
  precio: number;
}
