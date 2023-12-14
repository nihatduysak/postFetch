const container = document.querySelector('.container');
const panel = document.querySelector('.panel');





let posts = [];
let comments = [];



async function fetchData() {
    const postsList = await fetch('https://dummyjson.com/posts').then(r=>r.json())
    
    posts = postsList.posts

    const commentList = await fetch(`https://dummyjson.com/comments?limit=200`).then(r => r.json());

    comments = commentList.comments



    renderHtml();
    console.log(posts);
    console.log(comments);

}



function renderHtml() {
    container.innerHTML = posts.map(item =>
    {
        const postComments = comments.filter(comment => comment.postId === item.id);
        const commentsHtml = postComments.length > 0
            ? postComments.map(comment => `<p>${comment.body}</p>`).join('')
            : 'Yorum yok';

        return `
        <button class="accordion">${item.title}</button>
        <div class="panel">
            <p>${item.body}</p>
            <button class="commentBtn">Yorumları Göster</button>
            <div class="commentPanel">
                ${commentsHtml}
            </div>

        </div>`
    }).join('');

    const accordion = document.querySelectorAll('.accordion');
    const commentBtns = document.querySelectorAll('.commentBtn');
    
    accordion.forEach(btn => {
        btn.addEventListener('click', showAcc);
    });

    commentBtns.forEach(commentBtn => commentBtn.addEventListener('click', showComments));

}



fetchData();

function showAcc() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.display === 'block' || getComputedStyle(panel).display === 'block') {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'block';
    }
}

function showComments(event) {
    const button = event.target;
    const panel = button.nextElementSibling;

    if (panel.style.display === 'block' || getComputedStyle(panel).display === 'block') {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'block';
    }
}

