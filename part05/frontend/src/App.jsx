import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/login/LoginForm'

const App = () => {
    const [ user, setUser ] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    const logout = () => {
        // document.cookie = 'loggedUser' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        //Temporary solution
        window.localStorage.clear()
        window.location.reload()
    }

    return (
        <>
            {/* <Phonebook/> */}
            {!user &&
                <LoginForm setUser={setUser}/>
            }
            {
                user &&
            <div>
                <p>{user.name} logged in</p>
                <button onClick={() => logout()}>logout</button>
                <Blog loggedUser={user}/>

            </div>
            }

        </>
    )
}

export default App