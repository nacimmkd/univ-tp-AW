import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeteoDetailComponent } from './meteo-detail/meteo-detail.component';
import { MeteoComponent } from './meteo/meteo.component';

const routes: Routes = [
  { path: 'meteo/:name', component: MeteoDetailComponent },
  { path: '', component: MeteoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
