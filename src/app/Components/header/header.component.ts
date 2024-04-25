import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { PerrosyGatosComponent } from '../perrosy-gatos/perrosy-gatos.component';
import { AyudaComponent } from '../ayuda/ayuda.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactoComponent } from '../contacto/contacto.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ContactoComponent, InicioComponent, PerrosyGatosComponent, AyudaComponent, AboutUsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
