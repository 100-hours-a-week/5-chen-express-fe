console.log("POST EDIT JS")

const buttonEditDone = document.getElementById("edit-done");
const inputTitle = document.getElementById("title");
const inputContent = document.getElementById("content");
const helperTextList = document.getElementsByClassName("helper-text");
const inputFile = document.getElementById("file");
const fileNamePlace = document.getElementById("file-name-place");

const editForm = document.getElementById("post-edit-form");

const urlParams = new URLSearchParams(window.location.search);
const post_id = urlParams.get('post_id');

fetchServer(`/posts/${post_id}`)
    .then(response => response.json())
    .then(data => data.post)
    .then(post => {
        inputTitle.value = post.title;
        inputContent.value = post.content;
        fileNamePlace.textContent = post.image.name;
    })

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
        const formData = new FormData(editForm);
        fetchServer(`/posts/${post_id}`, "POST", formData, false)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location = `/posts/detail.html?post_id=${post_id}`
            })

    }
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