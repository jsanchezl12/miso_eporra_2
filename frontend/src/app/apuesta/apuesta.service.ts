import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Apuesta } from './apuesta';

@Injectable({
  providedIn: 'root'
})
export class ApuestaService {

  //private backUrl: string = "http://127.0.0.1:5000"
  private backUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getApuestas(token: string, id_usuario:number): Observable<Apuesta[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Apuesta[]>(`${this.backUrl}/apuestas/${id_usuario}`, { headers: headers })
  }

  crearApuesta(apuesta: Apuesta, token: string, id_usuario: number): Observable<Apuesta> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    console.log(JSON.stringify(apuesta));
    return this.http.post<Apuesta>(`${this.backUrl}/apuestas/${id_usuario}`, apuesta , { headers: headers })
  }

  getApuesta(apuestaId: number, token: string): Observable<Apuesta> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Apuesta>(`${this.backUrl}/apuesta/${apuestaId}`, { headers: headers })
  }

  editarApuesta(apuesta: Apuesta, apuestaId: number, token: string): Observable<Apuesta> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<Apuesta>(`${this.backUrl}/apuesta/${apuestaId}`, apuesta, { headers: headers })
  }

  eliminarApuesta(apuestaId: number, token: string): Observable<Apuesta> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<Apuesta>(`${this.backUrl}/apuesta/${apuestaId}`, { headers: headers })
  }

}
