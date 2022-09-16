import { useState, useEffect, } from 'react'
import React from "react";
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm/LoginForm";
import loginService from './services/login'
import BlogForm from "./components/BlogForm/BlogForm";


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
          'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Wrong credentials')
    }
  }
  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }


  return (
     <div>

       {user && <><div>Well, user is definetely logged in </div>
         <button onClick={() => logout()}>logout</button></>}
       {
         user === null ?
             <LoginForm handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername}/> :
             (   <>
                 <BlogForm />
                 <h2>blogs</h2>
                   {blogs.map(blog =>
                       <Blog key={blog.id} blog={blog}/>
                   )}
                 </>
             )
       }

     </div>
  )
}

export default App
