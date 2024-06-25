import { Component, NgZone, OnInit, inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneAuthProvider, RecaptchaVerifier, getAuth, signInWithCredential, signInWithPhoneNumber } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sms-login',
  templateUrl: './sms-login.component.html',
  styleUrl: './sms-login.component.css', 
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
export class SmsLoginComponent implements OnInit{
  authService = inject(AuthService)
  router = inject(Router);
  auth2 = getAuth();

  paso: string='';

  form: FormGroup = this.fb.group({
    celular: ['', [Validators.required, Validators.pattern]],
  });

  code: FormGroup = this.fb.group({
    codigo: ['', Validators.required],
  });

  recaptchaVerifier!: RecaptchaVerifier;
  confirmation!: any;
  resultado!: string;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    console.log("Paso: ",this.paso);
    this.ngZone.runOutsideAngular(() => {
      this.recaptchaVerifier = new RecaptchaVerifier(
        getAuth(),
        'recaptcha-container',
        {
          size: 'normal',
          callback: (response: any) => {
            console.log(response);
            return response;
          },
        }
      );
      console.log('RecaptchaVerifier created');
      this.recaptchaVerifier.render().then(widgetId => {
        console.log('ReCAPTCHA rendered, widgetId is', widgetId);
      });
    });
  }

  onSubmit() {
    console.log('Form submitted');
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();

      this.auth
      .loginWithSms(rawForm.celular, this.recaptchaVerifier)
      .subscribe({
        next: () => {
          this.paso='codigo';
          console.log("Envie el sms");
        },
        error: (error: any) => {
          console.log('No message');
          console.error('Error:', error);
        },
      });
    }
  }

  onCode() {
    if (this.code.valid){
      const resultadoCodigo = this.code.getRawValue();
      
      var credentials = PhoneAuthProvider.credential(this.confirmation, resultadoCodigo.codigo);

      this.auth.verifySmsCode(resultadoCodigo.codigo).subscribe({
        next: () => {
          console.log('SMS code confirmed!');
          this.router.navigateByUrl('/');
        },
        error: (error: any) => {
          console.error('ERROR:', error);
        },
      });

    }else{
      this.resultado="Completa todos los campos"
    }
  }
}
