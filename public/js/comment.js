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
        document.location.replace(`/blog/${blog_id}`);
      } else {
        alert('Failed to add comment');
      }
    }
  }; 

document.querySelector(".new-comment-form").addEventListener("submit", newCommentHandler);