import { useState } from 'react'

const Blog = ({ blog, increaseLikes }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
      </div>
      {blog.url} <br />
      <div>
        likes {blog.likes}
        <button onClick={increaseLikes}>like</button>
      </div>
      {blog.user.name}  
    </div>  
  )
}

export default Blog