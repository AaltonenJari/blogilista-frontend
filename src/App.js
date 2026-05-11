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
import BlogAdditionForm from './components/BlogAdditionForm'
import { Button, Container, AppBar, Toolbar, Box, Typography } from '@mui/material'

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
  }

  const addBlog = (blogObject) => {
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
    navigate('/')
  }


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
    navigate('/')
  }

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={padding}>
            Blog App
          </Typography>

          <Box sx={{ ml: 'auto' }}>
            <Button color="inherit" component={Link} to="/" sx={style}>
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/create" sx={style}>
              New Blog
            </Button>

            {!user && (
              <Button color="inherit" component={Link} to="/login" sx={style}>
                Login
              </Button>
            )}

            {user && (
              <span style={padding}>
                <Button color="inherit" onClick={() => handleLogout()} sx={style}>
                  Logout
                </Button>
              </span>
            )}
          </Box>
        </Toolbar>
      </AppBar>

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
        <Route path="/create" element={user ? <BlogAdditionForm createBlog={addBlog} /> : <Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/" />   // jos kirjautunut → pois login-sivulta
              : <Login setUser={setUser} />
          }
        />
      </Routes>
    </Container>
  )
}

export default App