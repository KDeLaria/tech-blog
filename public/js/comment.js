const newCommentHandler = async (event) => {
    event.preventDefault();
    const commentInput = event.target.querySelector('.comment-contents-input');
    const contents = commentInput.value.trim();
    const blog_id = commentInput.getAttribute("data-blog_id");
    
    if (contents) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ contents, blog_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to add comment');
      }
    }
  };

const delCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete comment');
      }
    }
  };  

document.querySelector(".new-comment-form").addEventListener("submit", newCommentHandler);
if(document.querySelector('.comment-list')){
    document.querySelector('.comment-list').addEventListener('click', delCommentHandler);}