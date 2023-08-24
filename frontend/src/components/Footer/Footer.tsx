import React from 'react'
import { Link } from 'react-router-dom'
import footerLogo from '../../assets/images/wmg_logo_big.svg';
import './Footer.scss'
import Nav from '../Nav/Nav';

const Footer: React.FC = (props) => {

    return (
        <div className="container">
            <footer className='footer'>
                <div className="footer__logo-container">
                    <Link to="/">
                        <img src={footerLogo} alt="" />
                    </Link>
                </div>
                <Nav location="footer" />
                <div className="footer__organization">
                    <span>world music geek &copy;{String((new Date()).getFullYear())}</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer