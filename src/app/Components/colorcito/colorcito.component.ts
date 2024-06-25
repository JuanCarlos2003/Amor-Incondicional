import { RouterOutlet, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { AccessibilityServiceService } from '../../services/accessibility-service.service';
@Component({
  selector: 'app-colorcito',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './colorcito.component.html',
  styleUrl: './colorcito.component.css'
})
export class ColorcitoComponent {
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
    }
  }
}
