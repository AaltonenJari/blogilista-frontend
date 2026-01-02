import { useState, useEffect } from 'react'
import Blog, { BlogAdditionForm } from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {    
    event.preventDefault()
    try {      
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      const notificationMessage = `wrong username or password`
      console.log(notificationMessage)
      setNotificationMessage(notificationMessage)
      setNotificationStatus('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))

      const notificationMessage = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      setNotificationMessage(notificationMessage)
      setNotificationStatus('ok')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')
    })
    .catch(error => {
      const notificationMessage = `error creating blog: ${error.response.data.error}`
      console.log(notificationMessage)
      setNotificationMessage(notificationMessage)
      setNotificationStatus('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
    })   
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification status="error" message={notificationMessage} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification status={notificationStatus} message={notificationMessage} />

      <form onSubmit={handleLogout}>
        <p>
          {user.name} logged in
          <button type="submit">logout</button>
        </p>
      </form>

      <h2>Create new</h2>

      <BlogAdditionForm  
        addBlog={addBlog}
        newTitle={newTitle}
        handleTitleChange={handleTitleChange}
        newAuthor={newAuthor}
        handleAuthorChange={handleAuthorChange}
        newUrl={newUrl}
        handleUrlChange={handleUrlChange}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App