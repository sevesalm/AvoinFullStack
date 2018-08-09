import React from 'react';

const User = ({ user }) => (
  <div>
    <h1>{user.name}</h1>
    <h2>Added blogs</h2>
    <ul>
      {user.blogs.map(blog => (
        <li key={blog._id}>
          {blog.title} by {blog.author}
        </li>
      ))}
    </ul>
  </div>
);

export default User;
