import Form from '../common/Form'
import React, { useState } from 'react'
import InputField from '../common/InputField'
import '../../assets/blogs/blogs.css'
import BlogService from '../../services/BlogService'
import PropTypes from 'prop-types'
import Notification from '../common/Notification'

const BlogForm = ({ loggedUser, setBlogs }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [notification, setNotification] = useState({})

    const handleSaveSubmit = (e) => {
        e.preventDefault()

        const blogObj = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        }

        BlogService.saveBlog(blogObj,loggedUser.token)
            .then((response) => {
                console.log('Returned data: {}', response)
                setNotification({
                    message: `Success addition of ${response.data.title}`,
                    type: 'notification success'
                })
                setTimeout(() => {
                    setNotification({})
                }, 5000)
                BlogService.getBlogs(loggedUser.token)
                    .then((response) => {
                        setBlogs(response.data)
                        console.log(response.data)
                    })
                    .catch((err) => {
                        console.log('Failed update of blogs {}', err)
                    })
            })
            .catch((err) => {
                console.log('Err: {}', err)
                setNotification({
                    message: `${err.response.data.error}`,
                    type: 'notification error'
                })
                setTimeout(() => {
                    setNotification({})
                }, 5000)
            })
    }

    return(
        <div>
            <Form onSubmit={handleSaveSubmit} formName="saveBlog">
                <InputField
                    label={'Title'}
                    value={newTitle}
                    handleOnChange={({ target }) => setNewTitle(target.value)}
                />
                <InputField
                    label={'Author'}
                    value={newAuthor}
                    handleOnChange={({ target }) => setNewAuthor(target.value)}/>
                <InputField
                    label={'URL'}
                    value={newUrl}
                    handleOnChange={({ target }) => setNewUrl(target.value)}
                />
            </Form>
            <Notification notification={notification}/>
        </div>
    )
}
BlogForm.propTypes = {
    loggedUser: PropTypes.shape({
        name: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
    setBlogs: PropTypes.func,
}

export default BlogForm
