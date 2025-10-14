window.onload = function () {

  const form = document.getElementById("form");
  const submitBtn = document.getElementById("submitBtn");
  const inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='date']");
  
  // Fonction pour valider chaque champ
  function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let valid = false;

    if (type === "text") {
      valid = value.length >= input.minLength && value.length <= input.maxLength;
    } else if (type === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email simple
      valid = regex.test(value);
    } else if (type === "date") {
      valid = value !== "";
    }


    const span = input.parentElement.querySelector(".icon-ok");

    if (valid) {
      span.style.visibility = "visible";
      span.style.color = "green";
    } else {
      span.style.visibility = "hidden";
    }

    return valid;
  }


  // Activer/Désactiver le bouton submit
  function checkFormValidity() {
    let allValid = true;
    inputs.forEach((input) => {
      if (!validateInput(input)) {
        allValid = false;
      }
    });
    submitBtn.disabled = !allValid;
  }

  
  // Main
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
