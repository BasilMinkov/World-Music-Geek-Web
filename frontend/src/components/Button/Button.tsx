import React from 'react'
import './Button.scss'

export type ButtonType = 'transparent'

interface IButton {
    type?: 'button' | 'reset' | 'submit'
    buttonType?: ButtonType
    children?: React.ReactNode
    disabled?: boolean
    onClick?: () => void
}

const Button: React.FC<IButton> = (props) => {
    const {
        type,
        buttonType,
        children,
        disabled,
        onClick
    } = props

    return (
        <button
            className={`button button--${buttonType}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button