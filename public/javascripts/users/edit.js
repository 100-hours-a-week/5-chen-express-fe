console.log("USER EDIT JS");

const buttonExitUser = document.getElementById("exit-user");
const inputNickname = document.getElementById("nickname");
const buttonEdit = document.getElementById("edit-submit");
const helperText = document.getElementsByClassName("helper-text")[0];
const buttonDone = document.getElementById("edit-done");
const inputImage = document.getElementById("profile-image");
const displayImage = document.getElementById("display-image");
const placeEmail = document.getElementById("email-place");

getJSON("/json/users/me.json").then((data) => {
    placeEmail.textContent = data.email;
    inputNickname.placeholder = data.nickname;
    displayImage.style.background = `url(${data.profile_image}) center`;
    displayImage.style.backgroundSize = 'cover';
})

buttonExitUser.addEventListener("click", () => {
    modalOn("modal-exit");
    document.body.style.overflow = "hidden";
})

buttonEdit.addEventListener("click", () => {
    validateNickname(inputNickname.value, true)
        .then(nicknameResult => {
            if (nicknameResult !== PASS) {
                helperText.style.display = "inline";
                helperText.innerHTML = nicknameResult;
                return;
            } else {
                helperText.style.display = "none";
            }
            alert("수정되었습니다.")
        });
})

buttonDone.addEventListener("click", () => {
    history.back()
})

inputImage.addEventListener("change", () => {
    displayImageOnChange(inputImage, displayImage)
})


