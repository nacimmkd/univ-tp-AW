window.onload = function () {
  const form = document.getElementById("form");
  const submitBtn = document.getElementById("submitBtn");

  // Récupère tous les inputs du formulaire
  const inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='date']");
  
  // Fonction pour valider chaque champ
  function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let valid = false;

    // Validation selon le type
    if (type === "text") {
      valid = value.length >= input.minLength && value.length <= input.maxLength;
    } else if (type === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email simple
      valid = regex.test(value);
    } else if (type === "date") {
      valid = value !== "";
    }

    // Trouve le span juste à côté de l’input
    const span = input.parentElement.querySelector(".icon-ok");

    // Affiche ou cache le ✔ selon la validité
    if (valid) {
      span.style.visibility = "visible";
      span.style.color = "green";
    } else {
      span.style.visibility = "hidden";
    }

    return valid;
  }

  // Vérifie tous les champs pour activer/désactiver le bouton
  function checkFormValidity() {
    let allValid = true;
    inputs.forEach((input) => {
      if (!validateInput(input)) {
        allValid = false;
      }
    });
    submitBtn.disabled = !allValid;
  }

  // Écouteur sur tous les inputs pour vérifier à chaque saisie
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input);
      checkFormValidity();
    });
  });

  
  inputs.forEach((input) => {
    const span = input.parentElement.querySelector(".icon-ok");
    span.style.visibility = "hidden";
  });
  submitBtn.disabled = true;


};
