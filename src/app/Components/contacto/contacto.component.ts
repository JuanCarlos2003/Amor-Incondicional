import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports:  [
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
  correoElectronico: string = "contacto@amorincondicional.org";
  telefonoDeContacto: string = "+52 55 1234 5678";
  horarioDeAtencion: string[] = ["Lunes a Viernes: 9:00 AM - 5:00 PM", "Sábados: 9:00 AM - 1:00 PM", "Domingos: Cerrado"];
  name: string = "";

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

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
              this.messageService.add({ severity: 'info', summary: '¡Formulario enviado con éxito!', detail: 'Gracias por enviar su formulario. Pronto recibirá una respuesta por nuestra parte.', life: 3000 });
              this.correoForm = this.nombreForm = this.msgForm  = this.apellidoForm = "";
            },
            reject: () => {
              this.messageService.add({ severity: 'error', summary: 'No se enviará la información.', detail: 'Para enviar el formulario, por favor presione el botón "Yes"', life: 3000 });
            }
          });
        }else {
          this.messageService.add({ severity: 'warn', summary: 'Por favor, complete todos los campos del formulario antes de enviar.', detail: 'Todos los campos son obligatorios para poder procesar su solicitud correctamente.', life: 3000 });
        }
    }
}
 