import React, { useState,useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/BlogService'
import BlogList from './blog/BlogList'

import '../assets/blogs/blogs.css'
import BlogForm from './blog/BlogForm'
import Togglable from './common/Togglable'

const Blog = ({ loggedUser }) => {
    const [blogs, setBlogs] = useState([])
    const blogFormRef = useRef()

    useEffect(() => {
        blogService
            .getBlogs(loggedUser.token)
            .then(initialData => {
                setBlogs(initialData.data)
            })
    }, [])

    return(
        <>
            <Togglable ref={blogFormRef} showLabel="new Blog" hideLabel={'hide'}>
                <BlogForm loggedUser={loggedUser} setBlogs={setBlogs}/>
            </Togglable>
            <BlogList blogs={blogs} loggedUser={loggedUser} setBlogs={setBlogs} />
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