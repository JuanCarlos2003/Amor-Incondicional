import { Component } from '@angular/core';
import { CollageComponent } from '../collage/collage.component';
import { PatrocinadorComponent } from '../patrocinador/patrocinador.component';
import { SuscribeComponent } from '../suscribe/suscribe.component';
import { ColorcitoComponent } from '../colorcito/colorcito.component';
import { InfoComponent } from '../info/info.component';
import { HistoriaComponent } from '../historia/historia.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CollageComponent, PatrocinadorComponent, SuscribeComponent, ColorcitoComponent, InfoComponent, HistoriaComponent, RouterOutlet, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
 
}
