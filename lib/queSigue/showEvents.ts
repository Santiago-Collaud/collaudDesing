//lista de eventos que se van a mostrar en la pantalla de seleccion de canciones de queSigue

export interface ShowEvent {
  tipo: string;
  color: string;
  nombre: string;
}

export const SHOW_EVENTS: ShowEvent[] = [
  {
    tipo: "pause",
    color: "yellow",
    nombre: "Pausa",
  },
  {
    tipo: "blackout",
    color: "gray",
    nombre: "Blackout",
  },
  {
    tipo: "presentation",
    color: "blue",
    nombre: "Presentación de músicos",
  },
  {
    tipo: "staff",
    color: "green",
    nombre: "Presentación del staff",
  },
  {
    tipo: "thanks",
    color: "purple",
    nombre: "Agradecimientos",
  },
  {
    tipo: "instrument",
    color: "orange",
    nombre: "Cambio de instrumento",
  },
];