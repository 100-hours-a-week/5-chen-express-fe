import {fetchServer, fromHTML, formatDateTime} from "/javascripts/fetch.js"

console.log("LIST JS")

const makePostFromData = (post) => {
    const createdAt = new Date(Date.parse(post.created_at));
    const html =
        `
                <a href="/posts/detail.html?post_id=${post.id}" class="post" id="post-template">
                    <div class="post-top">
                        <h1>${post.title}</h1>
                        <div class="post-metadata">
                            <span class="post-counts">좋아요 ${post.like_count}</span>
                            <span class="post-counts">댓글 ${post.comment_count}</span>
                            <span class="post-counts">조회수 ${post.view_count}</span>
                            <time class="post-created-at">${formatDateTime(createdAt)}</time>
                        </div>
                    </div>
                    <div class="post-bottom">
                        <span class="profile-img" style="background: url(${post.author.profile_image}) center; background-size: cover"></span>
                        <span>${post.author.nickname}</span>
                    </div>
                </a>
    `
    return fromHTML(html)
}

const postsContainer = document.getElementById("post-parent");


fetchServer("/posts",)
    .then(response => response.json())
    .then(data => {
        const posts = data.posts;
        for (const post of posts) {
            postsContainer.appendChild(makePostFromData(post))
        }
    })


// TODO : 무한 스크롤