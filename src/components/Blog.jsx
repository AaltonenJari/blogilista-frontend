import { useState } from 'react'

const Blog = ({ blog, userid, increaseLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  const deleteButtonVisible = { display: blog.user && blog.user.id === userid ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
        <span className="blog-title">{blog.title}</span> {blog.author}
        <button onClick={toggleVisibility}>hide</button>
      </div>
      {blog.url} <br />
      <div>
        likes {blog.likes}
        <button onClick={increaseLikes}>like</button>
      </div>
      {blog.user.name}
      <div style={deleteButtonVisible}>
        <button onClick={handleDelete}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog