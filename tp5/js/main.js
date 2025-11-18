
var app;
window.onload = function () {
  app = new Vue({
    el: "#weatherApp",

    // <!-- DATA -->
    data: {

      // sera utilisé comme indicateur de chargement de l'application
      loaded: false,

      // cityName, variable utilisé dans le formulaire via v-model
      formCityName: "",

      message: "WebApp Loaded.",
      messageForm: "",

      // liste des villes saisies, initialiser avec Paris
      cityList: [
        {
          name: "Paris",
        },
      ],

      // cityWeather contiendra les données météo reçus par openWeatherMap
      cityWeather: null,

      // indicateur de chargement
      cityWeatherLoading: false,
    },

    // 'mounted' est exécuté une fois l'application VUE totalement disponible
    mounted: function () {
      this.loaded = true;
      this.readData();
    },

    // <!-- METHODS -->
    methods: {


      readData: function (event) {
        console.log(
          "JSON.stringify(this.cityList)",
          JSON.stringify(this.cityList)
        ); 
        console.log("this.loaded:", this.loaded); // va afficher 'this.loaded: true'
      },


      addCity: function (event) {
        event.preventDefault(); // pour ne pas recharger la page à la soumission du formulaire

        if(this.isCityExist(this.formCityName)){
          this.messageForm = 'existe déjà';
        }else{
          this.cityList.push({ name: this.formCityName });
          this.messageForm = "";
          this.formCityName = "";
        }
      },


      isCityExist: function (_cityName){
          if( this.cityList.filter(item =>
                  item.name.toUpperCase() == _cityName.toUpperCase())
                  .length>0){
          return true;
          }else{
                return false;
          }
      },


      remove: function (_city) {
        this.cityList = this.cityList.filter(city => city.name != _city.name)
      },


      meteo : function (_city){

          this.cityWeatherLoading = true;

          // appel AJAX avec fetch
          fetch('https://api.openweathermap.org/data/2.5/weather?q='+_city.name+'&units=metric&lang=fr&apikey=98529cd719c18b90e04117911b3cada9')
              .then(function(response) {
                  return response.json();
              })
              .then(function(json) {
                  app.cityWeatherLoading = false;

                  // test du code retour
                  // 200 = OK
                  // 404 = city not found
                  if(json.cod == 200){
                      // on met la réponse du webservice dans la variable cityWeather
                      app.cityWeather = json;
                      app.message = null;
                  }else{
                      app.cityWeather = null;
                      app.message = 'Météo introuvable pour ' + _city.name
                                      + ' (' + json.message+ ')';
                  }
              });
        },

    },

    // <!-- CIMPUTED -->
    computed: {

      cityWheaterDate: function () {
        if (this.cityWeather !== null) {
          var date = new Date(this.cityWeather.dt * 1000);

          // ici l'operateur ternaire pour tester si les minutes sont < à 10
          // pour y ajouter un 0
          // 9 minutes deviendra 09
          // 11 restera 11
          var minutes =
            date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes();
          return date.getHours() + ":" + minutes;
        } else {
          return "";
        }
      },

      cityWheaterSunrise: function () {
        if (this.cityWeather !== null) {
          var date = new Date(this.cityWeather.sys.sunrise * 1000);
          var minutes =
            date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes();
          return date.getHours() + ":" + minutes;
        } else {
          return "";
        }
      },


      cityWheaterSunset: function () {
        if (this.cityWeather !== null) {
          var date = new Date(this.cityWeather.sys.sunset * 1000);
          var minutes =
            date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes();
          return date.getHours() + ":" + minutes;
        } else {
          return "";
        }
      },


      // calcul de la zone d'affichage de la carte openstreetmap
      openStreetMapArea: function () {
        if (this.cityWeather !== null) {
          // Définir un facteur d’échelle selon le zoom (plus zoomé → bbox plus petite)
          const zoom = 8;
          const delta = 0.05 / Math.pow(2, zoom - 10);

          const bboxEdges = {
            south: this.cityWeather.coord.lat - delta,
            north: this.cityWeather.coord.lat + delta,
            west: this.cityWeather.coord.lon - delta,
            east: this.cityWeather.coord.lon + delta,
          };

          return `${bboxEdges.west}%2C${bboxEdges.south}%2C${bboxEdges.east}%2C${bboxEdges.north}`;
        } else {
          return "";
        }
      },

    },
  });
};