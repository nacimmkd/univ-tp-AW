// debut du fichier
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { RouterModule , Routes } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module'; 
import { CommonModule } from "@angular/common";


import { AppComponent } from "./app.component";
import { MeteoComponent } from "./meteo/meteo.component";
import { MeteoDetailComponent } from "./meteo-detail/meteo-detail.component";
// <-- dans la suite du TP, Ajouter les références à MeteoDetailComponent aussi

const appRoutes: Routes = [
  {
    path: "", // la page principale utilisera le component suivant
    component: MeteoComponent,
  },
  {
    path: "meteo/:name", // la page affichant la météo prendra comme paramètre 'name'
    component: MeteoDetailComponent, // Ce component fera l'appel AJAX et afficher les données reçues par openWeatherMap
  },
  {
    path: "**", // un chemin vers une page inexistante redirigera vers '/'
    redirectTo: "/",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent,
    MeteoDetailComponent
    // <-- dans la suite du TP,ajouter MeteoDetailComponent ici
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,      
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
