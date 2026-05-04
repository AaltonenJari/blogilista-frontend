import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/notification'
import {
  Routes, Route, Link, Navigate,
  useMatch, useNavigate
} from 'react-router-dom'
import Blog from './components/Blog'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const padding = {
    padding: 5
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const increaseLikesOf = (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService.update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(n => n.id !== id ? n : returnedBlog))

        const notificationMessage = `liked blog ${returnedBlog.title} by ${returnedBlog.author}`
        setNotificationMessage(notificationMessage)
        setNotificationStatus('ok')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
      .catch(error => {
        const notificationMessage = `error updating likes: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
        setNotificationMessage(notificationMessage)
        setNotificationStatus('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
    navigate('/')
  }

  /*
  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))

      const notificationMessage = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      setNotificationMessage(notificationMessage)
      setNotificationStatus('ok')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
    })
      .catch(error => {
        const notificationMessage = `error creating blog: ${error.response.data.error}`
        setNotificationMessage(notificationMessage)
        setNotificationStatus('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
  }
*/


  const deleteBlog = (id) => {
    blogService.remove(id)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== id))

        const notificationMessage = 'blog deleted'
        setNotificationMessage(notificationMessage)
        setNotificationStatus('ok')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
      .catch(error => {
        const notificationMessage = `error deleting blog: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
        setNotificationMessage(notificationMessage)
        setNotificationStatus('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
  }

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>

        {!user && (
          <Link style={padding} to="/login">login</Link>
        )}

        {user && (
          <span style={padding}>
            <button onClick={() => handleLogout()}>logout</button>
          </span>
        )}
      </div>

      <Notification status={notificationStatus} message={notificationMessage} />

      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              userid={user?.id}
              increaseLikes={increaseLikesOf}
              deleteBlog={deleteBlog}
            />
          }
        />
        <Route path="/" element={<BlogList blogList={blogs} />} />

        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/" />   // jos kirjautunut → pois login-sivulta
              : <Login setUser={setUser} />
          }
        />
      </Routes>
    </div>
  )
}

export default App