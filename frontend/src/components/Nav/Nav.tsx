import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.scss'

interface INav {
    location: string
}

const Nav: React.FC<INav> = (props) => {
    const { location } = props
    return (
        <nav className={`nav nav__${location}`}>
            <NavLink
                to="/blog"

                className={({ isActive, isPending }) =>
                    isActive ? "active" : "pending"
                }
            >
                blog
            </NavLink>
            <NavLink
                to="/library"
                className={({ isActive, isPending }) =>
                    isActive ? "active" : "pending"
                }
            >
                library
            </NavLink>
        </nav>
    )
}

export default Nav