console.log("POST EDIT JS")

const buttonEditDone = document.getElementById("edit-done");
const inputTitle = document.getElementById("title");
const inputContent = document.getElementById("content");
const helperTextList = document.getElementsByClassName("helper-text");
const inputFile = document.getElementById("file");
const fileNamePlace = document.getElementById("file-name-place");


buttonEditDone.addEventListener("click", () => {
    let validated = true;
    if (inputTitle.value.trim().length == 0) {
        enableHelper(helperTextList[0], "*제목을 작성해 주세요.")
        validated = false;
    } else {
        disableHelper(helperTextList[0]);
    }
    if (inputContent.value.trim().length == 0) {
        enableHelper(helperTextList[1], "*내용을 작성해 주세요.")
        validated = false;
    } else {
        disableHelper(helperTextList[1])
    }
    if (validated) {
        window.location = "/posts/detail.html"
    }
})

const DUMMY_POST_ID = 8;
fetchServer(`/posts/${DUMMY_POST_ID}`)
    .then(response => response.json())
    .then(data => data.post)
    .then(post => {
        inputTitle.value = post.title;
        inputContent.value = post.content;
        fileNamePlace.textContent = post.image;
    })

inputFile.addEventListener("change", () => {
    const files = inputFile.files;
    if (files.length === 0) {
        return;
    }
    for (const file of files) {
        fileNamePlace.textContent = file.name;
    }
})