
const lastnameEl = document.getElementById("lastname");
const firstnameEl = document.getElementById("firstname");
const birthdayEl = document.getElementById("birthday");
const addressEl = document.getElementById("address");
const emailEl = document.getElementById("email");

// Récupérer les données (return Obj)
function getUserData() {
    const params = new URLSearchParams(window.location.search);

    return {
        firstname: params.get("firstname") || "—",
        lastname: params.get("lastname") || "—",
        birthday: params.get("birthday") || "—",
        address: params.get("address") || "—",
        email: params.get("email") || "—",
    };
}

// Met à jour le HTML
function updateDocument() {
    const data = getUserData();

    lastnameEl.textContent = data.lastname;
    firstnameEl.textContent = data.firstname;
    birthdayEl.textContent = data.birthday;

    // Google Maps API
    if (data.address && data.address !== "—") {
        addressEl.textContent = data.address;
        addressEl.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`;
    } else {
        addressEl.textContent = "—";
        addressEl.removeAttribute("href");
    }

    // Email
    if (data.email && data.email !== "—") {
        emailEl.textContent = data.email;
        emailEl.href = `mailto:${data.email}?subject=Condidature&body=Bonjour ${data.firstname},%0D%0A%0D%0A`;
    } else {
        emailEl.textContent = "—";
        emailEl.removeAttribute("href");
    }
}

updateDocument();
