import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLinkActive, RouterModule]
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  resultado!: string;

  onSubmit(): void {
    const rawFrom = this.form.getRawValue();
    if(this.form.valid){
      this.authService
      .login(rawFrom.email, rawFrom.password)
      .subscribe({
        next:() => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire({
          title: 'Ups!',
          text: 'Parece que el email o la contraseña son incorrectos, vuelve a intentarlo',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
      });
    }else{
      this.resultado="Completa todos los campos";
    }
    
  }
  
  constructor(private auth: Auth) {}

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.router.navigateByUrl('/');
    } catch (error) {
      console.log(error);
    }
  }
}
