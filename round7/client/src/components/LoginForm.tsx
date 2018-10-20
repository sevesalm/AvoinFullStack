import React from 'react';

import { Button, TextField } from '@material-ui/core';

const dialogStyle = {
  minWidth: '15em',
  padding: '1em'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column'
};

const LoginForm = ({
  handleLogin,
  handleLoginFieldChange,
  password,
  toggleDialog,
  username
}: {
  handleLogin: (event: any) => Promise<void>;
  handleLoginFieldChange: (event: any) => void;
  password: string;
  toggleDialog: () => void;
  username: string;
}) => (
  <div style={dialogStyle}>
    <div style={formStyle}>
      <TextField
        id="username"
        label="username"
        value={username}
        margin="normal"
        onChange={handleLoginFieldChange}
        autoComplete="off"
      />
      <TextField
        type="password"
        id="password"
        label="password"
        value={password}
        margin="normal"
        onChange={handleLoginFieldChange}
      />
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        onClick={toggleDialog}
        type="submit"
        variant="contained"
        color="default"
      >
        Cancel
      </Button>
      <Button
        className="login-button"
        onClick={handleLogin}
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginLeft: 10 }}
      >
        Login
      </Button>
    </div>
  </div>
);

export default LoginForm;
