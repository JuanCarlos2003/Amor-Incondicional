import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { SmsLoginComponent } from '../sms-login/sms-login.component';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css', 
  standalone: true,
  imports: [ReactiveFormsModule, AngularFireAuthModule, RouterLinkActive, RouterModule, SmsLoginComponent]
})

export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  //authService = inject(AuthService)
  router = inject(Router);

  eleccion: string='';
  resultado!: string;

  constructor(private auth: Auth, private authService: AuthService) {}

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawFrom = this.form.getRawValue()
    if(this.form.valid){
      if(rawFrom.password==rawFrom.password2){
        this.authService.register(rawFrom.email, rawFrom.username, rawFrom.password)
        .subscribe({
          next:() => {
            Swal.fire({
              title: "Genial!",
              text: "Cuenta creada exitosamente",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/'); 
              }
            });
        },
        error: (err) => {
          this.errorMessage = err.code;
        }
        });
      }else{
        Swal.fire({
          title: 'Ups!',
          text: 'Las contraseñas no coinciden, vuelve a intentarlo',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }else{
      this.resultado="Completa todos los campos"
    }
  }

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      Swal.fire({
        title: "Genial!",
        text: "Cuenta creada exitosamente",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/'); 
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  email(): void{
    this.eleccion="email";
  }

  telefono(): void{
    this.eleccion="telefono";
  }
}
