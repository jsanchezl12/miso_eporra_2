export class Apuesta {
    id: number;
    valor_apostado: number;
    nombre_apostador: string;
    id_competidor: number;
    id_apostador: number;
    id_EventoDeportivo: number;

    constructor(
        id: number,
        valor_apostado: number,
        nombre_apostador: string,
        id_competidor: number,
        id_apostador: number,
        id_EventoDeportivo: number
    ) {
        this.id = id,
        this.valor_apostado = valor_apostado,
        this.nombre_apostador = nombre_apostador,
        this.id_competidor = id_competidor,
        this.id_apostador = id_apostador,
        this.id_EventoDeportivo = id_EventoDeportivo
    }
}
