import PropTypes from 'prop-types'
import React from 'react'

const InputField = ({ handleOnChange, label, value,  type }) => {
    const inputFieldStyles = {
        formLabel: {
            marginBottom: '5px',
        },
        formInput: {
            marginBottom: '10px',
            padding: '5px',
        },
    }

    return(
        <>
            <label htmlFor={label} style={inputFieldStyles.formLabel}>{label}</label>
            <input id={label} value={value} onChange={handleOnChange} type={!type ? 'text' : type} style={inputFieldStyles.formInput} required/>
            <br/>
        </>
    )
}

InputField.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
}

export default InputField