import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Competidor } from './competidor';

@Injectable({
  providedIn: 'root'
})
export class CompetidorService {

  private apiUrl: string = environment.baseUrl + '/competidores';

  constructor(private http: HttpClient) { }

  getCompetidores(): Observable<Competidor[]>{
    return this.http.get<Competidor[]>(this.apiUrl);
  }

}
