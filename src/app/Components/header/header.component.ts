import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { AumentarComponent } from '../Accesibilidad/aumentar/aumentar.component';
import { DisminuirComponent } from '../Accesibilidad/disminuir/disminuir.component';
import { GrisesComponent } from '../Accesibilidad/grises/grises.component';
import { ContrasteComponent } from '../Accesibilidad/contraste/contraste.component';
import { AccessibilityServiceService } from '../../services/accessibility-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterModule, IconFieldModule, InputIconModule, FormsModule, AumentarComponent, DisminuirComponent, GrisesComponent, ContrasteComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  searchTerm: string = '';

  isSpeakingEnabled: boolean = false;
  
  constructor(private router: Router, private service: AccessibilityServiceService) {}

  search() {
    const term = this.searchTerm.trim();

    if (term) {
      const formattedTerm = term.split(' ').join('-').toLowerCase();
      this.router.navigate([`${formattedTerm}`]);
    }
  }

  authService = inject(AuthService)

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
        if((user.displayName!)==null){
          this.authService.currentUserSig.set({
            email: user.email!,
            username: user.phoneNumber!,
          });
        }
      }else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }

  logout(): void {
    this.authService.logout();
  }

  toggleSpeaking() {
    this.isSpeakingEnabled = !this.service.getIsSpeakingEnable();
    this.service.setIsSpeakingEnabled(this.isSpeakingEnabled);
    console.log(this.service.getIsSpeakingEnable());
  }

  content(event: MouseEvent) {
    const element = event.target as HTMLElement;
    let contenido: string[] = [];
    if (element.textContent != null) {
      console.log("1");
      contenido = element.textContent.split(' ');
    } else {
      contenido = [""];
    }
    const contenidoString = contenido.join(' ');
    if (this.isSpeakingEnabled) {
      this.service.speak(contenidoString);
    }
  }

  pauseReading() {
    this.service.pause();
  }

  resumeReading() {
    this.service.resume();
  }

  stopReading() {
    this.service.stop();
  }
}
