
import { Apuesta } from "../apuesta/apuesta";


export class EventoDeportivo {
  nombre_EventoDeportivo: String;
  competidores: Array<Competidor>;
  apuestas: Array<Apuesta>;
  estado: string;
  tipo: String;
  id: Number;


constructor(
  nombre_EventoDeportivo: String,
  competidores: Array<Competidor>,
  apuestas: Array<Apuesta>,
  estado: string,
  tipo: String,
  id: Number) {


  this.id= id;
  this.tipo= tipo;
  this.estado = estado;
  this.apuestas = apuestas;
  this.competidores = competidores;
  this.nombre_EventoDeportivo = nombre_EventoDeportivo
  }




}

export class Competidor {
  id: number;
  nombre_competidor: string;
  probabilidad: number;
  cuota: number;
  ganador: boolean;
  estado: boolean;
  id_evento: number;

  constructor(
    id: number,
    nombre_competidor: string,
    probabilidad: number,
    estado: boolean,
    cuota: number,
    ganador: boolean,
    id_evento: number
  ){
    this.id = id;
    this.nombre_competidor = nombre_competidor;
    this.probabilidad = probabilidad;
    this.estado = estado;
    this.cuota = cuota;
    this.ganador = ganador;
    this.id_evento = id_evento;

  }
}
