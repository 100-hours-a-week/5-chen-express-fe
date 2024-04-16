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

// POST 이벤트로 바뀌면서 바뀔 예정
writeButton.addEventListener("click", (evt) => {
    window.location = "/posts/list.html"
    evt.preventDefault();
})
