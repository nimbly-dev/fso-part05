import React from 'react'
import BlogDetail from './BlogDetail'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, loggedUser, handleDelete }) => {

    return(
        <>
            {
                blogs.map(blog => {
                    return(
                        <BlogDetail key={blog.id} blog={blog} loggedUser={loggedUser} handleDelete={handleDelete}/>
                    )
                })
            }
        </>
    )
}
BlogList.propTypes = {
    blogs: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired,
    loggedUser: PropTypes.shape({
        name: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
    handleDelete: PropTypes.func
}
export default BlogList