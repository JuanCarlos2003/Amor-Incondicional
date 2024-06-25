import { Component } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { VideoComponent } from '../video/video.component';
import { VmvComponent } from '../vmv/vmv.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AccessibilityServiceService } from '../../services/accessibility-service.service';
@Component({
  selector: 'app-about-us',
  standalone: true,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  imports: [CardsComponent, VideoComponent, VmvComponent, HeaderComponent, FooterComponent]
})
export class AboutUsComponent {
  
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
