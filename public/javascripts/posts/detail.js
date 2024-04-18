console.log("DETAIL JS");

const inputComment = document.getElementById("comment-write");
const buttonComment = document.getElementById("comment-button");
const postPlace = document.getElementById("post-place");
const commentPlace = document.getElementById("comment-place");

inputComment.addEventListener("input", () => {
    if (inputComment.value.trim().length == 0) {
        buttonComment.style.background = CSS_MAGENTA;
    } else {
        buttonComment.style.background = CSS_DEEP_MAGENTA;
    }
})

getJSON("/json/posts/1.json")
    .then(post => {
        const date = new Date(post.created_at);
        const html = `
        <div id="post-container">
            <div class="post-head">
                <div>
                    <h1>${post.title}</h1>
                </div>
                <div class="post-head-bottom">
                    <div class="author-profile">
                        <span class="profile-img" 
                        style="background: url('${post.author.profile_image}') center; background-size: cover"></span>
                        <span>${post.author.nickname}</span>
                    </div>
                    <span class="post-created-at">${formatDateTime(date)}</span>
                    <div class="post-head-buttons">
                        <a href="/posts/edit.html" id="edit-post" class="small-button">수정</a>
                        <button id="delete-post" class="small-button">삭제</button>
                    </div>
                </div>

            </div>
            <div class="post-body-wrap">
                <div class="post-photo" style="background: url('${post.image.path}') center; background-size: cover">
                </div>
                <div class="post-body">
                    ${post.content}
                </div>
            </div>
            <div class="post-button-wrap">
                <button class="post-meta-button">
                    <span>${post.view_count}</span>
                    <span>조회수</span>
                </button>
                <button class="post-meta-button">
                    <span>${post.comment_count}</span>
                    <span>댓글</span>
                </button>
            </div>
        </div>`

        const postDOM = fromHTML(html, true);
        postPlace.appendChild(postDOM)
    })
    .then(() => {
        const buttonDeletePost = document.getElementById("delete-post");
        buttonDeletePost.addEventListener("click", () => {
            modalOn("modal-delete-post");
        })
    })

getJSON("/json/posts/1/comments.json")
    .then(data => {
        return data.comments
    })
    .then(comments => {
        for (const comment of comments) {
            const commentDOM = fromHTML(`<li class="comment-wrap">
                <div class="author-profile">
                    <span class="profile-img"
                    style="background: url('${comment.author.profile_image}') center; background-size: cover"></span>
                    <span>${comment.author.nickname}</span>
                    <span class="comment-date">${formatDateTime(new Date(comment.created_at))}</span>
                    <div class="post-head-buttons">
                        <button class="small-button">
                            수정
                        </button>
                        <button class="small-button delete-comment"
                        onclick="modalOn('modal-delete-comment');">
                            삭제
                        </button>
                    </div>
                </div>
                <div class="comment-content">
                    ${comment.content}
                </div>
            </li>`);
            commentPlace.appendChild(commentDOM);
        }
    })
