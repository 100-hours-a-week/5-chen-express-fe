console.log("DEFAULT JS")

let cssVar = getComputedStyle(document.body)
const CSS_DEEP_MAGENTA = cssVar.getPropertyValue("--deep-magenta")
const CSS_MAGENTA = cssVar.getPropertyValue("--magenta")
const PASS = "pass"
const VALID_LENGTH_MAX = 20;
const VALID_LENGTH_MIN = 8;

// 딤 처리
function dimmed(flag = true) {
    const dimmedElem = document.getElementById("dimmed");
    if (flag) {
        dimmedElem.style.display = "block";
    } else {
        dimmedElem.style.display = "none";
    }
}

// 모달 켜기
function modalOn(modalId) {
    let modalElem = document.getElementById(modalId);
    modalElem.style.display = "flex";
    dimmed()
    document.body.style.overflow = "hidden";
}

// 모달 끄기
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

// 닉네임 validate, validateDuplicate 하면 중복검사까지 함.
async function validateNickname(nickname, validateDuplicate = false) {
    const W_NICK_EMPTY = "*닉네임을 입력해주세요.";
    const W_NICK_LONG = "*닉네임은 최대 10자 까지 작성 가능합니다.";
    const W_NICK_BLANK = "*띄어쓰기를 없애주세요.";
    const W_NICK_DUPLICATED = "*중복된 닉네임 입니다.";

    if (nickname.length === 0) {
        return W_NICK_EMPTY;
    }
    if (nickname.includes(" ")) {
        return W_NICK_BLANK;
    }
    if (validateDuplicate) {
        const queryString = new URLSearchParams({
            "nickname": nickname
        }).toString()
        const isDuplicated = await fetchServer(`/users/exist?${queryString}`)
            .then(async response => {
                const data = await response.json();
                return data.nickname_exist
            })
        if (isDuplicated) {
            return W_NICK_DUPLICATED;
        }
    }
    if (nickname.length >= 11) {
        return W_NICK_LONG;
    }
    return PASS;
}

// 비밀번호 validate
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

// 비밀번호 확인 validation
function validatePasswordConfirmation(userPassword, userPasswordConfirmation) {
    if (userPasswordConfirmation.trim().length === 0) {
        return "*비밀번호를 한번 더 입력해주세요.";
    }
    if (userPassword != userPasswordConfirmation) {
        return "*비밀번호와 다릅니다.";
    }
    return PASS
}


// 이메일 validation
async function validateEmail(userEmail, validateDuplicate = false) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const W_EMAIL_INVALID = "*올바른 이메일 주소 형식을 입력해 주세요. (예: example@example.com)";
    const W_EMAIL_DUPLICATED = "*중복된 이메일 입니다."

    if (userEmail.trim() === "") {
        return W_EMAIL_INVALID;
    }

    // if (VALID_LENGTH_MAX < userEmail.length) {
    // return false;
    // }

    if (!userEmail.match(validRegex)) {
        return W_EMAIL_INVALID;
    }

    if (validateDuplicate) {
        const queryString = new URLSearchParams({
            "email": userEmail
        }).toString()

        const isDuplicated = await fetchServer(`/users/exist?${queryString}`)
            .then(response => response.json())
            .then(data => {
                return data.email_exist
            })

        console.log(isDuplicated)

        if (isDuplicated) {
            return W_EMAIL_DUPLICATED;
        }
    }

    return PASS;
}

// 헬퍼 텍스트 켜기
function enableHelper(helperNode, text) {
    helperNode.style.display = "inline";
    helperNode.innerHTML = text;
}

// 헬퍼 텍스트 끄기
function disableHelper(helperNode) {
    helperNode.style.display = "none";
}

// 파일 인풋 시 이미지 변경
function displayImageOnChange(inputImage, displayImage) {
    const file = inputImage.files[0]
    const reader = new FileReader();

    reader.onloadend = () => {
        displayImage.style.backgroundImage = `url(${reader.result})`;
        displayImage.style.backgroundSize = "cover";
    }
    if (file) {
        reader.readAsDataURL(file)
    }
}

// JSON파일을 object로 가져오기
async function fetchServer(path, method = "GET", data = {}, isJson = true) {
    console.log(`fetch start : ${path}`)
    if (method === "GET" || method === "HEAD") {
        return fetch("http://localhost:8080" + path, {
            headers: {
                "Content-Type": "application/json",
            },
            method: method,
        })
    }
    if (!isJson) {
        return fetch("http://localhost:8080" + path, {
            method: method,
            body: data,
        })
    }
    return fetch("http://localhost:8080" + path, {
        headers: {
            "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(data),
    })

}

// 날짜 포맷팅
function formatDateTime(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

// html string -> dom element로 변환
function fromHTML(html, trim = true) {
    html = trim ? html.trim() : html;
    if (!html) return null;

    const template = document.createElement("template");
    template.innerHTML = html;
    const result = template.content.children;

    if (result.length === 1) return result[0];
    return result;
}

/* ########### MODAL PART ################*/
document.querySelectorAll(".modal-button.cancel")
    .forEach((v, k, p) => {
        v.addEventListener("click", modalOff)
    })

/* ########### HEADER PART ################*/
const headerImage = document.getElementById("header-img");
const backButton = document.getElementById("back");

if (headerImage !== null) {
    headerImage.addEventListener("click", (evt) => {
        const profileMenu = document.getElementById("profile-menu");
        if (profileMenu.style.display == "flex") {
            profileMenu.style.display = "none"
        } else {
            profileMenu.style.display = "flex"
        }
    })

    fetchServer("/users/me")
        .then(response => response.json())
        .then(data => {
            const user = data.user;
            headerImage.style.background = `url(${user.profile_image}) center`;
            headerImage.style.backgroundSize = "cover";
        })
}


if (backButton !== null) {
    backButton.addEventListener("click", (e) => {
        history.back();
        e.preventDefault();
    })
}


