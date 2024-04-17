console.log("EDIT PASSWORD JS");

const inputPassword = document.getElementById("password");
const inputPasswordConfirmation = document.getElementById("password-confirmation");
const helperTextList = document.getElementsByClassName("helper-text");
const buttonEdit = document.getElementById("edit-submit");

function validateEditPassword() {
    const passwordResult = validatePassword(inputPassword.value)
    const confirmationResult = validatePasswordConfirmation(inputPassword.value, inputPasswordConfirmation.value);

    let validated = true;
    if (passwordResult !== PASS) {
        enableHelper(helperTextList[0], passwordResult)
        validated = false;
    } else {
        disableHelper(helperTextList[0])
    }

    if (confirmationResult !== PASS) {
        enableHelper(helperTextList[1], confirmationResult)
        validated = false;
    } else {
        disableHelper(helperTextList[1])
    }
    return validated;
}

inputPasswordConfirmation.addEventListener("input", () => {
    if (validateEditPassword()) {
        buttonEdit.style.background = CSS_DEEP_MAGENTA
    } else {
        buttonEdit.style.background = CSS_MAGENTA
    }
})
inputPassword.addEventListener("input", () => {
    if (validateEditPassword()) {
        buttonEdit.style.background = CSS_DEEP_MAGENTA
    } else {
        buttonEdit.style.background = CSS_MAGENTA
    }
})

buttonEdit.addEventListener("click", () => {
    let validated = validateEditPassword();

    if (validated) {
        disableHelper(helperTextList[0])
        disableHelper(helperTextList[1])

        // TODO : FORM SUBMIT
        history.back();
    }
})



