const loginButton = document.getElementById("login-button");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const helperTextList = document.getElementsByClassName("helper-text")

// const WARNING = "*입력하신 계정 정보가 정확하지 않습니다."

loginButton.addEventListener('click', () => {
    const userEmail = inputEmail.value;
    const userPassword = inputPassword.value

    const emailResult = validateEmail(userEmail)
    const passwordResult = validatePassword(userPassword)

    if (emailResult !== PASS || passwordResult !== PASS) {
        helperTextList[0].innerHTML = emailResult;
        helperTextList[0].style.display = "inline";

        helperTextList[1].innerHTML = passwordResult;
        helperTextList[1].style.display = "inline";
    } else {
        helperTextList[0].style.display = "none";
        helperTextList[1].style.display = "none";
        loginButton.style.background = CSS_DEEP_MAGENTA;

        let seconds = 3
        loginButton.innerText = seconds;
        const timer = setInterval(() => {
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