// Fichier : gps.js

// Demande de la localisation à l'utilisateur
function getLocation() {
    if (navigator.geolocation) {
        // Appelle showPosition si succès, showError si échec
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.querySelector("#map").innerHTML =
            "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

// Si l'utilisateur l'autorise, on récupère les coordonnées dans l'objet "position"
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    // 1. Affichage de la carte openstreetmap
    // Définir un facteur d’échelle selon le zoom (plus zoomé → bbox plus petite)
    const zoom = 5;
    const delta = 0.05 / Math.pow(2, zoom - 10);

    const bboxEdges = {
        south: lat - delta,
        north: lat + delta,
        west: lon - delta,
        east: lon + delta,
    };

    const bbox = `${bboxEdges.west}%2C${bboxEdges.south}%2C${bboxEdges.east}%2C${bboxEdges.north}`;
    const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;

    // Injecter l'iframe
    document.getElementById("map").innerHTML = `
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          scrolling="no"
          src="${iframeSrc}" >
        </iframe>
      `;

    // 2. Appelle la fonction de mise à jour en LUI PASSANT les coordonnées
    updateAdresseInput(lat, lon);
}

// Au cas où l'utilisateur refuse ou si une erreur arrive
function showError(error) {
    let errorMessage = "Une erreur inconnue est survenue.";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "Autorisation refusée : L'utilisateur n'a pas autorisé la géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Position indisponible : Les informations de localisation ne sont pas disponibles.";
            break;
        case error.TIMEOUT:
            errorMessage = "Délai dépassé : La demande de localisation a expiré.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "Erreur inconnue.";
            break;
    }
    document.querySelector("#map").innerHTML = `<p style="color: #dc3545; margin: 0;">${errorMessage}</p>`;
}




// pour remplir le champ adresse (input) et la valider
function updateAdresseInput(lat, lon) {

    const addressInput = document.getElementById('address');
    
 
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    
    if (addressInput) {
        addressInput.classList.remove('is-invalid'); 
        addressInput.classList.remove('is-valid'); // Optionnel, mais plus sûr
    }


    fetch(nominatimUrl)
        .then(response => response.json())
        .then(data => {
            let address = "Adresse exacte non trouvée.";
            
            if (data.display_name) {
                address = data.display_name;
            }
            
            if (addressInput) {
                addressInput.value = address;

                // validation
                if (addressInput.checkValidity()) {
                    addressInput.classList.remove('is-invalid');
                    addressInput.classList.add('is-valid'); 
                } else {
                    addressInput.classList.remove('is-valid');
                    addressInput.classList.add('is-invalid'); 
                }
                // ------------------------------------------------
            }
        })
        .catch(error => {
            console.error("Erreur de géocodage inversé:", error);
            if (addressInput) {
                addressInput.value = "Erreur de connexion à l'API.";
                addressInput.classList.add('is-invalid'); // Marque comme invalide suite à l'échec de l'API
                addressInput.classList.remove('is-valid');
            }
        });
}