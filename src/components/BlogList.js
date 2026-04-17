import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import Notification from './notification'
import Blog from './Blog'
import BlogAdditionForm from './BlogAdditionForm'
import Togglable from './Togglable'

const BlogList = (user) => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const increaseLikesOf = (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService.update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(n => n.id !== id ? n : returnedBlog))

        const notificationMessage = `liked blog ${returnedBlog.title} by ${returnedBlog.author}`
        setNotificationMessage(notificationMessage)
        setNotificationStatus('ok')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
      .catch(error => {
        const notificationMessage = `error updating likes: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
        setNotificationMessage(notificationMessage)
        setNotificationStatus('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
  }

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))

      const notificationMessage = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      setNotificationMessage(notificationMessage)
      setNotificationStatus('ok')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
    })
      .catch(error => {
        const notificationMessage = `error creating blog: ${error.response.data.error}`
        setNotificationMessage(notificationMessage)
        setNotificationStatus('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
  }


  const deleteBlog = (id) => {
    blogService.remove(id)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== id))

        const notificationMessage = 'blog deleted'
        setNotificationMessage(notificationMessage)
        setNotificationStatus('ok')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
      .catch(error => {
        const notificationMessage = `error deleting blog: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
        setNotificationMessage(notificationMessage)
        setNotificationStatus('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
  }

  const BlogFormTogglable = () => (
    <Togglable buttonLabel="create new blog" ref={noteFormRef}>
      <BlogAdditionForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification status={notificationStatus} message={notificationMessage} />
      <BlogFormTogglable />

      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          userid={user.user.id}
          increaseLikes={() => increaseLikesOf(blog.id)}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default BlogList