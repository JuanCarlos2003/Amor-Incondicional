import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { AyudaComponent } from './Components/ayuda/ayuda.component';
import { PerrosyGatosComponent } from './Components/perrosy-gatos/perrosy-gatos.component';
import { ContactoComponent } from './Components/contacto/contacto.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: InicioComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'mascotas', component: PerrosyGatosComponent },
  { path: 'contacto', component: ContactoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
