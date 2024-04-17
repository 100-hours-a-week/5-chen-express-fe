console.log("USER EDIT JS");

const buttonExitUser = document.getElementById("exit-user");
const inputNickname = document.getElementById("nickname");
const buttonEdit = document.getElementById("edit-submit")
const helperText = document.getElementsByClassName("helper-text")[0]
const buttonDone = document.getElementById("edit-done")
const inputImage = document.getElementById("profile-image")
const displayImage = document.getElementById("display-image")

buttonExitUser.addEventListener("click", () => {
    modalOn("modal-exit");
    document.body.style.overflow = "hidden";
})

buttonEdit.addEventListener("click", () => {
    const nicknameResult = validateNickname(inputNickname.value);
    if (nicknameResult != "pass") {
        helperText.style.display = "inline";
        helperText.innerHTML = nicknameResult;
        return;
    } else {
        helperText.style.display = "none";
    }
    alert("수정되었습니다.")
})

buttonDone.addEventListener("click", () => {
    history.back()
})

inputImage.addEventListener("change", () => {
    displayImageOnChange(inputImage, displayImage)
})



