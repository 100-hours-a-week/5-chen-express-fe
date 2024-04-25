// 닉네임 validate, validateDuplicate 하면 중복검사까지 함.
import {fetchServer} from "/javascripts/fetch.js";

export const PASS = "pass"
const VALID_LENGTH_MAX = 20;
const VALID_LENGTH_MIN = 8;


export async function validateNickname(nickname, validateDuplicate = false) {
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
export function validatePassword(userPassword) {
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
export function validatePasswordConfirmation(userPassword, userPasswordConfirmation) {
    if (userPasswordConfirmation.trim().length === 0) {
        return "*비밀번호를 한번 더 입력해주세요.";
    }
    if (userPassword != userPasswordConfirmation) {
        return "*비밀번호와 다릅니다.";
    }
    return PASS
}


// 이메일 validation
export async function validateEmail(userEmail, validateDuplicate = false) {
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
export function enableHelper(helperNode, text) {
    helperNode.style.display = "inline";
    helperNode.innerHTML = text;
}

// 헬퍼 텍스트 끄기
export function disableHelper(helperNode) {
    helperNode.style.display = "none";
}
