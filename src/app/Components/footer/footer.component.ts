import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
            RouterOutlet,
            RouterModule,
           ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  face: string = "AmorIncondicional_Org";
  x: string = "@AmorIncondiOrg";
  ig: string = "Amor Incondicional";
  tt: string = "@TeamAmorIncondicional";
}
