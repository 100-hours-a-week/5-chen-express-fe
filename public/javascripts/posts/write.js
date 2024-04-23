console.log("WRITE JS")

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const writeButton = document.getElementById("write-done-button")

function isBothNotEmpty() {
    return titleInput.value.length > 0 && contentInput.value.length > 0
}

const detectColor = () => {
    if (isBothNotEmpty()) {
        writeButton.disabled = false;
    } else {
        writeButton.disabled = true;
    }
}

titleInput.addEventListener("input", detectColor);
contentInput.addEventListener("input", detectColor);

writeButton.addEventListener("click", (evt) => {
    const writeForm = document.getElementById("write-form")
    const formData = new FormData(writeForm);

    fetchServer("/posts", "POST", formData, false)
        .then(response => {
            if (response.ok) {
                window.location = "/posts/detail.html"
            } else {
                console.warn("FAILED", response)
            }
        })

    evt.preventDefault();
})
