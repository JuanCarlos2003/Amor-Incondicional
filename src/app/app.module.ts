import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { HttpClientModule } from '@angular/common/http';
import { RecursosEducativosComponent } from './Components/recursos-educativos/recursos-educativos.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { QrGeneratorComponent } from './Components/qr-generator/qr-generator.component';
import { AdminCharComponent } from './Components/admin-char/admin-char.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    QrGeneratorComponent,
    AdminCharComponent

  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"prueba2-4fcd3","appId":"1:933362159680:web:9691063426086eceed8fa5","storageBucket":"prueba2-4fcd3.appspot.com","apiKey":"AIzaSyD6RvNOzDlfPQPcKrckJ_PqBjA62Cg0_aM","authDomain":"prueba2-4fcd3.firebaseapp.com","messagingSenderId":"933362159680"})),
    provideAuth(() => getAuth())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
