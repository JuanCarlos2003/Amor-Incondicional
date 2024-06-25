import { Component,Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityServiceService } from '../../services/accessibility-service.service';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
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
