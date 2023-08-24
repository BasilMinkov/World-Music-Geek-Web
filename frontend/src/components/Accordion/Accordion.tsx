import React, { useState } from 'react'
import Icon from '../Icon/Icon'
import './Accordion.scss'

interface IAccordion {
    children: React.ReactElement
    title: string
    isOpen?: boolean
}

const Accordion: React.FC<IAccordion> = (props) => {
    const {
        children,
        title,
        isOpen = false
    } = props

    const [toggle, setToggle] = useState<boolean>(isOpen)

    const handleToggle = () => {
        setToggle((prev) => {
            return !prev
        })
    }

    return (
        <div className="accordion">
            <div className={`accordion__header ${toggle ? 'accordion__header--gradient' : ''}`}
                onClick={handleToggle}
            >
                <span className="accordion__title">{title}</span>
                <Icon
                    name="i-arrow"
                    className={`accordion__icon--${toggle ? 'open' : 'closed'}`}
                    width={9}
                    height={6}
                />
            </div>
            <div className={`accordion__body accordion__body--${toggle ? 'open' : 'closed'}`}>
                <>
                    {children}
                </>
            </div>
        </div>
    )
}

export default Accordion;