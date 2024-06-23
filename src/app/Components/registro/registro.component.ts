import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Animales } from '../../interfaces/animales';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CitasComponent } from '../../citas/citas.component';
import { Cita } from '../../interfaces/cita';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CalendarModule, FormsModule, ReactiveFormsModule, ButtonModule, CommonModule, CitasComponent],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  @Input() array: Animales[] = [];
  @Input() seleccion: string = '';
  @Output() actualizacion = new EventEmitter<boolean>();
  cambio: boolean = false;
  guardada: number = 0;
  quitada: boolean = false;
  date!: Date;
  minHour: number = 8;
  maxHour: number = 18;
  minuteInterval: number = 15;
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
  formularioCita: FormGroup;
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

  constructor(private citaService: CitaService) {
    this.array = [];
    this.seleccion = "";
    this.guardada = 0;
    this.quitada = false;
    this.cambio = false;
    this.minHour = 8;
    this.maxHour = 18;
    this.minuteInterval = 15;

    this.formularioCita = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10)]),
      correo: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
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

    if (selectedHour < this.minHour || (selectedHour === this.minHour)) {
      selectedDate.setHours(this.minHour);
    } else if (selectedHour > this.maxHour) {
      selectedDate.setHours(this.maxHour);
    }

    this.date = selectedDate;
  }

  quitar(): void {
    this.quitada = true;
  }

  guardarCita(): void {
    if (!this.formularioCita.valid) {
      this.guardada = 1;
      return;
    }
  
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
    
    this.citaService.verificarCitaExistente(this.fechaLocal).then((existe: boolean) => {
      if (existe) {
        this.guardada = 3;
        return;
      }
      const nuevaCita: Cita = {
        nombreIn: this.formularioCita.value.nombre,
        telefonoIn: this.formularioCita.value.telefono,
        correoIn: this.formularioCita.value.correo,
        fechaCita: this.fechaLocal,
        nombreAn: this.seleccion
      };

      const key = this.citaService.generarKey();

      this.citaService.create(nuevaCita, key).then(() => {
        console.log('Nueva cita registrada');
        this.guardada = 2;
        this.cambio = !this.cambio;
        this.actualizacion.emit(this.cambio);
      }).catch(() => {
        this.guardada = 3;
      });

      this.formularioCita.reset();
    }).catch(() => {
      this.guardada = 3;
    });
  }
  
}
