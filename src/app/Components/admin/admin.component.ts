import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AccessibilityServiceService } from '../../services/accessibility-service.service';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../interfaces/cita';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule]
})
export class AdminComponent {
  isSpeakingEnabled: boolean = false;
  usuarioNombre: string = '';
  startDate: string = '';
  endDate: string = '';
  citasUsuario: Cita[] | null = null;
  citasRango: Cita[] | null = null;
  todasCitas: Cita[] | null = null;
  titulo: string = "Consultas de Citas";
  usuario: string = "Consultar Citas de Usuario";
  fechas: string = "Consultar Citas en Rango de Fechas";
  todas: string = "Obtener Todas las Citas";

  constructor(private service: AccessibilityServiceService, private citaService: CitaService) {}

  content(event: MouseEvent) {
    this.isSpeakingEnabled = this.service.getIsSpeakingEnable();
    const element = event.target as HTMLElement;
    let contenido: string[] = [];
    if (element.textContent != null) {
      contenido = element.textContent.split(' ');
    } else {
      contenido = [""];
    }
    const contenidoString = contenido.join(' ');
    console.log(this.isSpeakingEnabled);
    if (this.isSpeakingEnabled) {
      this.service.speak(contenidoString);
    }
  }

  consultarCitasUsuario() {
    this.citaService.getCitasByUsuario(this.usuarioNombre).subscribe(
      (data) => {
        if (data && typeof data === 'object') {
          this.citasUsuario = Object.values(data);
        } else {
          this.citasUsuario = data;
        }
      },
      (error) => console.error('Error al consultar citas del usuario:', error)
    );
  }
  
  consultarCitasRango() {
    this.citaService.getCitasEnRango(this.startDate, this.endDate).subscribe(
      (data) => {
        if (data && typeof data === 'object') {
          this.citasRango = Object.values(data);
        } else {
          this.citasRango = data;
        }
      },
      (error) => console.error('Error al consultar citas en rango:', error)
    );
  }
  
  obtenerTodasCitas() {
    this.citaService.getAll().subscribe(
      (data) => {
        if (data && typeof data === 'object') {
          this.todasCitas = Object.values(data);
        } else {
          this.todasCitas = data;
        }
      },
      (error) => console.error('Error al consultar citas del usuario:', error)
    );
  }
  
}
