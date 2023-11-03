import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/BlogService'
import BlogList from './blog/BlogList'

import '../assets/blogs/blogs.css'
import BlogForm from './blog/BlogForm'
import Notification from './common/Notification'

const Blog = ({ loggedUser }) => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState({})

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
            <BlogForm loggedUser={loggedUser} setBlogs={setBlogs}/>
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