import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-recursos-educativos',
  standalone: true,
  templateUrl: './recursos-educativos.component.html',
  styleUrls: ['./recursos-educativos.component.css', './recursos-educativos2.component.css', './recursos-educativos3.component.css'],
  imports: [HeaderComponent, FooterComponent]
})
export class RecursosEducativosComponent {

}
