import React,{ useState, forwardRef, useImperativeHandle } from 'react'

import PropTypes from 'prop-types'
// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }


    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.showLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.hideLabel}</button>
            </div>
        </div>
    )

})
Togglable.propTypes = {
    children: PropTypes.node,
    showLabel: PropTypes.string.isRequired,
    hideLabel: PropTypes.string.isRequired,
}

export default Togglable