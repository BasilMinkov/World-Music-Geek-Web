import React from 'react'
import { Link } from 'react-router-dom'
import SiteLogo from '../../assets/images/logo.png'
// import SiteLogo from '../../assets/images/wmg_logo_big.svg'
import './Logo.scss'

const Logo: React.FC = () => {
    return (
        <div className="logo">
            <Link to="/library">
                <img src={SiteLogo} alt="Smokyzon Logo" />
            </Link>
        </div>
    )
}

export default Logo