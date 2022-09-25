import { useState, useEffect } from "react";
import React from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm/LoginForm";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm/BlogForm";
import Anouncement from "./components/Anouncement/Anouncement";
import BlogList from "./components/BlogList/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({
        message: exception.response.data.error,
        type: "error",
      });
    }
  };
  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };
  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [notification]);

  return (
    <div>
      {notification ? (
        <Anouncement type={notification.type} message={notification.message} />
      ) : null}
      {user && (
        <>
          <div>
            Well, <b>{user.username}</b> is definetely logged in
          </div>
          <button onClick={() => logout()}>logout</button>
        </>
      )}
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      ) : (
        <>
          <BlogForm setNotification={setNotification} setBlogs={setBlogs} />
          <BlogList
            blogs={blogs}
            setNotification={setNotification}
            setBlogs={setBlogs}
          />
        </>
      )}
    </div>
  );
};

export default App;
