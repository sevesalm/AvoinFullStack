import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <div>
    <ul>
      <NavLink to="/">Blogs</NavLink>
      <NavLink to="/users">Users</NavLink>
    </ul>
  </div>
);

export default NavBar;
