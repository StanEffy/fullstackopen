import React, { useEffect } from "react";
import Blog from "../Blog";

const BlogList = ({ blogs = [], setNotification, setBlogs }) => {
  useEffect(() => {}, [blogs]);
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
