import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { AjouterEtudiantComponent } from './etudiants/ajouter-etudiant/ajouter-etudiant.component';

@NgModule({
  declarations: [
    AppComponent,
    EtudiantsComponent,
    AjouterEtudiantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   // Pour pouvoir appeler le back via les ws
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
