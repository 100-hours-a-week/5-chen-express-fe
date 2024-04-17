console.log("DETAIL JS");
const buttonDeletePost = document.getElementById("delete-post");

const buttonListDeleteComment = document.getElementsByClassName("delete-comment");
const inputComment = document.getElementById("comment-write");
const buttonComment = document.getElementById("comment-button");

buttonDeletePost.addEventListener("click", () => {
    modalOn("modal-delete-post");
})

inputComment.addEventListener("input", () => {
    if (inputComment.value.trim().length == 0) {
        buttonComment.style.background = CSS_MAGENTA;
    } else {
        buttonComment.style.background = CSS_DEEP_MAGENTA;
    }
})

for (let elem of buttonListDeleteComment) {
    elem.addEventListener("click", () => {
        modalOn("modal-delete-comment");
    });
}


