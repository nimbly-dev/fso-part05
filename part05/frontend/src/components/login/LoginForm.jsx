import React, { useState } from 'react'
import Form from '../common/Form'
import InputField from '../common/InputField'
import Notification from '../common/Notification'

import PropTypes from 'prop-types'
import LoginService from '../../services/LoginService'

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState({})

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await LoginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (err) {
            console.log(err.response.data.error)
            setNotification({
                message: `${err.response.data.error}`,
                type: 'notification error'
            })
            setTimeout(() => {
                setNotification({})
            }, 5000)
        }
    }

    return(
        <>
            <Form formName='login' onSubmit={handleLogin}>
                <InputField label={'username'} value={username} handleOnChange={({ target }) => setUsername(target.value)}/>
                <InputField label={'password'} value={password} handleOnChange={({ target }) => setPassword(target.value)} type={'password'}/>
            </Form>
            <Notification notification={notification}/>
        </>

    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func
}

export default LoginForm