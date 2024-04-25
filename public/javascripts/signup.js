import {displayImageOnChange, fetchServer} from "/javascripts/fetch.js";
import {
    validateEmail, validateNickname, validatePassword,
    validatePasswordConfirmation, PASS, enableHelper, disableHelper
} from "/javascripts/validator.js";
import {CSS_DEEP_MAGENTA, CSS_MAGENTA} from "/javascripts/constant_css.js";

console.log("SIGN UP JS");

const inputImage = document.getElementById("profile-image");
const displayImage = document.getElementById("display-profile-img");
const crossElemList = document.getElementsByClassName("cross");

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputPasswordConfirmation = document.getElementById("password-confirmation");
const inputNickname = document.getElementById("nickname");
const helperTextList = document.getElementsByClassName("helper-text");
const buttonSignup = document.getElementById("signup-button");


async function checkEmail() {
    const result = await validateEmail(inputEmail.value, true);
    if (result !== PASS) {
        enableHelper(helperTextList[1], result)
        return false;
    }
    disableHelper(helperTextList[1])
    return true;
}


async function checkPassword() {
    const result = validatePassword(inputPassword.value);
    if (result !== PASS) {
        enableHelper(helperTextList[2], result);
        return false;
    }
    disableHelper(helperTextList[2]);
    return true;
}

async function checkPasswordConfirmation() {
    const result = validatePasswordConfirmation(inputPassword.value, inputPasswordConfirmation.value);
    if (result !== PASS) {
        enableHelper(helperTextList[3], result)
        return false;
    }
    disableHelper(helperTextList[3])
    return true;
}

async function checkNickname() {
    const result = await validateNickname(inputNickname.value, true);
    if (result !== PASS) {
        enableHelper(helperTextList[4], result);
        return false;
    }
    disableHelper(helperTextList[4]);
    return true;
}

async function checkAll() {
    return Promise.all([checkEmail(), checkPassword(), checkPasswordConfirmation(), checkNickname()])
        .then(results => {
            let validated = true;
            for (const result of results) {
                validated = result && validated;
            }
            return validated;
        })
        .then(validated => {
            if (validated) {
                buttonSignup.style.background = CSS_DEEP_MAGENTA;
            } else {
                buttonSignup.style.background = CSS_MAGENTA;
            }
            return validated
        });
}

async function notEmptyAll() {
    let isEmpty = false;
    if (inputEmail.value.trim() === "") isEmpty = true;
    if (inputNickname.value.trim() === "") isEmpty = true;
    if (inputPassword.value.trim() === "") isEmpty = true;
    if (inputPasswordConfirmation.value.trim() === "") isEmpty = true;

    if (isEmpty) {
        buttonSignup.style.background = CSS_MAGENTA;
    } else {
        buttonSignup.style.background = CSS_DEEP_MAGENTA;
    }
}

inputImage.addEventListener("change", () => {
    displayImageOnChange(inputImage, displayImage);
    for (const crossElem of crossElemList) {
        crossElem.style.display = "none";
    }
});

inputEmail.addEventListener("focusout", checkEmail);
inputPassword.addEventListener("focusout", checkPassword);
inputPasswordConfirmation.addEventListener("focusout", checkPasswordConfirmation);
inputNickname.addEventListener("focusout", checkNickname);

inputEmail.addEventListener("input", notEmptyAll);
inputPassword.addEventListener("input", notEmptyAll)
inputPasswordConfirmation.addEventListener("input", notEmptyAll)
inputNickname.addEventListener("input", notEmptyAll)


buttonSignup.addEventListener("click", () => {
    checkAll()
        .then(validated => {
            if (!validated) throw Error("not validated")
            const signUpForm = document.getElementById("signup-form");
            const formData = new FormData(signUpForm);
            return fetchServer("/signup", "POST", formData, false)
        })
        .then(response => {
            if (response.ok) {
                alert("회원가입 되었습니다.");
                window.location = "/login.html"
            } else {
                console.warn(response);
            }
        })
        .catch(err => {
            console.warn(err);
        });
});








