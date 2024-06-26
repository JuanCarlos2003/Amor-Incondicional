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

  async ngOnInit(): Promise<void> {
    if (typeof window !== 'undefined') {
      // Dynamically import QRCodeStyling
      const { default: QRCodeStyling } = await import("qr-code-styling");

      const qrCode = new QRCodeStyling({
        width: 232,
        height: 232,
        margin: 14,
        data: "http://localhost:4200/mostrar-citas",
        dotsOptions: {
          color: "#4267b2",
          type: "rounded"
        },
        backgroundOptions: {
          color: "#e9ebee"
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 14
        }
      });

      qrCode.append(this.canvas.nativeElement);
    }
  }
}
