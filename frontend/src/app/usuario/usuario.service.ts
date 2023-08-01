import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    //private backUrl: string = "http://127.0.0.1:5000"
    private backUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    userLogIn(usuario: string, contrasena: string): Observable<any> {
        return this.http.post<any>(`${this.backUrl}/login`, { "usuario": usuario, "contrasena": contrasena });
    }

    userSignUp(usuario: string, contrasena: string, correo: string, phone: string): Observable<any> {
        return this.http.post<any>(`${this.backUrl}/signin/apostador`, { "usuario": usuario, "u_email": correo, "contrasena": contrasena, "phone": phone })
    }

    getUsuario( id_user: number,token: string): Observable<any> {
        return this.http.get<any>(`${this.backUrl}/usuarios/${id_user}/`, { headers: { "Authorization": `Bearer ${token}` } });
    }

    addSaldo(id_user: number, token: string, saldo: number): Observable<any> {
        return this.http.put<any>(`${this.backUrl}/usuarios/${id_user}/addsaldo`, { "saldo": saldo }, { headers: { "Authorization": `Bearer ${token}` } });
    }
}
