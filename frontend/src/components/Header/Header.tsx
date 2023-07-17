import React from 'react'
import './Header.scss'
import logoLink from '../../assets/images/logo.png'
import Button from '../Button/Button'
import { NavLink, Link } from 'react-router-dom'

const Header: React.FC = (props) => {

    return (
        <header className="header">
            <div className="header__logo-container">
                <Link to="/">
                    <img src={logoLink} alt="World Music Geek" />
                </Link>
            </div>
            <nav className="header__nav">
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
            <div className="button-container">
                <Button
                    type="button"
                    buttonType="transparent"
                >
                    Donate
                </Button>
            </div>
        </header>
    )
}

export default Header