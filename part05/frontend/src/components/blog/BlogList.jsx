import React, { useState } from 'react'
import BlogDetail from './BlogDetail'
import PropTypes from 'prop-types'

import blogService from '../../services/BlogService'
import Notification from '../common/Notification'

const BlogList = ({ blogs, loggedUser, setBlogs }) => {
    const [notification, setNotification] = useState({})
    const [sortByLikes, setSortByLikes] = useState(false)

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

    const handleLike = (id) => {
        blogService
            .likeBlog(id,loggedUser.token)
            .then(() => {
                const blogIndex = blogs.findIndex(blog => blog.id === id)
                const updatedBlogs = [...blogs]

                updatedBlogs[blogIndex] = {
                    ...updatedBlogs[blogIndex],
                    likes: updatedBlogs[blogIndex].likes + (updatedBlogs[blogIndex].likes > 0 ? -1 : 1),
                }
                setBlogs(updatedBlogs)
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

    const handleSortByLikeClick = () => {
        if(sortByLikes === true){
            setSortByLikes(false)
        }else{
            setSortByLikes(true)
        }
    }

    return(
        <>
            <button type='button' onClick={() => {handleSortByLikeClick()}}>{sortByLikes ? 'Sort By Like' : 'Use normal sort'}</button>
            <Notification notification={notification}/>

            {
                sortByLikes ?
                    blogs.map(blog => {
                        return(
                            <BlogDetail key={blog.id} blog={blog} loggedUser={loggedUser} handleDelete={handleDelete} handleLike={handleLike}/>
                        )
                    })
                    :
                    blogs.sort((a, b) => b.likes - a.likes).map(blog => {
                        return(
                            <BlogDetail key={blog.id} blog={blog} loggedUser={loggedUser} handleDelete={handleDelete} handleLike={handleLike}/>
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
    setBlogs: PropTypes.func
}
export default BlogList