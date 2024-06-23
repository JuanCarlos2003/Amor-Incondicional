import { Component } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { VideoComponent } from '../video/video.component';
import { VmvComponent } from '../vmv/vmv.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  imports: [CardsComponent, VideoComponent, VmvComponent, HeaderComponent, FooterComponent]
})
export class AboutUsComponent {

}
