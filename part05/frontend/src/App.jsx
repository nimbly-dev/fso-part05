import React, { useState, useEffect } from 'react'
import loginService from './services/LoginService'
import Blog from './components/Blog'
import Notification from './components/common/Notification'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ user, setUser ] = useState('')
    const [notification, setNotification] = useState({})

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
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

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
            username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
            password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

    return (
        <>
            {/* <Phonebook/> */}
            {!user && loginForm()}
            <Notification notification={notification}/>
            {user &&
            <div>
                <p>{user.name} logged in</p>
                <Blog loggedUser={user}/>
            </div>
            }

        </>
    )
}

export default App