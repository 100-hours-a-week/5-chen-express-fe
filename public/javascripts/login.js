const loginButton = document.getElementById("login-button");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const helperTextList = document.getElementsByClassName("helper-text")

const WARNING = "*입력하신 계정 정보가 정확하지 않습니다."
const VALID_LENGTH_MIN = 3;
const VALID_LENGTH_MAX = 15;


loginButton.addEventListener('click', () => {
    const userEmail = inputEmail.value;
    const userPassword = inputPassword.value

    function validateEmail(userEmail) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (userEmail == '') {
            return false;
        }
        if (userEmail.length < VALID_LENGTH_MIN) {
            return false;
        }

        // if (VALID_LENGTH_MAX < userEmail.length) {
        // return false;
        // }

        if (!userEmail.match(validRegex)) {
            return false;
        }
        return true;
    }

    function validatePassword(userPassword) {
        const validRegex = /^[a-zA-Z0-9!@#$%^&*()]+$/;
        if (userPassword.length < VALID_LENGTH_MIN || VALID_LENGTH_MAX < userPassword.length) {
            return false;
        }
        if (userPassword == '') {
            return false;
        }
        if (!userPassword.match(validRegex)) {
            return false;
        }
        return true;
    }

    if (!validateEmail(userEmail) || !validatePassword(userPassword)) {
        helperTextList[0].innerHTML = WARNING;
        helperTextList[0].style.display = "inline";
    } else {
        helperTextList[0].style.display = "none";
        loginButton.style.background = CSS_DEEP_MAGENTA;

        let seconds = 3
        loginButton.innerText = seconds;
        let timer = setInterval(() => {
            seconds -= 1;
            loginButton.innerText = seconds;
        }, 1000);
        setTimeout(() => {
            window.location = "/posts/list.html"
        }, 2900)
        setTimeout(() => {
            loginButton.innerText = "로그인";
            clearInterval(timer)
        }, 3333)
    }
})