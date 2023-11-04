import PropTypes from 'prop-types'
import React from 'react'

const Form = ({ onSubmit,children,formName }) => {

    return(
        <>
            <form onSubmit={onSubmit} name={formName} className='form-container'>
                {
                    children
                }
                <div>
                    <button type="submit" className='form-submit-button'>Save blog</button>
                </div>
            </form>
        </>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    formName: PropTypes.string.isRequired,
}

export default Form