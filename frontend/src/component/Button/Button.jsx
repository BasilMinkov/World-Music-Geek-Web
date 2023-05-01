import React from 'react'
import './Button.css'

const Button = (props) => {
  const { title, btnClass } = props
  return (
    <button className={`button ${btnClass}`}>
      {title}
    </button>
  )
}

export default Button