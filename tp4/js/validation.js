window.onload = function () {
  const form = document.getElementById("form");
  const submitBtn = document.getElementById("submitBtn");
  const inputs = form.querySelectorAll("input[type='text']:not(#address), input[type='email'], input[type='date']");


  inputs.forEach((input) => {
    const icon = document.createElement("span");
    icon.className = "icon-ok ms-2";
    icon.style.visibility = "hidden";
    input.parentElement.appendChild(icon);
  });

  function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let valid = false;

    if (type === "text") {
      valid = value.length >= input.minLength && value.length <= input.maxLength;
    } else if (type === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      valid = regex.test(value);
    } else if (type === "date") {
      valid = value !== "";
    }

    const span = input.parentElement.querySelector(".icon-ok");

    if (valid) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      span.style.visibility = "visible";
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      span.style.visibility = "hidden";
    }

    return valid;
  }


  function checkFormValidity() {
    let allValid = true;
    inputs.forEach((input) => {
      if (!validateInput(input)) {
        allValid = false;
      }
    });
    submitBtn.disabled = !allValid;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input);
      checkFormValidity();
    });
  });

  submitBtn.disabled = true;
};
