const lastname = document.getElementById("lastname");
const firstname = document.getElementById("firstname");
const birthday = document.getElementById("birthday");
const address = document.getElementById("address");
const email = document.getElementById("email");


// Récupirer user data
function getUserData() {
    const params = new URLSearchParams(window.location.search);

    const userData = {
        firstname : params.get("firstname"),
        lastname : params.get("lastname"),
        birthday : params.get("birthday"),
        address : params.get("address"),
        email : params.get("email"),
    }
    
    return userData;
}


// Update Html
function UpdateDocument() {
    const data = getUserData();

    lastname.textContent = data.lastname;
    firstname.textContent = data.firstname;
    birthday.textContent = data.birthday;

    address.textContent = data.address;
    address.href = `https://www.google.com/maps/search/?api=1&query=${data.address}`
    email.textContent = data.email;
    email.href = `mailto:${data.email}?subject=Condidateur!&body=Ecrit moi quelque chose ici`;

}

// Main

UpdateDocument();