import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { Cita } from '../interfaces/cita';
import { CitaService } from '../services/cita.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, SelectButtonModule, FormsModule, TableModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
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

  constructor(private citaService: CitaService){
    this.actualizar = false;
    this.auxActu = false;
    this.siHay = false;

    this.fechaActual = this.presente.getFullYear() + '-' + 
      ('0' + (this.presente.getMonth() + 1)).slice(-2) + '-' + 
      ('0' + this.presente.getDate()).slice(-2) + ' ' + 
      ('0' + this.presente.getHours()).slice(-2) + ':' + 
      ('0' + this.presente.getMinutes()).slice(-2);
  }

  ngOnInit(): void {
    this.obtenerCitas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.actualizar != this.auxActu) {
      this.auxActu = !this.auxActu;
      this.obtenerCitas();
    }
  }

  obtenerCitas(): void {
    this.citaService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ clave: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.citas = data;
      this.siHay = true;
    });
  }
}
