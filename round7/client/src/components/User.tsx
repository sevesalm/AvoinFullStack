import React from 'react';
import { NavLink } from 'react-router-dom';

import { List, ListItem, ListItemText } from '@material-ui/core';
import { IUser } from '../reducers/userReducer';

const User = ({ user }: { user: IUser }) => (
  <div className="user">
    <h1>{user.name}</h1>
    <h2>Added blogs</h2>
    <List component="nav">
      {user.blogs.map(blog => (
        <ListItem
          key={blog._id}
          button={true}
          component={({ innerRef, ...props }) => (
            <NavLink {...props} to={`/blogs/${blog._id}`} />
          )}
        >
          <ListItemText primary={`${blog.title} by ${blog.author}`} />
        </ListItem>
      ))}
    </List>
  </div>
);

export default User;
