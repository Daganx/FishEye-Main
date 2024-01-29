function displayName(jsonData, targetPhotographerId){
  const modalName = document.getElementById("modal-name");
  const photographer = jsonData.photographers.find(photographer => photographer.id === parseInt(targetPhotographerId));
  modalName.textContent = `${photographer.name}`
}
const form = document.querySelector('form');
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
// REGEX 
const regExpText = new RegExp("^[A-Za-zéèê\\s-]+$");
const regExpEmail = new RegExp('^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,4}$');
// FUNCTIONS VALIDATION
function checkFirstName(input){
    if (input.value.length >= 2 && regExpText.test(input.value)){
        return true;
    } else {
        return false;
    }
}
function checkLastName(input){
    if (input.value.length >= 2 && regExpText.test(input.value)){
        return true;
    } else {
        console.log('ERROR LASTNAME');
    }
}
function checkEmail(input){
    if (regExpEmail.test(input.value)){
        return true
    } else {
        return false
    }
}
// SUBMISSION FORM 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const modal = document.getElementById('contact_modal')

    const isFirstNameValid = checkFirstName(firstNameInput);
    const isLastNameValid = checkLastName(lastNameInput);
    const isEmailValid = checkEmail(emailInput);
    if (isFirstNameValid &&
        isLastNameValid &&
        isEmailValid){
            console.log(`
                Prénom: ${firstNameInput.value}
                Nom: ${lastNameInput.value}
                Email: ${emailInput.value}
                Message: ${messageInput.value}
            `);
            modal.style.display = 'none';
            return true;
        } else {
            return false;
        }
})

export {displayName}