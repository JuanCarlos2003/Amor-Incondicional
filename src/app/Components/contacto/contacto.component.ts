import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { PerrosyGatosComponent } from '../perrosy-gatos/perrosy-gatos.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports:  [
              FormsModule,
              RouterOutlet, 
              RouterModule, 
              PerrosyGatosComponent,
              ButtonModule,
              ToastModule,
              ConfirmDialogModule
            ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ContactoComponent {
  correoForm: string = "";
  nombreForm: string = "";
  msgForm: string = "";
  correoElectronico: string = "contacto@amorincondicional.org";
  telefonoDeContacto: string = "+52 55 1234 5678";
  horarioDeAtencion: string[] = ["Lunes a Viernes: 9:00 AM - 5:00 PM", "Sábados: 9:00 AM - 1:00 PM", "Domingos: Cerrado"];
  name: string = "";

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Please confirm to proceed moving forward.',
            acceptIcon: 'pi pi-check mr-2',
            rejectIcon: 'pi pi-times mr-2',
            rejectButtonStyleClass: 'p-button-sm',
            acceptButtonStyleClass: 'p-button-outlined p-button-sm',
            accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                this.correoForm = this.nombreForm = this.msgForm = "";
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }
}
