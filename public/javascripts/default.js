console.log("DEFAULT JS")

let cssVar = getComputedStyle(document.body)
const CSS_DEEP_MAGENTA = cssVar.getPropertyValue("--deep-magenta")
const CSS_MAGENTA = cssVar.getPropertyValue("--magenta")
const PASS = "pass"
const VALID_LENGTH_MAX = 20;
const VALID_LENGTH_MIN = 8;


function dimmed(flag = true) {
    const dimmedElem = document.getElementById("dimmed");
    if (flag) {
        dimmedElem.style.display = "block";
    } else {
        dimmedElem.style.display = "none";
    }
}

function modalOn(modalId) {
    let modalElem = document.getElementById(modalId);
    modalElem.style.display = "flex";
    dimmed()
    document.body.style.overflow = "hidden";
}

function modalOff() {
    let modalList = document.getElementsByClassName("modal");
    for (let item of modalList) {
        if (item.style.display != "none") {
            item.style.display = "none"
        }
    }
    dimmed(false)
    document.body.style.overflow = "visible";
}

function validateNickname(nickname, validateDuplicate = false) {
    if (nickname.length == 0) {
        return "*닉네임을 입력해주세요.";
    }
    if (nickname.includes(" ")) {
        return "*띄어쓰기를 없애주세요.";
    }
    if (validateDuplicate) {
        console.log("DUPLICATE!")
    }
    if (nickname.length >= 11) {
        return "*닉네임은 최대 10자 까지 작성 가능합니다.";
    }
    return PASS;
}

function validatePassword(userPassword, validateDuplicate = false) {
    const W_PWD_EMPTY = "*비밀번호를 입력해 주세요.";
    const W_PWD_FORMAT = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";

    if (userPassword.trim() == "") {
        return W_PWD_EMPTY;
    }
    if (userPassword.length < VALID_LENGTH_MIN || VALID_LENGTH_MAX < userPassword.length) {
        return W_PWD_FORMAT;
    }
    const validRegex = /^[a-zA-Z0-9!@#$%^&*()]+$/;
    if (!userPassword.match(validRegex)) {
        return W_PWD_FORMAT;
    }
    return PASS;
}

function validatePasswordConfirmation(userPassword, userPasswordConfirmation) {
    if (userPasswordConfirmation.trim().length === 0) {
        return "*비밀번호를 한번 더 입력해주세요.";
    }
    if (userPassword != userPasswordConfirmation) {
        console.log(userPassword, userPasswordConfirmation)
        return "*비밀번호와 다릅니다.";
    }
    return PASS
}


function validateEmail(userEmail, validateDuplicate = false) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (userEmail.trim() == "") {
        return "*올바른 이메일 주소 형식을 입력해 주세요. (예: example@example.com";
    }

    // if (VALID_LENGTH_MAX < userEmail.length) {
    // return false;
    // }

    if (!userEmail.match(validRegex)) {
        return "*올바른 이메일 주소 형식을 입력해 주세요. (예: example@example.com";
    }
    return PASS;
}

function enableHelper(helperNode, text) {
    helperNode.style.display = "inline";
    helperNode.innerHTML = text;
}

function disableHelper(helperNode) {
    helperNode.style.display = "none";
}

document.querySelectorAll(".modal-button.cancel")
    .forEach((v, k, p) => {
        v.addEventListener("click", modalOff)
    })
