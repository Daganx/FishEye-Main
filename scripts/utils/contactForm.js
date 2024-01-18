const btnOpen = document.getElementById('open-modal');
const btnClose = document.getElementById('close-modal');
const modal = document.getElementById("contact_modal");
function displayModal() {
	modal.style.display = "block";
}
function closeModal() {
    modal.style.display = "none";
}
btnOpen.addEventListener("click", (displayModal));
btnClose.addEventListener("click", (closeModal));
// INPUT FORM 
const form = document.querySelector('form');
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
// REGEX 
const regExpText = new RegExp("^[A-Za-zéèê\\s-]+$"); // Text Regex
const regExpEmail = new RegExp('^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,4}$'); // Mail Regex
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