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
          id={"username"}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        password
        <input
          type="password"
          value={password}
          name="password"
          id={"password"}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button id={"login-button"} type="submit">
        login
      </button>
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
