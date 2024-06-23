import { Component } from '@angular/core';
import { DomseguroPipe } from '../../domseguro.pipe';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [DomseguroPipe, RouterOutlet, RouterModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  video: string = "X9QxvAaf_kY?si=KSpYXHW1f9U6gqNS";
}
