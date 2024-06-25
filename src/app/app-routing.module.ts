import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { NuestrosPerrosComponent } from './Components/nuestros-perros/nuestros-perros.component';
import { RecursosEducativosComponent } from './Components/recursos-educativos/recursos-educativos.component';
import { ContactoComponent } from './Components/contacto/contacto.component';
import { BusquedaComponent } from './Components/busqueda/busqueda.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AdminComponent } from './Components/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:  InicioComponent}, 
  { path: 'about', component: AboutUsComponent},
  { path: 'ayuda', component:  RecursosEducativosComponent}, 
  { path: 'mascotas', component: NuestrosPerrosComponent}, 
  { path: 'contacto', component: ContactoComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registrarme', component: RegisterComponent},
  { path: 'busqueda/:term', component: BusquedaComponent },
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
