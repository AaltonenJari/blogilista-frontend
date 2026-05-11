import { Alert } from '@mui/material'

const Notification = ({ status, message }) => {
  if (!message) {
    return null
  }

  if (status === 'error') {
    return (
      <Alert severity="error">
        {message}
      </Alert>
    )
  }

  return (
    <Alert severity="success">
      {message}
    </Alert>
  )
}

export default Notification