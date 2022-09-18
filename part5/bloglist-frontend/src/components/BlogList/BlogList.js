import React, { useEffect } from "react";
import Blog from "../Blog";
import PropTypes from "prop-types";

const BlogList = ({ blogs = [], setNotification, setBlogs }) => {
  useEffect(() => {}, [blogs]);
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            setNotification={setNotification}
          />
        ))}
      </ul>
    </div>
  );
};
BlogList.propTypes = {
  blogs: PropTypes.array,
  setNotification: PropTypes.func,
  setBlogs: PropTypes.func,
};
export default BlogList;
