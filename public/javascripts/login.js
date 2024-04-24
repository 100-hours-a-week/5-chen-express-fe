console.log("LOGIN JS")

const loginButton = document.getElementById("login-button");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const helperTextList = document.getElementsByClassName("helper-text")
const W_USER_NOT_FOUND = "*입력하신 계정 정보가 정확하지 않습니다."

loginButton.addEventListener('click', async () => {
    const userEmail = inputEmail.value;
    const userPassword = inputPassword.value

    const emailResult = await validateEmail(userEmail)
    const passwordResult = validatePassword(userPassword)

    let validated = true;
    if (emailResult !== PASS) {
        enableHelper(helperTextList[0], emailResult)
        validated = false;
    }
    if (passwordResult !== PASS) {
        enableHelper(helperTextList[1], passwordResult)
        validated = false;
    }
    if (!validated) {
        return;
    }

    fetchServer("/login", "POST",
        {
            email: userEmail,
            password: userPassword
        }
    )
        .then(response => response.ok)
        .then((match) => {
            if (!match) {
                disableHelper(helperTextList[0])
                enableHelper(helperTextList[1], W_USER_NOT_FOUND)
                return;
            }

            disableHelper(helperTextList[0]);
            disableHelper(helperTextList[1]);

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
        })
})