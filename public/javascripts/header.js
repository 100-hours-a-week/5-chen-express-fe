console.log("HEADER JS")

const headerImage = document.getElementById("header-img");
const backButton = document.getElementById("back");

headerImage.addEventListener("click", (evt) => {
    const profileMenu = document.getElementById("profile-menu");
    if (profileMenu.style.display == "flex") {
        profileMenu.style.display = "none"
    } else {
        profileMenu.style.display = "flex"
    }
})

backButton.addEventListener("click", (e) => {
    history.back();
    e.preventDefault();
})