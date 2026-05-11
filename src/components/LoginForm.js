
import Notification from './notification'
import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  notificationMessage
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification status="error" message={notificationMessage} />
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          >
          </TextField>
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          >
          </TextField>
        </div>
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }} >
          login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm