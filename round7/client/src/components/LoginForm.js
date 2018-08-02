import React from "react";

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleLoginFieldChange
}) => (
  <form className="login-form" onSubmit={handleLogin}>
    <div>
      Username
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleLoginFieldChange}
      />
    </div>
    <div>
      Password
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleLoginFieldChange}
      />
    </div>
    <button type="submit">Login</button>
  </form>
);

export default LoginForm;
