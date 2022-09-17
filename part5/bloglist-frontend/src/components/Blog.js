import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false);
  const handleDelete = () => {};
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
            <button>like!</button>
          </div>
          <button onClick={() => setDetailsVisibility(false)}>hide</button>
        </div>
      ) : null}
      <button onClick={() => handleDelete()}>remove the blogpost</button>
    </li>
  );
};

export default Blog;
