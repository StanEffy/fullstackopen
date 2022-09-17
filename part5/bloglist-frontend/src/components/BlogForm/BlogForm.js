import React, { useState } from "react";
import blogService from "../../services/blogs";

const BlogForm = ({ setNotification }) => {
  const [blogpost, setBlogpost] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogService.createNewBlogpost(blogpost);
    } catch (e) {
      setNotification({ type: "error", message: e.response.data.error });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          title
          <input
            type="text"
            value={blogpost.title}
            name="title"
            onChange={({ target }) =>
              setBlogpost((prev) => ({ ...prev, title: target.value }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            value={blogpost.author}
            name="author"
            onChange={({ target }) =>
              setBlogpost((prev) => ({ ...prev, author: target.value }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="text"
            value={blogpost.url}
            name="url"
            onChange={({ target }) =>
              setBlogpost((prev) => ({ ...prev, url: target.value }))
            }
          />
        </label>
      </div>
      <button onClick={(e) => handleSubmit(e)}>SEND NEW BLOGPOST</button>
    </form>
  );
};

export default BlogForm;
