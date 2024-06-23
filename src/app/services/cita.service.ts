import { Injectable } from '@angular/core';
import { Cita } from '../interfaces/cita';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private dbPath = '/citas';

  citasRef: AngularFireList<Cita>;

  constructor(private db: AngularFireDatabase) {
    this.citasRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Cita> {
    return this.citasRef;
  }

  create(cita: Cita, key: string): Promise<void> {
    return this.citasRef.set(key, cita);
  }

  update(key: string, value: any): Promise<void> {
    return this.citasRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.citasRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.citasRef.remove();
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

  verificarCitaExistente(fecha: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.citasRef.valueChanges().subscribe((citas: Cita[]) => {
        const existe = citas.some(cita => cita.fechaCita === fecha);
        resolve(existe);
      }, error => {
        reject(error);
      });
    });
  }
  
}
