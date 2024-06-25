import { Component } from '@angular/core';
import { AccessibilityServiceService } from '../../../services/accessibility-service.service';

@Component({
  selector: 'app-grises',
  standalone: true,
  imports: [],
  templateUrl: './grises.component.html',
  styleUrl: './grises.component.css'
})
export class GrisesComponent {
  constructor(private service: AccessibilityServiceService) {}

  toggleGrayScale() {
    this.service.toggleGrayScale();
  }
}
