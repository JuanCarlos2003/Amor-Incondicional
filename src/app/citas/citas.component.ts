import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { Cita } from '../interfaces/cita';
import { CitaService } from '../services/cita.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, SelectButtonModule, FormsModule, TableModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit, OnChanges {
  @Input() actualizar: boolean;

  auxActu: boolean;

  tiempo: any;

  stateOptions = [
    { label: 'Anteriores', value: 1 },
    { label: 'Próximas', value: 2 }
  ];

  citas: Cita[] = [];

  siHay: boolean;

  presente: Date = new Date();
  fechaActual!: string;

  opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Mexico_City'
  };

  constructor(private citaService: CitaService) {
    this.actualizar = false;
    this.auxActu = false;
    this.siHay = false;
    this.tiempo = 2;

    this.fechaActual = this.presente.getFullYear() + '-' + 
      ('0' + (this.presente.getMonth() + 1)).slice(-2) + '-' + 
      ('0' + this.presente.getDate()).slice(-2) + ' ' + 
      ('0' + this.presente.getHours()).slice(-2) + ':' + 
      ('0' + this.presente.getMinutes()).slice(-2);
  }

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
        if((user.displayName!)==null){
          this.authService.currentUserSig.set({
            email: user.email!,
            username: user.phoneNumber!,
          });
        }
      }else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });

    const user = this.authService.currentUserSig()?.username;
    if (user) {
      this.obtenerCitas(user);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.actualizar !== this.auxActu) {
      this.auxActu = !this.auxActu;
      const user = this.authService.currentUserSig()?.username;
      if (user) {
        this.obtenerCitas(user);
      }
    }
  }

  obtenerCitas(username: string): void {
    console.log('Obteniendo citas para el usuario:', username);
    this.citaService.getCitasByUsuario(username).subscribe({
      next: (data: any) => {
        console.log('Citas received:', data);
        this.citas = Object.keys(data).map(key => ({ ...data[key], clave: key }));
        this.siHay = this.citas.length > 0;
      },
      error: (error) => {
        console.error('Error al obtener las citas', error);
        this.siHay = false;
      }
    });
  }
  
}
