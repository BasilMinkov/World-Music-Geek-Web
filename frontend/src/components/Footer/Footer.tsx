import React from 'react'
import { Link } from 'react-router-dom'
import footerLogo from '../../assets/images/wmg_logo_big.svg';
import footerLogoFull from '../../assets/images/logo_full.svg'
import './Footer.scss'
import Menu from '../Menu/Menu';

const Footer: React.FC = (props) => {

    return (
        <div className="container">
            <footer className='footer'>
                <div className="footer__logo-container">
                    <Link to="/">
                        <img src={footerLogo} alt="" />
                        <img src={footerLogoFull} alt="" />
                    </Link>
                </div>
                <Menu position="footer" />
                <div className="footer__organization">
                    <span>world music geek &copy;{String((new Date()).getFullYear())}</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer