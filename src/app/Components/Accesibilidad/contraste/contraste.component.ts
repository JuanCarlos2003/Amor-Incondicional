import { Component } from '@angular/core';
import { AccessibilityServiceService } from '../../../services/accessibility-service.service';

@Component({
  selector: 'app-contraste',
  standalone: true,
  imports: [],
  templateUrl: './contraste.component.html',
  styleUrl: './contraste.component.css'
})
export class ContrasteComponent {
  constructor(private service: AccessibilityServiceService) {}

  toggleContrastMode() {
    this.service.toggleContrastMode();
  }
}
