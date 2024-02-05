// Affichage du nom dans la modal Contact
function displayName(jsonData, targetPhotographerId) {
  const modalName = document.getElementById("modal-name");
  const photographer = jsonData.photographers.find(
    (photographer) => photographer.id === parseInt(targetPhotographerId)
  );
  modalName.textContent = `${photographer.name}`;
}
// AddEventListener :
const modalBtnClose = document.getElementById("close-modal");
modalBtnClose.addEventListener("click", () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
});
modalBtnClose.addEventListener("keydown", (event) => {
  const modal = document.getElementById("contact_modal");
  if (event.key === "Enter") {
    modal.style.display = "none";
  }
});
const modal = document.getElementById("contact_modal");
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
});
// Variables Formulaire
const form = document.querySelector("form");
const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
// REGEX
const regExpText = new RegExp("^[A-Za-zéèê\\s-]+$");
const regExpEmail = new RegExp(
  "^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,4}$"
);
// Fonctions de validation
function checkFirstName(input) {
  if (input.value.length >= 2 && regExpText.test(input.value)) {
    return true;
  } else {
    return false;
  }
}
function checkLastName(input) {
  if (input.value.length >= 2 && regExpText.test(input.value)) {
    return true;
  } else {
    return false;
  }
}
function checkEmail(input) {
  if (regExpEmail.test(input.value)) {
    return true;
  } else {
    return false;
  }
}
function checkMessage(input) {
  if (input.value.length >= 5) {
    return true;
  } else {
    return false;
  }
}
// SUBMISSION FORM
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const modal = document.getElementById("contact_modal");

  const isFirstNameValid = checkFirstName(firstNameInput);
  const isLastNameValid = checkLastName(lastNameInput);
  const isEmailValid = checkEmail(emailInput);
  const isMessageValid = checkMessage(messageInput);
  if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid) {
    console.log(`
                Prénom: ${firstNameInput.value}
                Nom: ${lastNameInput.value}
                Email: ${emailInput.value}
                Message: ${messageInput.value}
            `);
    modal.style.display = "none";
    return true;
  } else {
    return false;
  }
});

export { displayName };
