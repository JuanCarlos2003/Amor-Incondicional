import { Component } from '@angular/core';
import { AccessibilityServiceService } from '../../../services/accessibility-service.service';

@Component({
  selector: 'app-lector',
  standalone: true,
  imports: [],
  templateUrl: './lector.component.html',
  styleUrl: './lector.component.css'
})
export class LectorComponent {
  constructor(private service: AccessibilityServiceService) {}

  speakText() {
    this.service.speak('¡Encontre a un tipo que habla, creo que puede funcionar de algo!');
  }
}
