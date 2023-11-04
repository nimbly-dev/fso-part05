import PropTypes from 'prop-types'
import React from 'react'

const InputField = ({ handleOnChange, label, value,  type }) => {
    return(
        <>
            <label htmlFor={label} className='form-label'>{label}</label>:
            <input id={label} value={value} onChange={handleOnChange} type={!type ? 'text' : type} className='form-input' required/>
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