import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/notification'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'

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

  const padding = {
    padding: 5
  }

  /*
  if (user === null) {
    return (
      <div>
        <Login setUser={setUser} />
      </div>
    )
  }
*/

  return (
    <Router>
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

      <Notification />

      <Routes>
        <Route path="/" element={<BlogList user={user} />} />

        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/" />   // jos kirjautunut → pois login-sivulta
              : <Login setUser={setUser} />
          }
        />
      </Routes>
    </Router>
  )
}

export default App