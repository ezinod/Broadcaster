const rejBtn = document.querySelector('#rejPost');
function rejPost(e){
    let confrm = confirm('Do you want to reject this post?');
    if(confrm === true){
        alert('You have successfully rejected the post!');

    }
    e.preventDefault();
}
rejBtn.addEventListener('click',rejPost);

// Resolve
const resBtn = document.querySelector('#resPost');
function resPost(e){
    let confrm = confirm('Are you sure this post resolved?');
    if(confrm === true){
        alert('You have successfully resolved the post!');

    }
    e.preventDefault();
}
resBtn.addEventListener('click',resPost);

// Under Investigation
const uiBtn = document.querySelector('#uiPost');
function uiPost(e){
    let confrm = confirm('Are you sure you are investigating on this post?');
    if(confrm === true){
        alert('You are under investigating this post!');

    }
    e.preventDefault();
}
uiBtn.addEventListener('click',uiPost);