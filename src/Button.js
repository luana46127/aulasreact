import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  return (
    <div>
        <button onClick={props.onClick} 
        style={{backgroundColor: props.backgroundColor}}>
            {props.children}
        </button>
    </div>
  )
}

Button.propTypes = {}

export default Button