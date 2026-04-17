import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import Notification from './notification'

const Login = ({ setUser })  => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

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
      const notificationMessage = 'wrong username or password'
      setNotificationMessage(notificationMessage)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          notificationMessage={notificationMessage}
        />
      </Togglable>
    </div>
  )
}

export default Login