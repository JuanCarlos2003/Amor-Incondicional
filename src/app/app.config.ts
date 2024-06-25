import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app-routing.module';

const firebaseConfig = {
  apiKey: "AIzaSyD6RvNOzDlfPQPcKrckJ_PqBjA62Cg0_aM",
  authDomain: "prueba2-4fcd3.firebaseapp.com",
  projectId: "prueba2-4fcd3",
  storageBucket: "prueba2-4fcd3.appspot.com",
  messagingSenderId: "933362159680",
  appId: "1:933362159680:web:9691063426086eceed8fa5"
};
  

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ],
};