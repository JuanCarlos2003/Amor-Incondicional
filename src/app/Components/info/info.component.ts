import { Component } from '@angular/core';
import { DomseguroPipe } from '../../domseguro.pipe';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AccessibilityServiceService } from '../../services/accessibility-service.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [DomseguroPipe, RouterOutlet, RouterModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  video: string = "X9QxvAaf_kY?si=KSpYXHW1f9U6gqNS";
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
    if (this.isSpeakingEnabled) {
      this.service.speak(contenidoString);
    }
  }
}
