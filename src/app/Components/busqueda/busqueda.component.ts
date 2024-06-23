import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { Cita } from '../../interfaces/cita';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule, SelectButtonModule, FormsModule, TableModule, HeaderComponent, FooterComponent],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit, OnChanges {
  @Input() actualizar: boolean;

  term: string = '';

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

  constructor(private route: ActivatedRoute){
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
    this.term = this.route.snapshot.paramMap.get('term') || '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.actualizar != this.auxActu) {
      this.auxActu = !this.auxActu;
      this.obtenerCitas();
    }
  }

  obtenerCitas(): void {
    const citasGuardadas = localStorage.getItem('citas');
    if (citasGuardadas) {
      this.citas = JSON.parse(citasGuardadas);
      this.siHay = true;
    }
  }
}
