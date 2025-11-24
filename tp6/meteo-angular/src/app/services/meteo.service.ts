import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class MeteoService {
  constructor() { }

  getMeteo(name: string): Promise<any> {
    console.log("from service", name);

    return fetch(
      "https://api.openweathermap.org/data/2.5/weather/?q=" +
      name +
      "&units=metric&lang=fr&appid=98529cd719c18b90e04117911b3cada9"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        // test du code retour
        // 200 = OK
        // 404 = city not found
        if (json.cod == 200) {
          return Promise.resolve(json);
        } else {
          console.error(
            "Météo introuvable pour " + name + " (" + json.message + ")"
          );

          return Promise.reject(
            "Météo introuvable pour " + name + " (" + json.message + ")"
          );
        }
      });
  }


  getMeteoFiveDays(name: string): Promise<any> {
    console.log("fetching 5 days meteo for ", name);
    return fetch(
      "https://api.openweathermap.org/data/2.5/forecast/?q=" + name
      + "&lang=fr&appid=0ada432b59deb9716c357092c5f79be6"
    )
      .then(function (response) {
        return response.json();
      })

      .then(function (json) {
        // test du code retour
        // 200 = OK
        // 404 = city not found
        if (json.cod == 200) {
          return Promise.resolve(json);
        } else {
          console.error(
            "Méteo sur 5 jours introuvable pour " + name + " (" + json.message + ")"
          );

          return Promise.reject(
            "Météo sur 5 jours introuvable pour " + name + " (" + json.message + ")"
          );
        }
      });
  }

}