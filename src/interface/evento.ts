export interface Evento {
    id: string;
    tituloEvento: string;
    comentario: string | null;
    link_drive: string | null;
    link_supa: string | null;
    preview_url: string;
    active: boolean;
    created_at: string;
}