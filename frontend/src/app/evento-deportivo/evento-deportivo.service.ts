import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EventoDeportivo } from './evento-deportivo';
//import { NOTFOUND } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class EventoDeportivoService {

  private apiUrl: string = environment.baseUrl ;


  constructor(private http: HttpClient) { }

  getEventoDeportivo(token: string, id: number): Observable<EventoDeportivo>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<EventoDeportivo>(this.apiUrl+"/eventod/"+id, { headers: headers });
  }

  getEventosDeportivos(token: string): Observable<EventoDeportivo[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    //return this.http.get<EventoDeportivo[]>(this.apiUrl+"/usuario/"+usuario+"/eventosd", { headers: headers });
    return this.http.get<EventoDeportivo[]>(this.apiUrl+"/eventosd", { headers: headers });
  }

  getEventosDeportivosUsuario(usuario: number, token: string): Observable<EventoDeportivo[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<EventoDeportivo[]>(this.apiUrl+"/usuario/"+usuario+"/eventosd", { headers: headers });
  }

  crearEventoDeportivo(usuario: number, token: string, evento: EventoDeportivo): Observable<EventoDeportivo>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    console.log(JSON.stringify(evento));
    return this.http.post<EventoDeportivo>(this.apiUrl+"/usuario/"+usuario+"/eventosd", evento, { headers: headers });
  }

  terminarEventoDeportivo(id_evento: Number, id_competidor: Number, token: string): Observable<EventoDeportivo>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    //console.log(JSON.stringify(evento));
    //return this.http.get<EventoDeportivo[]>(this.apiUrl+"/usuario/"+usuario+"/eventosd", { headers: headers });
    return this.http.post<EventoDeportivo>(this.apiUrl+'/eventod/terminarevento/'+ id_evento +"/" + id_competidor, { headers: headers });
  }

}
