import { Component } from '@angular/core';
import { AccessibilityServiceService } from '../../../services/accessibility-service.service';

@Component({
  selector: 'app-disminuir',
  standalone: true,
  imports: [],
  templateUrl: './disminuir.component.html',
  styleUrl: './disminuir.component.css'
})
export class DisminuirComponent {
  constructor(private service: AccessibilityServiceService) {}

  decreaseFontSize() {
    this.service.decreaseFontSize();
  }
}
