import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.css']
})
export class QrGeneratorComponent implements OnInit {
  @ViewChild("canvas", { static: true }) canvas!: ElementRef;
  qrCode: any;

  async ngOnInit(): Promise<void> {
    if (typeof window !== 'undefined') {
      // Importa QRCodeStyling de forma dinámica
      const { default: QRCodeStyling } = await import("qr-code-styling");

      this.qrCode = new QRCodeStyling({
        width: 232,
        height: 232,
        margin: 14,
        data: this.generateRandomData(),
        dotsOptions: {
          color: "#6C4B07",
          type: "rounded"
        },
        backgroundOptions: {
          color: "#FFF7E7"
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 14
        }
      });

      this.qrCode.append(this.canvas.nativeElement);
    }
  }

  generateRandomData(): string {
    // Genera una URL aleatoria o cualquier otra información dinámica
    const randomString = Math.random().toString(36).substring(7);
    return `http://localhost:4200/mostrar-citas?data=${randomString}`;
  }

}
