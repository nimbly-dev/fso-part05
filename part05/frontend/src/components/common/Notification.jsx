import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
    const notificationErrorStyle = {
        backgroundColor: '#ffebee', /* Light red background */
        color: '#d32f2f', /* Dark red text color */
    }

    const notificationSuccessStyle = {
        backgroundColor: '#e8f5e9', /* Light green background */
        color: '#43a047', /* Dark green text color */
    }

    const notificationStyle = {
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        width: 300,
        backgroundColor: 'white',
    }

    if (notification.message === null || notification.message === '') {
        return <></>
    }

    return(
        <div style={notificationStyle}>
            <p style={notification.type  === 'success'? notificationSuccessStyle : notificationErrorStyle}>{notification.message}</p>
        </div>
    )
}
Notification.propTypes = {
    notification: PropTypes.object
}


export default Notification