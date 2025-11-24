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
  meteoFiveDays: any;
  latlon: string = "";
  lat: string = "";
  lon: string = "";

  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService
  ) { }

  ngOnInit() {
    this.getMeteo();
  }

  getMeteo(): void {
    const name = this.route.snapshot.paramMap.get("name");

    console.log("getMeteo pour", name);
    if (name) {
      // ---- MÉTÉO ACTUELLE ----
      this.meteoService
        .getMeteo(name)
        .then((response) => {
          this.meteo = response;
          this.lat = this.meteo.coord.lat;
          this.lon = this.meteo.coord.lon;
          this.latlon = `${this.lat},${this.lon}`;
        })
        .catch((fail) => (this.meteo = fail));

      // ---- MÉTÉO 5 JOURS ----
      this.meteoService
        .getMeteoFiveDays(name)
        .then((response) => {
          this.meteoFiveDays = response;
          console.log("Prévisions 5 jours :", this.meteoFiveDays);
        })
        .catch((error) => {
          console.error(error);
          this.meteoFiveDays = null;
        });
    }
  }

  selectDay(day: any) {
    this.meteo = {
      ...this.meteo, // garde la structure EXACTE de la météo actuelle

      dt: day.dt,
      weather: day.weather,
      main: {
        ...this.meteo.main,
        temp: day.main.temp - 273.15,
        humidity: day.main.humidity,
      },
      wind: {
        ...this.meteo.wind,
        speed: day.wind.speed,
      },
      clouds: {
        ...this.meteo.clouds,
        all: day.clouds.all,
      }
    };
  }


}
