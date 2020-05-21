import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { AddCandidateComponent } from './candidates/add-candidate/add-candidate.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { ControlMessagesComponent } from './util/control-messages.component';
import { ValidationService } from './services/validation.service';
import { MessageModalComponent } from './modal/message-modal/message-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidatesComponent,
    AddCandidateComponent,
    LoginComponent,
    HomeComponent,
    ControlMessagesComponent,
    MessageModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // Pour pouvoir appeler le back via les ws
    FormsModule,
    ReactiveFormsModule // Pour pouvoir utiliser le formBuilder
  ],
  providers: [AppService, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
