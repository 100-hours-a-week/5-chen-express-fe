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


function checkEmail() {
    const result = validateEmail(inputEmail.value);
    if (result !== PASS) {
        enableHelper(helperTextList[1], result)
        return false;
    }
    disableHelper(helperTextList[1])
    return true;
}


function checkPassword() {
    const result = validatePassword(inputPassword.value);
    if (result !== PASS) {
        enableHelper(helperTextList[2], result);
        return false;
    }
    disableHelper(helperTextList[2]);
    return true;
}

function checkPasswordConfirmation() {
    const result = validatePasswordConfirmation(inputPassword.value, inputPasswordConfirmation.value);
    if (result !== PASS) {
        enableHelper(helperTextList[3], result)
        return false;
    }
    disableHelper(helperTextList[3])
    return true;
}

function checkNickname() {
    const result = validateNickname(inputNickname.value);
    if (result !== PASS) {
        enableHelper(helperTextList[4], result);
        return false;
    }
    disableHelper(helperTextList[4]);
    return true;
}

function checkAll() {
    const a = checkEmail();
    const b = checkPassword();
    const c = checkPasswordConfirmation();
    const d = checkNickname();

    const validated = a && b && c && d
    if (validated) {
        buttonSignup.style.background = CSS_DEEP_MAGENTA;
    } else {
        buttonSignup.style.background = CSS_MAGENTA;
    }
    return validated;
}

inputImage.addEventListener("change", () => {
    displayImageOnChange(inputImage, displayImage);
    for (const crossElem of crossElemList) {
        crossElem.style.display = "none";
    }
});

inputEmail.addEventListener("input", checkAll);
inputPassword.addEventListener("input", checkAll);
inputPasswordConfirmation.addEventListener("input", checkAll);
inputNickname.addEventListener("input", checkAll);

buttonSignup.addEventListener("click", () => {
    if (checkAll()) {
        history.back();
    }
});








