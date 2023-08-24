import React from 'react'
import './Header.scss'
import logoHeader from '../../assets/images/logo.png'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import Nav from '../Nav/Nav'

const Header: React.FC = (props) => {

    return (
        <div className="container--header">
            <header className="header">
                <div className="header__logo-container">
                    <Link to="/">
                        <img src={logoHeader} alt="World Music Geek" />
                    </Link>
                </div>
                <Nav location="header" />
                <div className="button-container">
                    <Button
                        type="button"
                        buttonType="transparent"
                    >
                        Donate
                    </Button>
                </div>
            </header>
        </div>
    )
}

export default Header