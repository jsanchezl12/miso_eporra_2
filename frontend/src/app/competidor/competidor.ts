export class Competidor {
  id: number;
  nombre_competidor: string;
  probabilidad: number;
  cuota: number;
  ganador: boolean;
  estatus: boolean;
  id_evento: number;


  constructor(
    id: number,
    nombre_competidor: string,
    probabilidad: number,
    estatus: boolean,
    cuota: number,
    ganador: boolean,
    id_evento: number
  ){
    this.id = id;
    this.nombre_competidor = nombre_competidor;
    this.probabilidad = probabilidad;
    this.estatus = estatus;
    this.cuota = cuota;
    this.ganador = ganador;
    this.id_evento = id_evento;

  }
}
