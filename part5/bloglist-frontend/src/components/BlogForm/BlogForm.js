import React, { useState } from "react";
import blogService from "../../services/blogs";
import PropTypes from "prop-types";

const BlogForm = ({ setNotification, setBlogs }) => {
  const [visible, setVisibility] = useState(false);
  const [blogpost, setBlogpost] = useState({
    title: "",
    author: "",
    url: "",
  });
  const hideForm = () => {
    setVisibility(false);
    setBlogpost((prev) => ({ ...prev, title: "", author: "", url: "" }));
  };
  const showForm = () => {
    setVisibility(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await blogService.createNewBlogpost(blogpost);
      setNotification({
        type: "success",
        message: `Yaaay! New blogpost ${res.title} was created by ${res.author}`,
      });
      setBlogpost((prev) => ({ ...prev, title: "", author: "", url: "" }));
      setBlogs((prev) => [...prev, res]);
    } catch (e) {
      setNotification({ type: "error", message: e.response.data.error });
    }
  };
  return (
    <>
      {visible ? (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                title
                <input
                  type="text"
                  value={blogpost.title}
                  name="title"
                  id={"form-title"}
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
                  id={"form-author"}
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
                  id={"form-url"}
                  onChange={({ target }) =>
                    setBlogpost((prev) => ({ ...prev, url: target.value }))
                  }
                />
              </label>
            </div>
            <button id={"form-button-submit"} onClick={(e) => handleSubmit(e)}>
              SEND NEW BLOGPOST
            </button>
          </form>
          <button onClick={() => hideForm()}>cancel all this</button>
        </>
      ) : (
        <button onClick={() => showForm()}>add new blogpost</button>
      )}
    </>
  );
};
BlogForm.propTypes = {
  setNotification: PropTypes.func,
  setBlogs: PropTypes.func,
};
export default BlogForm;
