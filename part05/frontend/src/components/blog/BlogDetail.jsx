import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Togglable from '../common/Togglable'
const BlogDetail = ({ blog,handleDelete ,userToken, handleLike }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const blogViewMoreDetailRef = useRef()

    return(
        <>
            <div style={blogStyle} key={blog.id}>
                <h3>{blog.title}</h3>
                <Togglable ref={blogViewMoreDetailRef} showLabel="show more" hideLabel={'hide'}>
                    <>
                        <h3>Details: </h3>
                        <ul>
                            <li>Author: {blog.author}</li>
                            <li>Likes: {blog.likes}</li> <button onClick={() => handleLike(blog.id, userToken)}>Like</button>
                            <li>Created by: {blog.user.username}</li>
                        </ul>
                        Link: <a>{blog.url}</a>
                        <br/>
                    </>
                </Togglable>
                <button type='button' onClick={() => handleDelete(blog.id, blog.title)}>Delete</button>
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
    handleLike: PropTypes.func,
    userToken: PropTypes.string
}
export default BlogDetail