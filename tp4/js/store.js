/*
store.js
Script pour gérer la liste de contact en JSON

Pour ajouter un contact:  contactStore.add(_name, _firsname, _date, _adress, _mail);
Pour récuper la liste:    contactStore.getList();
*/
var contactStore = (function () {
  // variable privée
  let contactListString = localStorage.getItem("contactList");
  var contactList = contactListString ? JSON.parse(contactListString) : [];

  // Expose these functions via an interface while hiding
  // the implementation of the module within the function() block

  return {
    add: function (_name, _firsname, _date, _adress, _mail) {
      var contact = {
        name: _name,
        firstname: _firsname,
        date: _date,
        adress: _adress,
        mail: _mail,
      };
      // ajout du contact à la liste
      contactList.push(contact);

      // persistence de la liste dans une base de données local du navigateur web
      // https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
      localStorage.setItem("contactList", JSON.stringify(contactList));

      return contactList;
    },
    reset: function () {
      localStorage.removeItem("contactList");

      return contactList;
    },

    getList: function () {
      return contactList;
    },
  };
})();





// implimentation de store

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const resultsTableBody = document.getElementById('resultsTableBody');

  const cleanInputs = () => {
    const inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='date']");
    
    inputs.forEach(input => {
        input.value = '';
        const span = input.parentElement.querySelector(".icon-ok");
        span.style.visibility = "hidden";
    });
  }

  // list all
  const displayContactList = () => {
    const contactList = contactStore.getList();
    resultsTableBody.innerHTML = '';

    if (contactList.length === 0) {
      const row = resultsTableBody.insertRow();
      const cell = row.insertCell(0);
      cell.colSpan = 5;
      cell.className = 'text-center text-muted';
      cell.textContent = "Aucun contact enregistré pour l'instant.";
      return;
    }

    contactList.forEach(contact => {
      const row = resultsTableBody.insertRow();

      row.insertCell(0).textContent = contact.name ? contact.name.toUpperCase() : '';
      row.insertCell(1).textContent = contact.firstname ? contact.firstname.charAt(0).toUpperCase() + contact.firstname.slice(1) : '';
      row.insertCell(2).textContent = contact.date || '';
      row.insertCell(3).textContent = contact.adress || '';
      row.insertCell(4).textContent = contact.mail || '';
    });
  };


  // add
  form.addEventListener('submit', function (event) {
    event.preventDefault(); 
    event.stopPropagation();

    form.classList.add('was-validated');

    if (form.checkValidity()) {
      const formData = new FormData(form);

      const name = formData.get('lastname').trim();
      const firstname = formData.get('firstname').trim();
      const date = formData.get('birthday');
      const address = formData.get('address').trim();
      const mail = formData.get('email').trim();

      try {
        contactStore.add(name, firstname, date, address, mail);
      } catch (e) {
        console.error("Erreur de sauvegarde :", e);
      }

      displayContactList();

      // Réinitialise le formulaire
      form.reset();
      form.classList.remove('was-validated');
    } else {
      console.warn("Formulaire non valide");
    }
  });


  displayContactList();
});
