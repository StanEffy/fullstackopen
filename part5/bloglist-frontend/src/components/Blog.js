import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogs, setNotification }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post")) {
      try {
        await blogService.deletePost(id);
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } catch (e) {
        setNotification({ type: "error", message: e.response.data.error });
      }
    }
  };
  const handleLike = async (blog) => {
    try {
      const res = await blogService.updateBlogpost(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs((prev) =>
        prev.map((b) => {
          if (b.id === blog.id) {
            return res.data;
          }
          return b;
        })
      );
    } catch (e) {
      setNotification({ type: "error", message: e.response.data.error });
    }
  };
  return (
    <li
      style={{ border: "1px solid black", padding: "5px" }}
      className={"blog-unit"}
    >
      <div>
        <div>
          <span>{blog.title}</span>
          <span>{blog.author}</span>
        </div>
        {!detailsVisibility ? (
          <button onClick={() => setDetailsVisibility(true)}>view</button>
        ) : null}
      </div>
      {detailsVisibility ? (
        <div>
          <div className={"blog-url"}>{blog.url}</div>
          <div>
            <span className={"blog-likes"}>likes {blog.likes}</span>
            <button onClick={() => handleLike(blog)}>like!</button>
          </div>
          <button onClick={() => setDetailsVisibility(false)}>hide</button>
          <button onClick={() => handleDelete(blog.id)}>
            remove the blogpost
          </button>
        </div>
      ) : null}
    </li>
  );
};
Blog.propTypes = {
  blog: PropTypes.shape({
    likes: PropTypes.number,
    url: PropTypes.string,
    author: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  setBlogs: PropTypes.func,
  setNotification: PropTypes.func,
};
export default Blog;
