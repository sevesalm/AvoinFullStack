import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { List, ListItem, ListItemText } from '@material-ui/core';
import { IBlog } from '../reducers/blogReducer';

const Blogs = ({ blogs }: { blogs: IBlog[] }) => (
  <List component="nav">
    {blogs &&
      blogs.sort((a, b) => b.likes - a.likes).map(blog => (
        <ListItem
          key={blog.id}
          button={true}
          component={({ innerRef, ...props }) => (
            <NavLink {...props} to={`/blogs/${blog.id}`} />
          )}
        >
          <ListItemText primary={`${blog.title} by ${blog.author}`} />
        </ListItem>
      ))}
  </List>
);

export default connect((state: any) => ({
  blogs: state.blogs
}))(Blogs);
