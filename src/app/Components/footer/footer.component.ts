import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AccessibilityServiceService } from '../../services/accessibility-service.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
            RouterOutlet,
            RouterModule,
           ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  face: string = "AmorIncondicional_Org";
  x: string = "@AmorIncondiOrg";
  ig: string = "Amor Incondicional";
  tt: string = "@TeamAmorIncondicional";

  isSpeakingEnabled: boolean = false;
  
  constructor(private service: AccessibilityServiceService) {}

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
      return;
    }
  }
}
