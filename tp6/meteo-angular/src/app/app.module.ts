// debut du fichier
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { RouterModule , Routes } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module'; 

// <-- dans la suite du TP, Ajouter les références aux autres modules ici aussi

import { AppComponent } from "./app.component";
import { MeteoComponent } from "./meteo/meteo.component";
// <-- dans la suite du TP, Ajouter les références à MeteoDetailComponent aussi

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent,
    // <-- dans la suite du TP,ajouter MeteoDetailComponent ici
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,      
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
