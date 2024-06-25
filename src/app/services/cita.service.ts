import { Injectable } from '@angular/core';
import { Cita } from '../interfaces/cita';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private apiUrl = 'http://localhost:3000/citas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  getCitasByUsuario(nombreIn: string): Observable<Cita[]> {
    console.log('Solicitando citas para el usuario:', nombreIn);
    return this.http.get<Cita[]>(`${this.apiUrl}/usuario?nombreIn=${nombreIn}`).pipe(
      tap(data => console.log('Datos recibidos del servidor:', data))
    );
  }

  getCitasByTel(telefonoIn: string): Observable<Cita[]> {
    console.log('Solicitando citas para el usuario:', telefonoIn);
    return this.http.get<Cita[]>(`${this.apiUrl}/telefono?telefonoIn=${telefonoIn}`).pipe(
      tap(data => console.log('Datos recibidos del servidor:', data))
    );
  }

  getCitasEnRango(startDate: string, endDate: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/rango?startDate=${startDate}&endDate=${endDate}`);
  }

  contarCitasPorDia(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/countPorDia`);
  }

  create(cita: Cita, key: string): Observable<void> {
    return this.http.post<void>(this.apiUrl, { cita, key });
  }

  update(key: string, value: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${key}`, value);
  }

  delete(key: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${key}`);
  }

  deleteAll(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  generarAleatorio(length: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    for (let i = 0; i < length; i++) {
      res += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return res;
  }

  generarKey(): string {
    const cadenaRandom = this.generarAleatorio(20);
    const timestamp = Date.now().toString();
    return `${cadenaRandom}-${timestamp}`;
  }

  verificarCitaExistente(fecha: string): Observable<{ existe: boolean }> {
    return this.http.get<{ existe: boolean }>(`${this.apiUrl}/existe/${fecha}`);
  }

}
