console.log("DETAIL JS")

const modalDeleteComment = document.getElementById("modal-delete-comment");
const modalDeletePost = document.getElementById("modal-delete-post");

const buttonDeletePost = document.getElementById("delete-post");

const buttonListDeleteComment = document.getElementsByClassName("delete-comment");

buttonDeletePost.addEventListener("click", () => {
    modalOn(modalDeletePost)
})

for (let elem of buttonListDeleteComment) {
    elem.addEventListener("click", () => {
        modalOn(modalDeleteComment)
    })
}


