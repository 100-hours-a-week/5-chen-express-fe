import {
    disableHelper,
    enableHelper,
    PASS,
    validatePassword,
    validatePasswordConfirmation
} from "/javascripts/validator.js";
import {fetchServer} from "/javascripts/fetch.js";
import {CSS_DEEP_MAGENTA, CSS_MAGENTA} from "/javascripts/constant_css.js";

console.log("EDIT PASSWORD JS");

const inputPassword = document.getElementById("password");
const inputPasswordConfirmation = document.getElementById("password-confirmation");
const helperTextList = document.getElementsByClassName("helper-text");
const buttonEdit = document.getElementById("edit-submit");

// const editForm = document.getElementById("edit-password-form");


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

        fetchServer("/users/me/password", "PUT", {password: inputPassword.value})
            .then(response => response.json())
            .then(data => {
                console.log(data)
                alert("수정되었습니다.")
                window.location.reload()
            })

    }
})



