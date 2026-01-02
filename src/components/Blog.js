const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const BlogAdditionForm = (props) => {
  return (
    <form onSubmit={props.addBlog}>
      <div>
        <label>
          title:
          <input
            type="text"
            value={props.newTitle}
            onChange={props.handleTitleChange}
          />
        </label>
      </div>
      <div>
        <label> 
          author:
          <input
            type="text"
            value={props.newAuthor}
            onChange={props.handleAuthorChange}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="text"
            value={props.newUrl}
            onChange={props.handleUrlChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export { Blog as default, BlogAdditionForm }