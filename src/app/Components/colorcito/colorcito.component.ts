import { RouterOutlet, RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-colorcito',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './colorcito.component.html',
  styleUrl: './colorcito.component.css'
})
export class ColorcitoComponent {

}
