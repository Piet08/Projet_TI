import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormConnectionComponent } from './forms/form-connection/form-connection.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormInscriptionComponent } from './forms/form-inscription/form-inscription.component';

@NgModule({
  declarations: [
    AppComponent,
    FormConnectionComponent,
    FormInscriptionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
