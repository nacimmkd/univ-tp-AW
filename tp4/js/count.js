

document.addEventListener('DOMContentLoaded', function() {

  function updateCount(inputId) {
    const inputElement = document.getElementById(inputId);
    const counterElement = document.getElementById(inputId + '_count');

    if (inputElement && counterElement) {
      const currentLength = inputElement.value.length;
      counterElement.textContent = String(currentLength).padStart(2, '0');
    }
  }

  // --- Initialisation des compteurs ---

  // pour firstname
  const lastnameInput = document.getElementById('lastname');
  if (lastnameInput) {
    lastnameInput.addEventListener('keyup', () => updateCount('lastname'));
    updateCount('lastname'); 
  }

  // pour lastname
  const firstnameInput = document.getElementById('firstname');
  if (firstnameInput) {
    firstnameInput.addEventListener('keyup', () => updateCount('firstname'));
    updateCount('firstname');
  }

});