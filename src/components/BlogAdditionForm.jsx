import { useState } from 'react'
import { Button, TextField } from '@mui/material'

const BlogAdditionForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            style={{ marginTop: 10 }}
          >
          </TextField>
        </div>
        <div>
          <TextField
            label="author"
            value={author}
            onChange={event => setAuthor(event.target.value)}
            style={{ marginTop: 10 }}
          >
          </TextField>
        </div>
        <div>
          <TextField
            label="url"
            value={url}
            onChange={event => setUrl(event.target.value)}
            style={{ marginTop: 10 }}
          >
          </TextField>
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogAdditionForm
