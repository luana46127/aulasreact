import React from 'react'
import PropTypes from 'prop-types'

const Input = props => {
  return (
    <div>
        <label htmlFor={props.id}>{props.label}</label>
        <input id={props.id} name={props.name} 
            value={props.value} onChange={props.onChange} 
        />
    </div>
  )
}

Input.propTypes = {}

export default Input