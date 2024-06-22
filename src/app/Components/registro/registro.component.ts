import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Animales } from '../../interfaces/animales';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CitasComponent } from '../../citas/citas.component';
import { Cita } from '../../interfaces/cita';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CalendarModule, FormsModule, ButtonModule, CommonModule, CitasComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  @Input() array: Animales[];
  @Input() seleccion: string;
  @Output() actualizacion = new EventEmitter<boolean>;
  cambio: boolean;
  guardada: number;
  quitada: boolean;
  date!: Date;
  minHour: number;
  maxHour: number;
  minuteInterval: number;
  nombre!: string;
  telefono!: number;
  correo!: string;
  cita = {
    'width': '80%',
    'border': '1px solid black',
    'border-radius': '15px',
    'margin': '20px auto',
    'padding': '30px',
  };
  nuevaCita!: Cita;
  fechaLocal!: string;

  opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Mexico_City'
  };

  constructor(){
    this.array = [];
    this.seleccion = "";
    this.guardada = 0;
    this.quitada = false;
    this.cambio = false;
    this.minHour = 8;
    this.maxHour = 18;
    this.minuteInterval = 15;
  }

  ngOnInit(){
    const actualDate = new Date();
    actualDate.setMinutes(0);
    this.date = actualDate;
  }

  onSelect(event: any) {
    const selectedDate = new Date(event);
    const selectedHour = selectedDate.getHours();
    const selectedMinute = selectedDate.getMinutes();

    if(selectedDate.getMinutes() > 0 && selectedDate.getMinutes() <= 15){
      selectedDate.setMinutes(15);
    } else if(selectedDate.getMinutes() > 15 && selectedDate.getMinutes() <= 30){
      selectedDate.setMinutes(30);
    } else if(selectedDate.getMinutes() > 30 && selectedDate.getMinutes() <= 45){
      selectedDate.setMinutes(45);
    } else if(selectedDate.getMinutes() > 45 && selectedDate.getMinutes() <= 59){
      selectedDate.setMinutes(0);
    }

    // Ajustar la hora si es necesario
    if (selectedHour < this.minHour || (selectedHour === this.minHour)) {
      selectedDate.setHours(this.minHour);
    } else if (selectedHour > this.maxHour) {
      selectedDate.setHours(this.maxHour);
    }

    this.date = selectedDate;
  }

  /*onSelect(evento: any){
    if(this.date.getMinutes() >= 0 && this.date.getMinutes() <= 15){
      this.date.setMinutes(15);
    } else if(this.date.getMinutes() > 15 && this.date.getMinutes() <= 30){
      this.date.setMinutes(30);
    } else if(this.date.getMinutes() > 30 && this.date.getMinutes() <= 45){
      this.date.setMinutes(45);
    } else if(this.date.getMinutes() > 45 && this.date.getMinutes() <= 59){
      if(this.date.getHours() < this.maxHour){
        this.date.setHours(this.date.getHours() + 1);
        this.date.setMinutes(0);
      } else {
        this.date.setMinutes(45);
      }
    }
  }*/

  quitar(): void {
    this.quitada = true;
  }

  guardarCita(): void {
    const fechaActual = new Date();
    this.quitada = false;
    
    if (this.date <= fechaActual) {
        this.guardada = 1;
        return;
    }

    this.fechaLocal = this.date.getFullYear() + '-' + 
      ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + 
      ('0' + this.date.getDate()).slice(-2) + ' ' + 
      ('0' + this.date.getHours()).slice(-2) + ':' + 
      ('0' + this.date.getMinutes()).slice(-2);
    
    const citas: Cita[] = JSON.parse(localStorage.getItem('citas') || '[]');
    const citaExistente = citas.find(cita => cita.fechaCita === this.fechaLocal);

    if (citaExistente) {
        this.guardada = 3;
        return;
    }

    this.nuevaCita = {
      nombreIn: this.nombre,
      telefonoIn: this.telefono,
      correoIn: this.correo,
      fechaCita: this.fechaLocal,
      nombreAn: this.seleccion
    };

    citas.push(this.nuevaCita);
    localStorage.setItem('citas', JSON.stringify(citas));

    this.nombre = "";
    this.telefono = 0;
    this.correo = "";


    this.guardada = 2;
    this.cambio = !this.cambio;
    this.actualizacion.emit(this.cambio);
  }
}
