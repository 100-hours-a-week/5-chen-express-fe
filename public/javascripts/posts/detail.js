import {fetchServer, formatDateTime, fromHTML} from "/javascripts/fetch.js";
import {modalOn} from "/javascripts/modal.js";
import {CSS_MAGENTA, CSS_DEEP_MAGENTA} from "/javascripts/constant_css";


console.log("DETAIL JS");

const inputComment = document.getElementById("comment-write");
const buttonComment = document.getElementById("comment-button");
const postPlace = document.getElementById("post-place");
const commentPlace = document.getElementById("comment-place");

const buttonDeletePost = document.getElementById("delete-post-button");
const buttonDeleteComment = document.getElementById("delete-comment-button");
const modalDeleteId = 'modal-delete-comment'

const urlParams = new URLSearchParams(window.location.search);
const post_id = urlParams.get('post_id');

inputComment.addEventListener("input", () => {
    if (inputComment.value.trim().length === 0) {
        buttonComment.style.background = CSS_MAGENTA;
    } else {
        buttonComment.style.background = CSS_DEEP_MAGENTA;
    }
})

const BUTTON_TXT_EDIT_COMMENT = "댓글 수정";
buttonComment.addEventListener("click", (e) => {
    console.log(buttonComment.textContent)
    if (inputComment.value.trim().length === 0) {
        return;
    }

    const BUTTON_TXT_WRITE_COMMENT = "댓글 등록";
    if (buttonComment.textContent === BUTTON_TXT_WRITE_COMMENT) {
        fetchServer(`/comments`, "POST", {
            post_id: post_id,
            content: inputComment.value
        }).then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }
    if (buttonComment.textContent === BUTTON_TXT_EDIT_COMMENT) {
        fetchServer(`/comments/${buttonComment.dataset.id}`, "POST", {
            content: inputComment.value
        }).then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }

    e.preventDefault();
    window.location.reload();
})

buttonDeletePost.addEventListener("click", () => {
    fetchServer(`/posts/${post_id}`, "DELETE")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location = "/posts/list.html";
        });
})

buttonDeleteComment.addEventListener("click", () => {
    const modal = document.getElementById(modalDeleteId);
    const comment_id = modal.dataset.id;
    fetchServer(`/comments/${comment_id}`, "DELETE")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location = `/posts/detail.html?post_id=${post_id}`;
        });
})


fetchServer(`/posts/${post_id}`)
    .then(response => response.json())
    .then(data => data.post)
    .then(post => {
        const date = new Date(post.created_at)
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
                        <a href="/posts/edit.html?post_id=${post.id}" id="edit-post" class="small-button">수정</a>
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

function editComment(content, id) {
    buttonComment.textContent = BUTTON_TXT_EDIT_COMMENT;
    inputComment.value = content
    buttonComment.dataset.id = id;
}

fetchServer(`/posts/${post_id}/comments`)
    .then(response => response.json())
    .then(data => data.comments)
    .then(comments => {
        for (const comment of comments) {
            const commentDOM = fromHTML(`<li class="comment-wrap">
                <div class="author-profile">
                    <span class="profile-img"
                    style="background: url('${comment.author.profile_image}') center; background-size: cover"></span>
                    <span>${comment.author.nickname}</span>
                    <span class="comment-date">${formatDateTime(new Date(comment.created_at))}</span>
                    <div class="post-head-buttons">
                        <button class="small-button" onclick="editComment('${comment.content}',${comment.id})">
                            수정
                        </button>
                        <button class="small-button delete-comment"
                        onclick="modalOn('${modalDeleteId}',${comment.id});">
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
