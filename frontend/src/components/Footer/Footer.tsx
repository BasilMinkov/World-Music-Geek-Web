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
                    <Link to="https://linktr.ee/world.music.geek">
                        <img src={footerLogo} alt="" />
                        <img src={footerLogoFull} alt="" />
                    </Link>
                </div>
                <Menu position="footer" />
                <div className="footer__organization">
                    <span>world music geek &copy;2020 - {String((new Date()).getFullYear())}</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer
