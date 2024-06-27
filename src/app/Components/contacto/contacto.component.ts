import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    RouterModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css', './contacton2.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ContactoComponent {
  correoForm: string = "";
  nombreForm: string = "";
  apellidoForm: string = "";
  msgForm: string = "";
  correoElectronico: string = "siosaenz15@gmail.com";
  telefonoDeContacto: string = "+52 55 1234 5678";
  horarioDeAtencion: string[] = ["Lunes a Viernes: 9:00 AM - 5:00 PM", "Sábados: 9:00 AM - 1:00 PM", "Domingos: Cerrado"];
  name: string = "";

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private http: HttpClient) { }

  confirm() {
    if (this.nombreForm != "" && this.correoForm != "" && this.msgForm != "" && this.apellidoForm != "") {
      this.confirmationService.confirm({
        header: 'Confirmación',
        message: '¿Estás seguro de que deseas enviar esta información?',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          const emailData = {
            subject: 'Nuevo mensaje de contacto',
            email: 'siosaenz15@gmail.com',
            description: this.msgForm,
            dynamicData: {
              nombre: this.nombreForm,
              apellido: this.apellidoForm,
              correo: this.correoForm,
              mensaje: this.msgForm
            }
          };

          this.http.post('http://localhost:3000/contact', emailData)
            .subscribe(
              response => {
                console.log('Correo enviado:', response);
              },
              error => {
                console.error('Error al enviar el correo:', error);
                this.messageService.add({ severity: 'success', summary: 'Correo enviado', detail: 'Su mensaje ha sido enviado correctamente.' });
                this.correoForm = this.nombreForm = this.msgForm  = this.apellidoForm = "";
              }
            );
        },
      });
    } 
  }
}
