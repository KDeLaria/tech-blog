const newBlogHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blog-name').value.trim();
  const contents = document.querySelector('#blog-contents').value.trim();

  if (name && contents) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name, contents }),
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

const updateRequestHandler = async (event) => {
  event.preventDefault();
  console.log("update button clicked")
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id'); console.log(`
    data-id: `)

    if (id) {
      const response = await fetch(`/api/blogs/${id}`); const blog = await response.json();
      if (response.ok) {

        console.log(blog)
        document.querySelector('#blog-name').text = blog.name;
        document.querySelector('#blog-contents').text = blog.contents;
        document.querySelector("#create-button").setAttribute("style", "display:none");
        document.querySelector("#update-button").setAttribute("style", "display:block");
        document.querySelector("#update-button").setAttribute("data-id", id);

        document.querySelector("#update-button").addEventListener("click", updateBlogHandler);
      }
    }
  }
}

const updateBlogHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const name = document.querySelector('#blog-name').value.trim();
    const contents = document.querySelector('#blog-contents').value.trim();

    if (name && contents) {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.querySelector("#create-button").setAttribute("style", "display:block");
        document.querySelector("#update-button").setAttribute("style", "display:none");
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blog');
      }
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

document.querySelector('#create-button').addEventListener('click', newBlogHandler);
document.querySelector('#update-button').addEventListener('click', updateBlogHandler);
if (document.querySelector('.blog-list')) {
  document.querySelector('.blog-list').addEventListener('click', delBlogHandler);
}

if (document.querySelector('.update')) {
  document.querySelector('.update').addEventListener('click', updateRequestHandler);
}