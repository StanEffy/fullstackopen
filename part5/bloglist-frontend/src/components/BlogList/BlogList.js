import React from "react";
import Blog from "../Blog";

const BlogList = ({ blogs = [], setNotification }) => {
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
