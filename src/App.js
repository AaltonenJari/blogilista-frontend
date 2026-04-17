import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/notification'

const App = () => {
  const [user, setUser] = useState(null)

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


  if (user === null) {
    return (
      <div>
        <Login setUser={setUser} />
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <form onSubmit={handleLogout}>
        <p>
          {user.name} logged in
          <button type="submit">logout</button>
        </p>
      </form>

      <BlogList user={user} />

    </div>
  )
}

export default App