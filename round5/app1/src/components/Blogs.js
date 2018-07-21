import React from "react";
import Blog from "./Blog";

const Blogs = ({ blogs, incrementLikes, loggedInUser, deleteBlog }) => (
  <div className="blogs">
    {blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          incrementLikes={incrementLikes}
          loggedInUser={loggedInUser}
          deleteBlog={deleteBlog}
        />
      ))}
  </div>
);

export default Blogs;
