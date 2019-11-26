const delBtn = document.querySelector('#deleteItem');
function deletePost(e){
    let confrm = confirm('Do you want to delete this post?');
    if(confrm === true){
        alert('You have successfully delete the post!')
    }
    e.preventDefault();
}
delBtn.addEventListener('click',deletePost);