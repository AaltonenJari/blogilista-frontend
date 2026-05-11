import { useNavigate, useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material'

const Blog = ({ blog, userid, increaseLikes, deleteBlog }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  if (!blog) return null

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(id)
      navigate('/')
    }
  }

  const padding = {
    padding: '25px 5px 5px 5px'
  }

  const paddingText = {
    padding: 5
  }

  return (
    <div data-testid={`blog-${blog.id}`}>

      <Typography variant="h5" style={padding}>
        {blog.title}
      </Typography>
      <div style={paddingText}>by {blog.author}</div>
      <div style ={paddingText}>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>

      <div style={paddingText}>
        <span>Added by {blog.user.name}</span>
      </div>

      <div style={paddingText}>
        <span data-testid={`likes-${blog.id}`}>
          {blog.likes} likes
        </span>

        {userid && (
          <Button
            onClick={() => increaseLikes(blog.id)}
            data-testid={`like-button-${blog.id}`}
            variant="outlined"
            sx={{ ml: 1 }}
          >
            like
          </Button>
        )}

        {blog.user && blog.user.id === userid && (
          <Button
            onClick={handleDelete}
            data-testid={`delete-button-${blog.id}`}
            variant="outlined"
            color="error"
            sx={{ ml: 1 }}
          >
            remove
          </Button>
        )}
      </div>

    </div>
  )
}

export default Blog