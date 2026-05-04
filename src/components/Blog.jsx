import { useNavigate, useParams } from 'react-router-dom'

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

  const userActionButtonVisible = { display: blog.user && blog.user.id === userid ? '' : 'none' }

  return (
    <div data-testid={`blog-${id}`}>
      <h1>{blog.author}: {blog.title}</h1>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>

      <div>
        <span data-testid={`likes-${id}`}>likes {blog.likes}</span>
        <span style={userActionButtonVisible}>
          <button onClick={() => increaseLikes(id)} data-testid={`like-${id}`}>like</button>
        </span>
      </div>
      <span>Added by {blog.user.name}</span>
      <div style={userActionButtonVisible}>
        <button onClick={handleDelete}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog