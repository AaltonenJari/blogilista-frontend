import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import LoginForm from './LoginForm'

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
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
        notificationMessage={notificationMessage}
      />
    </div>
  )
}

export default Login