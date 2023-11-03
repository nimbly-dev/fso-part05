import React from 'react'
import PropTypes from 'prop-types'
const BlogDetail = ({ blog,handleDelete ,userToken }) => {

    return(
        <>
            <div className='blog-detail' key={blog.id}>
                <h3>Title: {blog.title}</h3>
                <h3>Details: </h3>
                <ul>
                    <li>Author: {blog.author}</li>
                    <li>URL: <a>{blog.url}</a></li>
                    <li>Likes: {blog.likes}</li>
                    <li>Created by: {blog.user.username}</li>
                </ul>
                <button type='button' onClick={() => handleDelete(blog.id, userToken)}>Delete</button>
            </div>
        </>
    )
}
BlogDetail.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }).isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
    handleDelete: PropTypes.func,
    userToken: PropTypes.string
}
export default BlogDetail