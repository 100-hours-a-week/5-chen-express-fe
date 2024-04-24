import {fetchServer, displayImageOnChange} from "/javascripts/fetch.js";
import {validateNickname, enableHelper, disableHelper, PASS} from "/javascripts/validator.js";
import {modalOn} from "/javascripts/modal.js";

console.log("USER EDIT JS");

const buttonExitUser = document.getElementById("exit-user");
const inputNickname = document.getElementById("nickname");
const buttonEdit = document.getElementById("edit-submit");
const helperText = document.getElementsByClassName("helper-text")[0];
const buttonDone = document.getElementById("edit-done");
const inputImage = document.getElementById("profile-image");
const displayImage = document.getElementById("display-image");
const placeEmail = document.getElementById("email-place");
const editForm = document.getElementById("user-edit-form");

fetchServer("/users/me")
    .then(response => response.json())
    .then(data => {
        placeEmail.textContent = data.user.email;
        inputNickname.placeholder = data.user.nickname;
        displayImage.style.background = `url(${data.user.profile_image}) center`;
        displayImage.style.backgroundSize = 'cover';
    });

buttonExitUser.addEventListener("click", () => {
    modalOn("modal-exit");
    document.body.style.overflow = "hidden";
})

buttonEdit.addEventListener("click", () => {
    validateNickname(inputNickname.value, true)
        .then(nicknameResult => {
            if (nicknameResult !== PASS) {
                enableHelper(helperText, nicknameResult);
            } else {
                disableHelper(helperText);
                const formData = new FormData(editForm);

                fetchServer("/users/me", "PUT", formData, false)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        alert("수정되었습니다.")
                        window.location.reload()
                    })
            }

        })
})

buttonDone.addEventListener("click", () => {
    history.back()
})

inputImage.addEventListener("change", () => {
    displayImageOnChange(inputImage, displayImage)
})



