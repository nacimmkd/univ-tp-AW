import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MeteoService } from "../services/meteo.service";

@Component({
  selector: "app-meteo-detail",
  templateUrl: "./meteo-detail.component.html",
  styleUrls: ["./meteo-detail.component.css"]
})
export class MeteoDetailComponent implements OnInit {
  meteo: any;
  latlon: string = "";
  lat: string = "";
  lon: string = "";

  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService
  ) {}

  ngOnInit() {
    this.getMeteo();
  }

  getMeteo(): void {
    // pour lire la paramètre 'name' dans l'URL de la page  comme définit dans le router avec
    // path: 'meteo/:name'
    const name = this.route.snapshot.paramMap.get("name");

    console.log("getmeteo pour", name);
    if (name) {
      this.meteoService
        .getMeteo(name)
        .then((response) => {
          this.meteo = response;
          this.lat = this.meteo.coord.lat;
          this.lon = this.meteo.coord.lon
          this.latlon = `${this.meteo.coord.lat},${this.meteo.coord.lon}`;
        })
        .catch((fail) => (this.meteo = fail));
    }
  }
}