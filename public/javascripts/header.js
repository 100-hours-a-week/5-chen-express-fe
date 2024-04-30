import {fetchServer} from "/javascripts/fetch.js"

const headerImage = document.getElementById("header-img");
const backButton = document.getElementById("back");
const logoutButton = document.getElementById("logout-button");

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

if (logoutButton !== null) {
    logoutButton.addEventListener("click", (e) => {
        fetchServer("/logout", "POST")
            .then(response => response.json())
            .then(() => {
                window.location = "/login.html";
            })
    })
}


