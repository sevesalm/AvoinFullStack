import React from 'react';
import { NavLink } from 'react-router-dom';

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { IUser } from '../reducers/userReducer';

const activeLinkStyle = {
  borderBottom: '2px solid rgba(255,255,255, 0.8)',
  borderRadius: 0
};

const brandStyle = {
  marginRight: '2em'
};

const NavBar = ({
  user,
  handleLogout,
  toggleDialog
}: {
  user: IUser;
  handleLogout: () => void;
  toggleDialog: () => void;
}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit" style={brandStyle}>
        BlogIt
      </Typography>
      <Button
        color="inherit"
        component={({ innerRef, ...props }) => (
          <NavLink
            {...props}
            activeStyle={activeLinkStyle}
            exact={true}
            to="/"
          />
        )}
      >
        Blogs
      </Button>
      <Button
        color="inherit"
        component={({ innerRef, ...props }) => (
          <NavLink
            {...props}
            activeStyle={activeLinkStyle}
            exact={true}
            to="/users"
          />
        )}
      >
        Users
      </Button>

      <div style={{ marginLeft: 'auto' }}>
        {user && (
          <div>
            <Typography
              variant="button"
              color="inherit"
              style={{ display: 'inline-flex', color: 'white' }}
            >
              {user.name}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
        {!user && (
          <Button
            className="login-dialog-button"
            color="inherit"
            onClick={toggleDialog}
          >
            Login
          </Button>
        )}
      </div>
    </Toolbar>
  </AppBar>
);

export default NavBar;
