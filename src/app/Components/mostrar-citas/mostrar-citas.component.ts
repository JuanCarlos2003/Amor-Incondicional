import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CitasComponent } from '../../citas/citas.component';
import { Component, OnInit } from '@angular/core';
import { Cita } from '../../interfaces/cita';
import { AuthService } from '../../services/auth.service';
import { CitaService } from '../../services/cita.service';


@Component({
  selector: 'app-mostrar-citas',
  templateUrl: './mostrar-citas.component.html',
  standalone: true,
  imports: [CalendarModule, FormsModule, ReactiveFormsModule, ButtonModule, CommonModule, CitasComponent],
  styleUrls: ['./mostrar-citas.component.css']
})
export class MostrarCitasComponent implements OnInit {
  citas: Cita[] = [];
  siHay: boolean = false;
  
  constructor(private citaService: CitaService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        const username = user.displayName || user.phoneNumber;
        if (username) {
          this.obtenerCitas(username);
        }
      }
    });
  }

  obtenerCitas(username: string): void {
    console.log('Obteniendo citas para el usuario:', username);
    this.citaService.getCitasByUsuario(username).subscribe({
      next: (data: any) => {
        console.log('Citas recibidas:', data);
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
