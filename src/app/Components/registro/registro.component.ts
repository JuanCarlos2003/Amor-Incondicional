import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Animales } from '../../interfaces/animales';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CitasComponent } from '../../citas/citas.component';
import { Cita } from '../../interfaces/cita';
import { CitaService } from '../../services/cita.service';
import { AuthService } from '../../services/auth.service';

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
  telefono!: string;
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

  nombreuser!: string;

  opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Mexico_City'
  };

  constructor(private citaService: CitaService, private authService: AuthService) {
    this.array = [];
    this.seleccion = "";
    this.guardada = 0;
    this.quitada = false;
    this.cambio = false;
    this.minHour = 8;
    this.maxHour = 18;
    this.minuteInterval = 15;

    this.formularioCita = new FormGroup({
      nombre: new FormControl({ value: '', disabled: true }, [Validators.required, this.noSpecialCharsValidator(), Validators.maxLength(50)]),
      telefono: new FormControl('', [Validators.required, this.phoneValidator(), Validators.minLength(13)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      genero: new FormControl('', [Validators.required]),
      servicios: new FormControl([]),
      motivo: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    const actualDate = new Date();
    actualDate.setMinutes(0);
    this.date = actualDate;

    this.authService.user$.subscribe(user => {
      if (user) {
        const username = user.displayName || user.phoneNumber || '';
        this.authService.currentUserSig.set({
          email: user.email!,
          username: username,
        });
        this.nombreuser = username;
        this.formularioCita.get('nombre')?.setValue(username);
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }

  onSelect(event: any) {
    const selectedDate = new Date(event);
    const selectedHour = selectedDate.getHours();
    const selectedMinute = selectedDate.getMinutes();

    if (selectedDate.getMinutes() > 0 && selectedDate.getMinutes() <= 15) {
      selectedDate.setMinutes(15);
    } else if (selectedDate.getMinutes() > 15 && selectedDate.getMinutes() <= 30) {
      selectedDate.setMinutes(30);
    } else if (selectedDate.getMinutes() > 30 && selectedDate.getMinutes() <= 45) {
      selectedDate.setMinutes(45);
    } else if (selectedDate.getMinutes() > 45 && selectedDate.getMinutes() <= 59) {
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
  
    this.citaService.verificarCitaExistente(this.fechaLocal).subscribe({
      next: (response) => {
        if (response.existe) {
          this.guardada = 3;
          return;
        }
        const nuevaCita: Cita = {
          nombreIn: this.nombreuser,
          telefonoIn: this.formularioCita.value.telefono,
          correoIn: this.formularioCita.value.correo,
          fechaCita: this.fechaLocal,
          nombreAn: this.seleccion,
          genero: this.formularioCita.value.genero,
          servicios: this.formularioCita.value.servicios,
          motivo: this.formularioCita.value.motivo
        };
  
        const key = this.citaService.generarKey();
  
        this.citaService.create(nuevaCita, key).subscribe({
          next: () => {
            console.log('Nueva cita registrada');
            this.guardada = 2;
            this.cambio = !this.cambio;
            this.actualizacion.emit(this.cambio);
  
            // Enviar correo
            const datosCorreo = {
              destinatario: nuevaCita.correoIn ?? '',
              nombre: nuevaCita.nombreIn ?? '',
              telefono: nuevaCita.telefonoIn ?? '',
              correo: nuevaCita.correoIn ?? '',
              fechaCita: this.fechaLocal,
              nombreAn: nuevaCita.nombreAn ?? '',
              genero: nuevaCita.genero ?? '',
              servicios: nuevaCita.servicios ?? [],
              motivo: nuevaCita.motivo ?? ''
            };
  
            this.citaService.enviarCorreo(datosCorreo).subscribe({
              next: () => {
                console.log('Correo enviado exitosamente');
              },
              error: (error) => {
                console.error('Error al enviar el correo', error);
              }
            });
  
            this.formularioCita.reset();
            this.formularioCita.get('servicios')?.setValue([]);
          },
          error: () => {
            this.guardada = 3;
          }
        });
      },
      error: () => {
        this.guardada = 3;
      }
    });
  }
  
  
  

  noSpecialCharsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[a-zA-Z0-9 ]*$/.test(control.value);
      return valid ? null : { 'noSpecialChars': true };
    };
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const phoneRegex = /^\+52\d{3}\d{3}\d{2}\d{2}$/;
      return phoneRegex.test(value) ? null : { 'phoneFormat': { value } };
    };
  }

  onCheckboxChange(event: any, servicio: string) {
    const servicios: FormControl = this.formularioCita.get('servicios') as FormControl;
    const serviciosArray = servicios.value ? [...servicios.value] : [];
    
    if (event.target.checked) {
      if (!serviciosArray.includes(servicio)) {
        serviciosArray.push(servicio);
      }
    } else {
      const index = serviciosArray.indexOf(servicio);
      if (index > -1) {
        serviciosArray.splice(index, 1);
      }
    }
    
    servicios.setValue(serviciosArray);
    servicios.updateValueAndValidity();
  }
  
  isChecked(servicio: string): boolean {
    const servicios: FormControl = this.formularioCita.get('servicios') as FormControl;
    return servicios.value && servicios.value.includes(servicio);
  }  
}