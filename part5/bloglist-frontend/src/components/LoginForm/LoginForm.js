import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const LoginForm = ({
  handleLogin,
  username,
  password,
  setPassword,
  setUsername,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <label>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button type="submit">login</button>
    </form>
  );
};
LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  handleLogin: PropTypes.func,
  setPassword: PropTypes.func,
  setUsername: PropTypes.func,
};
export default LoginForm;
