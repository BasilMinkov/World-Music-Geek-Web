import React from 'react'
import './Button.scss'

export type ButtonType = 'transparent'

interface IButton {
    type?: 'button' | 'reset' | 'submit'
    buttonType?: ButtonType
    children?: React.ReactNode
}

const Button: React.FC<IButton> = (props) => {
    const { type = 'button', buttonType, children } = props

    return (
        <button
            className={`button button--${buttonType}`}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button