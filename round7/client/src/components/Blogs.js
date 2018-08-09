import React from 'react';
import { NavLink } from 'react-router-dom';

const Blogs = ({ blogs }) => (
  <div className="blogs">
    <ul>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
        <li key={blog.id}>
          <NavLink to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default Blogs;
