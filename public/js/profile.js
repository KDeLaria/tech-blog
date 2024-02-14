const newBlogHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blog-name').value.trim();
  const contents = document.querySelector('#blog-contents').value.trim();
  
  if (name && contents) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name, contents}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog');
    }
  }
};

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

const delBlogHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog');
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

document.querySelector('.new-blog-form').addEventListener('submit', newBlogHandler);
document.querySelector(".new-comment-form").addEventListener("submit", newCommentHandler);
if(document.querySelector('.blog-list')){
document.querySelector('.blog-list').addEventListener('click', delBlogHandler);}
if(document.querySelector('.comment-list')){
  document.querySelector('.comment-list').addEventListener('click', delCommentHandler);}