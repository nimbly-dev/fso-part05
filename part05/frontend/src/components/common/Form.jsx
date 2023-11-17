import PropTypes from 'prop-types'
import React from 'react'

const Form = ({ onSubmit,children,formName,submitButtonLabel }) => {
    const formStyles = {
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // Adjusted to align content to the left
            marginLeft: '20px', // Added margin for spacing
        },
        submitButton: {
            textAlign: 'center',
            marginTop: '10px',
        },
        submitButtonInput: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        submitButtonInputHover: {
            backgroundColor: '#0056b3',
        },
    }


    return(
        <>
            <form onSubmit={onSubmit} name={formName} style={formStyles.formContainer}>
                {
                    children
                }
                <div style={formStyles.submitButton}>
                    <button type="submit" style={formStyles.submitButtonInput}>{submitButtonLabel ? submitButtonLabel : 'Click' }</button>
                </div>
            </form>
        </>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    formName: PropTypes.string.isRequired,
    submitButtonLabel: PropTypes.string,
}

export default Form