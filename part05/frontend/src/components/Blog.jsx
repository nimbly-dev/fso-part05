import React, { useState,useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/BlogService'
import BlogList from './blog/BlogList'

import '../assets/blogs/blogs.css'
import BlogForm from './blog/BlogForm'
import Notification from './common/Notification'
import Togglable from './common/Togglable'

const Blog = ({ loggedUser }) => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState({})
    const blogFormRef = useRef()

    useEffect(() => {
        blogService
            .getBlogs(loggedUser.token)
            .then(initialData => {
                setBlogs(initialData.data)
            })
    }, [])

    const handleDelete = (id, title) => {
        const deleteConfirmation = window.confirm(`Are you sure you want to delete ${title}?`)

        if (deleteConfirmation) {
            blogService
                .deleteBlog(id,loggedUser.token)
                .then(() => {
                    setBlogs(blogs.filter(blog => blog.id !== id))
                })
                .catch(err => {
                    console.log(err)
                    setNotification({
                        message: `${err.response.data.error}`,
                        type: 'notification error'
                    })
                    setTimeout(() => {
                        setNotification({})
                    }, 5000)
                })
        }
    }

    return(
        <>
            <Notification notification={notification}/>
            <Togglable ref={blogFormRef} buttonLabel="new Blog">
                <BlogForm loggedUser={loggedUser} setBlogs={setBlogs}/>
            </Togglable>
            <BlogList blogs={blogs} loggedUser={loggedUser} handleDelete={handleDelete} />
        </>
    )
}

Blog.propTypes = {
    loggedUser: PropTypes.shape({
        name: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
}

export default Blog