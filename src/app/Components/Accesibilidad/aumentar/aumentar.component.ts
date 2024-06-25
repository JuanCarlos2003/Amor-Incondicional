import { Component } from '@angular/core';
import { AccessibilityServiceService } from '../../../services/accessibility-service.service';

@Component({
  selector: 'app-aumentar',
  standalone: true,
  imports: [],
  templateUrl: './aumentar.component.html',
  styleUrl: './aumentar.component.css'
})
export class AumentarComponent {
  constructor(private service: AccessibilityServiceService) {}

  increaseFontSize() {
    this.service.increaseFontSize();
  }
}
