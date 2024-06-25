import { Component } from '@angular/core';
import { AccessibilityServiceService } from '../../services/accessibility-service.service';

@Component({
  selector: 'app-suscribe',
  standalone: true,
  imports: [],
  templateUrl: './suscribe.component.html',
  styleUrl: './suscribe.component.css'
})
export class SuscribeComponent {
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
