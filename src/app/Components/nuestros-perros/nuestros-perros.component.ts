import { Component, OnInit } from '@angular/core';
import { Animales } from '../../interfaces/animales';
import { AnimalesService } from '../../services/animales.service';
import { RegistroComponent } from '../registro/registro.component';
import { CitasComponent } from '../../citas/citas.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-nuestros-perros',
  standalone: true,
  imports: [RegistroComponent, CitasComponent, HeaderComponent, FooterComponent],
  templateUrl: './nuestros-perros.component.html',
  styleUrl: './nuestros-perros.component.css'
})
export class NuestrosPerrosComponent implements OnInit {
  array: Animales [] = [];
  seleccion: string = "";
  actualizar: boolean;
  cargando: boolean = false;

  constructor(public animalesService: AnimalesService){
    this.actualizar = false;
  }

  ngOnInit(){
    console.log("Componente cargado");
    this.recuperarDatos();
  }

  recuperarDatos():void{
    console.log("entre");
    this.cargando = true;

    this.animalesService.retornar().subscribe({
      next: this.successRequest.bind(this),
      error: (err) => {
        console.log(err);
        this.cargando = false;
      },
      complete: () => this.cargando = false
    });
  }

  successRequest(data:any):void{
    console.log("data", data);
    this.array = data.animales;
    console.log("array", this.array);
  }

  hacerCita(sel:string){
    this.seleccion = sel;
  }

  recibirActu(actu: boolean){
    this.actualizar = actu;
  }
}
