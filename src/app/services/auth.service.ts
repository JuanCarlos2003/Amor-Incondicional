import { Injectable, inject, signal } from "@angular/core";
import { Auth, ConfirmationResult, RecaptchaVerifier, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPhoneNumber, signOut, updateProfile, user } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    firebaseAuth = inject(Auth);
    user$ = user(this.firebaseAuth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined)
    private confirmation: ConfirmationResult | undefined;

    register(
        email:string, 
        username: string, 
        password: string
    ): Observable<void>{
        const promise   = createUserWithEmailAndPassword(
            this.firebaseAuth, 
            email, 
            password
        ).then(response => 
            updateProfile(response.user, {displayName:username}),
        );

        return from(promise);

    }

    login(email: string, password:string): Observable<void>{
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth, 
            email, 
            password,
        ).then (() => {});
        return from(promise);
    }

    loginWithSms(phoneNumber: string, reCAPTCHA : RecaptchaVerifier): Observable<void> {
        // Login logic here
        const promise = signInWithPhoneNumber(
          this.firebaseAuth, 
          phoneNumber, 
          reCAPTCHA,
        ).then((confirmation) => {
            this.confirmation = confirmation;
          });
        return from(promise);
    }

    verifySmsCode(code: string): Observable<void> {
        if (!this.confirmation) {
          throw new Error('No confirmation');
        }
        const promise = this.confirmation.confirm(code)
            .then((result) => {
                console.log(result.user.phoneNumber);
            });
        return from(promise);
    } 

    logout():Observable<void>{
        const promise = signOut(this.firebaseAuth);
        return from(promise);
    }

    getAuth(): Auth {
        return this.firebaseAuth;
    }

    getConfirmation(){
        return this.confirmation;
    }
}