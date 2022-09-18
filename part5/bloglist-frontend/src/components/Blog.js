import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post")) {
      try {
        await blogService.deletePost(id);
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } catch (e) {
        console.log(e);
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
      console.log(e);
    }
  };
  return (
    <li style={{ border: "1px solid black", padding: "5px" }}>
      <div>
        <div>
          {blog.title} {blog.author}
        </div>
        {!detailsVisibility ? (
          <button onClick={() => setDetailsVisibility(true)}>view</button>
        ) : null}
      </div>
      {detailsVisibility ? (
        <div>
          <div>{blog.url}</div>
          <div>
            <span>likes {blog.likes}</span>
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

export default Blog;
