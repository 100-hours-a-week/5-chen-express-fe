import {fetchServer} from "/javascripts/fetch.js"

console.log("WRITE JS")

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const writeButton = document.getElementById("write-done-button")

function isBothNotEmpty() {
    return titleInput.value.length > 0 && contentInput.value.length > 0
}

const detectColor = () => {
    writeButton.disabled = !isBothNotEmpty();
}

titleInput.addEventListener("input", detectColor);
contentInput.addEventListener("input", detectColor);

writeButton.addEventListener("click", (evt) => {
    const writeForm = document.getElementById("write-form")
    const formData = new FormData(writeForm);

    fetchServer("/posts", "POST", formData, false)
        .then(response => response.json())
        .then(data => {
            window.location = `/posts/detail.html?post_id=${data.post.id}`;
        })

    evt.preventDefault();
})
