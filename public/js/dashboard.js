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
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
    }
  }
};

const updateBlogHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blog-name').value.trim();
  const contents = document.querySelector('#blog-contents').value.trim();
  
  if (name && contents) {
    const response = await fetch(`/api/blogs${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, contents}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
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
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document.querySelector('.new-blog-form').addEventListener('submit', newBlogHandler);
if(document.querySelector('.blog-list')){
document.querySelector('.blog-list').addEventListener('click', delBlogHandler);}