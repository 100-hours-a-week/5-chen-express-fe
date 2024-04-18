console.log("LIST JS")

function makePostFromData(post) {
    const createdAt = new Date(Date.parse(post.created_at));
    const html =
        `
                <a href="/posts/detail.html" class="post" id="post-template">
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


getJSON("/json/posts.json").then(data => {
    for (const post of data.posts) {
        postsContainer.appendChild(makePostFromData(post))
    }
})


// TODO : 무한 스크롤